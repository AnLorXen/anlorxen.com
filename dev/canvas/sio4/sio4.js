
var Canvas01 = function () {
  "use strict";

  var
    cfMap, docMap, stMap, 
    ctx2d, oMouse,
    initEvents, resize, move, draw,
    loadImages, 
    clickOne, clickTwo, clickThree, clickFour, clickFive;


  cfMap = {
    "pos": {
      "x": 100,
      "y": 150
    },
    "vel": {
      "x": 10,
      "y": -1
    },
    "friction": 0.0100,
    "gravity": 0.0007,
    "images": [
      "img/smBallBurgandy.png",
      "img/smBallCrimson.png",
      "img/smBallDarkGreen.png",
      "img/smBallDarkOrange.png",
      "img/smBallFuschia.png",
      "img/smBallLightPink.png",
      "img/smBallGreen.png",
      "img/smBallLightPurple.png",
      "img/ballCrimson.png"
    ]
  };

  docMap = {
    "canvas": document.getElementById("cvTest"),
    "sprite": document.getElementById("imgBall"), // imgSmBall
    "btnOne": document.getElementById("btnOne"), 
    "btnTwo": document.getElementById("btnTwo"),
    "btnThree": document.getElementById("btnThree"),
    "btnFour": document.getElementById("btnFour"),
    "btnFive": document.getElementById("btnFive")
  };

  stMap = {
    "canvas": {
      "height": 0,
      "width": 0
    },
    "ctx2d": docMap.canvas.getContext("2d"),
    "mouse": jsUtil.captureMouse(docMap.canvas),
    "animate": false,
    "refresh": true, 
    "ball": {
      "pos": {
        "x": 0,
        "y": 0
      },
      "vel": {
        "x": 0,
        "y": 0
      },
      "accel": {
        "x": 0,
        "y": 0
      }
    },
    "friction": 0, 
    "gravity": 0,
    "images": []
  };


  resize = function () {
    stMap.ctx2d.canvas.height = stMap.canvas.height = window.innerHeight;
    stMap.ctx2d.canvas.width = stMap.canvas.width = window.innerWidth;
  };
  clickOne = function () {
    stMap.animate = !stMap.animate;
  };
  clickTwo = function () {
    stMap.refresh = !stMap.refresh;
  };
  clickThree = function () {
  };
  clickFour = function () {
  };
  clickFive = function () {
  };

  move = function (_ball) {
    stMap.ball.accel.y += stMap.gravity;
    stMap.ball.vel.x += stMap.ball.accel.x;
    stMap.ball.vel.y += stMap.ball.accel.y;
    if (stMap.ball.pos.x + stMap.ball.vel.x < 0.0) {
      stMap.ball.pos.x = 0.0;
      stMap.ball.vel.x -= (stMap.ball.vel.x * stMap.friction);
      stMap.ball.vel.y -= (stMap.ball.vel.y * stMap.friction);
      stMap.ball.vel.x *= -1.0;
    } else {
      stMap.ball.pos.x += stMap.ball.vel.x;
    }
    if ((stMap.ball.pos.x + stMap.ball.vel.x) > (stMap.canvas.width - docMap.sprite.width)) {
      stMap.ball.pos.x = stMap.canvas.width - docMap.sprite.width;
      stMap.ball.vel.x -= (stMap.ball.vel.x * stMap.friction);
      stMap.ball.vel.y -= (stMap.ball.vel.y * stMap.friction);
      stMap.ball.vel.x *= -1.0;
    } else {
      stMap.ball.pos.x += stMap.ball.vel.x;
    }
    if (stMap.ball.pos.y + stMap.ball.vel.y < 0.0) {
      stMap.ball.pos.y = 0.0;
      stMap.ball.vel.x -= (stMap.ball.vel.x * stMap.friction);
      stMap.ball.vel.y -= (stMap.ball.vel.y * stMap.friction);
      stMap.ball.vel.y *= -1.0;
    } else {
      stMap.ball.pos.y += stMap.ball.vel.y;
    }
    if ((stMap.ball.pos.y + stMap.ball.vel.y) > (stMap.canvas.height - docMap.sprite.height)) {
      stMap.ball.pos.y = stMap.canvas.height - docMap.sprite.height;
      stMap.ball.vel.x -= (stMap.ball.vel.x * stMap.friction);
      stMap.ball.vel.y -= (stMap.ball.vel.y * stMap.friction);
      stMap.ball.vel.y *= -1.0;
    } else {
      stMap.ball.pos.y += stMap.ball.vel.y;
    }
  };

  draw = function (_ball) {
    stMap.ctx2d.drawImage(
       _ball,
       0, 0, _ball.width, _ball.height,
       stMap.ball.pos.x, stMap.ball.pos.y, _ball.width, _ball.height
    );
  };

  docMap.btnOne.addEventListener("click", clickOne, false);
  docMap.btnTwo.addEventListener("click", clickTwo, false);
  docMap.btnThree.addEventListener("click", clickThree, false);
  docMap.btnFour.addEventListener("click", clickFour, false);
  docMap.btnFive.addEventListener("click", clickFive, false);
  window.addEventListener("resize", resize, false);
  resize();
  stMap.ball.pos.x = cfMap.pos.x;
  stMap.ball.pos.y = cfMap.pos.y;
  stMap.ball.vel.x = cfMap.vel.x;
  stMap.ball.vel.y = cfMap.vel.y;
  stMap.friction = cfMap.friction;
  stMap.gravity = cfMap.gravity;

  //var scene = sjs.Scene(
  //  { w: stMap.canvas.width, h: stMap.canvas.height }
  //);



  loadImages = function () {
    var
      loadCount, loaded, loadImage, img, src, error;

    cfMap.images.forEach(function (_img, _idx) {
      if (!stMap.images[_idx]) {
        loadCount += 1;
        stMap.images[_idx] = {
          "src": _img,
          "loaded": false,
          "loading": false
        };
      }
    });

    if (loadCount = 0) {
      return;
    }
    loaded = loadCount;
    error = false;


    loadImage = function (src) {
      stMap.images[src].loading = true;
      img = document.createElement("img");
      stMap.images[src].img = img;

      addEventListener(img, "load", function () {
        stMap.images[src].loaded = true;
        loadCount -= 1;

        if (error === false) {
          if (loadCount === 0) {
            //scene.dom.removeChild(div);
            //callback();
            return;
          } else {
            //div.innerHTML = 'Loading ' + ((total - toLoad) / total * 100 | 0) + '%';
          }
        }

      }, false);

      img.src = src;

    };

    for (src in stMap.images) {
      if (stMap.images.hasOwnProperty(src)) {
        if (!stMap.images[src].loading) {
          loadImage(src);
        }
      }
    }

    debugger;

  };

  loadImages();




  (function drawFrame() {
    window.requestAnimationFrame(drawFrame, docMap.canvas);
    if (stMap.refresh) {
      stMap.ctx2d.clearRect(0, 0, stMap.canvas.width, stMap.canvas.height);
    }
    if (stMap.animate) {
      move(docMap.sprite);
    }
    draw(docMap.sprite);
  }());

};

window.addEventListener("load", Canvas01, false);
