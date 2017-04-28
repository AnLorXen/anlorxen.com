
/// <reference path="../../_js/babylon_2.4a.js" />

var Skybox01 = function () {
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

  scene.registerBeforeRender(function () {
    camera.position.y = ground.position.y + 10.0;
  });

  //scene.debugLayer.show();
  //console.log(scene);


  // ********************
  // ********************


  camera = new BABYLON.FreeCamera(
    "camera1", new BABYLON.Vector3(0, 1, -5), scene
  );
  //camera.applyGravity = true;
  //camera.checkCollisions = true;
  camera.rotation.x = 0;
  camera.rotation.y = 0;
  camera.rotation.x = -.15;
  camera.maxZ = 2500;
  camera.keysUp = [38, 87]; // W
  camera.keysDown = [40, 83]; // S
  camera.keysRight = [39, 68]; // D
  camera.keysLeft = [37, 65]; // A


  scene.activeCamera.attachControl(docMap.cv);
  //camera.attachControl(docMap.cv, true);
  //console.log(camera);


  // ********************
  // ********************


  sunLight = new BABYLON.HemisphericLight(
    "sun_light", new BABYLON.Vector3(0, 1, 0), scene
  );
  sunLight.intensity = 0.75;


  //avatarLight = new BABYLON.PointLight(
  //  "avatar_light", new BABYLON.Vector3(0, 15, 0), scene
  //);
  //avatarLight.intensity = 0.65;
  //avatarLight.parent = camera;


  // ********************
  // ********************

  skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
  skybox.renderGroup = 0;
  skybox.infiniteDistance = true;

  skyboxMat = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMat.backFaceCulling = false;
  skyboxMat.disableLighting = true;
  skyboxMat.reflectionTexture =
    new BABYLON.CubeTexture("../_img/skybox/box01/skybox", scene);
  skyboxMat.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;

  skybox.material = skyboxMat;


  // ********************
  // ********************


  ground = BABYLON.Mesh.CreateGround("ground1", 960, 960, 1, scene);
  ground.position.y = -2;

  groundMat = new BABYLON.StandardMaterial("groundMat1", scene);
  groundMat.diffuseTexture =
    new BABYLON.Texture("../_img/grass.jpg", scene);
  groundMat.backFaceCulling = false;
  groundMat.diffuseTexture.uScale = 24.0;
  groundMat.diffuseTexture.vScale = 24.0;
  groundMat.specularColor = new BABYLON.Color3(0, 0, 0);

  ground.material = groundMat;
  //console.log(ground);


  // ********************
  // ********************

  boardUV = [];
  for (var i = 0; i < 6; i += 1) {
    boardUV[i] = new BABYLON.Vector4(0, 0, 1, 0.5);
    //boardUV[i] = new BABYLON.Color4(0, 0, 0.5, 1);
  }
  boardUV[0] = new BABYLON.Vector4(1, 1, 0, 0.5);

  boardMat = new BABYLON.StandardMaterial("boardMat1", scene);
  boardMat.backFaceCulling = false;
  boardMat.alpha = 1.0;

  boardTexture = new BABYLON.Texture("img/cal_flag_wood.jpg", scene);
  boardMat.diffuseTexture = boardTexture;
  boardMat.diffuseTexture.hasAlpha = false;
  boardMat.specularColor = new BABYLON.Color3(0, 0, 0);

  //boardFace = new BABYLON.Texture("img/cal_flag.png", scene);
  //boardFace.diffuseTexture = boardTexture;
  //boardFace.diffuseTexture.hasAlpha = false;
  //boardFace.specularColor = new BABYLON.Color3(0, 0, 0);

  board = BABYLON.MeshBuilder.CreateBox("billboard", {
    height: 48,
    width: 64,
    depth: 0.5,
    faceUV: boardUV
  }, scene);

  board.renderGroup = 1;
  board.position.y = 24;
  board.position.z = 250;
  board.rotation.y = 2 * Math.PI / 3;

  board.material = boardMat;


  // ********************
  // ********************


  limitCamera = function () {
    console.log("limit function in place");
  };


  engine.runRenderLoop(function () {
    scene.render();

    board.rotation.y += 0.002;
  });


  window.addEventListener("resize", function () {
    engine.resize();
  }, false);

};

window.addEventListener("DOMContentLoaded", Skybox01, false);
