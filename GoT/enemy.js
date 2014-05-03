//Dragon
var CANVAS_WIDTH = 1440;
var CANVAS_HEIGHT = 900;
var DragonID = 0;
var angleX = 450;
var angleY = 1000;
//fireBalls
var fireBallId = 0;
var speed = 3;
var fireBallDamage = 3;
var fireBallVelocityX = 1;
var fireBallVelocityY = 1;

function Dragon(image, frameWidth, frameHeight, imageWidth, imageHeight, 
				currentFrame, startFrame, numFrames, frameRate, loop, 
				isPlaying, x, y)
{
	this.image = image;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.imageWidth = imageWidth;
	this.imageHeight = imageHeight;
	this.currentFrame = currentFrame;
	this.startFrame = startFrame;
	this.numFrames = numFrames;
	this.frameRate = frameRate;
	this.loop = loop;
	this.isPlaying = isPlaying;
	this.x = x;
	this.y = y;
}

var EnemyList = [];

function addEnemy(image, frameWidth, frameHeight, imageWidth, imageHeight,
                  currentFrame, startFrame, numFrames, frameRate, loop, 
				  isPlaying, x, y)
{
	EnemyList[DragonID] = new Dragon(image, frameWidth, frameHeight, imageWidth, imageHeight,
                  currentFrame, startFrame, numFrames, frameRate, loop, 
				  isPlaying, x, y);
	DragonID += 1;
}

function updateDragon()
{
	if(this.isPlaying)
	{
		//console.log(this.currentFrame);
		this.currentFrame++;
		this.x += vx;
	
		if(this.x > CANVAS_WIDTH)
		{
			vx = -vx;
		}
		if(this.x  < 0)
		{
			vx = -vx;
		}

		if(this.currentFrame >= this.numFrames)
		{
			if(this.loop)
			{
				this.currentFrame = 0;
			}
			else
			{
				this.isPlaying = false;
				this.currentFrame--;
			}
		}
		
		var self = this;
		setTimeout(function(){self.updateAnimation();}, this.frameRate);
			
	}
}

function fireBall(x, y, eX, eY, damage, width, height, halfWidth, halfHeight)
{
	this.x = x;
	this.y = y;
	this.width = 55;
	this.height = 77;
	this.halfWidth = 28;
	this.halfHeight = 39;
	this.eX = eX;
	this.eY = eY;
	this.velocityX = fireBallVelocityX;
	this.velocityY = fireBallVelocityY;
	this.damage = fireBallDamage;
}

var fireBallList = [];

function addfireBall(x, y, eX, eY)
{
	fireBallList.push(new fireBall(x, y, eX, eY));
	fireBallId += 1;
}

function updatefireBall(fireBall, dragon)
{
	var dx = (fireBall.eX + angleX);
	var dy = (fireBall.eY + angleY);
	var mag = Math.sqrt(dx * dx + dy * dy);
	fireBall.velocityX = (dx / mag) * speed;
	fireBall.velocityY = (dy / mag) * speed;
	fireBall.x += fireBall.velocityX;
	fireBall.y += fireBall.velocityY;
}