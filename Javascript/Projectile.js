var Projectile = Object.create(GameObjectClass);
Projectile.projectileId = 0;
Projectile.projectileSpeed = 0;
Projectile.baseInit = Projectile.init;
//Projectile.projectileList = [];

Projectile.init = function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				            frameRate, collisionWidth, collisionHeight, targetX, targetY) {
    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				  frameRate, collisionWidth, collisionHeight, targetX, targetY);
    this.spriteAnim = Object.create(SpriteAnimClass);
    this.spriteAnim.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames, 1000, 0, 0);
    this.collisionRect = Object.create(RectClass);
    this.collisionRect.init(x, y, collisionWidth, collisionHeight, 0);
}


updateProjectile = function (projectile, image) {
    var originX = image.x;
    var originY = image.y;
    var directionX = (Projectile.targetX - originX);
    var directionY = (Projectile.targetY - originY);
    var mag = Math.sqrt(dx * dx + dy * dy);
    var vx = (directionX / mag) * bulletSpeed;
    var vy = (directionY / mag) * bulletSpeed;
    Projectile.x += vx;
    Projectile.y += vy;
}

