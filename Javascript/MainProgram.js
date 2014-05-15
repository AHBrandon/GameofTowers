// JavaScript source code
$(document).ready(function ()
{
    //var canvas = document.getElementById("Canvas");
    //var context = canvas.getContext("2d");
    //var canvasWidth = canvas.width;
    //var canvasHeight = canvas.height;
    var OUTPUT_HEIGHT = 20;
    var CANVAS_WIDTH = 1440;
    var CANVAS_HEIGHT = 900;
    var NUM_CANVAS_ROWS = 1;
    var NUM_CANVAS_COLS = 1;

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

    var howToImage = new Image();
    howToImage.src = "Assets/BGs/howto.png";
    howToImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(howToImage);

    var creditsImage = new Image();
    creditsImage.src = "Assets/BGs/credits.png";
    creditsImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(creditsImage);

    var quitImage = new Image();
    quitImage.src = "Assets/BGs/quit.png";
    quitImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(quitImage);

    var gameScreen = document.getElementById("gameScreen");

    var output = document.getElementById("output");
    output.style.position = "absolute";
    output.style.top = CANVAS_HEIGHT - OUTPUT_HEIGHT + "px";

    var canvasWidth = Math.floor(CANVAS_WIDTH / NUM_CANVAS_COLS);
    var canvasHeight = Math.floor(CANVAS_HEIGHT / NUM_CANVAS_ROWS);

    var canvases = new Array();
	
    var currState = Object.create(SplashScreenStateClass);
    
    var mousePosX;
    var mousePosY;

    currState.init(0, canvasWidth, canvasHeight, assetsToLoad);
    var previousTime = Date.now();

    window.onfocus = function ()
    {
        console.log("Game Of Tower Alpha v1.0");
        previousTime = Date.now();
    };
    
    addEventListener("click", mouseDown, false);
    addEventListener('mousemove', mouseMove, false);


    var timeCounter = Object.create(TimerClass);

    var player = Object.create(Player);
    //player.init(wizard, wizardXPos, wizardYPos, wizardWidth, wizardHeight, 1, 1, 100, wizardWidth, wizardHeight, wizardXPos, wizardYPos);

    var keysPressed = new Array();
    window.addEventListener("keydown", function (event)
    {
        if (event.keyCode < 43)
        {
            event.preventDefault();
        }
        if (keysPressed.indexOf(event.keyCode) === -1)
        {
            keysPressed.push(event.keyCode);
        }
    }, false);

    window.addEventListener("keyup", function (event) 
    {
        var index = keysPressed.indexOf(event.keyCode);
        if (index != -1) 
	    {
            keysPressed.splice(index, 1);
        }
    }, false);

    function mouseDown(e) 
    {

        mousePosX = e.pageX;
        mousePosY = e.pageY;
    
        currState = Object.create(PlayGameStateClass);
        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
        console.log("x: " + mousePosX + " y: "+ mousePosY);

    }

    function mouseMove(e)
    {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
        //console.log("x: " + mousePosX + " y: "+ mousePosY);
    }

    window.addEventListener('mousemove', function (evt) 
    {
        var mousePos = getMousePos(canvases, evt);
    }, false);

    window.addEventListener('onmousedown', function (evt) 
    {
        var mousePos = getMousePos(canvases, evt);
    }, false);

    function getMousePos(canvases, evt)
    {
        for (var i = 0; i < canvases.length; ++i)
        {
            var rect = canvases[i].getBoundingClientRect();
            return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
        }
    }
    
    function mouseDownHandler(e)
    {
        //player.attack(e);
    }
    
    function buildCanvases() 
	{
        for (var row = 0; row < NUM_CANVAS_ROWS; ++row) 
		{
            for (var col = 0; col < NUM_CANVAS_COLS; ++col) 
			{
                var newCanvas = document.createElement("canvas");
                newCanvas.setAttribute("width", canvasWidth);
                newCanvas.setAttribute("height", canvasHeight);
                gameScreen.appendChild(newCanvas);
                newCanvas.style.display = "block";
                newCanvas.style.position = "absolute";
                newCanvas.style.top = row * canvasHeight + "px";
                newCanvas.style.left = col * canvasWidth + "px";
                newCanvas.addEventListener("mousedown", mouseDown, false);

                canvases.push(newCanvas);
            }
        }
    }

    buildCanvases();

    function gameLoop() 
	{
        window.requestAnimationFrame(gameLoop, canvases[0]);
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

        //timer check to move to another state.
        if (timer > 2) 
        {
            //timer = -999999; //test hack
            currState = Object.create(MainMenuStateClass);
            currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
        }
		
    	//calls the update from the respective StateClass file
    	//need to pass in the mouse control for our game.
        currState.update(deltaTime, MouseEvent);
        //check for end game
        if (currState.state != undefined && currState.state ==
           States.GAME_OVER)
        {
            timer = 0;
            currState = Object.create(MainMenuStateClass);
        }

        switch(currState)
        {
            case States.TITLE:
                //update your main menu object
                if ((mousePosX > playImage.x) && (mousePosX < (playImage.x + playImage.width)))
                {
                    if ((mousePosY > playImage.y) && (mousePosY < (playImage.y + playImage.height)))
                    {
                        currState = Object.create(PlayGameStateClass);
                        currState.init();
                    }
                }
            break;
			
            case States.GAME:
            //update your game object
            break;
			
            case States.END_GAME:
            //update the end game object
            break;
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
    function render() 
	{
        var currContext = canvases[0].getContext("2d");
        currContext.clearRect(0, 0, canvasWidth, canvasHeight);

        currState.render(currContext);

        /*switch(currState)
        {
        case States.MAIN_MENU:
        //render your main menu object
        break;
			
        case States.GAME:
        //render your game object
        break;
			
        case States.END_GAME:
        //render the end game object
        break;
        }*/
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