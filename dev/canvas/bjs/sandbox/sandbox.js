
/// <reference path="../../_js/babylon_2.4a.js" />

var Sandbox = function () {
  "use strict";

  var
    i, engine, scene,
    cfMap, docMap, stMap, 
    avatarCam, avatarLight, sunLight, 
    groundMat, ground, 
    surveyorMat, surveyors, 
    wallMat, walls, 
    sandMat, sand, sandpile,
    plantMat1, plant1, plantMat2, plant2, plantMat3, plant3, 
    boxMat, box,
    navSphereMat, navSphere, 
    updateAvatarInfo;


  engine = new BABYLON.Engine(
    document.getElementsByClassName("cvScene")[0], true
  );


  cfMap = {
    "ground": {
      "depth": 300,
      "width": 300
    },
    "textures": {

      "ground": {
        "sand1": {
          "path": "../_img/sand1.jpg",
          "height": 1024, "width": 1024
        },
        "sand2": {
          "path": "../_img/sand2.jpg",
          "height": 1024, "width": 1024
        }
      },

      "build": {
        "bricks": {
          "path": "../_img/brickwall_1024.jpg",
          "height": 1024, "width": 1024
        }
      },

      "plants": {
        "aghatis": {
          "path": "../_img/plants/AghatisDL.png",
          "scale": 0.005, 
          "height": 1087, "width": 529
        },
        "artocarpus1": {
          "path": "../_img/plants/ArtocarpusHeterophyllusL.png",
          "scale": 0.005, 
          "height": 1054, "width": 661
        },
        "artocarpus2": {
          "path": "../_img/plants/ArtocarpusHeterophyllus02L.png",
          "scale": 0.005, 
          "height": 920, "width": 700
        },

      },

      "tools": {
        "grid_meter": {
          "path": "../_img/grid1_1024.png",
          "height": 1024, "width": 1024
        },
        "grid_uv": {
          "path": "../_img/grid2_1024.png",
          "height": 1024, "width": 1024
        },
      }

    },
    "avatar": {
      "isGravityOn": true,
      "position": new BABYLON.Vector3(-5, 2.01, -24), 
      "rotation": new BABYLON.Vector3(0, 0.13, 0)
    }

  };

  docMap = {
    "cv": document.getElementsByClassName("cvScene")[0],
    "ctrls": document.getElementsByClassName("ctrls")[0],

    "avatarPosX": document.getElementById("ctrls-av-pos-x-text"), 
    "avatarPosY": document.getElementById("ctrls-av-pos-y-text"), 
    "avatarPosZ": document.getElementById("ctrls-av-pos-z-text"),
    "avatarSizeX": document.getElementById("ctrls-av-size-x-text"), 
    "avatarSizeY": document.getElementById("ctrls-av-size-y-text"),
    "avatarSizeZ": document.getElementById("ctrls-av-size-z-text"),
    "avatarRotX": document.getElementById("ctrls-av-rot-x-text"), 
    "avatarRotY": document.getElementById("ctrls-av-rot-y-text"),
    "avatarRotZ": document.getElementById("ctrls-av-rot-z-text")

  };

  stMap = {
    "isMenuVisible": false,

    "lights": {
      "isSunLightOn": true, 
      "isCameraLightOn": true
    },

    "avatar": {
      "isGravityOn": true
    },

    "objects": {
      "plant1": {
        "position": { "x": -7.00, "y": 0.00, "z": 0.00 },
        "rotation": { "x": 0.00, "y": 0.00, "z": 0.00 }
      },
      "plant2": {
        "position": { "x": 7.00, "y": 0.00, "z": 0.00 },
        "rotation": { "x": 0.00, "y": 0.00, "z": 0.00 }
      }, 
      "plant3": {
        "position": { "x": 15.00, "y": 0.00, "z": 5.00 },
        "rotation": { "x": 0.00, "y": 0.00, "z": 0.00 }
      }
    }
  };


  // *****************************
  // *****************************

  scene = new BABYLON.Scene(engine);

  scene.collisionsEnabled = true;
  scene.clearColor = BABYLON.Color3.Black();
  //scene.clearColor = new BABYLON.Color3(0.500, 0.596, 0.840);
  scene.clearColor = new BABYLON.Color3(0.200, 0.200, 0.450);
  scene.gravity = new BABYLON.Vector3(0, -1, 0); // (0, -9.81, 0)


  scene.registerBeforeRender(function () {
    avatarCam.applyGravity = stMap.avatar.isGravityOn;
  });


  // *****************************
  // *****************************


  avatarCam = new BABYLON.FreeCamera(
    "avatarCam1", new BABYLON.Vector3(0, 2, -0.5), scene
  );
  avatarCam.position = cfMap.avatar.position;
  avatarCam.rotation = cfMap.avatar.rotation;
  avatarCam.ellipsoid = new BABYLON.Vector3(1, 1, 1);
  avatarCam.applyGravity = stMap.avatar.isGravityOn;
  avatarCam.checkCollisions = true;
  avatarCam.keysUp = [38, 87]; // W
  avatarCam.keysDown = [40, 83]; // S
  avatarCam.keysRight = [39, 68]; // D
  avatarCam.keysLeft = [37, 65]; // A
  avatarCam.attachControl(docMap.cv, true);


  //scene.debugLayer.show();


  // *****************************
  // *****************************



  //avatarLight = new BABYLON.PointLight(
  //  "avatarLight", new BABYLON.Vector3(0, 0, 0), scene
  //);
  //avatarLight.parent = avatarCam;



  // *****************************
  // *****************************


  sunLight = new BABYLON.HemisphericLight(
    "sunLight", new BABYLON.Vector3(0, 1, 0), scene
  );
  


  // *****************************
  // *****************************


  groundMat = new BABYLON.StandardMaterial("groundMat1", scene);
  groundMat.diffuseTexture = new BABYLON.Texture(
    cfMap.textures.tools.grid_meter.path, scene
  );
  groundMat.diffuseTexture.uScale = cfMap.ground.width / 10;
  groundMat.diffuseTexture.vScale = cfMap.ground.depth / 10;
  groundMat.specularColor = BABYLON.Color3.Black();


  ground = BABYLON.Mesh.CreateGround(
    "ground1", cfMap.ground.width, cfMap.ground.depth, 1, scene
  );
  ground.checkCollisions = true;

  ground.material = groundMat;



  // *****************************
  // *****************************


  plantMat1 = new BABYLON.StandardMaterial("plantMat1", scene);
  plantMat1.diffuseTexture = new BABYLON.Texture(
    cfMap.textures.plants.aghatis.path, scene
  );
  plantMat1.diffuseTexture.hasAlpha = true;
  plantMat1.specularColor = BABYLON.Color3.Black();

  plant1 = BABYLON.MeshBuilder.CreatePlane(
    "plant1", {
      "height": cfMap.textures.plants.aghatis.height
        * cfMap.textures.plants.aghatis.scale,
      "width": cfMap.textures.plants.aghatis.width
        * cfMap.textures.plants.aghatis.scale
    }, scene);

  plant1.position = new BABYLON.Vector3(
    stMap.objects.plant1.position.x,
    (cfMap.textures.plants.aghatis.height / 2)
      * cfMap.textures.plants.aghatis.scale,
    stMap.objects.plant1.position.z
  ); 

  plant1.material = plantMat1;


  // *****************************
  // *****************************



  plantMat2 = new BABYLON.StandardMaterial("plantMat2", scene);
  plantMat2.diffuseTexture = new BABYLON.Texture(
    cfMap.textures.plants.artocarpus1.path, scene
  );
  plantMat2.diffuseTexture.hasAlpha = true;
  plantMat2.specularColor = BABYLON.Color3.Black();

  plant2 = BABYLON.MeshBuilder.CreatePlane(
    "plant2", {
      "height": cfMap.textures.plants.artocarpus1.height
        * cfMap.textures.plants.artocarpus1.scale,
      "width": cfMap.textures.plants.artocarpus1.width
        * cfMap.textures.plants.artocarpus1.scale
    }, scene);

  plant2.position = new BABYLON.Vector3(
    stMap.objects.plant2.position.x,
    (cfMap.textures.plants.artocarpus1.height / 2)
      * cfMap.textures.plants.artocarpus1.scale,
    stMap.objects.plant2.position.z
  ); 

  plant2.material = plantMat2;


  // *****************************
  // *****************************


  //plantMat3 = new BABYLON.StandardMaterial("plantMat3", scene);
  //plantMat3.diffuseTexture = new BABYLON.Texture(
  //  cfMap.textures.plants.artocarpus2.path, scene
  //);
  //plantMat3.diffuseTexture.hasAlpha = true;
  //plantMat3.specularColor = BABYLON.Color3.Black();

  //plant3 = BABYLON.MeshBuilder.CreatePlane(
  //  "plant3", {
  //    "height": cfMap.textures.plants.artocarpus2.height
  //      * cfMap.textures.plants.artocarpus2.scale,
  //    "width": cfMap.textures.plants.artocarpus2.width
  //      * cfMap.textures.plants.artocarpus2.scale
  //  }, scene);

  //plant3.position = new BABYLON.Vector3(
  //  stMap.objects.plant3.position.x,
  //  (cfMap.textures.plants.artocarpus2.height / 2)
  //    * cfMap.textures.plants.artocarpus2.scale,
  //  stMap.objects.plant3.position.z
  //); 

  //plant3.material = plantMat3;


  // *****************************
  // *****************************


  boxMat = new BABYLON.StandardMaterial("boxMat1", scene);
  boxMat.specularColor = BABYLON.Color3.Black();
  boxMat.diffuseTexture = new BABYLON.Texture(
    cfMap.textures.tools.grid_meter.path, scene
  );
  boxMat.diffuseTexture.uScale = 0.1;
  boxMat.diffuseTexture.vScale = 1;

  box = BABYLON.MeshBuilder.CreateBox(
    "box1", {
      "width": 1, 
      "height": 10, 
      "depth": 1
    }, scene);
  box.position.y = 5;

  box.material = boxMat;


  // *****************************
  // *****************************


  navSphereMat = new BABYLON.StandardMaterial("navSphereMat", scene);
  navSphereMat.diffuseTexture = new BABYLON.Texture(
    "../_img/HUDNav_Ball.png", scene
  );
  navSphereMat.diffuseTexture.uScale = -1;
  navSphereMat.diffuseTexture.vScale = -1;

  navSphere = BABYLON.MeshBuilder.CreateSphere(
    "navSphere",
    {
      "segments": 16,
      "diameter": 2,
      "updatable": false
    },
    scene
  );
  navSphere.position.x = -2.0;
  navSphere.position.y = 3.5;
  navSphere.position.z = 5.0;

  navSphere.material = navSphereMat;

  // *****************************
  // *****************************


  //surveyorMat = new BABYLON.StandardMaterial("surveyorMat1", scene);
  //surveyorMat.emissiveColor = BABYLON.Color3.White();


  //surveyors = [];
  //for (i = 0; i < 4; i += 1) {
  //  surveyors[i] = BABYLON.MeshBuilder.CreateCylinder(
  //    "surveyor" + i, {
  //      "height": 12,
  //      "diameter": 0.05
  //    }, scene
  //  );
  //  surveyors[i].material = surveyorMat;
  //}
  //surveyors[0].position = new BABYLON.Vector3(
  //  cfMap.ground.width / -2, 6, cfMap.ground.depth / 2
  //);
  //surveyors[1].position = new BABYLON.Vector3(
  //  cfMap.ground.width / 2, 6, cfMap.ground.depth / 2
  //);
  //surveyors[2].position = new BABYLON.Vector3(
  //  cfMap.ground.width / 2, 6, cfMap.ground.depth / -2
  //);
  //surveyors[3].position = new BABYLON.Vector3(
  //  cfMap.ground.width / -2, 6, cfMap.ground.depth / -2
  //);




  // *****************************
  // *****************************


  //wallMat = new BABYLON.StandardMaterial("wallMat1", scene);
  //wallMat.diffuseTexture = cfMap.textures.bricks;
  //wallMat.diffuseTexture.uScale = cfMap.ground.width / 10;
  //wallMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  //wallMat.specularColor = BABYLON.Color3.Black();
  
  //walls = [];
  //for (i = 0; i < 4; i += 1) {
  //  walls[i] = BABYLON.MeshBuilder.CreateBox(
  //    "wall" + i, {
  //      "width": cfMap.ground.width,
  //      "height": 10,
  //      "depth": 0.05
  //    }, scene
  //  );
  //  walls[i].material = wallMat;
  //  walls[i].checkCollisions = true;
  //}
  //walls[0].position = new BABYLON.Vector3(
  //  0, 5, cfMap.ground.depth / 2
  //);
  //walls[1].position = new BABYLON.Vector3(
  //  cfMap.ground.depth / 2, 5, 0
  //);
  //walls[2].position = new BABYLON.Vector3(
  //  0, 5, cfMap.ground.depth / -2
  //);
  //walls[3].position = new BABYLON.Vector3(
  //  cfMap.ground.depth / -2, 5, 0
  //);

  //walls[1].rotation = new BABYLON.Vector3(
  //  0, 1.570796, 0
  //);
  //walls[2].rotation = new BABYLON.Vector3(
  //  0, 3.141592, 0
  //);
  //walls[3].rotation = new BABYLON.Vector3(
  //  0, -1.570796, 0
  //);


  // *****************************
  // *****************************

  updateAvatarInfo = function () {
    docMap.avatarPosX.value = avatarCam.position.x.toFixed(5);
    docMap.avatarPosY.value = avatarCam.position.y.toFixed(5);
    docMap.avatarPosZ.value = avatarCam.position.z.toFixed(5);
    docMap.avatarSizeX.value = avatarCam.ellipsoid.x.toFixed(5);
    docMap.avatarSizeY.value = avatarCam.ellipsoid.y.toFixed(5);
    docMap.avatarSizeZ.value = avatarCam.ellipsoid.z.toFixed(5);
    docMap.avatarRotX.value = avatarCam.rotation.x.toFixed(5);
    docMap.avatarRotY.value = avatarCam.rotation.y.toFixed(5);
    docMap.avatarRotZ.value = avatarCam.rotation.z.toFixed(5);
  };


  // *****************************
  // *****************************


  engine.runRenderLoop(function () {
    scene.render();

    updateAvatarInfo();
    navSphere.rotation.y += 0.001;
  });


  window.addEventListener("resize", function () {
    engine.resize();
  }, false);

  window.addEventListener("keydown", function (_event) {
    if (_event.ctrlKey && _event.which === 70) { // Ctrl + F
      stMap.avatar.isGravityOn = !stMap.avatar.isGravityOn;
      _event.preventDefault();
    }
    if (_event.ctrlKey && _event.which === 77) { // Ctrl + M
      docMap.ctrls.toggleClassName("invisible");
    }
    if (_event.ctrlKey && _event.which === 76) { // Ctrl + L
      if (sunLight.intensity === 0) {
        sunLight.intensity = 1.0;
      } else {
        sunLight.intensity = 0.0;
      }      
      _event.preventDefault();
    }
  }, false);


  // *****************************
  // *****************************



  Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
  };

  Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
      this.className = [this.className, a].join(" ");
    }
  };

  Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
      var a = this.className;
      this.className =
        a.replace(new RegExp("(?:^|\\s+)"
        + b + "(?:\\s+|$)", "g"), " ");
    }
  };

  Element.prototype.toggleClassName = function (a) {
    this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
  };



};

window.addEventListener("DOMContentLoaded", Sandbox, false);
