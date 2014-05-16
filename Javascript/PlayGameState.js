var t_countdown = Object.create(TimerClass);
var dragonXPos = 0;
var dragonYPos = 0;

var PlayGameState =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,
    dragon: undefined,

    init: function (canvasWidth, canvasHeight, assets, gameState, bulletList) 
	{
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
		this.gameState = gameState;
		this.bulletList = bulletList;
		t_countdown.time = 5;
		t_countdown.start();
		this.gameObjects = new Array();
		this.createDragon(205, 80);
		this.createDragon(395, 400);
		this.createDragon(800, 150);
    },
  
	addBullet: function (wizardXPos, wizardYPos, mousePos)
    {
        var newBullet = Object.create(Bullet);

        newBullet.init(this.assets[bulletImage], wizardXPos, wizardYPos, bulletWidth, bulletHeight, 1, 1,
                        100, mousePos.x, mousePos.y, bulletWidth, bulletHeight);
        this.bulletList.push(newBullet);
    },
	
	updateWizardAttack: function (currContext) 
	{
        for (var i = 0; i < this.bulletList.length; ++i) 
		{
            this.bulletList[i].updateBullet();
            currContext.drawImage(this.assets[bulletImage], 0, 0, bulletWidth, bulletHeight, 
			                  this.bulletList[i].spriteAnim.rect.x, this.bulletList[i].spriteAnim.rect.y, 
							  bulletWidth, bulletHeight);
        }
	},

	createDragon: function(x, y)
	{
	    this.dragonXPos = x;
	    this.dragonYPos = y;
	    this.dragon = Object.create(Dragon);
	    this.dragon.init(this.assets[dragonEnemy], this.dragonXPos, this.dragonYPos, dragonWidth, dragonSpriteAnimHeight, 0, 2, 1000, this.dragonXPos, this.dragonYPos, dragonWidth, dragonSpriteAnimHeight);
	    this.dragon.spriteAnim.play(true);
	    this.gameObjects.push(this.dragon);


	},



	checkCollision: function() 
	{
        for (var i = 0; i < this.bulletList.length; ++i) {
            for (var j = 0; j < this.gameObjects.length; ++j) {
                if (AARectToRectCollision(this.bulletList[i].collisionRect, this.gameObjects[j].collisionRect))
                {
                    this.gameObjects.splice(j, 1);
                    j--;
                    this.bulletList.splice(i, 1);
                    i--;
                }
            }
        }
    },

    update: function (deltaTime, MouseEvent, currContext) 
	{
        if(t_countdown.time < 0)
        {
            t_countdown.time = 0;
            this.gameState = States.GAME;
            var self = this;
            addEventListener("click", function () { self.addBullet(wizardXPos, wizardYPos, mousePos); }, false);
			console.log("looping");
			t_countdown.stop();
			
        }

        this.checkCollision();

        for(var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].update(deltaTime);
        }
    },
	
	render: function (currContext) 
	{
        currContext.drawImage(this.assets[backGroundGame], 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
        currContext.drawImage(this.assets[castleImage], 0, 0, castleWidth, castleHeight, castleXPos, castleYPos, castleWidth, castleHeight);
        currContext.drawImage(this.assets[wizardImage], 0, 0, wizardWidth, wizardHeight, wizardXPos, wizardYPos, wizardWidth, wizardHeight);
		currContext.font = "20px Verdana";
        currContext.fillText("Health: " + health, healthXPos, healthYPos);
        currContext.fillText("Enemies remaining: " + enemiesRemaining, enemiesRemainingXPos, enemiesRemainingYPos);
        currContext.fillText("Wave: " + wave, waveXPos, waveYPos);
        currContext.fillText("Score: " + score, scoreX, scoreY);

		if(this.gameState == States.START_GAME_DELAY)
		{
			currContext.font = "72px Georgia";
			currContext.fillText("GAME STARTS IN " + t_countdown.time, 400, 200);
		}
		this.updateWizardAttack(currContext);

		for (var i = 0; i < this.gameObjects.length; ++i)
		{
		    this.gameObjects[i].spriteAnim.render(currContext);
		}

	    //currContext.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
	    //currContext.stroke();

	    // currContext.drawImage(imgDamage, 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);

	    //currContext.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    }
};
