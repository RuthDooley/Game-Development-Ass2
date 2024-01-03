let droneId = 0;

let aiCoLearner, mainAvatar;

let droneHeightInAir = 10, pickUpTime = 1000;

class Drone {
    constructor(o = {}) {
        this.id = droneId++;
        this.mesh = view.getMesh("deliveryDrone", "Parent_deliveryDrone");
        this.body = view.add({
            name: "drone_" + this.id,
            type: "robot",
            shapeType: "box",
    
            pos: o.pos ? o.pos : [0,droneHeightInAir,0],
    
            width: 0.3,
            height: 0.6,
    
            stepOffset: 0,
    
            maxSpeedLinear: 3,
            linearAcceleration: Infinity,

            mass: 1,
            mesh: this.mesh,
            meshScale: envScale / 3.4,
            meshPos: [0, 0, 0],
            meshRot: o.meshRot ? o.meshRot : [0, 90, 0],
        });

        this.positionSquare = getSquareNotationFromCoords([this.body.position.x, this.body.position.z]);
        this.tiltAmount = 10;

        //Differentiate the ai co learner
        this.body.traverse((node) => {
            if (node.material){
                if (this.id == 0){
                    node.material = node.material.clone();
                    node.material.color = new THREE.Color("#FF00FF");
                }
            }
        });

        let anim = view.getPool("deliveryDrone_animation");

        this.animations = new THREE.AnimationMixer(this.body);
        this.bumpAnimation = this.animations.clipAction(anim[0]);
        this.carryAnimation = this.animations.clipAction(anim[1]);
        this.dropOffAnimation = this.animations.clipAction(anim[2]);
        this.idleAnimation = this.animations.clipAction(anim[3]);
        this.pickUpAnimation = this.animations.clipAction(anim[4]);
        this.victoryAnimation = this.animations.clipAction(anim[5]);
    
        this.idleAnimation.play();
        this.originPosition = this.id == 0 ? [2.2222222222222223, droneHeightInAir, 2.2222222222222223] : [17.77777777777778, droneHeightInAir, 17.77777777777778];
        this.originSquarePosition = this.id == 0 ? "h8" : "a1";
        
        // Create text sprite 
        this.textSprite = new VIEW.TextSprite({
            sizeAttenuation: false,
            fillStyle: "#000000",
            fontFamily: "\"Lucida Console\", Monaco, monospace",
            spriteSize: 0.5,
            fontSize: 50,
            text: "Here"
        });

        this.textSpriteChanged = false;  // BYpass warning, can't navigate view

        this.particleName = "drone_particle_" + this.id;
        this.carryingPiece;
    }

    /**
     * DRONE MOVEMENT METHODS START
     */

    async tiltLeftRight (to, time = 100, from = this.body.rotation.x * math.todeg) {
        this.tiltDroneForwardBackwardTween = new TWEEN.Tween({ t: from })
            .to({ t: -to }, time)
            .onUpdate((v) => {
                this.body.rotation.x = v.t * math.torad;
            })
            .start();
    };

    async tiltForwardBackward (to, time = 100, from = this.body.rotation.z * math.todeg){
        this.tiltDroneForwardBackwardTween = new TWEEN.Tween({ t: from })
            .to({ t: -to }, time)
            .onUpdate((v) => {
                this.body.rotation.z = v.t * math.torad;
            })
            .start();
    };

    async moveForward (dis) {
        let multiplier = 1;
        if (this.id == 1) multiplier = -1;

        if (dis < 0) {
            await this.moveBackward(dis * -1);
            return;
        }

        dis *= multiplier;
        let tiltAmountTemp = multiplier * this.tiltAmount;

        return new Promise(async (resolve, reject) => {
            this.moveForwardPromise = resolve;
            if (dis === 0 || dis === undefined) {
                resolve();
                return;
            }

            await this.tiltForwardBackward(tiltAmountTemp);
            await this.body.move(dis * step, 0, 0);
            await this.tiltForwardBackward(0);
            this.moveForwardPromise();
        });
    };

    async moveBackward (dis){
        let multiplier = 1;
        if (this.id == 1) multiplier = -1;

        if (dis < 0) {
            await this.moveForward(dis * -1);
            return;
        }

        dis *= multiplier;
        let tiltAmountTemp = multiplier * this.tiltAmount;

        return new Promise(async (resolve, reject) => {
            this.moveBackwardPromise = resolve;
            if (dis === 0 || dis === undefined) {
                this.moveBackwardPromise();
                return;
            }

            await this.tiltForwardBackward(-tiltAmountTemp);
            await this.body.move(-dis * step, 0, 0);
            await this.tiltForwardBackward(0);
            this.moveBackwardPromise();
        });
    };

