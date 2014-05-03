var TimerClass = 
{
	time:0, //the current time in seconds 
	interval:undefined, //the timer object
	
	//starts the timer which will decrement our time each second
	start: function()
	{
		var self = this;
		//1000 is used so specify 1 second.
		this.interval = setInterval(function(){self.tick();}, 1000);
	},
	
	tick: function()
	{
		this.time--;
	},
	
	stop: function()
	{
		clearInterval(this.interval);
	},
	
	reset: function()
	{
		this.time = 0;
	}
};