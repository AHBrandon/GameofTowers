 var t_countdown = Object.create(TimerClass);
 
var PlayGameState =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,

    init: function (canvasWidth, canvasHeight, assets, gameState, bulletList) 
	{
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
		this.gameState = gameState;
		this.bulletList = bulletList;
		t_countdown.time = 5;
		t_countdown.start();
    },
	
	addBullet: function (wizardXPos, wizardYPos, mousePos)
    {
        var newBullet = Object.create(Bullet);

        newBullet.init(this.assets[bulletImage], wizardXPos, wizardYPos, bulletWidth, bulletHeight, 1, 1,
                        100, bulletWidth, bulletHeight, mousePos.x, mousePos.y);
        this.bulletList.push(newBullet);
    },
	
	updateWizardAttack: function () 
	{
        for (var i = 0; i < this.bulletList.length; ++i) 
		{
            this.bulletList[i].updateBullet(wizard);
            currContext.drawImage(this.assets[bulletImage], wizard.x, wizard.y, bulletWidth, bulletHeight, 
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
			addEventListener("click", this.addBullet(wizardXPos, wizardYPos, mousePos), false);
			this.updateWizardAttack();
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
        currContext.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
        currContext.stroke();

       // currContext.drawImage(imgDamage, 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);
	   
        //currContext.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
		
		if (States.START_GAME_DELAY)
		{
			currContext.font = "72px Georgia";
			currContext.fillText("GAME STARTS IN " + t_countdown.time, 400, 200);
		}
    },
};
