function AARectToRectCollision(rect1, rect2)
{
	var vx = rect1.x - rect2.x;
	var vy = rect1 .y - rect2.y;
	var magVx = Math.abs(rect1.x - rect2.x);
	var magVy = Math.abs(rect1.y - rect2.y);
	
	var overlapX = (rect1.halfWidth + rect2.halfWidth) - 
					magVx;
	var overlapY = (rect1.halfHeight + rect2.halfHeight) -
					magVy;
	console.log ("hit");			
	if(overlapX > 0)
	{
		if(overlapY > 0)
		{
			if(overlapY > overlapX)
			{
				if(vx > 0)
				{
					rect1.x += overlapX;
				}
				else
				{
					rect1.x -= overlapX;
				}
			}
			else
			{
				if(vy > 0)
				{
					rect1.y += overlapY;
				}
				else
				{
					rect1.y -= overlapY;
				}
			}
		}
	}
}