class Controller {
    constructor() {
        this.positionSquare = "a1";
        this.body = view.add({
            name: "controller",
            pos:[17.77777777777778, envheightMesh-0.35, 17.77777777777778],
            rot: [0,0,0],
            size: [1, 0.6, 1], 
            mesh: squareMesh, 
            meshScale: [1], 
            meshPos:[0, envheightMesh+0.36, 0]
        });

        //Change the piece property in view
        this.body.traverse((node) => {
            if (node.material){
                node.material = node.material.clone();
                node.material.color = new THREE.Color("#30c8ff");
            }
        });

        this.squareSelectionStart;
        this.squareSelectionEnd;
    }

    movePosition(squareName){
        /**
         * Move the controller to a specfic space on the ches board, unvalid square posiitons will not be accepted.
         */
        if (!allSquareNames.includes(squareName)) return; 

        view.remove (this.body.name);

        this.positionSquare = squareName;
        this.body = view.add({
            name: "controller",
            pos: [getCoordFromSquareNotation(squareName)[0],  envheightMesh-0.35, getCoordFromSquareNotation(squareName)[2]],
            rot: [0,0,0],
            size: [1, 0.6, 1], 
            mesh: squareMesh, 
            meshScale: [1], 
            meshPos:[0, envheightMesh + 0.36, 0]
        });

        //Change the piece property in view
        this.body.traverse((node) => {
            if (node.material){
                node.material = node.material.clone();
                node.material.color = new THREE.Color("#30c8ff");
            }
        });
    }
    
    moveUp (){
        /**
         * Move the controller up by one space, fom the perspective of white.
         */
        let posArray = splitSquareNotation(this.positionSquare);

        posArray[1] ++;
        this.movePosition(combineSquareNotation(posArray[0], posArray[1]));
    }

    moveDown(){
        /**
         * Move the controller down by one space, fom the perspective of white.
         */
        let posArray = splitSquareNotation(this.positionSquare);

        posArray[1] --;
        this.movePosition(combineSquareNotation(posArray[0], posArray[1]));
    }

    moveRight (){
        /**
         * Move the controller to the right by one space, fom the perspective of white.
         */
        let posArray = splitSquareNotation(this.positionSquare);

        let currentCharCode = posArray[0].charCodeAt(0);
        currentCharCode ++;

        this.movePosition(combineSquareNotation(String.fromCharCode(currentCharCode), posArray[1]));
    }

    moveLeft (){
        /**
         * Move the controller to the left by one space, fom the perspective of white.
         */
        let posArray = splitSquareNotation(this.positionSquare);

        let currentCharCode = posArray[0].charCodeAt(0);
        currentCharCode --;

        this.movePosition(combineSquareNotation(String.fromCharCode(currentCharCode), posArray[1]));
    }

    selectSquare (){
        /**
         * Select the square where the controller is position at currently. This is stored in the controller squareSelectionStart
         * attribute if is is empty. If the squareSelectionStart attribute is not undefind then move from squareSelectionStart square
         * to the controller current square.
         * 
         * If squareSelectionStart is not defined (ie. start square needs to be chosen) on a square will a piece on it will be 
         * allowed ot be chose by the user.
         */

        if (this.squareSelectionStart == undefined){
            if (isSquareOccupied(this.positionSquare))
                this.squareSelectionStart = this.positionSquare;
        } else {
            this.movePieceFromSquareToSquare (this.squareSelectionStart, this.positionSquare);
        }
    }

    clearSelectSquare (){
        /**
         * Clear the selection section i.e squareSelectionStart.
         */
        this.squareSelectionStart = undefined;
    }

    async movePieceFromSquareToSquare (startSquare, endSquare){
        /**
         * Move the piece on square startSquare to endSquare, if mainAvatarMove is == true then show the main avatar moving it.
         */
        if (mainAvatarMove) await mainAvatar.movePieceTo(startSquare, endSquare);
        movePieceInSquareNameToSquareName(startSquare, endSquare);
        this.clearSelectSquare();
    }
}

