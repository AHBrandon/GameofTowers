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
	
	update : function(deltaTime, keysPressed)
	{
		console.log("Loss Screen Update");
	},
	
	render : function(currContext)
	{
		currContext.fillStyle = "rgb(0,0,0)"
		currContext.fillRect(0,0, this.canvasWidth, this.canvasHeight);
	}
};