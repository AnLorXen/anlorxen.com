
window.jsUtil = {};

window.jsUtil.captureMouse = function(_element) {
    var mouse = { x: 0, y: 0, evt: null };
    var body_scrollLeft = document.body.scrollLeft;
    var element_scrollLeft = document.documentElement.scrollLeft;
    var body_scrollTop = document.body.scrollTop;
    var element_scrollTop = document.documentElement.scrollTop;
    var offsetLeft = _element.offsetLeft;
    var offsetTop = _element.offsetTop;
    _element.addEventListener("mousemove", function(event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + body_scrollLeft + element_scrollLeft;
            y = event.clientY + body_scrollTop + element_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;
        mouse.x = x;
        mouse.y = y;
        mouse.evt = event;
    }, false);
    return mouse;
};

window.jsUtil.Point = function(_x, _y, _z){
   this.x = _x || 0.0;
   this.y = _y || 0.0;
   this.z = _z || 0.0;

   this.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
   };
};

window.jsUtil.Line = function(_ptA, _ptB) {
   this.pointA = _ptA || new Point();
   this.pointB = _ptB || new Point();

   this.toString = function() {
      return "(" 
         + this.pointA.x + ", " + this.pointA.y  + ", " + this.pointA.z 
         + ") - ("
         + this.pointB.x + ", " + this.pointB.y  + ", " + this.pointB.z
         + ")";
   };
};

window.jsUtil.drawSphere = function(_ctx, _x, _y, _r) {

   var gradInner = _ctx.createRadialGradient(
      _x, _y, 0, 
      _x, _y - 3, 
      _r
   );
   gradInner.addColorStop(0.00, "rgba(125, 0, 30, 1)");
   gradInner.addColorStop(0.90, "rgba(155, 0, 30, 1)");
   gradInner.addColorStop(1.00, "rgba(180, 0, 30, 1)");

   _ctx.fillStyle = gradInner;
   _ctx.beginPath();
   _ctx.arc(_x , _y, _r, 0, (Math.PI * 2), false);
   _ctx.fill();

   var gradHighlite = _ctx.createRadialGradient(
      _x - 20, _y - 20, 0, 
      _x, _y, 
      _r
   );
   gradHighlite.addColorStop(0.00, "rgba(255, 255, 255, 0.50)");
   gradHighlite.addColorStop(0.50, "rgba(255, 255, 255, 0.25)");
   gradHighlite.addColorStop(1.00, "rgba(255, 255, 255, 0.00)");

   _ctx.fillStyle = gradHighlite;
   _ctx.beginPath();
   _ctx.arc(_x , _y, _r, 0, (Math.PI * 2), false);
   _ctx.fill();

};