    async moveRight (dis) {        
        let multiplier = 1;
        if (this.id == 1) multiplier = -1;

        if (dis < 0) {
            await this.moveLeft(dis * -1);
            return;
        }

        dis *= multiplier;
        let tiltAmountTemp = multiplier * this.tiltAmount;

        return new Promise(async (resolve, reject) => {
            this.moveRightPromise = resolve;
            if (dis === 0 || dis === undefined) {
                this.moveRightPromise();
                return;
            }

            await this.tiltLeftRight(tiltAmountTemp);
            await this.body.move(0, 0, dis * step);
            await this.tiltLeftRight(0);
            this.moveRightPromise();
        });
    };

    async moveLeft (dis) {
        let multiplier = 1;
        if (this.id == 1) multiplier = -1;

        if (dis < 0) {
            await this.moveRight(dis * -1);
            return;
        }

        dis *= multiplier;
        let tiltAmountTemp = multiplier * this.tiltAmount;

        return new Promise(async (resolve, reject) => {
            this.moveLeftPromise = resolve;
            if (dis === 0 || dis === undefined) {
                this.moveLeftPromise();
                return;
            }

            await this.tiltLeftRight(-tiltAmountTemp);
            await this.body.move(0, 0, -dis * step);
            await this.tiltLeftRight(0);
            this.moveLeftPromise();
        });
    };

    async moveUp (dis) {
        if (dis < 0) {
            await this.moveDown(dis * -1);
            return;
        }

        return new Promise(async (resolve, reject) => {
            this.moveDownPromise = resolve;
            if (dis === 0 || dis === undefined) {
                this.moveDownPromise();
                return;
            }

            await this.body.move(0, dis, 0);
            this.moveDownPromise();
        });
    };

    async moveDown (dis) {
        if (dis < 0) {
            await this.moveUp(dis * -1);
            return;
        }

        return new Promise(async (resolve, reject) => {
            this.moveUpPromise = resolve;
            if (dis === 0 || dis === undefined) {
                this.moveUpPromise();
                return;
            }

            await this.body.move(0, -dis, 0);
            this.moveUpPromise();
        });
    };

    /**
     * DRONE MOVEMENT METHODS END
     */

    async moveToSquare(squareNotation){
        /**
         * Moves this drone to end position
         */

        // User validation has to be a valid end position
        if (!allSquareNames.includes(squareNotation)){
            console.log("moveToSquare(): Invalid square name, inputted " + squareNotation);
        }

        //Get current square letter and subtract from destination square letter
        let startLetter = splitSquareNotation(this.positionSquare)[0];
        let startNumber = splitSquareNotation(this.positionSquare)[1];
        let endLetter = splitSquareNotation(squareNotation)[0];
        let endNumber = splitSquareNotation(squareNotation)[1];
        
        let letterDifference = endLetter.charCodeAt(0) - startLetter.charCodeAt(0);
        let numberDifference = endNumber - startNumber;

        if (this.id == 1){
            await this.moveForward(numberDifference);
            await this.moveLeft(letterDifference);
        } else {
            await this.moveBackward(numberDifference);
            await this.moveRight(letterDifference);
        }

        this.positionSquare = squareNotation;
        this.positionTween;
        this.pieceHolding;
    }

    
    playPickUpAnimation (time){
        /**
         * Pick up animations necessary
         */

        this.idleAnimation.stop();
        this.pickUpAnimation.play();

        setTimeout(() => {
            this.pickUpAnimation.stop();
            this.carryAnimation.play();
        }, this.pickUpAnimation._clip.duration * time);
    };

    playDropOffAnimation (time){
        /**
         * Drop off animations necessary
         */
        
        this.carryAnimation.stop();
        this.dropOffAnimation.play();

        setTimeout(() => {
            this.dropOffAnimation.stop();
            this.idleAnimation.play();
        }, this.dropOffAnimation._clip.duration * time);
    };

    playVictoryAnimation (time){
        /**
         * Pick up animations necessary
         */

        this.idleAnimation.stop();
        this.victoryAnimation.play();

        setTimeout(() => {
            this.victoryAnimation.stop();
            this.idleAnimation.play();
        }, this.victoryAnimation._clip.duration * time);
    };
    
    playBumpAnimation (time){
        /**
         * Pick up animations necessary
         */

        this.idleAnimation.stop();
        this.bumpAnimation.play();

        setTimeout(() => {
            this.bumpAnimation.stop();
            this.idleAnimation.play();
        }, this.bumpAnimation._clip.duration * time);
    };

    async pickUpPiece(){
        /**
         * Pick up the piece of the current drone positionSquare
         */

        // Find the piece that is at the square of the drone
        let piece;
        for (let key in pieces) {
            for (let j = 0; j < pieces[key].length; j ++){
                if (pieces[key][j].positionSquare == this.positionSquare){
                    piece = pieces[key][j];
                    break;
                }
            }
        }

        if (piece == undefined) return;

        // Move down to the piece height
        let moveDownDist = this.body.position.y - piece.height;
        await this.moveDown(moveDownDist);

        this.carryingPiece = piece;

        // The pick up 
        view.s3d.playSound(pickUpSound, 100, false); // Sound
        this.playPickUpAnimation(pickUpTime);
        await sleep(pickUpTime);

        // Move up to original position
        await this.moveUp(moveDownDist);
    }

