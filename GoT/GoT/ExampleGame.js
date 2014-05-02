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
	
	var assetsLoaded = 0;
	var loadedList = new Array();
	
	var x = canvasWidth / 2;
	var y = canvasHeight / 2;

	var id = 0;
	
	var attack = $("#attack");
	
	var wizard = new Image();
	wizard.src = "Sprites/wizard2.png";
	wizard.addEventListener("load", assetLoaded, false);
	loadedList.push(wizard);

	var imgBullet = new Image();
	imgBullet.src = "Sprites/bullet.png";
	imgBullet.addEventListener("load", assetLoaded, false);
	loadedList.push(imgBullet);
	
	var imgFireBall = new Image();
	imgFireBall.src = "Sprites/fireball.png";
	imgFireBall.addEventListener("load", assetLoaded, false);
	loadedList.push(imgFireBall);

	var GameScrDay = new Image();
	GameScrDay.src = "BGs/Backgroundday.png"
	GameScrDay.addEventListener("load", assetLoaded, false);
	loadedList.push(GameScrDay);

	var Castle = new Image();
	Castle.src = "Sprites/Castle.png";
	Castle.addEventListener("load", assetLoaded, false);
	loadedList.push(Castle);
	
	var imgDragon = new Image();
	imgDragon.src = "Sprites/wyvern.png"
	imgDragon.addEventListener("load", assetLoaded, false);
	loadedList.push(imgDragon);
	
	function drawFrame()
	{
		requestAnimationFrame(drawFrame);
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
		//draw dragon
		
		$.each(EnemyList, function (index, Dragon)
		{												//x    y
			context.drawImage(imgDragon, 0, 0, 220, 104, 395, 200, 220, 104); 
		});
		
		$.each(fireBallList, function (index, fireBall)
		{
			updatefireBall(fireBall, imgDragon);
			context.drawImage(imgFireBall, imgDragon.x, imgDragon.y, 55, 77, fireBall.x, fireBall.y, 55, 77);
			AARectToRectCollision(bullet, fireBall);
		});
		
			
			

	}
	
	var interval = setInterval(onInterval, 3000);
	function onInterval() 
	{//tell the fire ball to start at the dragon's position and then target the castle, hard coded values for now because of errors...	
		addfireBall(attack, 10, 2, 555, 250, Castle.x, Castle.y);	
	}
	function Player()
	{        
		drawFrame();
	}
	
	function assetLoaded(event)
	{
		assetsLoaded++;
		if (assetsLoaded === loadedList.length)
		{
			console.log("assets loaded");
			addEnemy(imgDragon, 0, 0, 220, 104, 395, 445, 220, 104);
			$(Player);
		}
	}

	$(canvas).click( function (e)
	{
		addBullet(attack, 10, 2, 700, 623, e.pageX, e.pageY);
	});
});