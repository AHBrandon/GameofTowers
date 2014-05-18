/*
	This class represents a sprite animation. It contains the data 
	and functionality necessary to render and play a sprite animation
	to a canvas 2d context.
*/
var SpriteAnimClass =
{
	image: undefined,
	rect: undefined,
	srcX: 0, //the current left pixel to start copying pixels from in the 
			 //source image
	srcY: 0, //the current top pixel to start copying pixels from in the source
			 //image
			 
	frameWidth:384, //the frame width will be the same width in the source image
					//as the width of the displayed anim on the canvas (in pixels)
	frameHeight:466,//the frame height will be the same height in the source image
					//as the height of the displayed anim on the canvas (in pixels)
	
	//half the width and height as the frame width / height
	halfWidth :0,
	halfHeight:0,
	
	//number of frames wide / high in the sprite sheet (image)
	framesWide: 4,
	framesHigh: 5,
	
	imageWidth: 0,
	imageHeight:0,
	
	//offset to the first frame of the anim. The frame index starts at the top left
	//and works left to right / top to bottom.
	startFrame: 0,
	currentFrame : 0,
	numFrames: 0,
	frameRate: 64, //number of milliseconds between frame switches
	loop: true,
	isPlaying: false,
	visible: true,
	alpha: 1,
	timer: undefined,
	
	//update the source x and y variables based on the current frame being rendered.
	updateFrameCoords : function()
	{
		this.srcX = ((this.startFrame + this.currentFrame)%this.framesWide) * 
					this.frameWidth;
		this.srcY = Math.floor((this.startFrame + this.currentFrame)/ 
					this.framesWide) * this.frameHeight;		
	},
	
	//Initialize the sprite anim. Sets the image, image dimensions, sprite anim 
	//settings (num frames, start frame, framerate etc..). Also, inits the 
	//source x and y location based on the anim settings.
	init: function(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate)
	{
		this.image = image;
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.framesWide = Math.floor(this.image.width / this.frameWidth);
		this.framesHigh = Math.floor(this.image.height / this.frameHeight);
		this.imageWidth = image.width;
		this.imageHeight = image.height;
		this.startFrame = startFrame;
		this.numFrames = numFrames;
		this.frameRate = frameRate;
		this.halfWidth = Math.ceil(this.frameWidth / 2);
		this.halfHeight = Math.ceil(this.frameHeight / 2);
		this.updateFrameCoords();
		this.rect = Object.create(RectClass);
		this.rect.init(x, y, frameWidth, frameHeight, 0);
	},
	
	//plays the anim. Starts the actual timer which updates the anim.
	play: function(loop)
	{
		this.isPlaying = true;
		this.loop = loop;
		var self = this;
		this.timer = setTimeout(function(){self.updateAnimation();}, this.frameRate);
	},
	
	stop : function(reset)
	{
		if(this.isPlaying)
		{
			this.isPlaying = false;
			if(reset)
			{
				this.currentFrame = 0;
				updateFrameCoords();
			}
			
			clearTimer(this.timer);
		}
	},
	
	
	updateAnimation: function()
	{
		this.currentFrame++;
		if(this.currentFrame >= this.numFrames)
		{
			if(this.loop)
			{
				this.currentFrame = 0;
			}
			else
			{
				this.isPlaying = false;
				this.currentFrame--;
			}
		}
		
		this.updateFrameCoords();
		if(this.isPlaying)
		{
			var self = this;
			this.timer = setTimeout(function(){self.updateAnimation();}, this.frameRate);
		}
	},
	
	render: function(currContext)
	{
		if(this.visible)
		{
			currContext.save();
			currContext.translate(this.rect.x + this.rect.halfWidth, 
								  this.rect.y + this.rect.halfHeight);
			currContext.rotate(this.rect.angle);
			currContext.globalAlpha = this.alpha;
			currContext.drawImage(this.image, 
								//source rect (x,y,width,height)
								this.srcX, this.srcY, this.frameWidth, this.frameHeight,
								//destination rect(x,y,width,height)
								-this.rect.halfWidth,-this.rect.halfHeight, 
								this.rect.width, this.rect.height);
			currContext.restore();
		}
	}
};