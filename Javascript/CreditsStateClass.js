var CreditsStateClass =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,

    init: function (canvasWidth, canvasHeight, assets) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
    },

    update: function (deltaTime, MouseEvent) {
        //onmousedown, mousepos collisioncheck with image position
    },

    render: function (currContext) {
        currContext.drawImage(this.assets[creditsScreen], 0, 0, creditsScreenWidth, creditsScreenHeight, 0, 0, creditsScreenWidth, creditsScreenHeight);
        currContext.drawImage(this.assets[mainMenuImage], 0, 0, menuTextWidth, menuTextHeight, menuXPos, menuYPos, menuTextWidth, menuTextHeight);
    },
};

