var MainMenuStateClass =
{
	canvasWidth : 0,
	canvasHeight : 0,
	assets : undefined,
	
	init : function(canvasWidth, canvasHeight, assets)
	{
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.assets = assets;
	},
	
	update : function(deltaTime, MouseEvent)
	{
	    //onmousedown, mousepos collisioncheck with image position
	},
	
	render : function(currContext)
	{
	    currContext.drawImage(this.assets[menu], 0, 0, backGroundWidth, backGroundHeight, 0, 0, backGroundWidth, backGroundHeight);
	    currContext.drawImage(this.assets[play], 0, 0, playWidth, playHeight, playXPos, playYPos, playWidth, playHeight);
		//currContext.rect(playXPos, playYPos, playWidth, playHeight);
	    currContext.drawImage(this.assets[howTo], 0, 0, howToWidth, howToHeight, howToXPos, howToYPos, howToWidth, howToHeight);
		//currContext.rect(howToXPos, howToYPos, howToWidth, howToHeight);
	    currContext.drawImage(this.assets[credits], 0, 0, creditsWidth, creditsHeight, creditsXPos, creditsYPos, creditsWidth, creditsHeight);
		//currContext.rect(creditsXPos, creditsYPos, creditsWidth, creditsHeight);
	    currContext.drawImage(this.assets[quit], 0, 0, quitWidth, quitHeight, quitXPos, quitYPos, quitWidth, quitHeight);
		//currContext.stroke();
	},


	mouseclickchk: function (mousePos) {

	}
};


