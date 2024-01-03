/**
 * Defining sound here. 
 */

let pickUpSound, droneSpeak;
async function loadSounds(){
    await view.loadQueue([
        "axelPy/SFX_Axel_Say_01.ogg",
        "axelPy/SFX_Axel_Arm_Movement.ogg",
    ],initializeSounds);
}

async function initializeSounds(){
    pickUpSound = view.s3d.loadSound("SFX_Axel_Arm_Movement", "axel");
    droneSpeak = view.s3d.loadSound("SFX_Axel_Say_01", "axel"); 
}