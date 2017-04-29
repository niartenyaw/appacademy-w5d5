const Asteroid = require('./asteroid');
const Ship = require('./ship');
const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

function Game() {
  this.asteroids = new Array;
  this.addAsteroids();
  this.ship = new Ship();
  this.bullets = new Array;
}

Game.DIM_X = 700;
Game.DIM_Y = 700;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function () {
  if (this.asteroids.length < Game.NUM_ASTEROIDS) {
    const asteroid = new Asteroid(MovingObject.randomPosition(Game.DIM_X));
    this.asteroids.push(asteroid);
    this.addAsteroids();
  }
};

Game.prototype.allObjects = function(){
  return this.asteroids.concat([this.ship]).concat(this.bullets);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 700, 700);
  const objs = this.allObjects();
  for (let i = 0; i < objs.length; i++) {
    objs[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function () {
  const objs = this.allObjects();
  for (let i = 0; i < objs.length; i++) {
    objs[i].move(Game.DIM_X);
  }
  this.ship.move(Game.DIM_X);
};

Game.prototype.checkCollisions = function () {
  let objs = this.allObjects();

  for (let i = 0; i < this.asteroids.length; i++) {
    if (objs[i].isCollidedWith(this.ship)) {
      this.ship.relocate(Game.DIM_X);
    }
    for (var j = 0; j < this.bullets.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.bullets[j])) {
        this.remove(this.bullets, j);
        this.remove(this.asteroids, i);
      }
    }
  }
};

Game.prototype.remove = function (type, i) {
  type.splice(i, 1);
};

Game.prototype.step = function (ctx) {
  this.moveObjects();
  this.checkCollisions();
  this.draw(ctx);
};

Game.prototype.fire = function () {
  const bullet = new Bullet(this.ship.pos.slice(0), this.ship.vel.slice(0));
  this.bullets.push(bullet);
};


module.exports = Game;
