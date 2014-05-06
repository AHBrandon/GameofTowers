var PlayerClass = Object.create(GameObjectClass);
PlayerClass.PLAYER_SPEED = 200;
PlayerClass.inputVelocity = undefined;
PlayerClass.baseInit = PlayerClass.init;

PlayerClass.init = function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight) 
{

    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				             frameRate, collisionX, collisionY, collisionWidth, collisionHeight);
    this.inputVelocity = Object.create(VectorClass);
    this.inputVelocity.x = 0;
    this.inputVelocity.y = 0;
};

PlayerClass.updateVelocity = function (keysPressed)
{
    this.inputVelocity.x = 0;
    this.inputVelocity.y = 0;
    for (var i = 0; i < keysPressed.length; ++i)
    {
        switch (keysPressed[i])
        {
            case UP:
                this.jump();
                //this.inputVelocity.y -= 1;
                break;
            case DOWN:
                //this.inputVelocity.y += 1;
                break;
            case RIGHT:
                this.inputVelocity.x += 1;
                break;
            case LEFT:
                this.inputVelocity.x -= 1;
                break;
        }
    }
};

PlayerClass.update = function (deltaTime)
{

    this.inputVelocity.normalize();
    this.inputVelocity.scale(this.PLAYER_SPEED);
    this.translate((this.vx + this.inputVelocity.x)
								* deltaTime,
                                (this.vy + this.inputVelocity.y)
								* deltaTime);
};

PlayerClass.left = function () 
{
    return this.spriteAnim.rect.x;
};

PlayerClass.top = function () 
{
    return this.spriteAnim.rect.y;
};

PlayerClass.right = function () 
{
    return this.spriteAnim.rect.x +
				this.spriteAnim.rect.width;
};

PlayerClass.bottom = function () 
{
        return this.spriteAnim.rect.y +
				this.spriteAnim.rect.height;
}

/*{
    PLAYER_SPEED: 200, // pixels per second

    gameObject: undefined,
    inputVelocity: undefined,

    init: function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight) {
        this.gameObject = Object.create(GameObjectClass);
        this.gameObject.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight);
        this.inputVelocity = Object.create(VectorClass);
        this.inputVelocity.x = 0;
        this.inputVelocity.y = 0;
    },

    updateVelocity: function (keysPressed) {
        this.inputVelocity.x = 0;
        this.inputVelocity.y = 0;
        for (var i = 0; i < keysPressed.length; ++i) {
            switch (keysPressed[i]) {
                case UP:
                    this.inputVelocity.y -= 1;
                    break;
                case DOWN:
                    this.inputVelocity.y += 1;
                    break;
                case RIGHT:
                    this.inputVelocity.x += 1;
                    break;
                case LEFT:
                    this.inputVelocity.x -= 1;
                    break;
            }
        }
    },

    update: function (deltaTime) {

        this.inputVelocity.normalize();
        this.inputVelocity.scale(this.PLAYER_SPEED);

        this.gameObject.translate((this.gameObject.vx + this.inputVelocity.x)
								* deltaTime,
                                (this.gameObject.vy + this.inputVelocity.y)
								* deltaTime);
    },

    left: function () {
        return this.gameObject.spriteAnim.rect.x;
    },

    top: function () {
        return this.gameObject.spriteAnim.rect.y;
    },

    right: function () {
        return this.gameObject.spriteAnim.rect.x +
				this.gameObject.spriteAnim.rect.width;
    },

    bottom: function () {
        return this.gameObject.spriteAnim.rect.y +
				this.gameObject.spriteAnim.rect.height;
    }
}*/