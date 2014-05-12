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

    var castle = new Image();
    castle.src = "Assets/Sprites/Castle.png";
    castle.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(castle);

    var wizard = new Image();
    wizard.src = "Assets/Sprites/wizard.png";
    wizard.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(wizard);

    var imgDragon = new Image();
    imgDragon.src = "Assets/Sprites/wyvern.png"
    imgDragon.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgDragon);

    var imgBullet = new Image();
    imgBullet.src = "Assets/Sprites/bullet.png";
    imgBullet.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(imgBullet);

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

    var gameScreen = document.getElementById("gameScreen");

    var output = document.getElementById("output");
    output.style.position = "absolute";
    output.style.top = CANVAS_HEIGHT - OUTPUT_HEIGHT + "px";

    var currState = Object.create(MainMenuStateClass);

    //var currState = Object.create(SplashScreenStateClass);
    
    addEventListener("click", mouseDownHandler, false);

    var bulletList = [];
    var fireBallList = [];

    var timeCounter = Object.create(TimerClass);


    function mouseDownHandler(e)
    {
        var newBullet = Object.create(Bullet);

        newBullet.init(imgBullet, wizardXPos, wizardYPos, 17, 18, 1, 1,
                        100, bulletWidth, bulletHeight, e.pageX, e.pageY);
        bulletList.push(newBullet);
    }

    

    function gameLoop()
    {
        window.requestAnimationFrame(gameLoop, Canvas);
        update();
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

    function updateWizardAttack() {
        for (var i = 0; i < bulletList.length; ++i) {
            bulletList[i].updateBullet(wizard);
            context.drawImage(imgBullet, wizard.x, wizard.y, bulletWidth, bulletHeight, bulletList[i].spriteAnim.rect.x, bulletList[i].spriteAnim.rect.y, bulletWidth, bulletHeight);
        }
    }

    function updateDragonAttack() {
        for (var i = 0; i < fireBallList.length; ++i) {
            updatefireBall(fireBallList[i], imgDragon);
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

    function drawCanvas() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.font = "20px Verdana";
        context.drawImage(backgroundImage, 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
        context.drawImage(castle, 0, 0, castleWidth, castleHeight, castleXPos, castleYPos, castleWidth, castleHeight);
        context.drawImage(wizard, 0, 0, wizardWidth, wizardHeight, wizardXPos, wizardYPos, wizardWidth, wizardHeight);
        context.drawImage(imgDragon, 0, 0, dragonWidth, dragonHeight, dragonXPos, dragonYPos, dragonWidth, dragonHeight);
        context.fillText("Health: " + health, healthXPos, healthYPos);
        context.fillText("Enemies remaining: " + enemiesRemaining, enemiesRemainingXPos, enemiesRemainingYPos);
        context.fillText("Wave: " + wave, waveXPos, waveYPos);
        context.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
        context.stroke();

        //to show what the power up will look like when the player gets one. 
        //A blank rectangle is drawn if the player doesn't have a power up.
        context.drawImage(imgHealth, 0, 0, powerUpWidth, powerUpHeight, powerUpX, powerUpY, powerUpWidth, powerUpHeight);
        context.fillText("Time: " + timeCounter.time + " seconds", timeXPos, timeYPos);
    }

    timeCounter.start();

    function render() {
        drawCanvas();

        gameScreen.appendChild(Canvas);

        updateWizardAttack();

        updateDragonAttack();

        //doesn't work yet
        //checkCollision();
    }

    //test code to show what the dragon will do
    var interval = setInterval(onInterval, 3000);	//every three seconds
    function onInterval() {//tell the fire ball to start at the dragon's position and then target the castle, hard coded values for now because of errors...	
       // addfireBall(555, 250, 530, 632);
        var newFireBall = Object.create(FireBall);

        newFireBall.init(imgFireBall, dragonXPos, dragonYPos, dragonWidth, dragonWidth, 1, 1,
                        100, dragonWidth, dragonWidth, castleXPos, castleYPos);
        fireBallList.push(newFireBall);
    }

    function assetLoaded(event)
    {
        assetsLoaded++;
        if (assetsLoaded === assetsToLoad.length)
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