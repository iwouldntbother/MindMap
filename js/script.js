// Global Variables

const canvas = document.getElementById("mainCanvas")

// Inital Setup

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    const box = BABYLON.MeshBuilder.CreateBox("box", {});

    return scene
}

