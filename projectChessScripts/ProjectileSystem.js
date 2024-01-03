// Vertex shader handelling
const VS = `
uniform float pointMultiplier;

attribute float size;
attribute float angle;
attribute vec4 colour;

varying vec2 vAngle;
varying vec4 vColour;

//varying vec3 v_Normal;
//void main() {
//  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//  v_Normal = normal;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;

  vColour = colour;

  vAngle = vec2(cos(angle), sin(angle));
}
`;

// Fragment shader handelling
const FS = `
uniform sampler2D diffuseTexture;

//varying vec3 v_Normal;
varying vec2 vAngle;
varying vec4 vColour;

void main() {
  //gl_FragColor = vec4(v_Normal, 1.0);
  //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
}
`;

let particleID = 0;
let particleHolder = [];
let uniforms;

// Remove from view entirely, by particle name
function removeParticleInstance( particleName ) {
    for ( let x = 0; x < view.getContent().children.length; x++ ) {
        if ( view.getContent().children[x].name == particleName) view.getContent().remove(view.getContent().children[x]);
    }
}

function ProjectileSystem() {}
ProjectileSystem.prototype.init = function( o ) {

    //Parabola variables
    if (o.elavationAngle === undefined) o.elavationAngle = 0; else o.elavationAngle = 90 - o.elavationAngle;

    this.addParticles = o.addParticles !== undefined ? o.addParticles : true;
    this.speed = o.speed;
    this.elavationAngle = o.elavationAngle;

    // Set up the texture for the particle emitter and the point multiplier
    if(view.isExport()){
        uniforms = {
            diffuseTexture: {
                value: new THREE.TextureLoader().load("https://robotify.s3.amazonaws.com/static/particleSystem/" + o.texture + ".png")
            },
            pointMultiplier: {
                value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
            }
        };
    }else {
        uniforms = {
            diffuseTexture: {
                value: new THREE.TextureLoader().load("./assets/textures/particles/" + o.texture + ".png")
            },
            pointMultiplier: {
                value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
            }
        };
    }

    // Create the shader material for the particle emitter
    this.material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: VS,
        fragmentShader: FS,
        blending: o.blending ?? THREE.NormalBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true
    });

    this.particles = [];

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.Float32BufferAttribute([], 3));
    this.geometry.setAttribute("size", new THREE.Float32BufferAttribute([], 1));
    this.geometry.setAttribute("angle", new THREE.Float32BufferAttribute([], 1));
    this.geometry.setAttribute("colour", new THREE.Float32BufferAttribute([], 4));


    this.points = new THREE.Points(this.geometry, this.material);
    this.points.name = o.name !== undefined ? o.name : "particle"+particleID++;

    // Add points to the scene
    view.getContent().add(this.points);

    this.addParticles = () => {

        for ( let i = 0; i < o.particleCount; i++ ) {     // 5 particles created when called
            const life = (Math.random() * 0.75 + 0.25) * o.particleLifeTime; //particle lifetime

            let xPos, yPos, zPos;

            if ( o.pos[0] == 0) xPos = Math.random() < 0.5 ? -(Math.random() * o.xSpread) + o.pos[0] : (Math.random() * o.xSpread) + o.pos[0];
            else xPos = Math.random() < 0.5 ? -(Math.random() * o.xSpread) * o.pos[0] : (Math.random() * o.xSpread) * o.pos[0];

            if ( o.pos[1] == 0) yPos = Math.random() < 0.5 ? -(Math.random() * o.ySpread) + o.pos[1] : (Math.random() * o.ySpread) + o.pos[1];
            else yPos = Math.random() < 0.5 ? -(Math.random() * o.ySpread) * o.pos[0] : (Math.random() * o.ySpread) * o.pos[0];

            if ( o.pos[2] == 0 ) zPos = Math.random() < 0.5 ? -(Math.random() * o.zSpread) + o.pos[2] : (Math.random() * o.zSpread) + o.pos[2];
            else zPos = Math.random() < 0.5 ? -(Math.random() * o.zSpread) * o.pos[0] : (Math.random() * o.zSpread) * o.pos[0];

            this.particles.push({
                position: new THREE.Vector3(
                    xPos+o.pos[0],
                    yPos+o.pos[1],
                    zPos+o.pos[2],
                ),

                size: (Math.random() * 0.5 + 0.5) * o.particleSize,
                rotation: Math.random() * 2.0 * Math.PI,
                colour: new THREE.Color(), 
                alpha: o.particleTransparency, 
                life: life, 

                // Parabola attributes
                originalPos: new THREE.Vector3(
                    xPos+o.pos[0],
                    yPos+o.pos[1],
                    zPos+o.pos[2],
                ),

                velocity: new THREE.Vector3(
                    o.speed * Math.sin(o.elavationAngle * (Math.PI/180)) * Math.cos(o.horizontalAngle * (Math.PI/180) + (Math.random() * o.parabolaSpread[0])),
                    o.speed * Math.cos(o.elavationAngle * (Math.PI/180)),
                    o.speed * Math.sin(o.elavationAngle * (Math.PI/180)) * Math.sin(o.horizontalAngle * (Math.PI/180) + (Math.random() * o.parabolaSpread[0])),
                ),

                time: 0,
            });
        }
    };

    this.updateGeometry = () => {
        const positions = [];
        const sizes = [];
        const angles = [];
        const colours = [];


        for ( let p of this.particles ) {
            positions.push(p.position.x, p.position.y, p.position.z);
            sizes.push(p.size);
            colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
            angles.push(p.rotation);
        }

        this.geometry.setAttribute(
            "position", new THREE.Float32BufferAttribute(positions, 3));

        this.geometry.setAttribute(
            "size", new THREE.Float32BufferAttribute(sizes, 1));

        this.geometry.setAttribute(
            "colour", new THREE.Float32BufferAttribute(colours, 4));

        this.geometry.setAttribute(
            "angle", new THREE.Float32BufferAttribute(angles, 1));


        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
        this.geometry.attributes.colour.needsUpdate = true;
        this.geometry.attributes.angle.needsUpdate = true;

    };

    this.updateParticles = () => {

        for ( let p of this.particles ) {
            p.life -= 0.01;

            if ( o.sizeFadeOut ) {
                p.size -= o.sizeFadeOut;
            }

            if ( o.sizeFadeIn ) {
                p.size += o.sizeFadeIn;
            }
        }

        this.particles = this.particles.filter( p => {
            return p.life > 0.0;
        });

        for( let p of this.particles ) {
            p.rotation +=  (Math.random() * o.particleRotation);
            p.time += 0.01; 
            p.position.x = p.originalPos.x + (p.velocity.x * p.time);
            p.position.y = p.originalPos.y + (p.velocity.y * p.time) - ((0.5) * (9.81) * (Math.pow(p.time, 2)));
            p.position.z = p.originalPos.z + (p.velocity.z * p.time);

            if (p.opacityFadeOut) 
                p.alpha = (p.particleLifeTime - p.life) / p.particleLifeTime;
        }

        this.particles.sort((a, b) => {
            const d1 = view.getCamera().position.distanceTo(a.position);
            const d2 = view.getCamera().position.distanceTo(b.position);

            if (d1 > d2) return -1;
            if (d1 < d2) return 1;
            return 0;
        });
    };

    this.addParticles();
    this.updateGeometry();

    particleHolder.push(this);

    this.update = () => {
        this.updateParticles();
        this.updateGeometry();

        if (Math.random() > o.respawnConsistency){
            if (this.addParticles) this.addParticles(); 
        }
    };

    return this;
};