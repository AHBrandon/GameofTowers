 var timeCounter = Object.create(TimerClass);
 
var PlayGameState =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,

    init: function (canvasWidth, canvasHeight, assets) 
	{
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
    },

    update: function (deltaTime, MouseEvent) 
	{
        timeCounter.tick;
    },    
	
    render: function (currContext) {
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
	   
        currContext.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    },
};
/*
timeCounter : function () 
{
    this.time++;
},*/