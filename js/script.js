
    console.log(" _ _ _ _ _ _ _____ _____ _ _ _ ____\n| | | | | | |   __|_   _| | | |    \\\n| | | | | | |__   | | | | | | |  |  |\n|_____|_____|_____| |_| |_____|____/")
                
    console.log("███╗   ███╗██╗███╗   ██╗██████╗ ███╗   ███╗ █████╗ ██████╗ \n████╗ ████║██║████╗  ██║██╔══██╗████╗ ████║██╔══██╗██╔══██╗\n██╔████╔██║██║██╔██╗ ██║██║  ██║██╔████╔██║███████║██████╔╝\n██║╚██╔╝██║██║██║╚██╗██║██║  ██║██║╚██╔╝██║██╔══██║██╔═══╝ \n██║ ╚═╝ ██║██║██║ ╚████║██████╔╝██║ ╚═╝ ██║██║  ██║██║     \n╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ")

    var version = "© 2021, WWSTWD Studio. All rights reserved";
    var fpsText;
    var isLocked = false;
    var canvas = document.getElementById("mainCanvas")
    var engine = new BABYLON.Engine(canvas, false, {doNotHandleContextLos: true});
    var floorNo = "Ground Floor"
    var camera;
    engine.enableOfflineSupport = false;
    var available = ['-dxt.ktx'];
    // engine.setTextureFormatToUse(available);

    // Menu Variables //

    var pieceDisplayed = false;
    var listData = [];

    // Mesh Loading Variables //

    var videoElements = [];
    var soundCreated = false;
    var rootMesh;
    var loadVideo = true;
    var readyToPlay = false;
    var noDrank = 0;
    var readyToRender = false;


    // if (screen.width <= 699) {

    //     document.getElementById("mobileSupport").style.display = "flex";
    //     setTimeout(function(){window.stop(); engine.dispose();}, 500)



    initialised = true;
    init()
    setTimeout(function(){readyToRender = true;},1000)



    var rotateArrow = mainOBJ.getElementById("mapDot").parentNode.createSVGTransform();
    rotateArrow.setRotate(0, 20, 25)
    mainOBJ.getElementById("mapDot").transform.baseVal.appendItem(rotateArrow);

    var translateArrow = mainOBJ.getElementById("mapDot").parentNode.createSVGTransform();    
    translateArrow.setTranslate(0, 0)
    mainOBJ.getElementById("mapDot").transform.baseVal.appendItem(translateArrow);

    var pieces = [];
    var pieceData;

    var scene;

    let xAddPos = 0;
        let yAddPos = 0;
        let xAddRot = 0;
        let yAddRot = 0;
        let sideJoystickOffset = 150;
        let bottomJoystickOffset = -50;
        let translateTransform;

    
    var pickable = [];
    var pickedUp;
    var pickedUpCameraDiff = new BABYLON.Vector3();

    function init(){

    console.log("Started loading")
    scene = new BABYLON.Scene(engine);




    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");

    fpsText = new BABYLON.GUI.TextBlock();
    fpsText.text = "0 fps";
    fpsText.color = "white";
    fpsText.fontSize = 16;
    fpsText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    fpsText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    fpsText.paddingTop = "10px";
    fpsText.paddingRight = "10px";

    advancedTexture.addControl(fpsText);

    var versionText = new BABYLON.GUI.TextBlock();
    versionText.text = version;
    versionText.color = "white"
    versionText.fontSize = 12;
    versionText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    versionText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    versionText.paddingRight = "10px";

    advancedTexture.addControl(versionText);

    var options = new BABYLON.SceneOptimizerOptions(30, 2000);

    options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));
    options.addOptimization(new BABYLON.TextureOptimization(0, 1024));
    options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1.5));
    options.addOptimization(new BABYLON.TextureOptimization(0, 512));
    options.addOptimization(new BABYLON.TextureOptimization(0, 256));

    var optimizer = new BABYLON.SceneOptimizer(scene, options);



    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
    light1.intensity = 1;
    camera = new BABYLON.UniversalCamera("FreeCamera", new BABYLON.Vector3(0,12,0), scene);
    camera.speed = 4;
    camera.inertia = 0.7;
    camera.setTarget(new BABYLON.Vector3(0,6,0));
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera._needMoveForGravity = true;
    camera.minZ = 0.01;
    


    scene.gravity = new BABYLON.Vector3(0, -0.75, 0);
    scene.shadowsEnabled = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(0.25,5,0.25);
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    camera.rotationQuaternion = new BABYLON.Quaternion();

    invisMat = new BABYLON.StandardMaterial("invisMat", scene);
    invisMat.alpha = 0;

    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 0.5;
    


    galleryMesh = BABYLON.SceneLoader.ImportMesh("", "models/", "MindMapTwo.glb", scene, function(meshes){

        meshes.forEach(function(item){

                

                    item.doNotSyncBoundingInfo = true;
                    item.alwaysSelectAsActiveMesh = true
                    item.checkCollisions = true;
                if(item.name.includes("Ramp") || item.name.includes("Barrier")){
                    item.material = invisMat;
                }else if(item.name.includes("Slope") || item.name.includes("DoorFrame")){
                    item.checkCollisions = false;
                } else if (item.name.includes("Coob")) {
                    pickable.push(item.name);
                    item.scaling.x = Math.abs(item.scaling.x)
                    item.scaling.y = Math.abs(item.scaling.y)
                    item.scaling.z = Math.abs(item.scaling.z)
                    item.position = new BABYLON.Vector3(0,0,0)
                }
            

            

        })

    });

    var left2load = setInterval(function(){
        document.getElementById("loadingText").innerHTML = "Items left " + scene.getWaitingItemsCount()
        if(scene.getWaitingItemsCount() === 0){
            clearInterval(left2load)
        }
    },500)




    scene.onPointerDown = function(evt){
        if(!isLocked){
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
            if(canvas.requestPointerLock){
                canvas.requestPointerLock();
                camera.attachControl(canvas);
                readyToPlay = true
            }
        }
    };

    pointerlockchange = function () {
        var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;
        
        if (!controlEnabled) {
            camera.detachControl(canvas);

            if(!pieceDisplayed && !shopDisplayed){
                loadPauseMenu();
            }

            setTimeout(function(){isLocked = false;},200);
            document.getElementById("menu").style.display = "";
            document.getElementById("helpText").innerHTML = "Click anywhere to close";
        } else {
            pieceDisplayed = false;
            shopDisplayed = false;
            camera.attachControl(canvas);
            setTimeout(function(){isLocked = true;},200);
            document.getElementById("menu").style.display = "none";
            document.getElementById("helpText").innerHTML = "Press ESC to bring up the map";

        }
    };

    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    crouching = false;

    document.addEventListener("keydown", function(evnt){
        if(isLocked){
            if(evnt.code === "KeyR"){
                camera.position = new BABYLON.Vector3(0,10,0);
                camera.setTarget = new BABYLON.Vector3(0,10,0);
                camera.rotation.x = 0;
                camera.rotation.y = 7;
            }

            if(evnt.code === "ShiftLeft"){
                camera.speed = 8;
            }

            if(evnt.code === "ControlLeft" && !crouching){
                camera.ellipsoid = new BABYLON.Vector3(0.25,2.5,0.25);
                crouching = true;
            } else if (evnt.code === "ControlLeft" && crouching) {
                crouching = false;
                camera.position.y += 4;
                camera.ellipsoid = new BABYLON.Vector3(0.25,5,0.25);
            }
            
        }
    });

    document.addEventListener("keyup", function(evnt){
        if(isLocked){
            if(evnt.code === "LeftShift"){
                camera.speed = 4;
            }
        }
    });



    window.addEventListener("click", function (e) {
        if(isLocked){
            var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);

            if (e.which == 3 && pickResult.hit && pickable.includes(pickResult.pickedMesh.name) && !pickedUp) {
                console.log("Picked!")
                pickedUp = pickResult.pickedMesh;
                pickedUpCameraDiff = camera.position.subtract(pickedUp.position);
            } else if (e.which == 3 && pickResult.hit && pickable.includes(pickResult.pickedMesh.name)) {
                console.log("Dropped!")
                pickedUp = null;
                pickedUpCameraDiff = new BABYLON.Vector3();
            }

        }

    });


    var distFromCam = 8;
    
    scene.registerBeforeRender(function(){
        translateTransform = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(xAddPos/3000, 0, yAddPos/3000), BABYLON.Matrix.RotationY(camera.rotation.y));
        camera.cameraDirection.addInPlace(translateTransform);
        camera.cameraRotation.y += xAddRot/15000*-1;
        camera.cameraRotation.x += yAddRot/15000*-1;

        if (pickedUp) {
            // pickedUp.position.x = -(camera.position.x - pickedUpCameraDiff.x)
            // pickedUp.position.y = (camera.position.y - pickedUpCameraDiff.y)
            // pickedUp.position.z = (camera.position.z - pickedUpCameraDiff.z)

            var cameraQuaternion = camera.rotationQuaternion.clone();
            var directionVector = new BABYLON.Vector3(0,0,distFromCam);
            var rotationVector = multiplyQuaternionByVector(cameraQuaternion, directionVector);

            pickedUp.position.set(-(camera.position.x + rotationVector.x), camera.position.y + rotationVector.y, camera.position.z + rotationVector.z);


        }
        

    }); 


    function multiplyQuaternionByVector(quaternion, vector){
        var target = new BABYLON.Vector3();

        var x = vector.x,
            y = vector.y,
            z = vector.z;
    
        var qx = quaternion.x,
            qy = quaternion.y,
            qz = quaternion.z,
            qw = quaternion.w;
    
        // q*v
        var ix =  qw * x + qy * z - qz * y,
        iy =  qw * y + qz * x - qx * z,
        iz =  qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;
    
        target.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        target.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        target.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    
        return target;


    };

    scene.executeWhenReady(function(){
        document.getElementById("loadingScreen").style.display = "none";
        console.log("Done Loading");
        // scene.freeActiveMeshes()
        scene.cleanCachedTextureBuffer();

        camera.position = new BABYLON.Vector3(0,8,0);
        camera.setTarget = new BABYLON.Vector3(0,6,0);
        camera.rotation.x = 0;
        camera.rotation.y = 7;

        setTimeout(function(){optimizer.start()}, 5000);

        readyToPlay = true

    });

    scene.autoClear = false;
    scene.autoClearDepthAndStencil = false;
    scene.blockMaterialDirtyMechanism = true;



    return scene;
    };


    function checkVisible(targetMesh){
        var ray = new BABYLON.Ray.CreateNewFromTo(camera.position, targetMesh.position)
        var picked = scene.pickWithRay(ray)
        if(picked.hit && picked.pickedMesh.name === targetMesh.name){
            return true
        }else{
            return false
        }
    }


    engine.runRenderLoop(function(){
        if(readyToRender){
            fpsText.text = engine.getFps().toFixed() + " fps";

            // var frustumPlanes = BABYLON.Frustum.GetPlanes(camera.getTransformationMatrix());
        
            
            scene.render();
        }
    });


    window.addEventListener("resize", function(){
        engine.resize();
    });


    function loadPauseMenu() {
        var title = document.getElementById("title");
        var name = document.getElementById("name");
        var about = document.getElementById("about");
        var mainOBJ = document.getElementById("mainOBJ");

        document.getElementById("container").style.height = "90vh";


        title.innerHTML = "Map";
        
        about.innerHTML = "The red dot is where you are now & the blue dots represent work on display on this floor"
        
        mainOBJ.style.display = "block"

        floorNo = checkFloor(camera);
        name.innerHTML = floorNo;
        
        posX = scene.cameras[0].position.x;
        posY = scene.cameras[0].position.z;

        newPoint = locToPoint(posX,posY)
        //mainOBJ.getElementById("mapDot").setAttribute("cx", newPoint.x)
        // mainOBJ.getElementById("mapDot").setAttribute("cy", newPoint.y)

        // Map Arrow //
        mainOBJ.getElementById("mapDot").transform.baseVal.getItem(0).setTranslate(newPoint.x-20, newPoint.y-25)
        mainOBJ.getElementById("mapDot").transform.baseVal.getItem(1).setRotate(Number(camera.rotation.y) * (180 / Math.PI), 20, 25)
        

        mainOBJ.getElementById("artworkDotHolder").innerHTML = "";

        listData.forEach(function(item, itemIndex){
            if(item[3].includes(floorNo)){
                document.getElementById(item[0]).getElementsByClassName("pieceFloor")[0].style.color = "green";
                item[5] = true;
                document.getElementById(item[0]).style.pointerEvents = "all";

                var artPosX = item[4].absolutePosition.x;
                var artPosY = item[4].absolutePosition.z;
                var artNewPoint = locToPoint(artPosX,artPosY)

                mainOBJ.getElementById("artworkDotHolder").innerHTML += '<circle id="artworkDot'+itemIndex+'" fill="#4287f5" cx="'+artNewPoint.x+'" cy="'+artNewPoint.y+'" r="15"/>'
            }else{
                document.getElementById(item[0]).getElementsByClassName("pieceFloor")[0].style.color = "grey";
                item[5] = false;
                document.getElementById(item[0]).style.pointerEvents = "none";
            }
        })
    }


    function locToPoint(oldValueX, oldValueY){
        oldMinX = -64.4;
        oldMaxX = 147.6;
        oldMinY = -116.5;
        oldMaxY = 96.1;
        
        newMinX = 2048;
        newMaxX = 0;
        newMinY = 0;
        newMaxY = 2048;

        newValues = {x:0, y:0}
        newValues.x = ((((oldValueX-oldMinX)*(newMaxX-newMinX))/(oldMaxX-oldMinX)+newMinX));
        newValues.y = ((((oldValueY-oldMinY)*(newMaxY-newMinY))/(oldMaxY-oldMinY)+newMinY));

        return newValues;
    }

    function checkFloor(object) {
        var heightPos = object.position.y;

        if(heightPos<16){
            document.getElementById("floor0").style.display = "inline";
            document.getElementById("floor1").style.display = "none";
            document.getElementById("floor2").style.display = "none";
            document.getElementById("floor3").style.display = "none";
            return "Ground Floor";
        }else if(heightPos>16 && heightPos<33){
            document.getElementById("floor0").style.display = "none";
            document.getElementById("floor1").style.display = "inline";
            document.getElementById("floor2").style.display = "none";
            document.getElementById("floor3").style.display = "none";
            return "First Floor";
        }else if(heightPos>33 && heightPos<51){
            document.getElementById("floor0").style.display = "none";
            document.getElementById("floor1").style.display = "none";
            document.getElementById("floor2").style.display = "inline";
            document.getElementById("floor3").style.display = "none";
            return "Second Floor";
        }else if(heightPos>51 && heightPos<68){
            document.getElementById("floor0").style.display = "none";
            document.getElementById("floor1").style.display = "none";
            document.getElementById("floor2").style.display = "none";
            document.getElementById("floor3").style.display = "inline";
            return "Third Floor";
        }

    }


