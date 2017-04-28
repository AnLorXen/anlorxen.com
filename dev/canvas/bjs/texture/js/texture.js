
/// <reference path="../../_js/babylon_2.4a.js" />

var Texture = function () {
  "use strict";

  var
    cfMap, docMap, resize,
    engine, scene, camera, light, i,
    skyboxMat, skyboxTexture, skybox, 
    groundMat, ground, displayRadius, 
    markerCount, markerRadius, markerMat, markers,
    sphereRadius, sphereMat, spheres, 
    waterMat;




  cfMap = {
    "spheres": [      
      {
        "name": "wireframe",
        "diameter": 5,
        "segments": 8, 
        "position": {
          "x": -18.4775729, 
          "y": 4.0, 
          "z": 7.6537116
        }, 
        "rotation": {
          "x": 0, 
          "y": 0, 
          "z": 0
        }, 
        "material": {
          "diffuseColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "emissiveColor": { "r": 0.50, "g": 0.60, "b": 0.60 },
          "specularColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "wireframe": true
        }
      }, 
      {
        "name": "standard",
        "diameter": 5,
        "segments": 16, 
        "position": {
          "x": -14.1421075,
          "y": 4.0, 
          "z": 14.1421638
        }, 
        "rotation": {
          "x": 0, 
          "y": 0, 
          "z": 0
        }, 
        "material": {
          "diffuseColor": { "r": 1.00, "g": 1.00, "b": 1.00 },
          "emissiveColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "specularColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "wireframe": false
        }
      }, 
      {
        "name": "diffuse",
        "diameter": 5,
        "segments": 16, 
        "position": {
          "x": -7.6536380,
          "y": 4.0, 
          "z": 18.4776033
        }, 
        "rotation": {
          "x": 0, 
          "y": 0, 
          "z": 0
        }, 
        "material": {
          "diffuseColor": { "r": 0.00, "g": 0.00, "b": 1.00 },
          "emissiveColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "specularColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "wireframe": false
        }
      }, 
      {
        "name": "specular",
        "diameter": 5,
        "segments": 16, 
        "position": {
          "x": 0.0000265,
          "y": 4.0, 
          "z": 20.0000000
        }, 
        "rotation": {
          "x": 0, 
          "y": 0, 
          "z": 0
        }, 
        "material": {
          "diffuseColor": { "r": 0.15, "g": 0.15, "b": 0.20 },
          "emissiveColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "specularColor": { "r": 0.00, "g": 0.00, "b": 1.00 },
          "wireframe": false
        }
      },
      {
        "name": "alpha",
        "diameter": 5,
        "segments": 16,
        "position": {
          "x": 7.6536870,
          "y": 4.0,
          "z": 18.4775830
        },
        "rotation": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "material": {
          "diffuseColor": { "r": 1.00, "g": 1.00, "b": 1.00 },
          "emissiveColor": { "r": 0.20, "g": 0.20, "b": 0.20 },
          "specularColor": { "r": 0.50, "g": 0.50, "b": 0.50 },
          "wireframe": false
        }
      },
      {
        "name": "texture",
        "diameter": 5,
        "segments": 16,
        "position": {
          "x": 14.1421450,
          "y": 4.0,
          "z": 14.1421262
        },
        "rotation": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "material": {
          "diffuseColor": { "r": 1.00, "g": 1.00, "b": 1.00 },
          "emissiveColor": { "r": 0.00, "g": 0.20, "b": 0.20 },
          "specularColor": { "r": 0.30, "g": 0.50, "b": 0.50 },
          "wireframe": false
        }
      },
      {
        "name": "normal",
        "diameter": 5,
        "segments": 16,
        "position": {
          "x": 18.4775932,
          "y": 4.0,
          "z": 7.6536625
        },
        "rotation": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "material": {
          "diffuseColor": { "r": 0.00, "g": 0.00, "b": 1.00 },
          "emissiveColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "specularColor": { "r": 0.00, "g": 0.00, "b": 1.00 },
          "wireframe": false
        }
      },
      {
        "name": "mirror",
        "diameter": 5,
        "segments": 16,
        "position": {
          "x": 20.000000,
          "y": 4.0,
          "z": 0.000000
        },
        "rotation": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "material": {
          "diffuseColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "emissiveColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "specularColor": { "r": 0.00, "g": 0.00, "b": 0.00 },
          "wireframe": false
        }
      }
    ]
  };



  docMap = {
    "cv": document.getElementsByClassName("cvMain")[0]
  };


  // *****************************
  // *****************************


  engine = new BABYLON.Engine(docMap.cv, true);

  scene = new BABYLON.Scene(engine);
  //scene.clearColor = new BABYLON.Color3(0.00, 0.00, 0.00);


  // *****************************
  // *****************************


  camera = new BABYLON.FreeCamera(
    "camera1", new BABYLON.Vector3(0, 1, 0), scene
  );
  camera.keysUp = [38, 87]; // W
  camera.keysDown = [40, 83]; // S
  camera.keysRight = [39, 68]; // D
  camera.keysLeft = [37, 65]; // A
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.position = new BABYLON.Vector3(-3.30, 2.01, -30.00);
  camera.rotation = new BABYLON.Vector3(-0.010427809, 0.147945665, 0.00);
  camera.attachControl(docMap.cv, true);


  // *****************************
  // *****************************


  light = new BABYLON.HemisphericLight(
    "light1", new BABYLON.Vector3(0, 1, 0), scene
  );
  light.intensity = 0.85;
  //light.specular = new BABYLON.Color3(0.0, 0.0, 0.0);


  // *****************************
  // *****************************


  skyboxMat = new BABYLON.StandardMaterial("skyboxMat", scene);
  skyboxTexture = new BABYLON.CubeTexture("../_img/skybox/box02/skybox", scene);
  skyboxMat.reflectionTexture = skyboxTexture;    
  skyboxMat.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;

  skyboxMat.backFaceCulling = false;
  skyboxMat.disableLighting = true;



  skybox = BABYLON.Mesh.CreateBox("skyBox", 500, scene);
  skybox.infiniteDistance = true;
  //skybox.renderGroup = 0;

  skybox.material = skyboxMat;


  // *****************************
  // *****************************


  groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = new BABYLON.Texture(
    "img/blue_marble.jpg",
    scene
  );
  groundMat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  groundMat.diffuseTexture.uScale = 10;
  groundMat.diffuseTexture.vScale = 10;


  ground = BABYLON.MeshBuilder.CreateGround(
    "ground1",
    {
      "height": 102.4,
      "width": 102.4,
      "subdivisions": 1,
      "updatable": false
    },
    scene
  );
  ground.checkCollisions = true;

  ground.material = groundMat;


  // *****************************
  // *****************************


  markerCount = 8;
  markerRadius = 20;

  markerMat = new BABYLON.StandardMaterial("markerMat", scene);
  markerMat.emissiveColor = new BABYLON.Color3(0.75, 0.75, 1.00);
  //markerMat.emissiveTexture =
  //  new BABYLON.Texture("../_img/grid1_1024.png", scene);
  //markerMat.emissiveTexture.uScale = 0.04;
  
  //markers = [];
  //for (i = 0; i < markerCount; i += 1) {
  //  markers[i] = BABYLON.MeshBuilder.CreateCylinder(
  //    "marker",
  //    {
  //      "height": 10,
  //      "diameter": 0.05,
  //      "updatable": false
  //    },
  //    scene
  //  );

  //  markers[i].material = markerMat;
  //  markers[i].position.x =
  //    Math.cos(3.14159 * i / markerCount) * markerRadius;
  //  markers[i].position.y = 5;
  //  markers[i].position.z =
  //    Math.sin(3.14159 * i / markerCount) * markerRadius;

  //  console.log(
  //    "x: " + (Math.cos(3.14159 * i / markerCount) * markerRadius).toFixed(7)
  //    + ", z: " + (Math.sin(3.14159 * i / markerCount) * markerRadius).toFixed(7)
  //  );

  //}


  

  // *****************************
  // *****************************


  spheres = [];
  cfMap.spheres.forEach(function (_sph, _idx) {
    spheres[_idx] = BABYLON.MeshBuilder.CreateSphere(
      _sph.name, 
      {
        "diameter": _sph.diameter,
        "segments": _sph.segments, 
        "updatable": false        
      },
      scene
    );

    spheres[_idx].position.x = _sph.position.x;
    spheres[_idx].position.y = _sph.position.y;
    spheres[_idx].position.z = _sph.position.z;

    spheres[_idx].material = new BABYLON.StandardMaterial(
      _sph.name + "Mat", scene
    );

    spheres[_idx].material.diffuseColor = new BABYLON.Color3(
      _sph.material.diffuseColor.r, 
      _sph.material.diffuseColor.g, 
      _sph.material.diffuseColor.b
    );
    spheres[_idx].material.emissiveColor = new BABYLON.Color3(
      _sph.material.emissiveColor.r,
      _sph.material.emissiveColor.g,
      _sph.material.emissiveColor.b
    );
    spheres[_idx].material.specularColor = new BABYLON.Color3(
      _sph.material.specularColor.r,
      _sph.material.specularColor.g,
      _sph.material.specularColor.b
    );

    spheres[_idx].material.wireframe = _sph.material.wireframe;

  });


  spheres[3].material.specularPower = 5;

  spheres[4].material.diffuseTexture
    = new BABYLON.Texture("img/grid.png", scene);
  spheres[4].material.diffuseTexture.hasAlpha = true;

  spheres[5].material.diffuseTexture
    = new BABYLON.Texture("img/water_1024.jpg", scene);
  spheres[5].material.bumpTexture = new BABYLON.Texture(
    "img/waterbump01.png", scene
  );
  spheres[5].material.diffuseTexture.uScale = 3;
  spheres[5].material.diffuseTexture.vScale = 1.5;
  spheres[5].material.bumpTexture.uScale = 8;
  spheres[5].material.bumpTexture.vScale = 3;

  spheres[6].material.bumpTexture
    = new BABYLON.Texture("img/drops_normal_512.jpg", scene);
  spheres[6].material.bumpTexture.uScale = 3;
  spheres[6].material.bumpTexture.vScale = 1.5;


  spheres[7].material = new BABYLON.PBRMaterial("pbr", scene);
  spheres[7].material.reflectionTexture = skyboxTexture;
  spheres[7].material.albedoColor
    = new BABYLON.Color3(0.2, 0.9, 1.0);
  spheres[7].material.reflectivityColor
    = new BABYLON.Color3(1.0, 1.0, 1.0);
  spheres[7].material.microSurface = 1.0;
  //spheres[7].material.usePhysicalLightFalloff = false;

  //spheres[7].material.reflectionTexture
  //  = new BABYLON.MirrorTexture("mirror", 512, scene, true);
  //spheres[7].material.reflectionTexture
  //  = new BABYLON.CubeTexture("img/box02/box02", scene);
  //spheres[7].material.reflectionTexture.renderList
  //  = [ground, spheres[6], spheres[5], spheres[4]];


  //spheres[0].material
  //  = new BABYLON.StandardMaterial("wireframeMat", scene);

  //sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
  //sphereMat.diffuseColor = BABYLON.Color3.White();
  //sphereMat.emissiveTexture =
  //  new BABYLON.Texture("../_img/grid1_1024.png", scene);
  //sphereMat.emissiveTexture.uScale = 0.04;
  
  //for (i = 0; i < cfMap.spheres.length; i += 1) {

  //  spheres[i] = BABYLON.MeshBuilder.CreateSphere(
  //    "sphere" + i,
  //    {
  //      "diameter": 5.0,
  //      "segments": 10, 
  //      "updatable": false
  //    },
  //    scene
  //  );

  //  console.log();

  //  spheres[i].position.x =
  //    Math.cos(3.14159 * i / cfMap.spheres.length) * displayRadius;
  //  spheres[i].position.y = 3;
  //  spheres[i].position.z =
  //    Math.sin(3.14159 * i / cfMap.spheres.length) * displayRadius;

  //}

  //spheres[7].material = new BABYLON.StandardMaterial("sphereMat", scene);
  //spheres[7].material.wireframe = true;


  //sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 8, scene);
  //sphere.position.x = -8;
  //sphere.position.y = 4.1;
  //sphere.rotation.x = 3.141592;

  //material1 = new BABYLON.StandardMaterial("mat1", scene);
  //material1.wireframe = true;
  //material1.emissiveTexture =
  //  new BABYLON.Texture("img/bluemarble-512.png", scene);


  // *****************************
  // *****************************




  //earth = BABYLON.Mesh.CreateSphere("sphere2", 32, 12, scene);
  //earth.position.x = 8;
  //earth.position.y = 6.2;
  //earth.rotation.x = 3.141592;


  //earthMaterial = new BABYLON.StandardMaterial("mat0", scene);
  //earthMaterial.bumpTexture = new BABYLON.Texture("img/earth_normal_8192.jpg", scene);
  //earthMaterial.diffuseTexture =
  //  new BABYLON.Texture("img/earth_8192.jpg", scene);



  //material2 = new BABYLON.StandardMaterial("mat2", scene);
  //material2.wireframe = false;
  //material2.diffuseTexture =
  //  new BABYLON.Texture("img/grass.jpg", scene);
  //material2.diffuseTexture.uScale = 8.0;
  //material2.diffuseTexture.vScale = 8.0;
  //material2.diffuseTexture.hasAlpha = false;


  //earth.material = earthMaterial;
  //sphere.material = material1;
  //ground.material = material2;


  engine.runRenderLoop(function () {
    scene.render();

    //earth.rotation.y -= 0.002;
    spheres[0].rotation.x += 0.0017;
    spheres[0].rotation.y -= 0.0025;
    spheres[4].rotation.y -= 0.0017;
    spheres[5].rotation.y -= 0.0017;
    spheres[5].material.diffuseTexture.uOffset -= 0.0005;
    spheres[5].material.diffuseTexture.vOffset += 0.0005;
    spheres[6].rotation.y -= 0.0017;
  });


  window.addEventListener("resize", function () {
    engine.resize();
  }, false);
  window.addEventListener("keydown", function (_event) {
    if (_event.ctrlKey && _event.which === 70) { // ctrl + F
      camera.applyGravity = !camera.applyGravity;
      _event.preventDefault();
    }
    if (_event.ctrlKey && _event.which === 71) { // ctrl + G
      console.log(camera.position, camera.rotation);
    }
  }, false);

};

window.addEventListener("DOMContentLoaded", Texture, false);
