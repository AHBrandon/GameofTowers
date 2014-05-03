//Dragon
var CANVAS_WIDTH = 1440;
var CANVAS_HEIGHT = 900;
var DragonID = 0;
//fireBalls
var fireBallId = 0;
var speed = 3;

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

function fireBall(attack, size, speed, x, y, eX, eY, damage)
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

var fireBallList = [];

function addfireBall(attack, bsize, bspeed, x, y, eX, eY)
{
	fireBallList[fireBallId] = new fireBall(attack, bsize, bspeed, x, y, eX, eY);
	fireBallId += 1;
}

function updatefireBall(fireBall, dragon)
{
	var dx = (fireBall.eX + 450);
	var dy = (fireBall.eY + 1000);
	var mag = Math.sqrt(dx * dx + dy * dy);
	fireBall.velocityX = (dx / mag) * speed;
	fireBall.velocityY = (dy / mag) * speed;
	fireBall.x += fireBall.velocityX;
	fireBall.y += fireBall.velocityY;
}