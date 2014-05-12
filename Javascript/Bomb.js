var Bomb = Object.create(Projectile);
Bomb.BombId = 0;
Bomb.BombSpeed = 1;
Bomb.damage = 7;

Bomb.updateBomb = function (wizard) {
    var originX = wizardXPos;
    var originY = wizardYPos;
    var directionX = (this.targetX - originX);
    var directionY = (this.targetY - originY);
    var mag = Math.sqrt(directionX * directionX + directionY * directionY);

    if (mag > 0) {
        var vx = (directionX / mag) * this.BombSpeed;
        var vy = (directionY / mag) * this.BombSpeed;
        this.translate(vx, vy);
    }
}
