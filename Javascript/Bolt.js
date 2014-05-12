var Bolt = Object.create(Projectile);
Bolt.BoltId = 0;
Bolt.BoltSpeed = 4;
Bolt.damage = 2;

Bolt.updateBolt = function (airship) {
    var originX = wizardXPos;
    var originY = wizardYPos;
    var directionX = (this.targetX - originX);
    var directionY = (this.targetY - originY);
    var mag = Math.sqrt(directionX * directionX + directionY * directionY);

    if (mag > 0) {
        var vx = (directionX / mag) * this.BoltSpeed;
        var vy = (directionY / mag) * this.BoltSpeed;
        this.translate(vx, vy);
    }
}