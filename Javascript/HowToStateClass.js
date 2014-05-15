var HowToStateClass =
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
        currContext.drawImage(this.assets[howToPlayScreen], 0, 0, howToWidth, howToHeight, 0, 0, howToWidth, howToHeight);
        currContext.drawImage(this.assets[mainMenuImage], 0, 0, menuTextWidth, menuTextHeight, menuXPos, menuYPos, menuTextWidth, menuTextHeight);
    },
};

