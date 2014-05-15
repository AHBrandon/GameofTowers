// JavaScript source code
$(document).ready(function ()
{
    var canvas = document.getElementById("Canvas");
    var context = canvas.getContext("2d");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var OUTPUT_HEIGHT = 20;
    var CANVAS_WIDTH = 1440;
    var CANVAS_HEIGHT = 900;
    var assetsLoaded = 0; 
    var assetsToLoad = new Array();

    var backgroundImage = new Image();
    backgroundImage.src = "Assets/BGs/Backgroundday.png";
    backgroundImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(backgroundImage);

    var wizard = new Image();
    wizard.src = "Assets/Sprites/wizard.png";
    wizard.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(wizard);

    var bulletList = [];
    var imgBullet = new Image();
    imgBullet.src = "Assets/Sprites/bullet.png";
    imgBullet.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgBullet);

    var castle = new Image();
    castle.src = "Assets/Sprites/Castle.png";
    castle.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(castle);

    var fireBallList = [];
    var imgDragon = new Image();
    imgDragon.src = "Assets/Sprites/wyvern.png"
    imgDragon.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgDragon);

    var imgFireBall = new Image();
    imgFireBall.src = "Assets/Sprites/fireball.png";
    imgFireBall.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgFireBall);

    var imgHealth = new Image();
    imgHealth.src = "Assets/Sprites/HealthRestore.png";
    imgHealth.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgHealth);

    var imgDamage = new Image();
    imgDamage.src = "Assets/Sprites/DamagePowerUp.png";
    imgDamage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgDamage);

    var mainMenuImage = new Image();
    mainMenuImage.src = "Assets/BGs/mainmenu.png";
    mainMenuImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(mainMenuImage);

    var playImage = new Image();
    playImage.src = "Assets/BGs/play.png";
    playImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(playImage);

    var creditsImage = new Image();
    creditsImage.src = "Assets/BGs/credits.png";
    creditsImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(creditsImage);

    var quitImage = new Image();
    quitImage.src = "Assets/BGs/quit.png";
    quitImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(quitImage);

    var howToImage = new Image();
    howToImage.src = "Assets/BGs/howto.png";
    howToImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(howToImage);

    var gameScreen = document.getElementById("gameScreen");

    var output = document.getElementById("output");
    output.style.position = "absolute";
    output.style.top = CANVAS_HEIGHT - OUTPUT_HEIGHT + "px";

    var currState = Object.create(MainMenuStateClass);

    var currState = Object.create(SplashScreenStateClass);
    currState.init(0, canvasWidth, canvasHeight, assetsToLoad);

    addEventListener("click", mouseDownHandler, false);

    var timeCounter = Object.create(TimerClass);

    var player = Object.create(Player);
    //player.init(wizard, wizardXPos, wizardYPos, wizardWidth, wizardHeight, 1, 1, 100, wizardWidth, wizardHeight, wizardXPos, wizardYPos);

    var enemyDragon = Object.create(Dragon);

    var gameObjects = new Array();

    function mouseDownHandler(e)
    {
        //player.attack(e);
    }
    /*
    var dragonTimer = setInterval(onDragonInterval, 3000);	//every three seconds
    function onDragonInterval() {//tell the fire ball to start at the dragon's position and then target the castle, hard coded values for now because of errors...	
        // addfireBall(555, 250, 530, 632);
        enemyDragon.attack(castle);
    }*/

    function gameLoop()
    {
        window.requestAnimationFrame(gameLoop, Canvas);
        //update();
        render();
    }

    gameLoop();

    var timer = 0;

    var previousTime = Date.now();

    function update()
    {
        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();
        timer += deltaTime;

        if (timer > 1)
        {
            timer = -999999; //test hack
            currState = Object.create(GameStateClass);
            currState.init(0, CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
        }
    }

    function hud()
    {
        context.font = "20px Verdana";
        context.fillText("Health: " + health, healthXPos, healthYPos);
        context.fillText("Enemies remaining: " + enemiesRemaining, enemiesRemainingXPos, enemiesRemainingYPos);
        context.fillText("Wave: " + wave, waveXPos, waveYPos);
        context.fillText("Score: " + score, scoreX, scoreY);
        context.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
        context.stroke();

        //to show what the power up will look like when the player gets one. 
        //A blank rectangle is drawn if the player doesn't have a power up.
        context.drawImage(imgDamage, 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);
        context.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    }

    function updateWizardAttack() {
        for (var i = 0; i < bulletList.length; ++i) {
            bulletList[i].updateBullet(wizard);
            context.drawImage(imgBullet, wizard.x, wizard.y, bulletWidth, bulletHeight, bulletList[i].spriteAnim.rect.x, bulletList[i].spriteAnim.rect.y, bulletWidth, bulletHeight);
        }
    }

    function updateDragonAttack() {
        for (var i = 0; i < fireBallList.length; ++i) {
            fireBallList[i].updateFireBall(imgDragon);
            context.drawImage(imgFireBall, imgDragon.x, imgDragon.y, fireBallWidth, fireBallHeight, fireBallList[i].x, fireBallList[i].y, fireBallWidth, fireBallHeight);

        }
    }

    function checkCollision() {
        for (var i = 0; i < bulletList.length; ++i) {
            for (var j = 0; j < fireBallList.length; ++j) {
                if (AARectToRectCollision(bulletList[i].collisionRect, fireBallList[j].collisionRect)) {
                    fireBallList.splice(j, 1);
                    j--;
                    bulletList.splice(i, 1);
                    i--;
                }
            }
        }
    }

    //Increment time
    timeCounter.tick = function () {
        this.time++;
    };

    function dragonRender()
    {/*
        var frameWide = Math.floor(this.imageWidth / this.frameWidth);
        var frameHeight = (this.imageHeight / this.frameHeight);
        var srcx = ((this.startFrame + this.currentFrame) % frameWide) * this.frameWidth;
        var srcy = (Math.floor((this.startFrame + this.currentFrame) / frameWide)) * this.frameHeight;
        context.drawImage(imgDragon, srcx, srcy, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);*/
    }



    function drawCanvas()
    {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        //context.drawImage(backgroundImage, 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
        //context.drawImage(castle, 0, 0, castleWidth, castleHeight, castleXPos, castleYPos, castleWidth, castleHeight);
        //context.drawImage(wizard, 0, 0, wizardWidth, wizardHeight, wizardXPos, wizardYPos, wizardWidth, wizardHeight);
        //context.drawImage(imgDragon, 0, 0, dragonWidth, dragonHeight, dragonXPos, dragonYPos, dragonWidth, dragonHeight);
        currState.render(context);
       // hud();
    }

    timeCounter.start();

    var timer = 0;

    function render() {
        drawCanvas();

        gameScreen.appendChild(Canvas);

        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();
        timer += deltaTime;

        if (timer > 3) {
            timer = -999999; //test hack
            currState = Object.create(MainMenuStateClass);
            currState.init(canvasWidth, canvasHeight, assetsToLoad);
        }

        //updateWizardAttack();

        //updateDragonAttack();

        //doesn't work yet
        //checkCollision();
    }

    function assetLoaded(event)
    {
        assetsLoaded++;
        if (this.assetsLoaded === assetsToLoad.length)
        {
            gameLoaded();
        }
    }

    function gameLoaded()
    {
        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
        gameLoop();
    }
});