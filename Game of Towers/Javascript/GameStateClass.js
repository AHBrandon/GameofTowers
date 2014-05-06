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

    PLAYER_START_X: 200,
    PLAYER_START_Y: 200,

    gameObjects: undefined,
    player: undefined,
    level: undefined,
    camera: undefined,

    testAI: undefined,

    init: function (id, canvasWidth, canvasHeight, assets)
    {
        this.gameObjects = new Array();
        this.player = Object.create(PlayerClass);
        this.testAI = Object.create(PlatformEnemy);



        //this.gameObjects.push(this.player);

        this.level = Object.create(LevelClass);
        this.level.init(assets[SPRITE_ATLAS], 0, 0, 1800, 1396, id);
        this.loadGameObjects(assets);

        /*this.testAI.init(this.level, assets[SPRITE_ATLAS], 32,
			        256, 64, 64, 1, 1, 1000, 32,
			        256, 64, 64);
                    */
        this.gameObjects.push(this.testAI);



        this.camera = Object.create(CameraClass);
        this.camera.x = 0;
        this.camera.y = 0;
        this.camera.width = canvasWidth;
        this.camera.height = canvasHeight;

        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].spriteAnim.play(true);
        }
        this.player.spriteAnim.play(true);
    },

    loadGameObjects: function (assets)
    {
        for (var i = 0; i < this.level.gameObjects.length; ++i)
        {
            var currData = this.level.gameObjects[i];
            switch (currData.type)
            {
                case GameObjectData.PLAYER:
                    this.player.init(assets[SPRITE_ATLAS], currData.x,
			        currData.y, 64, 64, 0, 1, 1000, currData.x,
			        currData.y, 64, 64);
                    break;

                case GameObjectData.ENEMY_HEDGEHOG:
                    this.testAI.init(this.level, assets[SPRITE_ATLAS], currData.x,
			        currData.y, 64, 64, 1, 1, 1000, currData.x,
			        currData.y, 64, 64);
                    break;
            }
        }
    },

    update: function (deltaTime, keys)
    {
        this.player.vx += this.level.gravity.x * deltaTime;
        this.player.vy += this.level.gravity.y * deltaTime;
        this.player.updateVelocity(keys);
        this.player.update(deltaTime);
        this.camera.update(this.player);
        this.camera.clampLevel(this.level);

        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].update(deltaTime);
        }

        this.clampGameObjectInLevel(this.player);

        this.checkLevelCollision();

        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            var side = AARectToRectCollision(this.player.collisionRect,
                                  this.gameObjects[i].collisionRect);
            if (side == "bottom")
            {
                this.player.vy = -100;
                this.gameObjects.splice(i, 1);
                i--;
                continue;
            }
            else
            {
                if (side != "none")
                {
                    console.log("damaged player");
                }
            }
        }
    },

    checkLevelCollision: function ()
    {

        for (var i = 0; i < this.level.collisionRects.length; ++i)
        {

            var side = AARectToRectCollision(this.player.collisionRect,
                                  this.level.collisionRects[i]);
            if (side == "bottom")
            {
                this.player.vy = 0;
                this.player.grounded = true;
            }
            else if (side == "top")
            {
                this.player.vy = 0;
            }
            this.player.spriteAnim.rect.setPos(this.player.collisionRect.x, this.player.collisionRect.y);

        }

    },


    clampGameObjectInLevel: function (gameObject)
    {
        gameObject.spriteAnim.rect.x =
				clamp(gameObject.spriteAnim.rect.x, this.level.left,
					this.level.right - gameObject.spriteAnim.rect.width);

        gameObject.spriteAnim.rect.y =
				clamp(gameObject.spriteAnim.rect.y, this.level.top,
					 this.level.bottom - gameObject.spriteAnim.rect.height);

        gameObject.collisionRect.x = gameObject.spriteAnim.rect.x;
        gameObject.collisionRect.y = gameObject.spriteAnim.rect.y;
    },

    render: function (context)
    {
        context.save();
        context.translate(-Math.floor(this.camera.x), -Math.floor(this.camera.y));

        this.level.render(context);
        for (var i = 0; i < this.gameObjects.length; ++i)
        {
            this.gameObjects[i].spriteAnim.render(context);
        }
        this.player.spriteAnim.render(context);
        context.restore();
    }

};