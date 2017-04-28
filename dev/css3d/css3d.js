
"use strict";

var Css3d = function () {

  var
    cfMap, docMap, stateMap,
    init, initCtrls, bindEvents,
    i, group, axis, setting, figure, 
    updateRules, loadContent, 
    handleSlide, handleInput,handleReset, handlePreset;


  cfMap = {

    "content": "color",
    "panels": {
      "color": {
        "sources": {
          "front": "<span>Front</span>", 
          "back": "<span>Back</span>", 
          "top": "<span>Top</span>", 
          "bottom": "<span>Bottom</span>", 
          "right": "<span>Right</span>", 
          "left": "<span>Left</span>" 
        },
      },
      "photo": {
        "sources": {
          "front": "<img src='img/cat_01.jpg' width='256' />", 
          "back": "<img src='img/cat_02.jpg' width='256' />",
          "top": "<img src='img/cat_03.jpg' width='256' />",
          "bottom": "<img src='img/cat_04.jpg' width='256' />",
          "right": "<img src='img/cat_05.jpg' width='256' />",
          "left": "<img src='img/cat_06.jpg' width='256' />"
        }
      },
      "video": {
        "sources": {
          "front": "<video src='img/goat_01.mp4' autoplay loop muted width='320'></video>",
          "back": "<video src='img/goat_02.mp4' autoplay loop muted width='320'></video>",
          "top": "<video src='img/goat_03.mp4' autoplay loop muted width='320'></video>",
          "bottom": "<video src='img/goat_04.mp4' autoplay loop muted width='320'></video>",
          "right": "<video src='img/goat_05.mp4' autoplay loop muted width='320'></video>",
          "left": "<video src='img/goat_06.mp4' autoplay loop muted width='320'></video>"
        }
      },
    },

    "sliders": {
      "scale": {
        "x": {
          "min": "0", "max": "3", "step": "0.01", "value": "1"
        },
        "y": {
          "min": "0", "max": "3", "step": "0.01", "value": "1"
        },
        "z": {
          "min": "0", "max": "3", "step": "0.01", "value": "1"
        }
      },

      "translate": {
        "x": {
          "min": "0", "max": "2000", "step": "1", "value": "350"
        },
        "y": {
          "min": "0", "max": "1000", "step": "1", "value": "70"
        },
        "z": {
          "min": "-1500", "max": "500", "step": "10", "value": "0"
        }
      },

      "rotate": {
        "x": {
          "min": "-180", "max": "180", "step": "1", "value": "0"
        },
        "y": {
          "min": "-180", "max": "180", "step": "1", "value": "0"
        },
        "z": {
          "min": "-180", "max": "180", "step": "1", "value": "0"
        }
      },
    }
  };


  docMap = {
    "scaleXslider": document.getElementById("scale-x-slider"),
    "scaleYslider": document.getElementById("scale-y-slider"),
    "scaleZslider": document.getElementById("scale-z-slider"),
    "scaleXtext": document.getElementById("scale-x-text"),
    "scaleYtext": document.getElementById("scale-y-text"),
    "scaleZtext": document.getElementById("scale-z-text"),

    "transXslider": document.getElementById("trans-x-slider"), 
    "transYslider": document.getElementById("trans-y-slider"), 
    "transZslider": document.getElementById("trans-z-slider"),
    "transXtext": document.getElementById("trans-x-text"),
    "transYtext": document.getElementById("trans-y-text"),
    "transZtext": document.getElementById("trans-z-text"),

    "rotateXslider": document.getElementById("rotate-x-slider"),
    "rotateYslider": document.getElementById("rotate-y-slider"),
    "rotateZslider": document.getElementById("rotate-z-slider"),
    "rotateXtext": document.getElementById("rotate-x-text"),
    "rotateYtext": document.getElementById("rotate-y-text"),
    "rotateZtext": document.getElementById("rotate-z-text"),

    "panel": document.getElementsByClassName("panel")[0]
  };

  stateMap = {
    "selector": ".panel",
    "content": "",
    "container": {
      "scale": {
        "x": "1", 
        "y": "1", 
        "z": "1"
      },
      "translate": {
        "x": "0", 
        "y": "0", 
        "z": "0"
      },
      "rotate": {
        "x": "0", 
        "y": "0", 
        "z": "0"
      }
    }
  };


  updateRules = function () {

    docMap.panel.style.transform =
      " scale3d( "
      + stateMap.container.scale.x + ", "
      + stateMap.container.scale.y + ", "
      + stateMap.container.scale.z + " )"

      + " translate3d( "
      + stateMap.container.translate.x + "px, "
      + stateMap.container.translate.y + "px, "
      + stateMap.container.translate.z + "px )"

      + " rotate3d(1, 0, 0, " + stateMap.container.rotate.x + "deg)"
      + " rotate3d(0, 1, 0, " + stateMap.container.rotate.y + "deg)"
      + " rotate3d(0, 0, 1, " + stateMap.container.rotate.z + "deg)";

  };


  loadContent = function (_evt) {

    docMap.panel.removeClassName(stateMap.content);

    // remove content class from figures
    Array.prototype.filter.call(
      docMap.panel.getElementsByTagName("figure"),
      function (_figure) {
        _figure.removeClassName(
          stateMap.content + "-" + _figure.dataset.face
        );
      }
    );

    stateMap.content = _evt.target.dataset.con;
    docMap.panel.addClassName(stateMap.content);

    // add content class to figures
    Array.prototype.filter.call(
      docMap.panel.getElementsByTagName("figure"),
      function (_figure) {
        _figure.addClassName(
          stateMap.content + "-" + _figure.dataset.face
        );
        _figure.innerHTML = 
          cfMap.panels[stateMap.content].sources[_figure.dataset.face];
      }
    );

    updateRules();

  };


  handleSlide = function (_evt) {
    group = _evt.target.parentElement.parentElement.parentElement;
    axis = _evt.target.parentElement.parentElement;
    axis.getElementsByClassName("ctrls-text")[0].value =
      _evt.target.value;
    stateMap.container[group.dataset.group][axis.dataset.axis] =
      _evt.target.value;
    updateRules();
  };


  handleInput = function (_evt) {
    // TODO: range check _evt.target.value
    group = _evt.target.parentElement.parentElement;
    axis = _evt.target.parentElement;
    axis.getElementsByClassName("ctrls-range")[0].value =
      _evt.target.value;
    stateMap.container[group.dataset.group][axis.dataset.axis] =
      _evt.target.value;
    updateRules();
  };

  handleReset = function (_evt) {
    // set controls to original cfMap values
    group = _evt.target.parentElement.parentElement;
    axis = _evt.target.parentElement;
    axis.getElementsByClassName("ctrls-range")[0].value =
      axis.getElementsByClassName("ctrls-text")[0].value =
      stateMap.container[group.dataset.group][axis.dataset.axis] =
      cfMap.sliders[group.dataset.group][axis.dataset.axis].value;
    updateRules();
  };


  handlePreset = function (_evt) {
    // copy button data to stateMap and rotation controls
    for (axis in stateMap.container.rotate) {
      stateMap.container.rotate[axis] = _evt.currentTarget.dataset[axis];
      document.getElementById("rotate-" + axis + "-slider").value =
        stateMap.container.rotate[axis];
      document.getElementById("rotate-" + axis + "-text").value =
        stateMap.container.rotate[axis];
    }
    updateRules();
  };


  initCtrls = function () {

    stateMap.content = cfMap.content;
    docMap.panel.addClassName(stateMap.content);

    // set scale slider default values
    for (axis in cfMap.sliders.scale) {
      for (setting in cfMap.sliders.scale[axis]) {
        docMap["scale" + axis.toUpperCase() + "slider"][setting] =
          cfMap.sliders.scale[axis][setting];
      }
    }
    stateMap.container.scale.x =
      docMap.scaleXtext.value = docMap.scaleXslider.value;
    stateMap.container.scale.y =
      docMap.scaleYtext.value = docMap.scaleYslider.value;
    stateMap.container.scale.z =
      docMap.scaleZtext.value = docMap.scaleZslider.value;

    // set translate slider default values
    for (axis in cfMap.sliders.translate) {
      for (setting in cfMap.sliders.translate[axis]) {
        docMap["trans" + axis.toUpperCase() + "slider"][setting] =
          cfMap.sliders.translate[axis][setting];
      }
    }
    stateMap.container.translate.x =
      docMap.transXtext.value = docMap.transXslider.value;
    stateMap.container.translate.y =
      docMap.transYtext.value = docMap.transYslider.value;
    stateMap.container.translate.z =
      docMap.transZtext.value = docMap.transZslider.value;

    // set rotate slider default values
    for (axis in cfMap.sliders.rotate) {
      for (setting in cfMap.sliders.rotate[axis]) {
        docMap["rotate" + axis.toUpperCase() + "slider"][setting] =
          cfMap.sliders.rotate[axis][setting];
      }
    }
    stateMap.container.rotate.x =
      docMap.rotateXtext.value = docMap.rotateXslider.value;
    stateMap.container.rotate.y =
      docMap.rotateYtext.value = docMap.rotateYslider.value;
    stateMap.container.rotate.z =
        docMap.rotateZtext.value = docMap.rotateZslider.value;

    updateRules();

  };


  bindEvents = function () {

    Array.prototype.filter.call(
      document.getElementsByClassName("ctrls-content"),
      function (_btn) {
        _btn.addEventListener("click", function (_evt) {
          loadContent(_evt);
        });
      }
    );

    Array.prototype.filter.call(
      document.getElementsByClassName("ctrls-range"),
      function (_slider) {
        _slider.addEventListener("input", function (_evt) {
          handleSlide(_evt);
        });
      }
    );

    Array.prototype.filter.call(
      document.getElementsByClassName("ctrls-text"),
      function (_text) {
        _text.addEventListener("change", function (_evt) {
          handleInput(_evt);
        });
      }
    );

    Array.prototype.filter.call(
      document.getElementsByClassName("ctrls-reset"),
      function (_btn) {
        _btn.addEventListener("click", function (_evt) {
          handleReset(_evt);
        });
      }
    );

    Array.prototype.filter.call(
      document.getElementsByClassName("ctrls-preset"),
      function (_btn) {
        _btn.addEventListener("click", function (_evt) {
          handlePreset(_evt);
        });
      }
    );

  };


  init = function () {
    initCtrls();
    bindEvents();
  };


  init();


};

window.addEventListener("DOMContentLoaded", function () {
  Css3d();
}, false);