let upAxisValue, acrossAxisValue;
function controllerHandelling (){
    /**
     * Controller handelling, usingthe wasdeb if a gamepad is not defined, otherwise using the gamepad once the gamePadInit is 
     * complete as well as the actual myGamepad defined.
     */
    if (!gamePadInit){ // If the gamepad havent been defined yet
        if (view.input.keyComboCheck(["w"]) && controller.w == false) {
            gameController.moveUp();
            controller.w = true;
        }
        if (view.input.keyComboCheck(["w"]) == false && controller.w == true) controller.w = false;
    
        if (view.input.keyComboCheck(["a"]) && controller.a == false) {
            gameController.moveLeft();
            controller.a = true;
        }
        if (view.input.keyComboCheck(["a"]) == false && controller.a == true) controller.a = false;
    
        if (view.input.keyComboCheck(["s"]) && controller.s == false) {
            gameController.moveDown();
            controller.s = true;
        }
        if (view.input.keyComboCheck(["s"]) == false && controller.s == true) controller.s = false;
    
        if (view.input.keyComboCheck(["d"]) && controller.d == false) {
            gameController.moveRight();
            controller.d = true;
        }
        if (view.input.keyComboCheck(["d"]) == false && controller.d == true) controller.d = false;
    
        if (view.input.keyComboCheck(["e"]) && controller.enter == false) {
            gameController.selectSquare();
            controller.enter = true;
        }
        if (view.input.keyComboCheck(["e"]) == false && controller.enter == true) controller.enter = false;
    
        if (view.input.keyComboCheck(["b"]) && controller.b == false) {
            gameController.clearSelectSquare();
            controller.b = true;
        }
        if (view.input.keyComboCheck(["b"]) == false && controller.b == true) controller.b = false;
    } else if (myGamepad){ // Need to wait the two secs to get the gamepad defined
        upAxisValue = getAxisValue(1);
        acrossAxisValue = getAxisValue(0);

        if (upAxisValue < -0.25 && controller.w == false) {
            gameController.moveUp();
            controller.w = true;
        }

        if (upAxisValue > 0.25 && controller.s == false) {
            gameController.moveDown();
            controller.s = true;
        }

        if (upAxisValue >=  -0.25 && upAxisValue <= 0.25) {
            controller.w = false;
            controller.s = false;
        } // 0.25 to account for drift

        if (acrossAxisValue < -0.25 && controller.a == false) {
            gameController.moveLeft();
            controller.a = true;
        }

        if (acrossAxisValue > 0.25 && controller.d == false) {
            gameController.moveRight();
            controller.d = true;
        }
        if (acrossAxisValue >=  -0.25 && acrossAxisValue <= 0.25) {
            controller.a = false;
            controller.d = false;
        } // 0.25 to account for drift

        if (getButtonValue(1) && controller.enter == false) {
            gameController.selectSquare();
            controller.enter = true;
        }
        if (!getButtonValue(1) && controller.enter == true) controller.enter = false;

        if (getButtonValue(0)) {
            gameController.clearSelectSquare();
            controller.b = true;
        }
        if (!getButtonValue(0) && controller.b == true) controller.b = false;
    }
}

let gamePadInit = false;
let gamepadIndex = 1, myGamepad;
function controllerConnection (){
    /**
     * The controller init, this is triggered whena controller is connected to the device and a button is triggered on it.
     * This handeles the controller position update as well.
     */
    window.addEventListener("gamepadconnected", (event) => {
        gamePadInit = true;
        gamepadIndex = event.gamepad.index;
        console.log("Gamepad connected succesfully.");
    });

    setInterval(() => {
        try{
            if(gamepadIndex !== undefined) {
                myGamepad = navigator.getGamepads()[gamepadIndex];
            }
        }catch{
            console.log("controllerConnection(): No controller connected.");
        }  
    }, 100);
}

/**
 * ROBOTIFY SUPPORT GAME CONTROLLER FUNCTIONS
 */

// Get the number of the button pressed
function getButtonIndex(){
    // a --> 1
    // b --> 0
    return myGamepad.buttons.findIndex(e => e.pressed);
}

// Gets the axis of the stick
function getAxisIndex(){
    // Left and right --> 0
    // Up and down --> 1
    return myGamepad.axes.findIndex(e => e > 0.5 || e < -0.5);
}

// Get if button pressed
function getButtonValue(button){
    // Select = (button = 1) true 
    // Deselect = (button = 0) true 
    return myGamepad.buttons[button].pressed;
}

// Get the axis valud of the stick direction up down, or left right
function getAxisValue(axis){
    // Up --> (axis = 1) -1
    // Down --> (axis = 1) 1
    // Left --> (axis = 0) -1
    // Right --> (axis = 0) 1
    return myGamepad.axes[axis];
}
