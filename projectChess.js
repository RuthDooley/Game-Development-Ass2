let debug = false;
let envScale = 3.4;
let step = (20 / 9);

let whiteMaterial, blackMaterial;
async function demo() {

    view.moveCam({
        h: -30,
        v: 25,
        d: 35,
        target: [10, 0, 10]
    });

    view.set({
        filter: "default",
        fps: 60,
        substep: 2,
        gravity: [0, -9.81, 0],
        fixed: true,
    });

    await view.loadQueue([
        //Files
        "projectChess/env.js",
        "projectChess/ChessPiece.js",
        "projectChess/Bishop.js",
        "projectChess/King.js",
        "projectChess/Knight.js",
        "projectChess/Pawn.js",
        "projectChess/Queen.js",
        "projectChess/Rook.js",
        "projectChess/Drone.js",
        "projectChess/Game.js",
        "projectChess/Gui.js",
        "projectChess/Controller.js",
        "projectChess/ProjectileSystem.js",
        "projectChess/Sound.js",

        //Roboduel
        "roboduel-hud.js",
        "roboduel-hud.css",

        //Glbs
        "axelPy/axelHub.glb",
        "projectChess/a.glb",
        "projectChess/b.glb",
        "projectChess/c.glb",
        "projectChess/d.glb",
        "projectChess/e.glb",
        "projectChess/f.glb",
        "projectChess/g.glb",
        "projectChess/h.glb",
        "projectChess/1.glb",
        "projectChess/2.glb",
        "projectChess/3.glb",
        "projectChess/4.glb",
        "projectChess/5.glb",
        "projectChess/6.glb",
        "projectChess/7.glb",
        "projectChess/8.glb",
        "projectChess/square.glb",
        "droneDeliveryGame/deliveryDrone.glb",
        "chess.glb",
    ], afterLoad);

    view.postUpdate = update;
    createGUI();
    controllerConnection();

    view.loadTextures('./assets/textures/chess.jpg', { flip:false, encoding:true });
    blackMaterial = view.addMaterial({
        name:'chess_black',
        color:0x343434,
        roughness: 0.4,
        metalness: 0.5,
        map:'chess',
    });

    whiteMaterial = view.addMaterial({
        name:'chess_white',
        color:0xcbad7b,
        roughness: 0.4,
        metalness: 0.5,
        map:'chess',
    });
};

let controller = {
    w: false,
    a: false,
    s: false,
    d: false,
    enter: false,
    b: false,
};
function update(dt) {

    aiCoLearner.updateDrone(dt);
    mainAvatar.updateDrone(dt);

    if (aiCoLearner.carryingPiece != undefined) aiCoLearner.carryingPiece.movePieceView ([aiCoLearner.body.position.x, aiCoLearner.body.position.y - 1, aiCoLearner.body.position.z]);
    if (mainAvatar.carryingPiece != undefined) mainAvatar.carryingPiece.movePieceView ([mainAvatar.body.position.x, mainAvatar.body.position.y - 1, mainAvatar.body.position.z]);

    if (desktopVersion) controllerHandelling();

    for (let i = 0; i < particleHolder.length; i++) {
        particleHolder[i].update();
    }
}

async function afterLoad() {
    // add this in order for collisions and triggers to work
    view.addEventCallback();
    view.postUpdate = update;

    addEnvironment();
    loadSounds(); // SOund handelling

    // start game on play button click
    if (document.getElementById("runButton"))
        document.getElementById("runButton").addEventListener("click", playButtonClick);

    // Initialize the HUD elements of the game
    roboduelHud.init();

    // Attempt to remove the footer element from the roboduel HUD
    try {
        document.getElementsByClassName("hud__header-timer")[0].remove();
        document.getElementsByClassName("hud__footer-robot")[0].remove();
        document.getElementsByClassName("hud__footer-round")[0].remove();
        document.getElementsByClassName("hud__footer-health")[0].remove();
        document.getElementsByClassName("hud__header-team--red")[0].remove();
        document.getElementsByClassName("hud__header-team--blue")[0].remove();
    } catch (e) {
        console.log("cant edit roboduel hud");
    }
}

function playButtonClick() {

    if (language == "blockly") {
        // this should work but blocklyRunning is not being reset correctly
        if (blocklyRunning) {
            console.log("blockly running is true");
        }
        else {
            console.log("blockly running is false");
        }

        return;
    }

    // else is python

    if (skulpt_running) {
        console.log("skulpt running is true");
    }
    else {
        console.log("skulpt running is false");
        respawnRobot();
    }
}

/**
 * Numbering ssets: 
 * a - https://www.cgtrader.com/free-3d-models/various/various-models/font-002-a-small-letter
 * b - https://www.cgtrader.com/free-3d-models/various/various-models/font-004-latin-small-letter-b
 * c - https://www.cgtrader.com/free-3d-models/various/various-models/font-006-c-small
 * d - https://www.cgtrader.com/free-3d-models/various/various-models/font-008-d-small
 * e - https://www.cgtrader.com/free-3d-models/various/various-models/font-010-e-small 
 * f - https://www.cgtrader.com/free-3d-models/various/various-models/font-012-f-small
 * g - https://www.cgtrader.com/free-3d-models/various/various-models/font-014-g-small
 * h - https://www.cgtrader.com/free-3d-models/various/various-models/font-016-h-small
 * 
 * 1 - https://www.cgtrader.com/free-3d-models/various/various-models/font-054-number-1
 * 2 - https://www.cgtrader.com/free-3d-models/various/various-models/font-055-number-2
 * 3 - https://www.cgtrader.com/free-3d-models/various/various-models/font-056-number-3
 * 4 - https://www.cgtrader.com/free-3d-models/various/various-models/font-057-number-4
 * 5 - https://www.cgtrader.com/free-3d-models/various/various-models/font-058-number-5
 * 6 - https://www.cgtrader.com/free-3d-models/various/various-models/font-059-number-6
 * 7 - https://www.cgtrader.com/free-3d-models/various/various-models/font-060-number-7
 * 8 - https://www.cgtrader.com/free-3d-models/various/various-models/font-061-number-8
 * 
 * Square - https://www.thingiverse.com/thing:3346507 
 */