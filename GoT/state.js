var GameState =
{
	SPLASH: 1,
	TITLE: 2,
	OPTIONS: 3,
	CREDITS: 4,
	GAME: 5,
	LOSS: 6,
	RESET: 7,
	LVLCHANGE: 8,
	EXIT: 9,
	state: 0
};

function StateHandler(event)
{
	//When a key is pressed, change the Game's State
	GameState.state = GameState.state + 1;
	if (GameState.state > 9)
	{
		GameState.state = 1;
	}
	
	switch(GameState.state)
	{
		case 1:
			drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the SPLASH state",50, 100);
		break;
		
		case 2:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the TITLE state",50,100);
		break;
		
		case 3:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the OPTIONS state",50,100);
		break;
		
		case 4:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the CREDITS state",50,100);
		break;
		
		case 5:

			drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
		
		break;
		
		case 6:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the LOSS state",50,100);
		break;
		
		case 7:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the RESET state",50,100);
		break;
		
		case 8:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the LVLCHANGE state",50,100);
		break;
		
		case 9:
			drawingSurface.clearRect(0,0, canvas.width, canvas.height);
			drawingSurface.font="20px Times Roman";
			drawingSurface.fillText("My game state is in the EXIT state",50,100);
		break;
	}
	
}
		