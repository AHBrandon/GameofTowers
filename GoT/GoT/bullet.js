//Bullets
var bulletId = 0;

var speed = 5;
function bullet(attack, size, speed, x, y, eX, eY, damage)
{
	this.attack = attack;
	this.size = size;
	this.x = x;
	this.y = y;
	this.eX = eX;
	this.eY = eY;
	this.velocityX = 1;
	this.velocityY = 1;
	this.speed = speed;
	this.damage = 5;
}

var bulletList = [];

function addBullet(attack, bsize, bspeed, x, y, eX, eY)
{
	bulletList[bulletId] = new bullet(attack, bsize, bspeed, x, y, eX, eY);
	bulletId += 1;
}

function updateBullet(bullet, wizard)
{
	var dx = (bullet.eX - 700);
	var dy = (bullet.eY - 630);
	var mag = Math.sqrt(dx * dx + dy * dy);
	bullet.velocityX = (dx / mag) * speed;
	bullet.velocityY = (dy / mag) * speed;
	bullet.x += bullet.velocityX;
	bullet.y += bullet.velocityY;
}