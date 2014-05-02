$(document).ready(function()
{
	var CANVAS_WIDTH = 1440;
	var CANVAS_HEIGHT = 900;
	var canvas = document.getElementById("exampleCanvas");
	var context = canvas.getContext("2d");
	var spriteAtlas = new Image();
	var vx = 100;
	var vy = 100;
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 600;
	var time = 0;
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var vx = 100;
	var vy = 100;


	var id = 0;
	
	var attack = $("#attack");
	
	var wizard = new Image();
	wizard.src = "Sprites/wizard2.png";

	var imgBullet = new Image();
	imgBullet.src = "Sprites/bullet.png";

	var GameScrDay = new Image();
	GameScrDay.src = "BGs/Backgroundday.png"

	var Castle = new Image();
	Castle.src = "Sprites/Castle.png";
	
	//his shit
	var EnemyWyvernLv1Class =
	{
		wyvernLv1x : 0,
		wyvernLv1y : 0,
		spriteAnimation : undefined,
		wyvernLv1Vx : 10,
		wyvernLv1Vy : 0,
		wyvernLv1Attack : false,
		
		update:function()
		{
			//this.spriteAnimation.x += this.wyvernLv1Vx;
		},
	};
	
	var SpriteAnimClass =
	{
		image: spriteAtlas,
		frameWidth: 330,
		frameHeight: 220,
		imageWidth: 330,
		imageHeight: 880,
		currentFrame: 0,
		startFrame: 0,
		numFrames: 4,
		frameRate: 384,
		loop: true,
		isPlaying: false,
		x: 0,
		y: 0,
		
		init:function(image, frameWidth, frameHeight, imageWidth, imageHeight, currentFrame, startFrame, numFrames, frameRate,	loop, isPlaying, x, y)
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
		},


		play: function(loop)
		{
			this.isPlaying = true;
			this.loop = loop;
		},
		
		updateAnimation: function()
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
		},
		
		render: function()
		{
			
			var frameWide = Math.floor(this.imageWidth / this.frameWidth);
			var frameHeight = (this.imageHeight / this.frameHeight);
			var srcx = ((this.startFrame + this.currentFrame) % frameWide) * this.frameWidth;
			var srcy = (Math.floor((this.startFrame + this.currentFrame) / frameWide)) * this.frameHeight;
			context.drawImage(this.image, srcx, srcy, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
		}
	};
	
	spriteAtlas.src = "Sprites/wyvern.png";
	spriteAtlas.addEventListener("load", Player, false);
	
	var testSprite = Object.create(SpriteAnimClass);
	

	
	function drawFrame()
	{
		window.requestAnimationFrame(drawFrame, canvas);
		
		
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.drawImage(GameScrDay, 0, 0, 1440, 900, 0, 0, 1440, 900);
		context.drawImage(Castle, 0, 0, 388, 370, 530, 632, 388, 370);
		//draw bullets
		$.each(bulletList, function (index, bullet)
		{
			updateBullet(bullet, wizard);

			context.drawImage(imgBullet, wizard.x, wizard.y, 17, 18, bullet.x, bullet.y, 17, 18);
		});
		
		context.drawImage(wizard, 0, 0, 51, 35, 700, 623, 51, 35);
		wyverns.spriteAnimation.init(spriteAtlas, 330, 220, 330, 880, 0, 0, 4, 384, true, false);
		update();	 
		render();
	}
	
	spriteAtlas.src = "Sprites/wyvern.png";
	spriteAtlas.addEventListener("load", Player, false);
	
	var testSprite = Object.create(SpriteAnimClass);
	var wyverns = Object.create(EnemyWyvernLv1Class);
	
	var wyvernAnimation = Object.create(SpriteAnimClass);
	wyverns.spriteAnimation = wyvernAnimation;

	function update()
	{
		wyverns.update();
	}
	
	function render()
	{
		context.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);testSprite.render();
		setTimeout(render, 32);
		
	}
	
	function Player()
	{        
		drawFrame();
		testSprite.play(true);
		testSprite.updateAnimation();
		
		
	}

	$(imgBullet).load(function ()
	{
		$(Player);
	});

	$(canvas).click( function (e)
	{
		addBullet(attack, 10, 2, 700, 623, e.pageX, e.pageY);
	});
	


});