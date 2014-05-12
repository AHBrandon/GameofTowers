var FireBall = Object.create(Projectile);
FireBall.FireBallId = 0;
FireBall.FireBallSpeed = 3;
FireBall.damage = 6;

FireBall.updateFireBall = function (dragon) {
    var originX = wizardXPos;
    var originY = wizardYPos;
    var directionX = (this.targetX - originX);
    var directionY = (this.targetY - originY);
    var mag = Math.sqrt(directionX * directionX + directionY * directionY);

    if (mag > 0) {
        var vx = (directionX / mag) * this.FireBallSpeed;
        var vy = (directionY / mag) * this.FireBallSpeed;
        this.translate(vx, vy);
    }
}
