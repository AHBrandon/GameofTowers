// JavaScript source code
var SplashscreenStateClass =
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

    update: function (deltaTime, keysPressed) {
        console.log("Splash screen Update");
    },

    render: function (currContext) {
        currContext.fillStyle = "rgb(0,0,0)"
        currContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        context.drawImage(this.healthBG, 0, 0, this.healthBarWidth, 32, 0, 0, 256, 32);
    }
};