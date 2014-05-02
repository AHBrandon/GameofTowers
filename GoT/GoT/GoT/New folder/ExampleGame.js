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
	loadedList.push(wizard);

	var imgBullet = new Image();
	imgBullet.src = "Sprites/bullet.png";
	loadedList.push(imgBullet);

	var GameScrDay = new Image();
	GameScrDay.src = "BGs/Backgroundday.png"
	loadedList.push(GameScrDay);

	var Castle = new Image();
	Castle.src = "Sprites/Castle.png";
	loadedList.push(Castle);
	
	var imgDragon = new Image();
	imgDragon.src = "Sprites/wyvern.png"
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
		{
			context.drawImage(imgDragon, 0, 0, 51, 35, 395, 445, 51, 35); 
		});
	}

	function Player()
	{        
		drawFrame();
	}
	
	$(imgDragon).load(function ()
	{

		addEnemy(imgDragon, 0, 0, 51, 35, 395, 445, 51, 35);
	});
		
	$(imgBullet).load(function ()
	{
		$(Player);
	});
	
	$(canvas).click( function (e)
	{
		addBullet(attack, 10, 2, 700, 623, e.pageX, e.pageY);
	});
	


});