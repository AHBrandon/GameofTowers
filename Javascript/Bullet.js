var Bullet = Object.create(Projectile);
Bullet.bulletId = 0;
Bullet.bulletSpeed = 5;
Bullet.damage = 5;

Bullet.updateBullet = function () {
    var originX = wizardXPos;
    var originY = wizardYPos;
    var directionX = (this.targetX - originX);
    var directionY = (this.targetY - originY);
    var mag = Math.sqrt(directionX * directionX + directionY * directionY);

    if (mag > 0) {
        var vx = (directionX / mag) * this.bulletSpeed;
        var vy = (directionY / mag) * this.bulletSpeed;
        this.translate(vx, vy);
    }
}