    async dropPiece(){
        /**
         * Drop the piece
         */

        await this.moveDown(this.body.position.y - (this.carryingPiece.height + 0.25));

        view.s3d.playSound(pickUpSound, 100, false); // Sound
        this.playDropOffAnimation(pickUpTime);
        await sleep(pickUpTime);

        this.carryingPiece.positionSquare = this.positionSquare;
        this.carryingPiece = undefined;
        await sleep(1000);
    }

    moveCameraToDronePos(){
        /**
         * Switch camera position to this drone
         */

        switchCamera ("Drone", this);
    }

    moveDroneToOrigin (){
        /**
         * Move the drone back to origin position
         */

        if (this.id == 0){
            view.up({name: this.body.name, pos:this.originPosition});
            this.positionSquare = "h8";
        } else {
            view.up({name: this.body.name, pos:this.originPosition});
            this.positionSquare = "a1";
        }
    }

    updateDrone (dt){
        /**
         * All parts updating drone
         */

        this.animations.update(dt);
    }

    async movePieceTo (startSquareNotation, endSquareNotation){
        /**
         * Move piece from square to square, only allows valid moves.
         */

        // User validation: Are both valid spaces
        if (!allSquareNames.includes(startSquareNotation)){
            console.log("movePieceTo(): Start square is not valid input, recieved " + startSquareNotation);
            return;
        }

        if (!allSquareNames.includes(endSquareNotation)){
            console.log("movePieceTo(): End square is not valid input, recieved " + endSquareNotation);
            return;
        }

        // Make sure there is a piece at the start  
        let startSquareExists = false;
        for (let key in pieces) {
            for (let j = 0; j < pieces[key].length; j ++){
                if (startSquareExists) continue;
                if (pieces[key][j].positionSquare == startSquareNotation) startSquareExists = true;
            }
        }

        if (startSquareExists == false){
            console.log("movePieceTo(): No piece at start square " + startSquareNotation);
            return;
        }

        await this.moveToSquare(startSquareNotation);
        await this.pickUpPiece();
        await this.moveToSquare(endSquareNotation);
        await this.dropPiece();
    }

    changeSpriteText (text){
        /**
         * Chnage text to "text" and update the position as well, this.textSpriteChanged bypesses error.
         */

        this.textSprite.text = text;

        // Remove from view and add to view again
        if (this.textSpriteChanged == false)
            this.textSpriteChanged == true;
        else
            view.remove(this.body.name + "_sprite");

        this.textSprite.position.set(this.body.position.x, this.body.position.y + 5, this.body.position.z);
        view.getContent().add(this.textSprite);
        view.getContent().children[view.getContent().children.length-1].name = this.body.name + "_sprite";
    }

    generateParticles() {
        /**
         * Set the particel attribute on first trigger
         */
        this.particles = new ProjectileSystem().init({
            name: this.particleName,
            blending: THREE.AdditiveBlending,
            texture: "purple-energy",
            particleCount: 20,
            pos: [this.body.position.x, this.body.position.y + 3, this.body.position.z],
            particleLifeTime: 1,

            xSpread: 0.001,
            ySpread: 0.001,
            zSpread: 0.001, 

            particleSize: 0.25,
            particleRotation: 0.015,
            particleTransparency: 1,
            respawnConsistency: 0.75,
            parabolaSpread: [90,0],
            horizontalAngle: (200) * 180 / Math.PI,
            elavationAngle: 80,
            speed: 4,
        });
    };

    removeParticles(){
        /**
         * Adjust the addParticel attribute of the particle sytem, so that the particles stop generating at the source and aren't
         * comletely removed.
         */
        this.particles.addParticles = false;
    };

    confetti (){
        /**
         * This generated the drone particle which is set in a cone shape which is meant to be like confetti.
         */
        this.generateParticles();
        setTimeout(() => {
            this.removeParticles();
        }, 2000);
    }
}

function sleep(ms) {
    /**
     * Sleep using for animations time because move conveniant that indiv promises.
     */
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * ROBOTIFY TWEEN POSISIOTN HANDELLING
 */
function tweenPosition(object, to) {
    /**
     * Move the object object to the positon to of a period of time. In this case th time is set to visualDisplayDelay.
     * 
     * @param {Object} object - The piece that is moving position
     * @param {Array<Float>} to - A position array that indicates the position the object is to move to
     */
    positionTween = new TWEEN.Tween(object.body.position).to({x:to[0],y:to[1],z:to[2]}, visualDisplayDelay)
        .onUpdate(function (v) {
            view.up({
                name: object.body.name,
                pos:[v.x,v.y,v.z],
            });
        })
        .easing(TWEEN.Easing.Quartic.InOut)
        .start();

    object.positionSquare = object.originSquarePosition;
}