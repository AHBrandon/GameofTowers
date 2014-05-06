$(document).ready(function()
{
	var canvas = document.getElementById("exampleCanvas");
	var context = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var spriteAtlas = new Image();
	var vx = 100;
	var vy = 100;
	var x = canvasWidth / 2;
	var y = canvasHeight / 2;
	var time = 0;

	var assetsLoaded = 0;
	var loadedList = new Array();
	
	var wizard = new Image();
	wizard.src = "Sprites/wizard2.png";
	wizard.addEventListener("load", assetLoaded, false);
	loadedList.push(wizard);
	var wizardWidth = 51;
	var wizardHeight = 35;
	var wizardXPos = 700;
	var wizardYPos = 623;

	var imgBullet = new Image();
	imgBullet.src = "Sprites/bullet.png";
	imgBullet.addEventListener("load", assetLoaded, false);
	loadedList.push(imgBullet);
	var bulletWidth = 17;
	var bulletHeight = 18;
	
	var imgFireBall = new Image();
	imgFireBall.src = "Sprites/fireball.png";
	imgFireBall.addEventListener("load", assetLoaded, false);
	loadedList.push(imgFireBall);
	var fireBallWidth = 55;
	var fireBallHeight = 77;

	var GameScrDay = new Image();
	GameScrDay.src = "BGs/Backgroundday.png"
	GameScrDay.addEventListener("load", assetLoaded, false);
	loadedList.push(GameScrDay);
	var backGroundWidth = 1440;
	var backGroundHeight = 900;

	var Castle = new Image();
	Castle.src = "Sprites/Castle.png";
	Castle.addEventListener("load", assetLoaded, false);
	loadedList.push(Castle);
	var castleWidth = 388;
	var castleHeight = 370;
	var castleXPos = 530;
	var castleYPos = 632;
	
	var imgDragon = new Image();
	imgDragon.src = "Sprites/wyvern.png"
	imgDragon.addEventListener("load", assetLoaded, false);
	loadedList.push(imgDragon);
	var dragonWidth = 220;
	var dragonHeight = 104;
	var dragonXPos = 395;
	var dragonYPos = 200;
	
	function gameLoop()
	{
		
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.drawImage(GameScrDay, 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
		context.drawImage(Castle, 0, 0, castleWidth, castleHeight, castleXPos, castleYPos, castleWidth, castleHeight);
		context.drawImage(wizard, 0, 0, wizardWidth, wizardHeight, wizardXPos, wizardYPos, wizardWidth, wizardHeight);
		context.drawImage(imgDragon, 0, 0, dragonWidth, dragonHeight, dragonXPos, dragonYPos, dragonWidth, dragonHeight);
		
		for(var i = 0; i < bulletList.length; ++i)
		{
			updateBullet(bulletList[i], wizard);

			context.drawImage(imgBullet, wizard.x, wizard.y, bulletWidth, bulletHeight, bulletList[i].x, bulletList[i].y, bulletWidth, bulletHeight);
		}
		
		for(var i = 0; i < fireBallList.length; ++i)
		{
			updatefireBall(fireBallList[i], imgDragon);
			context.drawImage(imgFireBall, imgDragon.x, imgDragon.y, fireBallWidth, fireBallHeight, fireBallList[i].x, fireBallList[i].y, fireBallWidth, fireBallHeight);
			
		}	
		
		for(var i = 0; i < bulletList.length; ++i)
		{
			for (var j = 0; j < fireBallList.length; ++j)
			{
				if(AARectToRectCollision(bulletList[i], fireBallList[j]))
				{
					fireBallList.splice(j, 1);
					j--;
					bulletList.splice(i, 1);
					i--;
				}			
			}
		}
		requestAnimationFrame(gameLoop);
	}
	
	var interval = setInterval(onInterval, 3000);	//every three seconds
	function onInterval() 
	{//tell the fire ball to start at the dragon's position and then target the castle, hard coded values for now because of errors...	
		addfireBall(555, 250, 530, 632);	
	}
	
	function render()
	{        
		gameLoop();
	}
	
	function assetLoaded(event)
	{
		assetsLoaded++;
		if (assetsLoaded === loadedList.length)
		{
			console.log("assets loaded");
			addEnemy(imgDragon, 0, 0, dragonWidth, dragonHeight, dragonXPos, dragonYPos, dragonWidth, dragonHeight);
			render();
		}
	}

	$(canvas).click( function (e)
	{
		console.log("click");	//test to see if the mouse is being used
		addBullet(wizardXPos, wizardYPos, e.pageX, e.pageY);
	});
});