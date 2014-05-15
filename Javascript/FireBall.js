var FireBall = Object.create(Projectile);
FireBall.FireBallId = 0;
FireBall.FireBallSpeed = 3;
FireBall.damage = 6;

FireBall.updateFireBall = function (dragon, castle) {
    var originX = dragon.x;
    var originY = dragon.y;
    var directionX = (castle.x - originX);
    var directionY = (castle.y - originY);
    var mag = Math.sqrt(directionX * directionX + directionY * directionY);

    if (mag > 0) {
        var vx = (directionX / mag) * this.FireBallSpeed;
        var vy = (directionY / mag) * this.FireBallSpeed;
        this.translate(vx, vy);
    }
}
