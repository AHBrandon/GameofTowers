var splashScreenImage = new Image();
splashScreenImage.src = "Assets/BGs/splashscreen.png";

var SplashScreenStateClass =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,

    init: function (canvasWidth, canvasHeight, assets) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
    },

    update: function (deltaTime, keysPressed) {
        
    },

    render: function (currContext) {
        currContext.drawImage(splashScreenImage, 0, 0, 1440, 900, 0, 0, 1440, 900);
    }
};
