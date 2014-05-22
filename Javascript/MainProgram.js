// JavaScript source code
$(document).ready(function ()
{
    var canvas = document.getElementById("Canvas");
    var context = canvas.getContext("2d");
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
    var spriteAtlas = new Image();
    spriteAtlas.src = "Assets/Sprites/spriteatlas.png"
    spriteAtlas.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(spriteAtlas);

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

    var howToBackGround = new Image();
    howToBackGround.src = "Assets/BGs/HowtoScreen.png";
    howToBackGround.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(howToBackGround);

    var menuImage = new Image();
    menuImage.src = "Assets/BGs/menu.png";
    menuImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(menuImage);

    var creditsImage = new Image();
    creditsImage.src = "Assets/BGs/CreditsPage.png";
    creditsImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(creditsImage);

    var bombImage = new Image();
    bombImage.src = "Assets/Sprites/bomb.png";
    bombImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(bombImage);

    var boltImage = new Image();
    boltImage.src = "Assets/Sprites/bolt.png";
    boltImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(boltImage);

    var lossImage = new Image();
    lossImage.src = "Assets/BGs/lossbackground.png";
    lossImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(lossImage);

    var music = new Audio("Assets/music.mp3");
    music.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    music.volume = 0.2;
    assetsToLoad.push(music);
    assetsLoaded++;
    music.play();

    var gameScreen = document.getElementById("gameScreen");

    var output = document.getElementById("output");
    output.style.position = "absolute";
    output.style.top = CANVAS_HEIGHT - OUTPUT_HEIGHT + "px";

    var canvasWidth = Math.floor(CANVAS_WIDTH / NUM_CANVAS_COLS);
    var canvasHeight = Math.floor(CANVAS_HEIGHT / NUM_CANVAS_ROWS);

    var canvases = new Array();
	
    var currState = Object.create(SplashScreenStateClass);
    var gameState = States.SPLASH;
    currState.init(0, canvasWidth, canvasHeight, assetsToLoad);
	
    var previousTime = Date.now();

    window.onfocus = function ()
    {
        console.log("Game Of Tower Alpha v1.0");
        previousTime = Date.now();
    };
    
    addEventListener("click", mouseDownHandler, false);
    addEventListener("click", mouseDown, false);

    var keysPressed = new Array();

    window.addEventListener("keydown", function (event)
    {
       
    }, false);

    window.addEventListener("keyup", function (event) 
    {
        
    }, false);

    function mouseDownHandler(event) 
    {
        for (var i = 0; i < canvases.length; ++i) 
	{
            if (canvases[i] === event.target) 
	    {
            }
        }
    }
    
    function mouseDown(e)
    {
        //player.attack(e);
		mousePos.x = e.pageX;
		mousePos.y = e.pageY;
		console.log("x: " + mousePos.x + " y: " + mousePos.y);
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
                newCanvas.addEventListener("mousedown", mouseDownHandler, false);

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
        if (timer > 3) 
        {
            timer = -999999; //test hack
            currState = Object.create(MainMenuStateClass);
            gameState = States.TITLE;
            currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
        }
		
    	//calls the update from the respective StateClass file
        currState.update(deltaTime, MouseEvent);
		
        //check for end game
        if (currState.state != undefined && currState.state ==
           States.GAME_OVER)
        {
            timer = 0;
            currState = Object.create(MainMenuStateClass);
            currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);	   
        }

        switch(gameState)
        {
            case States.TITLE:
                //update your main menu object
                if ((mousePos.x > playXPos) && (mousePos.x < (playXPos + playWidth)))
                {
                    if ((mousePos.y > playYPos) && (mousePos.y < (playYPos + playHeight)))
                    {
                        currState = Object.create(PlayGameState);
                        gameState = States.START_GAME_DELAY;
                        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad, gameState, bulletList, fireBallList, bombList, arrowList);
                    }
                }
				
                if ((mousePos.x > howToXPos) && (mousePos.x < (howToXPos + howToWidth)))
                {
                    if ((mousePos.y > howToYPos) && (mousePos.y < (howToYPos + howToHeight)))
                    {
                        currState = Object.create(HowToStateClass);
                        gameState = States.HOWTO;
                        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
                    }
                }
				
                if ((mousePos.x > creditsXPos) && (mousePos.x < (creditsXPos + creditsWidth)))
                {
                    if ((mousePos.y > creditsYPos) && (mousePos.y < (creditsYPos + creditsHeight)))
                    {
                        currState = Object.create(CreditsStateClass);
                        gameState = States.CREDITS;
                        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
                    }
                }
                break;

            case States.HOWTO:
                if ((mousePos.x > menuXPos) && (mousePos.x < (menuXPos + menuTextWidth)))
                {
                    if ((mousePos.y > menuYPos) && (mousePos.y < (menuYPos + menuTextHeight)))
                    {
                        currState = Object.create(MainMenuStateClass);
                        gameState = States.TITLE;
                        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
                    }
                }
                break;
                
            case States.CREDITS:
                if ((mousePos.x > menuXPos) && (mousePos.x < (menuXPos + menuTextWidth))) {
                    if ((mousePos.y > menuYPos) && (mousePos.y < (menuYPos + menuTextHeight))) {
                        currState = Object.create(MainMenuStateClass);
                        gameState = States.TITLE;
                        currState.init(CANVAS_WIDTH, CANVAS_HEIGHT, assetsToLoad);
                    }
                }
                break;

            case States.GAME:
			
				currState.update(deltaTime, MouseEvent, context);
                break;
            
        }
    }

    function render() 
	{
        var currContext = canvases[0].getContext("2d");
        currContext.clearRect(0, 0, canvasWidth, canvasHeight);
        currState.render(currContext);
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