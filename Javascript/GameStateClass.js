

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
    state: undefined,

    endLevelRect: undefined,

    healthBG: undefined,
    healthFG: undefined,
    healthTransition: undefined,
    healthBarRatio: 1.0,

    healthBarWidth: 246,
    healthBarTransWidth: 246,
    lastHealthTranisition: 246, // the start width of the transition
    // the health bar is taking

    init: function (id, canvasWidth, canvasHeight, assets) {
        this.state = States.DEFAULT;
        this.healthBG = assets[HEALTH_BG];
        this.healthFG = assets[HEALTH_FG];
        this.healthTransition = assets[HEALTH_TRANSITION];

        this.gameObjects = new Array();
        this.player = Object.create(PlayerClass);
        this.gameObjects.push(this.player);

        this.level = Object.create(LevelClass);
        this.level.init(assets[SPRITE_ATLAS], 0, 0, 1800, 1396, id);
        this.loadGameObjects(assets);

        this.camera = Object.create(CameraClass);
        this.camera.x = 0;
        this.camera.y = 0;
        this.camera.width = canvasWidth;
        this.camera.height = canvasHeight;

        for (var i = 0; i < this.gameObjects.length; ++i) {
            this.gameObjects[i].spriteAnim.play(true);
        }
        this.player.spriteAnim.play(true);
    },

    loadGameObjects: function (assets) {
        for (var i = 0; i < this.level.gameObjects.length; ++i)
        {
            var currData = this.level.gameObjects[i];
            switch (currData.type)
            {
                case GameObjectData.PLAYER:
                    this.player.init(wizard, currData.x,
			        currData.y - 50, 64, 64, 0, 1, 1000, currData.x,
			        currData.y - 50, 64, 64);
                    break;

                case GameObjectData.ENEMY_HEDGEHOG:
                    var newAI = Object.create(PlatformEnemy);

                    newAI.init(this.level, assets[SPRITE_ATLAS], currData.x,
			        currData.y, backGroundWidth, backGroundHeight, 1, 1, 1000, currData.x,
			        currData.y, backGroundWidth, backGroundHeight);

                    this.gameObjects.push(newAI);
                    break;

                case GameObjectData.FINISH_LEVEL:
                    this.endLevelRect = Object.create(RectClass);
                    this.endLevelRect.init(currData.x + this.level.tileSize / 2, currData.y, 1,
                    this.level.tileSize, 0);
            }
        }
    },

    updateHealthBar: function (deltaTime) {
        this.healthBarRatio = this.player.health / PLAYER_START_HEALTH;

        this.healthBarRatio = clamp(this.healthBarRatio, 0, 1);

        var healthCurrWidth = this.healthBarRatio * this.healthBarWidth

        //get difference between last width and current
        var diff = this.lastHealthTranisition -
                        healthCurrWidth;

        //interpolate transition width from current transition
        //to current actual by the difference * the ratio of time
        //elapsed to transition time
        var timeRatio = deltaTime / HEALTH_TRANSITION_TIME;

        this.healthBarTransWidth -= (diff * timeRatio);

        if (this.healthBarTransWidth <= healthCurrWidth) {
            this.lastHealthTranisition = this.healthBarTransWidth;
        }

    },

    endGame: function () {
        this.state = States.GAME_OVER;

    },

    update: function (deltaTime, keys) {
        if (this.player.state == States.INACTIVE) {
            this.endGame();
        }
        this.player.vx += this.level.gravity.x * deltaTime;
        this.player.vy += this.level.gravity.y * deltaTime;
        this.player.updateDirection(keys);
        this.player.update(deltaTime);
        this.camera.update(this.player);
        this.camera.clampLevel(this.level);

        for (var i = 0; i < this.gameObjects.length; ++i) {
            this.gameObjects[i].update(deltaTime);
        }

        this.clampGameObjectInLevel(this.player);

        this.checkLevelCollision();
        this.checkLevelGoal();
        this.checkGameObjectCollision();
        this.getPlayerFriction();
        // this.updatePlayerGrounded();
        this.updateHealthBar(deltaTime);
    },

    getPlayerFriction: function () {
        var x = this.player.collisionRect.x +
                this.player.collisionRect.width / 2;
        var y = this.player.collisionRect.y +
                this.player.collisionRect.height + 1;
        this.player.groundFriction = this.level.getFriction(x, y);
        this.player.acceleration = this.player.PLAYER_DEFAULT_ACCELERATION
                       * this.level.getAcceleration(x, y);
    },

    checkLevelGoal: function () {
        var side = AARectToRectCollision(this.player.collisionRect,
                                     this.endLevelRect);
        if (side != "none") {
            this.endGame();
        }
    },

    updatePlayerGrounded: function () {
        if (LevelClass.BRICK == this.level.getTileValue(this.player.collisionRect.x,
                        this.player.collisionRect.y)) {
            this.player.grounded = true;
        }
        else {
            this.player.grounded = false;
        }
    },

    checkGameObjectCollision: function () {
        for (var i = 0; i < this.gameObjects.length; ++i) {
            var side = AARectToRectCollision(this.player.collisionRect,
                                  this.gameObjects[i].collisionRect);
            if (side == "bottom") {
                this.player.vy = -ENEMY_BOUNCE_AMT;
                this.gameObjects.splice(i, 1);
                i--;
                continue;
            }
            else {
                if (side != "none") {

                    console.log("damaged player");
                    this.player.applyDamage(4/*this.gameObjects[i].damageAmt*/);
                }
            }
        }
    },

    checkLevelCollision: function () {

        for (var i = 0; i < this.level.collisionRects.length; ++i) {

            var side = AARectToRectCollision(this.player.collisionRect,
                                  this.level.collisionRects[i]);
            if (side == "bottom") {
                console.log("botCollision");
                this.player.vy = 0;
                this.player.grounded = true;
            }
            else if (side == "top") {
                this.player.vy = 0;
            }
            this.player.spriteAnim.rect.setPos(this.player.collisionRect.x,
                                                          this.player.collisionRect.y);

        }

    },


    clampGameObjectInLevel: function (gameObject) {
        gameObject.spriteAnim.rect.x =
				clamp(gameObject.spriteAnim.rect.x, this.level.left,
					this.level.right - gameObject.spriteAnim.rect.width);

        gameObject.spriteAnim.rect.y =
				clamp(gameObject.spriteAnim.rect.y, this.level.top,
					 this.level.bottom - gameObject.spriteAnim.rect.height);

        gameObject.collisionRect.x = gameObject.spriteAnim.rect.x;
        gameObject.collisionRect.y = gameObject.spriteAnim.rect.y;
    },

    render: function (context) {
        context.save();
        context.translate(-Math.floor(this.camera.x), -Math.floor(this.camera.y));

        this.level.render(context);
        for (var i = 0; i < this.gameObjects.length; ++i) {
            this.gameObjects[i].spriteAnim.render(context);
        }
        this.player.spriteAnim.render(context);
        context.restore();

        context.drawImage(this.healthBG, 0, 0, this.healthBarWidth, 32,
                          0, 0, 256, 32);

        context.drawImage(this.healthTransition, 0, 0, this.healthBarWidth, 32,
                          5, 0, this.healthBarTransWidth, 32);

        context.drawImage(this.healthFG, 0, 0, this.healthBarWidth, 32,
                          5, 0, this.healthBarWidth * this.healthBarRatio, 32);

    }

};