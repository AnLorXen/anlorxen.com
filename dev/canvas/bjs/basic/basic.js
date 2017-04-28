
/// <reference path="../_js/babylon_2.4a.js" />

var BasicScene = function () {
  "use strict";

  var
    canvas, engine, scene, camera, light, 
    sphere, ground;


  // *****************************
  // *****************************

  canvas = document.getElementsByClassName("cvScene")[0];

  engine = new BABYLON.Engine(canvas, true);
  scene = new BABYLON.Scene(engine);


  // *****************************
  // *****************************


  camera = new BABYLON.FreeCamera(
    "avatarCam1", new BABYLON.Vector3(0, 3, -15), scene
  );
  camera.keysUp = [38, 87]; // W
  camera.keysDown = [40, 83]; // S
  camera.keysRight = [39, 68]; // D
  camera.keysLeft = [37, 65]; // A
  camera.attachControl(canvas, true);

  //scene.debugLayer.show();

  // *****************************
  // *****************************


  light = new BABYLON.HemisphericLight(
    "light", new BABYLON.Vector3(0, 1, 0), scene
  );
  light.intensity = 0.65;

  // *****************************
  // *****************************

  sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    {
      "segments": 32,
      "diameterX": 3,
      "diameterY": 3,
      "diameterZ": 3,
      "updatable": false
    },
    scene);
  sphere.position.y = 1.5;

  // *****************************
  // *****************************

  ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    {
      "width": 7,
      "height": 7,
      "subdivisions": 1,
      "updatable": false
    },
    scene);


  // *****************************
  // *****************************


  engine.runRenderLoop(function () {
    scene.render();
  });


  // *****************************
  // *****************************


  window.addEventListener("resize", function () {
    engine.resize();
  }, false);

  window.addEventListener("keydown", function (_event) {
    if (_event.ctrlKey && _event.which === 70) { // Ctrl + F
      stMap.avatar.isGravityOn = !stMap.avatar.isGravityOn;
      _event.preventDefault();
    }
  }, false);
};

window.addEventListener("DOMContentLoaded", BasicScene, false);
