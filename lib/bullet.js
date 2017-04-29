const MovingObject = require("./moving_object");
const Util = require("./utils");

function Bullet(pos, velDir) {
  let params = {};
  params.pos = pos;
  params.vel = Bullet.velocity(velDir);
  params.radius = 5;
  params.color = "purple";
  MovingObject.call(this, params);
}

Util.inherits(Bullet, MovingObject);

Bullet.velocity = function(velDir) {
  const dist = MovingObject.distance(velDir, [0, 0]);
  if (dist === 0) dist = 1;
  velDir[0] = velDir[0] / dist * 20;
  velDir[1] = velDir[1] / dist * 20;
  return velDir;
};

module.exports = Bullet;
