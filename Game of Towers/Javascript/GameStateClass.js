var SPRITE_ATLAS = 0;
var BACKGROUND_IMAGE = 1;

var GameStateClass =
{
    States:
	{
	    START: 0,
	    RUNNING: 1,
	    PAUSE: 2
	},

    States:
    {
        MAIN_MENU : 0,
        GAME : 1,
        END_GAME: 2,
        OPTIONS: 3,
        CREDITS: 4,
        RESET: 5,
        LVLCHANGE: 6,
        EXIT: 7,
    },

    PLAYER_START_X: 200,
    PLAYER_START_Y: 200,

    gameObjects: undefined,
    player: undefined,
    level: undefined,


    testAI: undefined,

    init: function (id, canvasWidth, canvasHeight, assets)
    {
        /*
        this.gameObjects = new Array();
        this.player = Object.create(PlayerClass);
        this.testAI = Object.create(PlatformEnemy);



        //this.gameObjects.push(this.player);

   
        this.loadGameObjects(assets);

       this.testAI.init(this.level, assets[SPRITE_ATLAS], 32,
			        256, 64, 64, 1, 1, 1000, 32,
			        256, 64, 64);
                    
        this.gameObjects.push(this.testAI);

        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].spriteAnim.play(true);
        }
        this.player.spriteAnim.play(true);
        */
    },

    loadGameObjects: function (assets)
    {/*
        for (var i = 0; i < this.level.gameObjects.length; ++i)
        {
            var currData = this.level.gameObjects[i];
            switch (currData.type)
            {
               /* case GameObjectData.PLAYER:
                    this.player.init(assets[wiza], currData.x,
			        currData.y, 64, 64, 0, 1, 1000, currData.x,
			        currData.y, 64, 64);
                    break;*/

                /*case GameObjectData.ENEMY_HEDGEHOG:
                    this.testAI.init(this.level, assets[SPRITE_ATLAS], currData.x,
			        currData.y, 64, 64, 1, 1, 1000, currData.x,
			        currData.y, 64, 64);
                    break;
            }
        }*/

    },

    update: function (deltaTime, keys)
    {
       

        /*
        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].update(deltaTime);
        }

       

        this.checkLevelCollision();
        */
 
    },

    checkLevelCollision: function ()
    {

        

    },

    render: function (context)
    {
       /* context.save();
      

        this.level.render(context);
        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].spriteAnim.render(context);
        }
        this.player.spriteAnim.render(context);
        context.restore();*/
    }

};