
var Spheremaker = function () {
  "use strict";

  var 
    cfMap, docMap, stateMap,
    initCtrls, initPage, resizeCanvas, bindEvents,
    buildSphere, animate, loadPreset, 
    updateBase, updateGradient, dec2hex;



  docMap = {
    "canvas": document.getElementById("canvas"),
    "ctx": document.getElementById("canvas").getContext("2d"),
    "panel": document.getElementById("panel"),

    "colorToggle": document.getElementById("panel-base-toggle"), 
    "baseR": document.getElementById("panel-base-r"), 
    "baseG": document.getElementById("panel-base-g"), 
    "baseB": document.getElementById("panel-base-b"), 
    "baseA": document.getElementById("panel-base-a"), 
    "baseSwatch": document.getElementById("panel-base-swatch"),
    "baseHex": document.getElementById("panel-base-hex"),
    "baseRgba": document.getElementById("panel-base-rgba"),

    "gradientToggle": document.getElementById("panel-gradient-toggle"), 
    "gradient1R": document.getElementById("panel-gradient1-r"),
    "gradient1G": document.getElementById("panel-gradient1-g"),
    "gradient1B": document.getElementById("panel-gradient1-b"),
    "gradient1A": document.getElementById("panel-gradient1-a"),
    "gradient1Swatch": document.getElementById("panel-gradient1-swatch"),
    "gradient1Hex": document.getElementById("panel-gradient1-hex"),
    "gradient1Rgba": document.getElementById("panel-gradient1-rgba"),

    "gradient2R": document.getElementById("panel-gradient2-r"),
    "gradient2G": document.getElementById("panel-gradient2-g"),
    "gradient2B": document.getElementById("panel-gradient2-b"),
    "gradient2A": document.getElementById("panel-gradient2-a"),
    "gradient2Swatch": document.getElementById("panel-gradient2-swatch"),
    "gradient2Hex": document.getElementById("panel-gradient2-hex"),
    "gradient2Rgba": document.getElementById("panel-gradient2-rgba"),

    "gradient3R": document.getElementById("panel-gradient3-r"),
    "gradient3G": document.getElementById("panel-gradient3-g"),
    "gradient3B": document.getElementById("panel-gradient3-b"),
    "gradient3A": document.getElementById("panel-gradient3-a"),
    "gradient3Swatch": document.getElementById("panel-gradient3-swatch"),
    "gradient3Hex": document.getElementById("panel-gradient3-hex"),
    "gradient3Rgba": document.getElementById("panel-gradient3-rgba"),

    "preset01": document.getElementById("panel-footer-btn-01"),
    "preset02": document.getElementById("panel-footer-btn-02"),
    "preset03": document.getElementById("panel-footer-btn-03"),
    "preset04": document.getElementById("panel-footer-btn-04"),
    "preset05": document.getElementById("panel-footer-btn-05")
  };

  cfMap = {
    "initialColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
    "initialGradient": {
      "stops": [
        { "r": 180, "g": 180, "b": 255, "a": 0.98 },
        { "r": 140, "g": 140, "b": 255, "a": 0.56 },
        { "r": 100, "g": 100, "b": 200, "a": 0.14 }
      ]
    },

    "presets": [
      {
        "name": "", 
        "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
        "gradient": {
          "stops": [
            { "r": 180, "g": 180, "b": 180, "a": 0.95 },
            { "r": 140, "g": 140, "b": 140, "a": 0.6 },
            { "r": 100, "g": 100, "b": 100, "a": 0.15 }
          ]
        }
      },
      {
        "name": "", 
        "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
        "gradient": {
          "stops": [
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 }
          ]
        }
      },
      {
        "name": "", 
        "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
        "gradient": {
          "stops": [
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 }
          ]
        }
      },
      {
        "name": "", 
        "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
        "gradient": {
          "stops": [
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 }
          ]
        }
      },
      {
        "name": "", 
        "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
        "gradient": {
          "stops": [
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 },
            { "r": 0, "g": 0, "b": 0, "a": 1 }
          ]
        }
      }
    ]
  };

  stateMap = {
    "sphere": null,
    "color": {
      "enabled": true, 
      "r": 0, "g": 0, "b": 0, "a": 1,
      "hex": "",
      "rgba": ""
    },
    "gradient": {
      "enabled": true,
      "stops": [
        { "r": 0, "g": 0, "b": 0, "a": 1, "hex": "", "rgba": "" },
        { "r": 0, "g": 0, "b": 0, "a": 1, "hex": "", "rgba": "" },
        { "r": 0, "g": 0, "b": 0, "a": 1, "hex": "", "rgba": "" }
      ]
    }, 
    "mouse": { "x": 0, "y": 0, "event": null }
  };



  buildSphere = function () {
    stateMap.sphere = new Sphere({
      "posX": 600, 
      "posY": 280, 
      "posZ": 0,
      "radius": 150,
      "color": {
        "r": stateMap.color.r, 
        "g": stateMap.color.g, 
        "b": stateMap.color.b, 
        "a": stateMap.color.a
      },
    });    
  };

  animate = function () {
    docMap.ctx.clearRect(
      0, 0, docMap.ctx.canvas.width, docMap.ctx.canvas.height
    );
    stateMap.sphere.setColor(
      stateMap.color.r, 
      stateMap.color.g, 
      stateMap.color.b, 
      stateMap.color.a
    );

    stateMap.gradient.stops.forEach(function (_ele, _idx) {
      stateMap.sphere.setGradient(
        _idx, _ele.r, _ele.g, _ele.b, _ele.a
      );
    });

    stateMap.sphere.draw(docMap.ctx);
    requestAnimationFrame(animate);
  };

  updateBase = function () {
    stateMap.color.hex = "#"
      + dec2hex(stateMap.color.r)
      + dec2hex(stateMap.color.g)
      + dec2hex(stateMap.color.b);
    stateMap.color.rgba = "rgba("
      + stateMap.color.r + ", "
      + stateMap.color.g + ", "
      + stateMap.color.b + ", "
      + stateMap.color.a + ")";
    docMap.baseSwatch.style.backgroundColor = stateMap.color.rgba;
    docMap.baseHex.innerText = stateMap.color.hex;
    docMap.baseRgba.innerText = stateMap.color.rgba;
  };

  updateGradient = function (_stop) {
    stateMap.gradient.stops[_stop].hex = "#"
      + dec2hex(stateMap.gradient.stops[_stop].r)
      + dec2hex(stateMap.gradient.stops[_stop].g)
      + dec2hex(stateMap.gradient.stops[_stop].b);
    stateMap.gradient.stops[_stop].rgba = "rgba("
      + stateMap.gradient.stops[_stop].r + ", "
      + stateMap.gradient.stops[_stop].g + ", "
      + stateMap.gradient.stops[_stop].b + ", "
      + stateMap.gradient.stops[_stop].a + ")";
    docMap["gradient" + (_stop + 1) + "Swatch"].style.backgroundColor
      = stateMap.gradient.stops[_stop].rgba;
    docMap["gradient" + (_stop + 1) + "Hex"].innerText
      = stateMap.gradient.stops[_stop].hex;
    docMap["gradient" + (_stop + 1) + "Rgba"].innerText
      = stateMap.gradient.stops[_stop].rgba;
  };

  dec2hex = function (_d) {
    if ((+_d).toString(16).length === 1) {
      return "0" + (+_d).toString(16).toUpperCase();
    } else {
      return (+_d).toString(16).toUpperCase();
    }
  };

  loadPreset = function (_i) {
    docMap.baseR.value = stateMap.color.r = cfMap.presets[_i].color.r;
    docMap.baseG.value = stateMap.color.g = cfMap.presets[_i].color.g;
    docMap.baseB.value = stateMap.color.b = cfMap.presets[_i].color.b;
    docMap.baseA.value = stateMap.color.a = cfMap.presets[_i].color.a;
    updateBase();

    stateMap.gradient.stops.forEach(function (_ele, _idx) {
      _ele.r = docMap["gradient" + (_idx + 1) + "R"].value
        = cfMap.presets[_i].gradient.stops[_idx].r;
      _ele.g = docMap["gradient" + (_idx + 1) + "G"].value
        = cfMap.presets[_i].gradient.stops[_idx].g;
      _ele.b = docMap["gradient" + (_idx + 1) + "B"].value
        = cfMap.presets[_i].gradient.stops[_idx].b;
      _ele.a = docMap["gradient" + (_idx + 1) + "A"].value
        = cfMap.presets[_i].gradient.stops[_idx].a;
    });

    stateMap.gradient.stops.forEach(function (_ele, _idx) {
      updateGradient(_idx);
    });
  };

  resizeCanvas = function () {
    docMap.ctx.canvas.height = window.innerHeight;
    docMap.ctx.canvas.width = window.innerWidth;
  };

  initCtrls = function () {
    docMap.baseR.min = docMap.baseG.min = docMap.baseB.min = 0;
    docMap.baseR.max = docMap.baseG.max = docMap.baseB.max = 255;
    docMap.baseR.step = docMap.baseG.step = docMap.baseB.step = 1;
    docMap.baseA.min = 0;
    docMap.baseA.max = 1;
    docMap.baseA.step = 0.01;
    docMap.baseR.value = stateMap.color.r = cfMap.initialColor.r;
    docMap.baseG.value = stateMap.color.g = cfMap.initialColor.g;
    docMap.baseB.value = stateMap.color.b = cfMap.initialColor.b;
    docMap.baseA.value = stateMap.color.a = cfMap.initialColor.a;
    updateBase();

    cfMap.initialGradient.stops.forEach(function (_ele, _idx) {
      docMap["gradient" + (_idx + 1) + "R"].min
        = docMap["gradient" + (_idx + 1) + "G"].min
        = docMap["gradient" + (_idx + 1) + "B"].min = 0;
      docMap["gradient" + (_idx + 1) + "R"].max
        = docMap["gradient" + (_idx + 1) + "G"].max
        = docMap["gradient" + (_idx + 1) + "B"].max = 255;
      docMap["gradient" + (_idx + 1) + "R"].step
        = docMap["gradient" + (_idx + 1) + "G"].step
        = docMap["gradient" + (_idx + 1) + "B"].step = 1;
    });
    docMap.gradient1A.min
      = docMap.gradient2A.min
      = docMap.gradient3A.min = 0;
    docMap.gradient1A.max
      = docMap.gradient2A.max
      = docMap.gradient3A.max = 1;
    docMap.gradient1A.step
      = docMap.gradient2A.step
      = docMap.gradient3A.step = 0.01;
    cfMap.initialGradient.stops.forEach(function (_ele, _idx) {
      docMap["gradient" + (_idx + 1) + "R"].value
        = stateMap.gradient.stops[_idx].r = _ele.r;
      docMap["gradient" + (_idx + 1) + "G"].value
        = stateMap.gradient.stops[_idx].g = _ele.g;
      docMap["gradient" + (_idx + 1) + "B"].value
        = stateMap.gradient.stops[_idx].b = _ele.b;
      docMap["gradient" + (_idx + 1) + "A"].value
        = stateMap.gradient.stops[_idx].a = _ele.a;
    });
    cfMap.initialGradient.stops.forEach(function (_ele, _idx) {
      updateGradient(_idx);
    });
  };

  bindEvents = function () {
    window.addEventListener("resize", function () {
      resizeCanvas();
    });

    docMap.canvas.addEventListener("mousemove", function (_event) {
      //if (_event.pageX || _event.pageY) {
      //  stateMap.mouse.x = _event.pageX;
      //  stateMap.mouse.y = _event.pageY;
      //} else {
      //  stateMap.mouse.x = _event.clientX + document.body.scrollLeft
      //    + document.documentElement.scrollLeft;
      //  stateMap.mouse.y = _event.clientY + document.body.scrollTop
      //    + document.documentElement.scrollTop;
      //}
      //stateMap.mouse.x -= docMap.canvas.offsetLeft;
      //stateMap.mouse.y -= docMap.canvas.offsetTop;
      //stateMap.mouse.event = _event;
    });

    docMap.colorToggle.addEventListener("click", function () {
      stateMap.color.enabled = !stateMap.color.enabled;
      stateMap.sphere.enableColor(stateMap.color.enabled);
      if (stateMap.color.enabled) {
        docMap.colorToggle.style.backgroundColor = "#00F0F0";
      } else {
        docMap.colorToggle.style.backgroundColor = "#003030";
      }
    });

    docMap.gradientToggle.addEventListener("click", function () {
      stateMap.gradient.enabled = !stateMap.gradient.enabled;
      stateMap.sphere.enableGradient(stateMap.gradient.enabled);
      if (stateMap.gradient.enabled) {
        docMap.gradientToggle.style.backgroundColor = "#00F0F0";
      } else {
        docMap.gradientToggle.style.backgroundColor = "#003030";
      }
    });

    docMap.baseR.addEventListener("input", function () {
      stateMap.color.r = docMap.baseR.value;
      updateBase();
    });
    docMap.baseG.addEventListener("input", function () {
      stateMap.color.g = docMap.baseG.value;
      updateBase();
    });
    docMap.baseB.addEventListener("input", function () {
      stateMap.color.b = docMap.baseB.value;
      updateBase();
    });
    docMap.baseA.addEventListener("input", function () {
      stateMap.color.a = docMap.baseA.value;
      updateBase();
    });

    docMap.gradient1R.addEventListener("input", function () {
      stateMap.gradient.stops[0].r = docMap.gradient1R.value;
      updateGradient(0);
    });
    docMap.gradient1G.addEventListener("input", function () {
      stateMap.gradient.stops[0].g = docMap.gradient1G.value;
      updateGradient(0);
    });
    docMap.gradient1B.addEventListener("input", function () {
      stateMap.gradient.stops[0].b = docMap.gradient1B.value;
      updateGradient(0);
    });
    docMap.gradient1A.addEventListener("input", function () {
      stateMap.gradient.stops[0].a = docMap.gradient1A.value;
      updateGradient(0);
    });

    docMap.gradient2R.addEventListener("input", function () {
      stateMap.gradient.stops[1].r = docMap.gradient2R.value;
      updateGradient(1);
    });
    docMap.gradient2G.addEventListener("input", function () {
      stateMap.gradient.stops[1].g = docMap.gradient2G.value;
      updateGradient(1);
    });
    docMap.gradient2B.addEventListener("input", function () {
      stateMap.gradient.stops[1].b = docMap.gradient2B.value;
      updateGradient(1);
    });
    docMap.gradient2A.addEventListener("input", function () {
      stateMap.gradient.stops[1].a = docMap.gradient2A.value;
      updateGradient(1);
    });

    docMap.gradient3R.addEventListener("input", function () {
      stateMap.gradient.stops[2].r = docMap.gradient3R.value;
      updateGradient(2);
    });
    docMap.gradient3G.addEventListener("input", function () {
      stateMap.gradient.stops[2].g = docMap.gradient3G.value;
      updateGradient(2);
    });
    docMap.gradient3B.addEventListener("input", function () {
      stateMap.gradient.stops[2].b = docMap.gradient3B.value;
      updateGradient(2);
    });
    docMap.gradient3A.addEventListener("input", function () {
      stateMap.gradient.stops[2].a = docMap.gradient3A.value;
      updateGradient(2);
    });

    docMap.preset01.addEventListener("click", function () {
      loadPreset(0);
    });
    docMap.preset02.addEventListener("click", function () {
    });
    docMap.preset03.addEventListener("click", function () {
    });
    docMap.preset04.addEventListener("click", function () {
    });
    docMap.preset05.addEventListener("click", function () {
    });

    docMap.canvas.addEventListener("wheel", function (_event) {
      if (_event.deltaY < 0) {

      }
      if (_event.deltaY > 0) {

      }
    });

  };

  initPage = function () {
    initCtrls();
    bindEvents();
    resizeCanvas();

    buildSphere();
    animate();
  };

  initPage();

};

window.addEventListener("load", function () {
  Spheremaker();
}, false);







