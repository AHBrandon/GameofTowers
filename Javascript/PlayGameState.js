var t_countdown = Object.create(TimerClass);
var dragonXPos = 0;
var dragonYPos = 0;
var airShipXPos = 0;
var airShipYPos = 0;
var ballistaXPos = 0;
var ballistaYPos = 0;

var enemylist = 
{
	airship: 0,
	ballista: 1,
	flybeast: 2,
};

var PlayGameState =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,
    dragon: undefined,
    airShip: undefined,
    ballista: undefined,

    init: function (canvasWidth, canvasHeight, assets, gameState, bulletList, fireBallList, bombList, arrowList)
	{
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
		this.gameState = gameState;
		this.bulletList = bulletList;
		this.bombList = bombList;
		this.arrowList = arrowList;
		this.fireBallList = fireBallList;
		t_countdown.time = 3;
		t_countdown.start();
		this.dragonArray = new Array();
		this.airShipArray = new Array();
		this.ballistaArray = new Array();
		this.createAirShip(800, 100);
		this.createDragon(205, 300);
		this.createDragon(395, 200);
		this.createBallista(181, 450);
    },
    
    drawFireBall: function (x, y) 
    {
        var newFireBall = Object.create(Bullet);

        newFireBall.init(this.assets[fireballImage], x, y, fireBallWidth, fireBallHeight, 1, 1,
                        100, fireBallXTarget, fireBallYTarget, fireBallWidth, fireBallHeight);
        this.fireBallList.push(newFireBall);
    },
    
    updateDragonAttack: function (currContext)
    {
        for (var i = 0; i < this.fireBallList.length; ++i)
        {
            this.fireBallList[i].updateBullet();
            currContext.drawImage(this.assets[fireballImage], 0, 0, fireBallWidth, fireBallHeight,
			                  this.fireBallList[i].spriteAnim.rect.x, this.fireBallList[i].spriteAnim.rect.y,
							  fireBallWidth, fireBallHeight);
        }
    },

    drawArrow: function (x, y) {
        var newArrow = Object.create(Bullet);

        newArrow.init(this.assets[boltImage], x, y, boltWidth, boltHeight, 1, 1,
                        100, arrowXTarget, arrowYTarget, boltWidth, boltHeight);
        this.arrowList.push(newArrow);
    },

    updateBallistaAttack: function (currContext) {
        for (var k = 0; k < this.arrowList.length; ++k) {
            this.arrowList[k].updateBullet();
            currContext.drawImage(this.assets[boltImage], 0, 0, boltWidth, boltHeight,
			                  this.arrowList[k].spriteAnim.rect.x, this.arrowList[k].spriteAnim.rect.y,
							  boltWidth, boltHeight);
        }
    },

    drawBomb: function (x, y)
    {
        var newBomb = Object.create(Bullet);

        newBomb.init(this.assets[bomb], x, y, bombWidth, bombHeight, 1, 1,
                        100, bombXTarget, bombYTarget, bombWidth, bombHeight);
        this.bombList.push(newBomb);
    },

    updateBombAttack: function (currContext)
    {
        for (var i = 0; i < this.bombList.length; ++i)
        {
            this.bombList[i].updateBullet();
            currContext.drawImage(this.assets[bomb], 0, 0, bombWidth, bombHeight,
			                  this.bombList[i].spriteAnim.rect.x, this.bombList[i].spriteAnim.rect.y,
							  bombWidth, bombHeight);
        }
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
	    this.dragon.init(this.assets[atlas], this.dragonXPos, this.dragonYPos, spriteWidth, spriteHeight, 4, 4, 1000, this.dragonXPos, this.dragonYPos, spriteWidth, spriteHeight, this.assets);
	    this.dragon.spriteAnim.play(true);
	    this.dragonArray.push(this.dragon);
	    ++enemiesRemaining;
	},

	createAirShip: function (x, y)
	{
	    this.airShipXPos = x;
	    this.airShipYPos = y;
	    this.airShip = Object.create(Airship);
	    this.airShip.init(this.assets[atlas], this.airShipXPos, this.airShipYPos, spriteWidth, spriteHeight, 9, 1, 1000, this.airShipXPos, this.airShipYPos, spriteWidth, spriteHeight);
	    this.airShip.spriteAnim.play(true);
	    this.airShipArray.push(this.airShip);
	    ++enemiesRemaining;
	},

	createBallista: function (x, y)
	{
	    this.ballistaXPos = x;
	    this.ballistaYPos = y;
	    this.ballista = Object.create(Ballista);
	    this.ballista.init(this.assets[atlas], this.ballistaXPos, this.ballistaYPos, spriteWidth, spriteHeight, 11, 1, 1000, this.ballistaXPos, this.ballistaYPos, spriteWidth, spriteHeight);
	    this.ballista.spriteAnim.play(true);
	    this.ballistaArray.push(this.ballista);
	    ++enemiesRemaining;
	},

	checkCollision: function() 
	{//check collision between wizard attack and enemies/enemy attacks
	    for (var i = 0; i < this.bulletList.length; ++i)
	    {
	        for (var j = 0; j < this.dragonArray.length; ++j)
	        {
                if (AARectToRectCollision(this.bulletList[i].collisionRect, this.dragonArray[j].collisionRect))
                {
                    this.dragonArray.splice(j, 1);
                    j--;
                    this.bulletList.splice(i, 1);
                    i--;
                    --enemiesRemaining;
                    score = score + 5;
                }
	        }
	        for (var k = 0; k < this.fireBallList.length; ++k)
	        {
	            if (AARectToRectCollision(this.bulletList[i].collisionRect, this.fireBallList[k].collisionRect))
	            {
	                this.fireBallList.splice(k, 1);
	                k--;
	                this.bulletList.splice(i, 1);
	                i--;


	            }
	        }

	        for (var m = 0; m < this.airShipArray.length; ++m) {
	            if (AARectToRectCollision(this.bulletList[i].collisionRect, this.airShipArray[m].collisionRect)) {
	                this.airShipArray.splice(m, 1);
	                m--;
	                this.bulletList.splice(i, 1);
	                i--;
	                --enemiesRemaining;
	                score = score + 5;
	            }
	        }
	        for (var l = 0; l < this.bombList.length; ++l) {
	            if (AARectToRectCollision(this.bulletList[i].collisionRect, this.bombList[l].collisionRect)) {
	                this.bombList.splice(l, 1);
	                l--;
	                this.bulletList.splice(i, 1);
	                i--;


	            }
	        }

	        for (var n = 0; n < this.ballistaArray.length; ++n) {
	            if (AARectToRectCollision(this.bulletList[i].collisionRect, this.ballistaArray[n].collisionRect)) {
	                this.ballistaArray.splice(n, 1);
	                n--;
	                this.bulletList.splice(i, 1);
	                i--;
	                --enemiesRemaining;
	                score = score + 5;
	            }
	        }
	        for (var o = 0; o < this.arrowList.length; ++o) {
	            if (AARectToRectCollision(this.bulletList[i].collisionRect, this.arrowList[o].collisionRect)) {
	                this.arrowList.splice(o, 1);
	                o--;
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
        
        for(var i = 0; i < this.dragonArray.length; ++i)
        {
            this.dragonArray[i].update(deltaTime);
            
            if (this.dragonArray[i].attack === true)
            {           
                this.drawFireBall(this.dragonArray[i].collisionRect.x, this.dragonArray[i].collisionRect.y);
                this.dragonArray[i].attack = false;
            }
        }

        for (var k = 0; k < this.airShipArray.length; ++k) {
            this.airShipArray[k].update(deltaTime);

            if (this.airShipArray[k].attack === true) {
                this.drawBomb(this.airShipArray[k].collisionRect.x, this.airShipArray[k].collisionRect.y);
                this.airShipArray[k].attack = false;
            }
        }
        
        for (var j = 0; j < this.ballistaArray.length; ++j)
        {
            this.ballistaArray[j].update(deltaTime);

            if (this.ballistaArray[j].attack === true)
            {
                this.drawArrow(this.ballistaArray[j].collisionRect.x, this.ballistaArray[j].collisionRect.y);
                this.ballistaArray[j].attack = false;
            }
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

		this.updateDragonAttack(currContext);
		this.updateWizardAttack(currContext);
		this.updateBombAttack(currContext);
		this.updateBallistaAttack(currContext);


		for (var i = 0; i < this.dragonArray.length; ++i)
		{
		    this.dragonArray[i].spriteAnim.render(currContext);
		}

		for (var k = 0; k < this.airShipArray.length; ++k) {
		    this.airShipArray[k].spriteAnim.render(currContext);
		}

		for (var j = 0; j < this.ballistaArray.length; ++j) {
		    this.ballistaArray[j].spriteAnim.render(currContext);
		}
		
	    //currContext.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
	    //currContext.stroke();

	    // currContext.drawImage(imgDamage, 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);

	    //currContext.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    }
};
