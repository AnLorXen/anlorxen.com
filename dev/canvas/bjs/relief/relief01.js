
/// <reference path="../_js/babylon_2.4a.js" />


var Relief01 = function () {
  "use strict";

  var
    docMap, resize,
    engine, scene, camera, limitCamera, 
    sunLight, avatarLight,
    skybox, skyboxMat, 
    ground, groundMat, 
    board, boardMat, boardUV, boardTexture, boardFace;

  docMap = {
    "cv": document.getElementsByClassName("cvMain")[0]
  };


  engine = new BABYLON.Engine(docMap.cv, true);


  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0, 0, 0);


  // ********************
  // ********************


  camera = new BABYLON.FreeCamera(
    "camera1", new BABYLON.Vector3(0, 1, -5), scene
  );
  camera.keysUp = [38, 87]; // W
  camera.keysDown = [40, 83]; // S
  camera.keysRight = [39, 68]; // D
  camera.keysLeft = [37, 65]; // A
  camera.maxZ = 2500;
  camera.minZ = 1;
  camera.position.x = -177.48315;
  camera.position.y = 75.30744;
  camera.position.z = -13.21698;
  camera.rotation.x = 0.81639;
  camera.rotation.y = 0;
  camera.rotation.z = 0;


  scene.activeCamera.attachControl(docMap.cv);

  //scene.debugLayer.show();


  // ********************
  // ********************


  sunLight = new BABYLON.HemisphericLight(
    "sun_light", new BABYLON.Vector3(0, 0, 1.0472), scene
  );
  sunLight.intensity = 0.65;


  //avatarLight = new BABYLON.PointLight(
  //  "avatar_light", new BABYLON.Vector3(0, 1, 0), scene
  //);
  //avatarLight.intensity = 0.35;
  //avatarLight.parent = camera;


  // ********************
  // ********************


  groundMat = new BABYLON.StandardMaterial("groundMat1", scene);
  groundMat.diffuseTexture =
    new BABYLON.Texture("blue-marble-1024.jpg", scene);
  groundMat.backFaceCulling = false;
  groundMat.specularColor = new BABYLON.Color3(0, 0, 0);

  ground = BABYLON.Mesh.CreateGroundFromHeightMap(
    "ground1", "worldHeightMap.jpg",
    640, 320, 320, 0, 12, scene, false,
    function () {
      ground.material = groundMat;
    }
  );


  // ********************
  // ********************


  engine.runRenderLoop(function () {
    scene.render();

  });


  window.addEventListener("resize", function () {
    engine.resize();
  }, false);

};

window.addEventListener("DOMContentLoaded", Relief01, false);
