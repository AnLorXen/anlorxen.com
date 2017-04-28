
var AnLorXen = function () {
  "use strict";

  var 
    cfMap, docMap, stateMap,
    initPage, resizeCanvas, bindEvents, handleTabSwap, 
    buildSpheres, spheres, color, rgba, i, element, 
    startAnim, stopAnim, runAnim, countFps, 
    initPanels, setRefresh, setPaletteSwatches, setColorShift;



  cfMap = {
    "count": 16,
    "friction": 0.85,
    "spring": 0.0275,

    "initialColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
    "initialGradient": {
      "stops": [
        { "r": 192, "g": 192, "b": 192, "a": 0.85 },
        { "r": 128, "g": 128, "b": 128, "a": 0.50 },
        { "r": 64, "g": 64, "b": 64, "a": 0.15 }
      ]
    }
  };

  docMap = {
    "canvas": document.getElementById("canvas"),
    "ctx": document.getElementById("canvas").getContext("2d"),
    "title": $("#title"),
    "titleItems": $("#title li"),
    "menu": $("#menu"), 
    "info": $("#info"),
    "infoTabs": $(".info-tabs li"), 
    "infoTab1": $("#info-tab-01"),
    "infoTab2": $("#info-tab-02"),
    "infoTab3": $("#info-tab-03"),
    "infoPanes": $(".info-pane"),

    "infoPane1": $("#info-pane-01"),
    "infoPane2": $("#info-pane-02"),
    "infoPane3": $("#info-pane-03"),

    "refreshBtns": $(".info-refresh-btn"),
    "refreshCat": $("#refresh-btn-cat"),
    "refreshOn": $("#refresh-btn-on"),
    "refreshOff": $("#refresh-btn-off"),

    "paletteSelect": $(".info-palette-select select")[0],
    "paletteSwatches": $(".info-palette-swatches"),    
    //"paletteSwatch": $(".info-palette-swatches .info-palette-swatch"),

    "infoFps": $("#info-status-fps")
  };

  stateMap = {
    "spheres": [],
    "refresh": true, 
    "animating": false, 
    "requestId": undefined,

    "fps": {
      "last": null,
      "now": 0,
      "delta": 0,
      "out": 0
    },

    "color": {
      "palette": 0,
      "swatchCount": 16
    },

    "mouse": AnLorXen.utility.mouse(docMap.canvas)
  };

  buildSpheres = function () {
    for (var i = 0; i < cfMap.count; i += 1) {
      stateMap.spheres.push(new Sphere({
        "posX": 450 - i * 30, 
        "posY": 85, 
        "posZ": 0,
        "radius": cfMap.count - i + 1
      }));

      stateMap.spheres.forEach(function (_sphere, _idx) {
        //_sphere.setColor(
        //  AnLorXen.palettes[0].colors[_idx].r,
        //  AnLorXen.palettes[0].colors[_idx].g,
        //  AnLorXen.palettes[0].colors[_idx].b,
        //  AnLorXen.palettes[0].colors[_idx].a
        //);
        cfMap.initialGradient.stops.forEach(function (_stop, _stopIdx) {
          _sphere.setGradient(_stopIdx, _stop.r, _stop.g, _stop.b, _stop.a);
        });
      });
    }
  };

  initPanels = function () {

    AnLorXen.palettes.forEach(function (_palette, _idx) {
      var opt = document.createElement("option");
      opt.text = _palette.name;
      opt.value = _idx;
      docMap.paletteSelect.add(opt, null);
    });
    docMap.paletteSelect.selectedIndex = stateMap.color.palette;

    for (i = 0; i < stateMap.color.swatchCount; i += 1) {
      element = document.createElement("div");
      element.classList.add("info-palette-swatch");
      element.id = "palette-swatch-" + i;
      docMap.paletteSwatches.append(element);
    }

    docMap.paletteSwatch = docMap.paletteSwatches.find(".info-palette-swatch");

    setPaletteSwatches();

  };

  setPaletteSwatches = function () {
    for (i = 0; i < docMap.paletteSwatch.length; i += 1) {
      rgba = "rgba("
        + AnLorXen.palettes[stateMap.color.palette].colors[i].r + ", "
        + AnLorXen.palettes[stateMap.color.palette].colors[i].g + ", "
        + AnLorXen.palettes[stateMap.color.palette].colors[i].b + ", "
        + AnLorXen.palettes[stateMap.color.palette].colors[i].a + ")";
      docMap.paletteSwatch[i].style.backgroundColor = rgba;
    }
  };

  setColorShift = function (_bool) {
    stateMap.color.shifting = _bool;
    if (_bool) {
      docMap.shiftCat.addClass("active");
      docMap.shiftBtns.addClass("active");
    } else {
      docMap.shiftCat.removeClass("active");
      docMap.shiftBtns.removeClass("active");
    }
  };

  startAnim = function () {
    if (!stateMap.requestId) {
      runAnim();
    }
  };
  stopAnim = function () {
    if (stateMap.requestId) {
      window.cancelAnimationFrame(stateMap.requestId);
      stateMap.requestId = undefined;
    }
    docMap.ctx.clearRect(
      0, 0, docMap.ctx.canvas.width, docMap.ctx.canvas.height
    );
    stateMap.spheres.forEach(function (_sphere, _index) {
      _sphere.setVel(0, 0, 0);
      _sphere.setPos(450 - _index * 30, 85, 0);
    });
    docMap.infoFps.html("00");
  };

  runAnim = function () {

    docMap.infoFps.html(countFps());

    if (stateMap.refresh) {
      docMap.ctx.clearRect(
        0, 0, docMap.ctx.canvas.width, docMap.ctx.canvas.height
      );
    }

    stateMap.spheres.forEach(function (_sphere, _index) {
      if (_index === 0) {

        //if (stateMap.color.shifting) {
        //  for (i = 0; i < stateMap.color.colorVel; i += 1) {
        //    color = AnLorXen.palettes[stateMap.color.palette].colors.shift();
        //    AnLorXen.palettes[stateMap.color.palette].colors.push(color);
        //  }
        //}

        _sphere.setVel(
          _sphere.velX() + (stateMap.mouse.x - _sphere.x()) * cfMap.spring, 
          _sphere.velY() + (stateMap.mouse.y - _sphere.y()) * cfMap.spring, 
          0);
      } else {
        _sphere.setVel(
          _sphere.velX() + (stateMap.spheres[_index - 1].x() - _sphere.x()) * cfMap.spring, 
          _sphere.velY() + (stateMap.spheres[_index - 1].y() - _sphere.y()) * cfMap.spring, 
          0);
        //_sphere.setPos(_sphere.x(), _sphere.y() + _index * 0.3, 0);
      }
      _sphere.setVel(
        _sphere.velX() * cfMap.friction,
        _sphere.velY() * cfMap.friction,
        0
      );

      _sphere.setColor(
        AnLorXen.palettes[stateMap.color.palette].colors[_index].r,
        AnLorXen.palettes[stateMap.color.palette].colors[_index].g,
        AnLorXen.palettes[stateMap.color.palette].colors[_index].b,
        AnLorXen.palettes[stateMap.color.palette].colors[_index].a
      );

      _sphere.move();
      _sphere.draw(docMap.ctx);
    });    

    stateMap.requestId = requestAnimationFrame(runAnim);
  };

  countFps = (function () {
    stateMap.fps.last = (new Date()).getMilliseconds();
    stateMap.fps.delta = 1;
    stateMap.fps.out = 0;

    return function () {
      stateMap.fps.now = (new Date()).getMilliseconds();
      if (stateMap.fps.last > stateMap.fps.now) {
        stateMap.fps.out = stateMap.fps.delta;
        stateMap.fps.delta = 1;
      } else {
        stateMap.fps.delta += 1;
      }
      stateMap.fps.last = stateMap.fps.now;
      return stateMap.fps.out;
    };
  })();

  handleTabSwap = function (_tab) {
    docMap.infoTabs.removeClass("activetab");
    docMap.infoPanes.removeClass("activepane");
    docMap["infoTab" + _tab].parent().addClass("activetab");
    docMap["infoPane" + _tab].addClass("activepane");
  };

  setRefresh = function (_bool) {
    stateMap.refresh = _bool;
    docMap.refreshBtns.removeClass("activebtn");
    if (_bool) {
      docMap.refreshOn.addClass("activebtn");
    } else {
      docMap.refreshOff.addClass("activebtn");
    }
  };

  resizeCanvas = function () {
    docMap.ctx.canvas.height = window.innerHeight;
    docMap.ctx.canvas.width = window.innerWidth;
  };


  bindEvents = function () {
    window.addEventListener("resize", function () {
      resizeCanvas();
    });

    window.addEventListener("keydown", function (_event) {
      if (_event.which === 65) { // A
        docMap.title.show(400);
        docMap.menu.show(400);
      }
      if (_event.which === 69) { // E

      }
      if (_event.which === 76) { // L

      }
      if (_event.which === 78) { // N
        docMap.info.toggle(400);
      }
      if (_event.which === 79) { // O

      }
      if (_event.which === 82) { // R
        setRefresh(!stateMap.refresh);
      }
      if (_event.which === 88) { // X
        docMap.title.hide();
        docMap.menu.hide();
        docMap.info.hide();
      }
    });

    docMap.titleItems.on("mouseover", function (_event) {
      $(this).fadeOut(1300, function () {
        $(this).fadeIn(800);
      });
    });

    docMap.canvas.addEventListener("dblclick", function () {
      if (stateMap.animating) {
        stopAnim();
      } else {
        startAnim();
      }
      stateMap.animating = !stateMap.animating;
    });

    docMap.canvas.addEventListener("wheel", function (_event) {
      if (_event.deltaY < 0) { // in
        color = AnLorXen.palettes[stateMap.color.palette].colors.shift();
        AnLorXen.palettes[stateMap.color.palette].colors.push(color);
        setPaletteSwatches();
      }
      if (_event.deltaY > 0) { // out
        color = AnLorXen.palettes[stateMap.color.palette].colors.pop();
        AnLorXen.palettes[stateMap.color.palette].colors.unshift(color);
        setPaletteSwatches();
      }
    });

    docMap.infoTab1.on("mousedown", function () {
      handleTabSwap(1);
    });
    docMap.infoTab2.on("mousedown", function () {
      handleTabSwap(2);
    });
    docMap.infoTab3.on("mousedown", function () {
      handleTabSwap(3);
    });

    docMap.refreshCat.on("mousedown", function () {
      setRefresh(!stateMap.refresh);
    });
    docMap.refreshOn.on("mousedown", function () {
      setRefresh(true);
    });
    docMap.refreshOff.on("mousedown", function () {
      setRefresh(false);
    });

    docMap.paletteSelect.addEventListener("change", function () {
      stateMap.color.palette = docMap.paletteSelect.selectedIndex;
      setPaletteSwatches();
    });
    docMap.paletteSelect.addEventListener("keydown", function (_event) {
      _event.preventDefault();
    }, true);

  };

  initPage = function () {

    bindEvents();
    resizeCanvas();
    buildSpheres();
    initPanels();

  };

  initPage();

};

window.addEventListener("load", function () {
  AnLorXen();
}, false);














