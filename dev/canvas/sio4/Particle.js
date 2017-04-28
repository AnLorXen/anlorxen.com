
var Particle = function (_mass, _charge) {
  if (typeof _mass === undefined) { _mass = 1; }
  if (typeof _charge === undefined) { _charge = 0; }
  this.mass = _mass;
  this.charge = _charge;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
};


Particle.prototype.set_pos = function (_x, _y, _z) {
  this.x = _x;
  this.y = _y;
  this.z = _z;
};
Particle.prototype.get_pos = function () {
  return new Vector(this.x, this.y, this.z);
};



