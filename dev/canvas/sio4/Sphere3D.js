
window.Sphere3D = function(_origin, _radius) {

   this.origin = _origin || new Point3D();
   this.radius = _radius || 1.0;



   this.draw = function(_ctx) {
      
   };


};

window.Point3D = function(_x, _y, _z){
   this.x = _x || 0.0;
   this.y = _y || 0.0;
   this.z = _z || 0.0;

   this.toString = function() {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
   };
};