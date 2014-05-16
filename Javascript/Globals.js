var assetsToLoad = new Array();

var mousePos = 
{
	x: 0,
	y: 0,
};

var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

var PLAYER_START_HEALTH = 50;
var PLAYER_FLASH_LENGTH = 3;
var PLAYER_DEATH_TIME = 3;
var PLAYER_DEAD_FRAME_INDEX;

var wizardImage = 1;
var wizardWidth = 51;
var wizardHeight = 35;
var wizardXPos = 710;
var wizardYPos = 600;

var bulletImage=2;
var bulletWidth = 17;
var bulletHeight = 18;

var fireballImage=5;
var fireBallWidth = 55;
var fireBallHeight = 77;

var backGroundGame = 0;
var backGroundWidth = 1440;
var backGroundHeight = 900;

var castleImage = 3;
var castleWidth = 388;
var castleHeight = 270;
var castleXPos = 530;
var castleYPos = 632;

var dragonEnemy = 4;
var dragonWidth = 220;
var dragonHeight = 536;
var dragonXPos = 395;
var dragonYPos = 200;

var dragonSpriteAnimHeight = 134;

var timeXPos = 7;
var timeYPos = 724;

var enemiesRemaining = 0;
var enemiesRemainingXPos = 7;
var enemiesRemainingYPos = 697;

var health = 100;
var healthXPos = 7;
var healthYPos = 670;

var wave = 0;
var waveXPos = 7;
var waveYPos = 724;

var score = 0;
var scoreX = 7;
var scoreY = 751;

var powerUpX = 7;
var powerUpY = 806;
var powerUpWidth = 50;
var powerUpHeight = 50;

var menu = 8;

var play = 9;
var playXPos = 561;
var playYPos = 274;
var playWidth = 395;
var playHeight = 84;

var howTo = 10;
var howToXPos = 525;
var howToYPos = 388;
var howToWidth = 480;
var howToHeight = 84;

var credits = 11;
var creditsXPos = 600;
var creditsYPos = 500;
var creditsWidth = 301;
var creditsHeight = 84;

var quit = 12;
var quitXPos = 640;
var quitYPos = 610;
var quitWidth = 204;
var quitHeight = 83;

var howToPlayScreen = 13;

var mainMenuImage = 14;
var menuXPos = 800;
var menuYPos = 656;
var menuTextWidth = 461;
var menuTextHeight = 83;

var creditsScreen = 15;


