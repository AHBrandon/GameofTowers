// JavaScript source code
$(document).ready(function () {
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

    var gameScreen = document.getElementById("gameScreen");

    var output = document.getElementById("output");
    output.style.position = "absolute";
    output.style.top = CANVAS_HEIGHT - OUTPUT_HEIGHT + "px";

    var currState = Object.create(MainMenuStateClass);

    function mouseDownHandler(e) 
    {
        addBullet(wizardXPos, wizardYPos, e.pageX, e.pageY);
    }

    function gameLoop()
    {
        window.requestAnimationFrame(gameLoop, Canvas);
        update();
        render();
    }
    gameLoop();
    addEventListener("mousedown", mouseDownHandler, false);

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

    function render()
    {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(backgroundImage, 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
        context.drawImage(castle, 0, 0, castleWidth, castleHeight, castleXPos, castleYPos, castleWidth, castleHeight);
        context.drawImage(wizard, 0, 0, wizardWidth, wizardHeight, wizardXPos, wizardYPos, wizardWidth, wizardHeight);
        context.drawImage(imgDragon, 0, 0, dragonWidth, dragonHeight, dragonXPos, dragonYPos, dragonWidth, dragonHeight);

        for (var i = 0; i < bulletList.length; ++i)
        {
            updateBullet(bulletList[i], wizard);
            context.drawImage(imgBullet, wizard.x, wizard.y, bulletWidth, bulletHeight, bulletList[i].x, bulletList[i].y, bulletWidth, bulletHeight);
        }

        for (var i = 0; i < fireBallList.length; ++i)
        {
            updatefireBall(fireBallList[i], imgDragon);
            context.drawImage(imgFireBall, imgDragon.x, imgDragon.y, fireBallWidth, fireBallHeight, fireBallList[i].x, fireBallList[i].y, fireBallWidth, fireBallHeight);

        }

        for (var i = 0; i < bulletList.length; ++i)
        {
            for (var j = 0; j < fireBallList.length; ++j)
            {
                if (AARectToRectCollision(bulletList[i], fireBallList[j]))
                {
                    fireBallList.splice(j, 1);
                    j--;
                    bulletList.splice(i, 1);
                    i--;
                }
            }
        }
    }

    var interval = setInterval(onInterval, 3000);	//every three seconds
    function onInterval() {//tell the fire ball to start at the dragon's position and then target the castle, hard coded values for now because of errors...	
        addfireBall(555, 250, 530, 632);
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