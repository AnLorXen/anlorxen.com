
Sphere = function (_options) {
  "use strict";

  var
    self, x, y, z, velX, velY, velZ,
    setPos, setVel,
    enableColor, setColor, 
    enableGradient, setGradient, 
    move, draw;


  self = this;

  self.posX = _options.posX === undefined ? 0 : _options.posX;    
  self.posY = _options.posY === undefined ? 0 : _options.posY;
  self.posZ = _options.posZ === undefined ? 0 : _options.posZ;

  self.velX = _options.velX === undefined ? 0 : _options.velX;
  self.velY = _options.velY === undefined ? 0 : _options.velY;
  self.velZ = _options.velZ === undefined ? 0 : _options.velZ;

  self.radius = _options.radius === undefined ? 20 : _options.radius;

  self.color = {};
  self.color.enabled = true;
  if (_options.color === undefined) {
    self.color.r = 0;
    self.color.g = 0;
    self.color.b = 0;
    self.color.a = 0;
  } else {
    self.color.r = _options.color.r === undefined ? 0 : _options.color.r;
    self.color.g = _options.color.g === undefined ? 0 : _options.color.g;
    self.color.b = _options.color.b === undefined ? 0 : _options.color.b;
    self.color.a = _options.color.a === undefined ? 0 : _options.color.a;
  }
  self.color.rgba = "rgba("
    + self.color.r + ", "
    + self.color.g + ", "
    + self.color.b + ", "
    + self.color.a + ")";

  self.gradient = {};
  self.gradient.enabled = true;
  self.gradient.instance = {};
  self.gradient.offset = 3;
  self.gradient.stops = [];
  self.gradient.stops[0] = { "offset": 0.0, "r": 0, "g": 0, "b": 0, "a": 1 };
  self.gradient.stops[1] = { "offset": 0.5, "r": 0, "g": 0, "b": 0, "a": 1 };
  self.gradient.stops[2] = { "offset": 1.0, "r": 0, "g": 0, "b": 0, "a": 1 };



  (function () {
    //console.log("I created a sphere.");
  })();



  x = function () {
    return self.posX;
  };
  y = function () {
    return self.posY;
  };
  z = function () {
    return self.posZ;
  };

  velX = function () {
    return self.velX;
  };
  velY = function () {
    return self.velY;
  };
  velZ = function () {
    return self.velZ;
  };

  setPos = function (_x, _y, _z) {
    self.posX = _x;
    self.posY = _y;
    self.posZ = _z;
  };

  setVel = function (_x, _y, _z) {
    self.velX = _x;
    self.velY = _y;
    self.velZ = _z;
  };

  enableColor = function (_bool) {
    self.color.enabled = _bool;
  };

  setColor = function (_r, _g, _b, _a) {
    self.color.r = _r;
    self.color.g = _g;
    self.color.b = _b;
    self.color.a = _a;
    self.color.rgba = "rgba("
      + self.color.r + ", "
      + self.color.g + ", "
      + self.color.b + ", "
      + self.color.a + ")"
  };

  enableGradient = function (_bool) {
    self.gradient.enabled = _bool;
  };

  setGradient = function (_stop, _r, _g, _b, _a) {
    self.gradient.stops[_stop].r = _r;
    self.gradient.stops[_stop].g = _g;
    self.gradient.stops[_stop].b = _b;
    self.gradient.stops[_stop].a = _a;
  };

  move = function () {
    self.posX += self.velX;
    self.posY += self.velY;
    self.posZ += self.velZ;
  };

  draw = function (_ctx) {

    self.gradient.instance = _ctx.createRadialGradient(
      self.posX - (self.radius / self.gradient.offset),
      self.posY - (self.radius / self.gradient.offset), 0, // center of gradient
      self.posX, self.posY, self.radius // outside edge
    );

    self.gradient.stops.forEach(function (_ele) {
      self.gradient.instance.addColorStop(
        _ele.offset, "rgba("
          + _ele.r + ", "
          + _ele.g + ", "
          + _ele.b + ", "
          + _ele.a + ")"
      );
    });

    //self.gradient.addColorStop(0.00, "rgba(180, 180, 255, 0.98)"); // "rgba(240, 240, 240, 0.98)"
    //self.gradient.addColorStop(0.50, "rgba(140, 140, 255, 0.56)"); // "rgba(220, 220, 220, 0.56)"
    //self.gradient.addColorStop(1.00, "rgba(100, 100, 200, 0.14)"); // "rgba(200, 200, 200, 0.14)"


    _ctx.save();
    _ctx.beginPath();
    _ctx.arc(
      self.posX, self.posY, self.radius, 0, 6.28318530718, true // (Math.PI * 2)
    );
    _ctx.closePath();
    if (self.color.enabled) {
      _ctx.fillStyle = self.color.rgba;
      _ctx.fill();
    }
    if (self.gradient.enabled) {
      _ctx.fillStyle = self.gradient.instance;
      _ctx.fill();
    }
    _ctx.restore();

  };



  return {
    "x": x, 
    "y": y, 
    "z": z, 
    "velX": velX,
    "velY": velY,
    "velZ": velZ,
    "setPos": setPos,
    "setVel": setVel,
    "setColor": setColor,
    "enableColor": enableColor,
    "setGradient": setGradient, 
    "enableGradient": enableGradient,
    "move": move, 
    "draw": draw
  };

};






///**
//* Returns a color in the format: '#RRGGBB', or as a hex number if specified.
//* @param {number|string} color
//* @param {boolean=}      toNumber=false  Return color as a hex number.
//* @return {string|number}
//*/
//window.utils.parseColor = function (color, toNumber) {
//  if (toNumber === true) {
//    if (typeof color === "number") {
//      return (color | 0); //chop off decimal
//    }
//    if (typeof color === "string" && color[0] === "#") {
//      color = color.slice(1);
//    }
//    return window.parseInt(color, 16);
//  } else {
//    if (typeof color === "number") {
//      color = "#" + ("00000" + (color | 0).toString(16)).substr(-6); //pad
//    }
//    return color;
//  }
//};

///**
//* Converts a color to the RGB string format: 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
//* @param {number|string} color
//* @param {number}        alpha
//* @return {string}
//*/
//window.utils.colorToRGB = function (color, alpha) {
//  //number in octal format or string prefixed with #
//  if (typeof color === "string" && color[0] === "#") {
//    color = window.parseInt(color.slice(1), 16);
//  }
//  alpha = (alpha === undefined) ? 1 : alpha;
//  //parse hex values
//  var r = color >> 16 & 0xff,
//    g = color >> 8 & 0xff,
//    b = color & 0xff,
//    a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
//  //only use 'rgba' if needed
//  if (a === 1) {
//    return "rgb(" + r + "," + g + "," + b + ")";
//  } else {
//    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
//  }
//};

