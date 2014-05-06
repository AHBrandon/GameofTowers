var RectClass =
{
	x:0,//left side
	y:0,//top
	width:0,
	height:0,
	angle:0, //angle in radians
	
	halfWidth : 0,
	halfHeight : 0,
	
	corners : undefined,
	
	
	init : function(x,y,width,height,angle) 
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.halfWidth = width / 2;
		this.halfHeight = height / 2;
		
		this.initCorners();
	},
	
	initCorners : function()
	{
		this.corners = new Array();
		
		var p11 = Object.create(VectorClass);
		p11.x = -this.halfWidth;
		p11.y = -this.halfHeight;
		
		var p12 = Object.create(p11);
		p12.x = this.halfWidth;
		p12.y = -this.halfHeight;
		
		var p13 = Object.create(p12);
		p13.y = this.halfHeight;
		p13.x = this.halfWidth;
		
		var p14 = Object.create(p13);
		p14.x = -this.halfWidth;
		p14.y = this.halfHeight;
		
		p11.rotate(this.angle);
		p12.rotate(this.angle);
		p13.rotate(this.angle);
		p14.rotate(this.angle);
		
		var pos = Object.create(VectorClass);
		pos.x = this.x + this.halfWidth;
		pos.y = this.y + this.halfHeight;
		
		p11.add(pos);
		p12.add(pos);
		p13.add(pos);
		p14.add(pos);
		
		this.corners.push(p11);
		this.corners.push(p12);
		this.corners.push(p13);
		this.corners.push(p14);
	},
	
	translate : function(x, y)
	{
		this.x += x;
		this.y += y;
		
		var vector = Object.create(VectorClass);
		vector.x = x;
		vector.y = y;
		for(var i = 0; i < 4; ++i)
		{
			this.corners[i].add(vector);
		}
	},
	
	setPos : function(x,y)
	{
		this.x = x;
		this.y = y;
		for(var i = 0; i < 4; ++i)
		{
			this.corners[i].x = x;
			this.corners[i].y = y;
		}
	},
	
	rotate : function(angle)
	{
		this.angle += angle;
					
		var translation = Object.create(VectorClass);
		translation.x = this.x + this.halfWidth;
		translation.y = this.y + this.halfHeight;
		
		for(var i = 0; i < 4; ++i)
		{
			this.corners[i].subtract(translation)
			this.corners[i].rotate(angle);
			this.corners[i].add(translation);
		}
	},
	
	setRotation : function(angle)
	{
		var angleDiff = angle - this.angle;
		this.angle = angle;
		
		var backToOrigin = Object.create(VectorClass);
		backToOrigin.x = -this.x - this.halfWidth;
		backToOrigin.y = -this.y - this.halfHeight;
		
		var translation = Object.create(VectorClass);
		translation.x = this.x + this.halfWidth;
		translation.y = this.y + this.halfHeight;
		
		for(var i = 0; i < 4; ++i)
		{
			corners[i].subtract(backToOrigin)
			corners[i].rotate(angleDiff);
			corners[i].add(translation);
		}
	}
};