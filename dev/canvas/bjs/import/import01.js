
/// <reference path="../../_js/babylon_2.4a.js" />

var Import01 = function () {
  "use strict";

  var
    docMap, resize, engine, scene, camera, manager, 
    sunLight, avatarLight,
    skybox, skyboxMat,
    taskGround_000, taskGround_001, taskBall, 
    ground_000, ground_001, 
    createGround, groundTiles, gdata, 
    createBalls, beachball, i, balls, ballCount, ballSize, bdata;

  docMap = {
    "cv": document.getElementsByClassName("cvTest")[0]
  };


  engine = new BABYLON.Engine(docMap.cv, true);
  engine.enableOfflineSupport = false;


  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0, 0, 0);


  // ********************
  // ********************


  manager = new BABYLON.AssetsManager(scene);

  taskGround_000 = manager.addMeshTask(
    "taskGround_000", "", "../_mod/", "ground_000.babylon"
  );
  taskGround_000.onSuccess = function (_task) {
    ground_000 = _task.loadedMeshes[0];
    ground_000.isVisible = false;
  };

  taskGround_001 = manager.addMeshTask(
    "taskGround_001", "", "../_mod/", "ground_001.babylon"
  );
  taskGround_001.onSuccess = function (_task) {
    ground_001 = _task.loadedMeshes[0];
    ground_001.isVisible = false;
  };

  taskBall = manager.addMeshTask(
    "taskBall", "", "../_mod/", "beachball_02.babylon"
  ); 
  taskBall.onSuccess = function (_task) {
    beachball = _task.loadedMeshes[0];
    beachball.isVisible = false;
  };


  manager.onFinish = function (_tasks) {

    createGround();
    createBalls();

    engine.runRenderLoop(function () {
      scene.render();

      if (balls.length) {
        balls.forEach(function (_ball, _idx) {
          balls[_idx].rotation.x += bdata[_idx].rot.x;
          balls[_idx].rotation.y += bdata[_idx].rot.y;
          balls[_idx].rotation.z += bdata[_idx].rot.z;
        });
      }

    })
  };

  manager.load();


  // ********************
  // ********************


  camera = new BABYLON.FreeCamera(
    "camera1", new BABYLON.Vector3(0, 5, -15), scene
  );
  //camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.keysUp = [38, 87]; // W
  camera.keysDown = [40, 83]; // S
  camera.keysRight = [39, 68]; // D
  camera.keysLeft = [37, 65]; // A


  camera.attachControl(docMap.cv, true);
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

  createGround = function () {
    groundTiles = [];

    for (i = 0; i < gdata.length; i += 1) {
      if (gdata[i].tile === "000") {
        //console.log(gdata[i].tile);
        groundTiles[i] = ground_000.createInstance("ground" + i);
      } else if (gdata[i].tile === "001") {
        //console.log(gdata[i].tile);
        groundTiles[i] = ground_001.createInstance("ground" + i);
      }
      groundTiles[i].position.x = gdata[i].pos.x;
      groundTiles[i].position.y = gdata[i].pos.y;
      groundTiles[i].position.z = gdata[i].pos.z;
      groundTiles[i].rotation.x = gdata[i].rot.x;
      groundTiles[i].rotation.y = gdata[i].rot.y;
      groundTiles[i].rotation.z = gdata[i].rot.z;
      groundTiles[i].checkCollisions = true;
    }

  };
  

  // ********************
  // ********************


  createBalls = function () {

    balls = [];

    bdata.forEach(function (_ball, _idx) {
      balls[_idx] = beachball.createInstance("ball" + _idx);

      //_ball.scaling = new BABYLON.Vector3(
      //  ballSize.x, ballSize.y, ballSize.z
      //);

      balls[_idx].position.x = bdata[_idx].pos.x;
      balls[_idx].position.y = bdata[_idx].pos.y;
      balls[_idx].position.z = bdata[_idx].pos.z;

      balls[_idx].rotation.x = bdata[_idx].rot.x;
      balls[_idx].rotation.y = bdata[_idx].rot.y;
      balls[_idx].rotation.z = bdata[_idx].rot.z;

      balls[_idx].scaling.x = bdata[_idx].size.x;
      balls[_idx].scaling.y = bdata[_idx].size.y;
      balls[_idx].scaling.z = bdata[_idx].size.z;

      //_ball.position.y = (ballSize.y * 2) * i + ballSize.y + 0.5;
      //_ball.custRotX = Math.random() / 100;
      //_ball.custRotY = Math.random() / 100;

    });

    //for (i = 0; i < bdata.length; i += 1) {
    //  balls[i] = beachball.createInstance("ball" + i);
    //  balls[i].scaling = new BABYLON.Vector3(
    //    ballSize.x, ballSize.y, ballSize.z
    //  );
    //  balls[i].position.y = (ballSize.y * 2) * i + ballSize.y + 0.5;
    //  balls[i].custRotX = Math.random() / 100;
    //  balls[i].custRotY = Math.random() / 100;
    //  balls[i].applyGravity = true;
    //  balls[i].checkCollisions = true;
    //}

  };


  // ********************
  // ********************


  window.addEventListener("resize", function () {
    engine.resize();
  }, false);

  window.addEventListener("keydown", function (_event) {
    if (_event.ctrlKey && _event.which === 70) { // F
      //stMap.avatar.isGravityOn = !stMap.avatar.isGravityOn;
      camera.applyGravity = !camera.applyGravity;
      _event.preventDefault();
    }
  }, false);


  // ********************
  // ********************
  		
  		

  gdata = [
    {
      "name": "00",
      "tile": "000", 
      "pos": { "x": -32.0000000, "y": 0.0000000, "z": 32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 },
    },
    {
      "name": "01", 
      "tile": "000", 
      "pos": { "x": -16.0000000, "y": 0.0000000, "z": 32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {		
      "name": "02", 
      "tile": "000", 
      "pos": { "x": 0.0000000, "y": 0.0000000, "z": 32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "03", 		
      "tile": "000", 
      "pos": { "x": 16.0000000, "y": 0.0000000, "z": 32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "04", 
      "tile": "000", 
      "pos": { "x": 32.0000000, "y": 0.0000000, "z": 32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },

// *********    		

    {
      "name": "05", 
      "tile": "000", 
      "pos": { "x": -32.0000000, "y": 0.0000000, "z": 16.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 },
    },
    {
      "name": "06", 
      "tile": "001", 
      "pos": { "x": -16.0000000, "y": 0.0000000, "z": 16.0000000 },
      "rot": { "x": 0.0000000, "y": 3.1415926, "z": 0.0000000 }
    },
    {		
      "name": "07", 
      "tile": "000", 
      "pos": { "x": 0.0000000, "y": 0.5000000, "z": 15.9843597 },
      "rot": { "x": 0.0625815, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "08", 		
      "tile": "001", 
      "pos": { "x": 16.0000000, "y": 0.0000000, "z": 16.0000000 },
      "rot": { "x": 0.0000000, "y": 4.7123889, "z": 0.0000000 }
    },
    {
      "name": "09", 
      "tile": "000", 
      "pos": { "x": 32.0000000, "y": 0.0000000, "z": 16.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },

// *********    		

    {
      "name": "10",
      "tile": "000", 
      "pos": { "x": -32.0000000, "y": 0.0000000, "z": 0.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 },
    },
    {
      "name": "11",
      "tile": "000", 
      "pos": { "x": -15.9843597, "y": 0.5000000, "z": 0.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0625815 }
    },
    {
      "name": "12",
      "tile": "000", 
      "pos": { "x": 0.0000000, "y": 1.0000000, "z": 0.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "13",
      "tile": "000", 
      "pos": { "x": 15.9843597, "y": 0.5000000, "z": 0.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": -0.0625815 }
    },
    {
      "name": "14",
      "tile": "000", 
      "pos": { "x": 32.0000000, "y": 0.0000000, "z": 0.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },

// *********    		

    {
      "name": "15",
      "tile": "000", 
      "pos": { "x": -32.0000000, "y": 0.0000000, "z": -16.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 },
    },
    {
      "name": "16",
      "tile": "001", 
      "pos": { "x": -16.0000000, "y": 0.0000000, "z": -16.0000000 },
      "rot": { "x": 0.0000000, "y": 1.5707963, "z": 0.0000000 }
    },
    {
      "name": "17",
      "tile": "000", 
      "pos": { "x": 0.0000000, "y": 0.5000000, "z": -15.9843597 },
      "rot": { "x": -0.0625815, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "18",
      "tile": "001", 
      "pos": { "x": 16.0000000, "y": 0.0000000, "z": -16.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "19",
      "tile": "000", 
      "pos": { "x": 32.0000000, "y": 0.0000000, "z": -16.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },

// *********    		

    {
      "name": "20",
      "tile": "000", 
      "pos": { "x": -32.0000000, "y": 0.0000000, "z": -32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 },
    },
    {
      "name": "21",
      "tile": "000", 
      "pos": { "x": -16.0000000, "y": 0.0000000, "z": -32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "22",
      "tile": "000", 
      "pos": { "x": 0.0000000, "y": 0.0000000, "z": -32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "23",
      "tile": "000", 
      "pos": { "x": 16.0000000, "y": 0.0000000, "z": -32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },
    {
      "name": "24",
      "tile": "000", 
      "pos": { "x": 32.0000000, "y": 0.0000000, "z": -32.0000000 },
      "rot": { "x": 0.0000000, "y": 0.0000000, "z": 0.0000000 }
    },


  ];


  // ********************
  // ********************

  bdata = [
    {
      "pos": {
        "x": 0,
        "y": 3.5,
        "z": 0
      },
      "rot": {
        "x": 0.0,
        "y": 0.02,
        "z": 0.0
      },
      "size": {
        "x": 1,
        "y": 1,
        "z": 1
      }
    }
  ];



};

window.addEventListener("DOMContentLoaded", Import01, false);
