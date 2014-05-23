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

var lvlcap = {Lvl01:10, Lvl02:20, Lvl03:30, Lvl04:40,};
var level;
var ispausegen = false;

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
		//this.createAirShip(800, 100);
		//this.createDragon(205, 300);
		//this.createDragon(395, 200);
		//this.createBallista(181, 450);
		
		health = 100;
		
		while (enemiesRemaining < 10)
		{
			var self = this;
			self.rgenemies();
				
		}
			
		level = lvlcap.Lvl01;
		//var self = this;
		//var randomrg = setInterval(function() {self.rgenemies()}, 10000);
		
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
	
	getRandomInt: function (min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	rgenemies: function ()
	{
		var randomnumber=Math.floor(Math.random()*3);
		//console.log(randomnumber);
		
		switch(randomnumber)
		{
			case 0:
			{
				var randomy = this.getRandomInt(10, 250);
				this.createAirShip(10, randomy);
				//add to enemy array				
			}
			break;
			
			case 1:
			{
				var randomy = this.getRandomInt(10, 250);
				this.createDragon(10, randomy);
				//add to enemy array				
			}
			break;
			
			case 2:
			{
				//var randomy = this.getRandomInt( 10, 250);
				this.createBallista(10, 430);
				//add to enemy array				
			}
			break;
			
		}
	},

    
	rPowerUps: function ()
	{
	    var randomnumberP = Math.floor(Math.random() * 6);
        console.log(randomnumberP)
	    if(randomnumberP == 5)
	    {
	        console.log("powerup given");
	        health = health + 25;	        
	        powerUpText = powerUpText + 1;
	    }
	    
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
					score = score + 10;
                    --enemiesRemaining;
					enemiesKilled++;
					this.rPowerUps();
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
					score = score + 5;
	                --enemiesRemaining;
					enemieskilled++;
					this.rPowerUps();
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
					score = score + 3;
	                --enemiesRemaining;
					enemieskilled++;
					this.rPowerUps();
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

	    //check collision on fireballs to castle     
	    for (var k = 0; k < this.fireBallList.length; ++k)
	    {
	        if ((this.fireBallList[k].spriteAnim.rect.x > castleXPos) && (this.fireBallList[k].spriteAnim.rect.x < (castleXPos + castleWidth)))
	        {
	            if ((this.fireBallList[k].spriteAnim.rect.y > castleYPos) && (this.fireBallList[k].spriteAnim.rect.y < (castleYPos + castleHeight)))
	            {
	                this.fireBallList.splice(k, 1);
	                k--;
	                health = health - 5;
	            }
	        }
	    }
        
	    //check collision on arrows to castle     
	    for (var o = 0; o < this.arrowList.length; ++o) {
	        if ((this.arrowList[o].spriteAnim.rect.x > castleXPos) && (this.arrowList[o].spriteAnim.rect.x < (castleXPos + castleWidth))) {
	            if ((this.arrowList[o].spriteAnim.rect.y > castleYPos) && (this.arrowList[o].spriteAnim.rect.y < (castleYPos + castleHeight))) {
	                this.arrowList.splice(o, 1);
	                o--;
	                health = health - 1;
	            }
	        }
	    }

	    //check collision on bombs to castle     
	    for (var l = 0; l < this.bombList.length; ++l) {
	        if ((this.bombList[l].spriteAnim.rect.x > castleXPos) && (this.bombList[l].spriteAnim.rect.x < (castleXPos + castleWidth))) {
	            if ((this.bombList[l].spriteAnim.rect.y > castleYPos) && (this.bombList[l].spriteAnim.rect.y < (castleYPos + castleHeight))) {
	                this.bombList.splice(l, 1);
	                l--;
	                health = health - 3;
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
		
		if (health <= 0)
		{
	
		    health = 0;
			fireBallList.length = 0;
			bombList.length = 0;
			arrowList.length = 0;
			this.bulletList.length = 0;
			this.dragonArray.length = 0;
			this.airShipArray.length = 0;
			this.ballistaArray.length = 0;
			
		    currState = Object.create(LossStateClass);
			gameState = States.LOSS;
			currState.init(backGroundWidth, backGroundHeight, this.assets);
			
		}
     	
		if ((enemiesRemaining + enemiesKilled) < this.Level)
		{
			//draw more enemies.
				
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
        currContext.fillText("Health Power Ups received: " + powerUpText, powerUpTextX, powerUpTextY);
        currContext.drawImage(this.assets[healthPowerUp], 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);
        currContext.fillText("(+25 health)", 65, 840);
		if(this.gameState == States.START_GAME_DELAY)
		{
			currContext.font = "72px Georgia";
			currContext.fillText("GAME STARTS IN " + t_countdown.time, 400, 500);
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
		
	    currContext.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
	    currContext.stroke();

	    //currContext.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    }
};
