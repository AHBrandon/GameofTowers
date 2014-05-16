var t_countdown = Object.create(TimerClass);
 
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
		this.dragon = Object.create(Dragon);
		this.dragon.init(this.assets[dragonEnemy], dragonXPos, dragonYPos, dragonWidth, dragonHeight, 0, 2, 1000);
		this.gameObjects.push(this.dragon);

		for (var i = 0; i < this.gameObjects.length; ++i)
		{
		    this.gameObjects[i].spriteAnim.play(true);
		}
		
    },
  
	addBullet: function (wizardXPos, wizardYPos, mousePos)
    {
        var newBullet = Object.create(Bullet);

        newBullet.init(this.assets[bulletImage], wizardXPos, wizardYPos, bulletWidth, bulletHeight, 1, 1,
                        100, bulletWidth, bulletHeight, mousePos.x, mousePos.y);
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

    update: function (deltaTime, MouseEvent) 
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

		if(States.START_GAME_DELAY)
		{
			currContext.font = "72px Georgia";
			currContext.fillText("GAME STARTS IN " + t_countdown.time, 400, 200);
		}
		this.updateWizardAttack(currContext);

		for (var i = 0; i < this.gameObjects.length; ++i)
		{
		    this.gameObjects[i].spriteAnim.render(currContext);
		}
		//this.dragon.spriteAnim.render(currContext);
	    //currContext.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
	    //currContext.stroke();

	    // currContext.drawImage(imgDamage, 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);

	    //currContext.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    }
};
