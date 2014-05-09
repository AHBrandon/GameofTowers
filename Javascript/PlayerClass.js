
var bulletId = 0;
var bulletSpeed = 2;
var velocityX = 1;
var velocityY = 1;
var damage = 5;

function bullet(x, y, eX, eY, damage, width, height, halfWidth, halfHeight) {
    this.x = x;
    this.y = y;
    this.width = 17;
    this.height = 18;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.eX = eX;
    this.eY = eY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.damage = damage;
}

var bulletList = [];

function addBullet(x, y, eX, eY) {
    bulletList.push(new bullet(x, y, eX, eY));
    bulletId += 1;
}

function updateBullet(bullet, wizard) {
    var angleX = 700;
    var angleY = 630;
    var dx = (bullet.eX - angleX);	//angle it is shot at
    var dy = (bullet.eY - angleY);
    var mag = Math.sqrt(dx * dx + dy * dy);
    bullet.velocityX = (dx / mag) * bulletSpeed;
    bullet.velocityY = (dy / mag) * bulletSpeed;
    bullet.x += bullet.velocityX;
    bullet.y += bullet.velocityY;
}