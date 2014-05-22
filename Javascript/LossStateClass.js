var LossStateClass =
{
    canvasWidth: 0,
    canvasHeight: 0,
    assets: undefined,

    init: function (canvasWidth, canvasHeight, assets) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.assets = assets;
    },

    update: function (deltaTime, MouseEvent) 
	{
        //onmousedown, mousepos collisioncheck with image position
		if ((mousePos.x > menuXPos) && (mousePos.x < (menuXPos + menuTextWidth)))
			{
				if ((mousePos.y > menuYPos) && (mousePos.y < (menuYPos + menuTextHeight)))
				{
					currState = Object.create(MainMenuStateClass);
					gameState = States.TITLE;
					currState.init(backGroundWidth, backGroundHeight, this.assets);
				}
			}
                
    },

    render: function (currContext) {
        currContext.drawImage(this.assets[lossScreen], 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
        currContext.drawImage(this.assets[mainMenuImage], 0, 0, menuTextWidth, menuTextHeight, menuXPos, menuYPos, menuTextWidth, menuTextHeight);
    },
};
