const MovingObject = require("./moving_object");
const Util = require("./utils");
const Bullet = require('./bullet');

function Ship (){
  let params = {
    "radius": 15,
    "color": "green",
    "vel": [0, 0],
    "pos": [350, 350]
  };
  MovingObject.call(this, params);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function (dim) {
  this.pos = MovingObject.randomPosition(dim);
  this.vel = [0,0];
};


module.exports = Ship;
