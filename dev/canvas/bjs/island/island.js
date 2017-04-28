
/// <reference path="../../_js/babylon_2.4a.js" />


var Island = function () {
  "use strict";

  var
    cfMap, docMap, resize,
    engine, scene, camera, 
    sunLight, avatarLight,
    skybox, skyboxMat, 
    ground, groundMat, 
    waterMat, water,       
    surveyorMat, surveyors, i, 
    cubeMat, cube, 
      
    logCamera, changeTexture, 
    gridTxr, grid3Txr, sandTxr, terTxr, hmTxr;


  cfMap = {};

  docMap = {
    "cv": document.getElementsByClassName("cvTest")[0]
  };


  engine = new BABYLON.Engine(docMap.cv, true);

  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0, 0, 0);
  scene.gravity = new BABYLON.Vector3(0, -0.5, 0);
  scene.collisionsEnabled = true;
  scene.workerCollisions = false;

  scene.registerBeforeRender(function () {

  });

  //console.log(scene);


  // ********************
  // ********************

  gridTxr = new BABYLON.Texture("../_img/grid1_1024.png", scene);
  grid3Txr = new BABYLON.Texture("../_img/grid3_1024.png", scene);
  sandTxr = new BABYLON.Texture("../_img/sand2.jpg", scene);

  terTxr = new BABYLON.Texture("img/island-2048.jpg", scene);
  hmTxr = new BABYLON.Texture("img/island-height.jpg", scene);



  // ********************
  // ********************


  camera = new BABYLON.FreeCamera(
    "camera1", new BABYLON.Vector3(0, 0, 0), scene
  );
  camera.keysUp = [38, 87]; // W
  camera.keysDown = [40, 83]; // S
  camera.keysRight = [39, 68]; // D
  camera.keysLeft = [37, 65]; // A
  camera.ellipsoid = new BABYLON.Vector3(0.25, 0.5, 0.25);
  camera.speed = 5.0;
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.maxZ = 2500;
  camera.minZ = 1;
  camera.position = new BABYLON.Vector3(
    0.00000, 83.00000, 0.00000
  );
  camera.rotation = new BABYLON.Vector3(
    0.00000, 0.00000, 0.00000
  );


  scene.activeCamera.attachControl(docMap.cv);
  //console.log(camera);

  //scene.debugLayer.show();

  // ********************
  // ********************


  sunLight = new BABYLON.HemisphericLight(
    "sun_light", new BABYLON.Vector3(0, 1, 0), scene
  );
  //sunLight.intensity = 0.5;


  //avatarLight = new BABYLON.PointLight(
  //  "avatar_light", new BABYLON.Vector3(0, 15, 0), scene
  //);
  //avatarLight.intensity = 0.65;
  //avatarLight.parent = camera;


  // ********************
  // ********************

  skyboxMat = new BABYLON.StandardMaterial("skyboxMat", scene);
  //skyboxMat = new BABYLON.SkyMaterial("skyboxMat", scene);
  //skyboxMat.luminance = 0.3;


  skyboxMat.reflectionTexture =
    new BABYLON.CubeTexture("../_img/skybox/box01/skybox", scene);
  skyboxMat.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;

  skyboxMat.backFaceCulling = false;
  skyboxMat.disableLighting = true;



  skybox = BABYLON.Mesh.CreateBox("skyBox", 1250, scene);
  skybox.infiniteDistance = true;
  skybox.renderGroup = 0;

  skybox.material = skyboxMat;


  // ********************
  // ********************


  groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = terTxr;
  groundMat.diffuseTexture.uScale = 1.0;
  groundMat.diffuseTexture.vScale = 1.0;
  groundMat.backFaceCulling = false;
  groundMat.specularColor = new BABYLON.Color3(0, 0, 0);


  ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
    "ground",
    "img/island-height.jpg",
    {
      "width": 1250,
      "height": 1250,
      "subdivisions": 120,
      "minHeight": 0,
      "maxHeight": 60,
      "updatable": false,
      "onReady": function () {
        ground.material = groundMat;
      }
    },
    scene
  );
  ground.checkCollisions = true;
  ground.renderGroup = 1;


  // ********************
  // ********************


  waterMat = new BABYLON.WaterMaterial("waterMat", scene);
  waterMat.bumpTexture = new BABYLON.Texture(
    "img/bump.png", scene
  );
  //waterMat.bumpTexture.uScale = 1.0;
  //waterMat.bumpTexture.vScale = 1.0;

  waterMat.fresnelLevel = 0.75;
  waterMat.reflectionLevel = 0.95;
  waterMat.refractionLevel = 0.25;
  waterMat.waterColorLevel = 0.4;
  waterMat.waveHeight = 0.65;
  waterMat.waveLength = 0.8;
  waterMat.waterColor = {
    r: 0.5490196078431373,
    g: 0.5490196078431373,
    b: 0.7843137254901961
  };
  waterMat.waterDirection = {
    x: 0,
    y: 2
  };
  waterMat.windDirection = {
    x: 0,
    y: 0.2
  };


  water = BABYLON.MeshBuilder.CreateGround(
    "waterMesh", {
      "width": 1250,
      "height": 1250,
      "subdivisions": 1, 
      "updatable": false
    }, scene
  );
  water.material = waterMat;
  //water.renderGroup = 1;
  water.position.y = 0.05;

  waterMat.addToRenderList(ground);
  waterMat.addToRenderList(skybox);


  //water = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
  //  "water1",
  //  "img/hm/hm_h2o.jpg",
  //  {
  //    "width": 512,
  //    "height": 512,
  //    "subdivisions": 256,
  //    "minHeight": 0,
  //    "maxHeight": 255,
  //    "updatable": false,
  //    "onReady": function () {
  //      water.material = waterMat;
  //    }
  //  },
  //  scene
  //);
  //water.renderGroup = 1;

  //waterMat.addToRenderList(skybox);
  //waterMat.addToRenderList(ground);


  // ********************
  // ********************

  //cubeMat = new BABYLON.StandardMaterial("cubeMat", scene);
  //cubeMat.specularColor = BABYLON.Color3.White();
  //cubeMat.diffuseTexture = gridTxr;
  //cubeMat.diffuseTexture.hasAlpha = true;

  //cube = BABYLON.MeshBuilder.CreateBox(
  //  "meterCube", {
  //    "size": 1,
  //    "updatable": false
  //  }, scene
  //);
  //cube.material = cubeMat;
  //cube.renderGroup = 2;

  //cube.position = new BABYLON.Vector3(4.5, 81.5, -5.5);


  // ********************
  // ********************

  //surveyorMat = new BABYLON.StandardMaterial("surveyorMat1", scene);
  //surveyorMat.emissiveColor = BABYLON.Color3.White();
  //surveyorMat.diffuseColor = BABYLON.Color3.White();


  //surveyors = [];
  //for (i = 0; i < 2; i += 1) {
  //  surveyors[i] = BABYLON.MeshBuilder.CreateCylinder(
  //    "surveyor" + i, {
  //      "height": 10,
  //      "diameter": 0.05
  //    }, scene
  //  );
  //  surveyors[i].material = surveyorMat;
  //}
  //surveyors[0].position = new BABYLON.Vector3(
  //  0, 85.5, 0
  //);
  //surveyors[1].position = new BABYLON.Vector3(
  //  12, 85.5, -8
  //);
  //surveyors[2].position = new BABYLON.Vector3(
  //  cfMap.ground.width / 2, 6, cfMap.ground.depth / -2
  //);
  //surveyors[3].position = new BABYLON.Vector3(
  //  cfMap.ground.width / -2, 6, cfMap.ground.depth / -2
  //);



  // ********************
  // ********************

  logCamera = function () {
    console.log(
      ">p>"
      + camera.position.x.toFixed(5) + ", "
      + camera.position.y.toFixed(5) + ", "
      + camera.position.z.toFixed(5) + "<<<"
      + ">r>"
      + camera.rotation.x.toFixed(5) + ", "
      + camera.rotation.y.toFixed(5) + ", "
      + camera.rotation.z.toFixed(5) + "<<<"
    );
  };

  changeTexture = function (_img) {
    if (_img === 1) {
      ground.material.diffuseTexture = gridTxr;
      groundMat.diffuseTexture.uScale = 51.2;
      groundMat.diffuseTexture.vScale = 51.2;
    }
    if (_img === 2) {
      ground.material.diffuseTexture = sandTxr;
      groundMat.diffuseTexture.uScale = 51.2;
      groundMat.diffuseTexture.vScale = 51.2;
    }
    if (_img === 3) {
      ground.material.diffuseTexture = hmTxr;
      groundMat.diffuseTexture.uScale = 1;
      groundMat.diffuseTexture.vScale = 1;
    }
    if (_img === 4) {
      ground.material.diffuseTexture = terTxr;
      groundMat.diffuseTexture.uScale = 1;
      groundMat.diffuseTexture.vScale = 1;
    }
  };


  // ********************
  // ********************


  engine.runRenderLoop(function () {
    scene.render();
  });


  window.addEventListener("keydown", function (_event) {

    if (_event.ctrlKey && _event.which === 49) { // Ctrl + 1
      changeTexture(1);
      _event.preventDefault();
    }
    if (_event.ctrlKey && _event.which === 50) { // Ctrl + 2
      changeTexture(2);
      _event.preventDefault();
    }
    if (_event.ctrlKey && _event.which === 51) { // Ctrl + 2
      changeTexture(3);
      _event.preventDefault();
    }
    if (_event.ctrlKey && _event.which === 52) { // Ctrl + 4
      changeTexture(4);
      _event.preventDefault();
    }

    if (_event.ctrlKey && _event.which === 67) { // Ctrl + C
      logCamera();
      _event.preventDefault();
    }
    if (_event.ctrlKey && _event.which === 70) { // Ctrl + F
      camera.applyGravity = !camera.applyGravity;
      _event.preventDefault();
    }
  }, false);



  window.addEventListener("resize", function () {
    engine.resize();
  }, false);

};

window.addEventListener("DOMContentLoaded", Island, false);
