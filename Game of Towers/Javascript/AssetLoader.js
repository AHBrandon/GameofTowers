// JavaScript source code
$(document).ready(function () {
    var CANVAS_WIDTH = 2000;
    var CANVAS_HEIGHT = 650;
    var OUTPUT_HEIGHT = 20;
    var NUM_CANVAS_ROWS = 1;
    var NUM_CANVAS_COLS = 2;

    var assetsLoaded = 0;
    var assetsToLoad = new Array();

    //var spriteAtlas = new Image();
    //spriteAtlas.src = "Assets/Images/hedgehogApocalypse.png";
    //spriteAtlas.addEventListener("load", assetLoaded, false);
    //assetsToLoad.push(spriteAtlas);

    var backgroundImage = new Image();
    backgroundImage.src = "Assets/BGs/BG-Day-6500x5000.png";
    backgroundImage.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(backgroundImage);

    var Castle = new Image();
    Castle.src = "Assets/Sprites/Castle.png";
    Castle.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(Castle);

    var wizard = new Image();
    wizard.src = "Assets/Sprites/wizard2.png";
    wizard.addEventListener("load", assetLoaded, false);
    assetsToLoad.push(wizard);

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

    var canvasWidth = Math.floor(CANVAS_WIDTH / NUM_CANVAS_COLS);
    var canvasHeight = Math.floor(CANVAS_HEIGHT / NUM_CANVAS_ROWS);

    var canvases = new Array();

    var currState = Object.create(MainMenuStateClass);

    var keysPressed = new Array();
    window.addEventListener("keydown", function (event) {

        if (event.keyCode < 43) {
            event.preventDefault();
        }
        if (keysPressed.indexOf(event.keyCode) === -1) {
            keysPressed.push(event.keyCode);
        }
    }, false);

    window.addEventListener("keyup", function (event) {
        var index = keysPressed.indexOf(event.keyCode);
        if (index != -1) {
            keysPressed.splice(index, 1);
        }
    }, false);

    function mouseDownHandler(event) {
        for (var i = 0; i < canvases.length; ++i) {
            if (canvases[i] === event.target) {
            }
        }
    }

    function buildCanvases() {
        for (var row = 0; row < NUM_CANVAS_ROWS; ++row) {
            for (var col = 0; col < NUM_CANVAS_COLS; ++col) {
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

    function gameLoop() {
        window.requestAnimationFrame(gameLoop, canvases[0]);
        update();
        render();
    }
    gameLoop();

    var timer = 0;

    var previousTime = Date.now();
    function update() {
        var deltaTime = (Date.now() - previousTime) / 1000;
        previousTime = Date.now();
        timer += deltaTime;

        if (timer > 1) {
            timer = -999999; //test hack
            currState = Object.create(GameStateClass);
            currState.init(0, canvasWidth, canvasHeight, assetsToLoad);
        }

        currState.update(deltaTime, keysPressed);


        /*switch(currState)
        {
        case States.MAIN_MENU:
        //update your main menu object
        break;
			
        case States.GAME:
        //update your game object
        break;
			
        case States.END_GAME:
        //update the end game object
        break;
        }*/
    }

    function render() {
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

    function assetLoaded(event) {
        assetsLoaded++;
        if (assetsLoaded === assetsToLoad.length) {
            gameLoaded();
        }
    }

    function gameLoaded() {
        currState.init(canvasWidth, canvasHeight, assetsToLoad);
        gameLoop();
    }
});