// JavaScript source code
var Player = Object.create(Character);
Player.baseInit = Player.init;
Player.state = undefined;
Player.toggleAlphaTimer = undefined;

Player.init = function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				           frameRate, collisionWidth, collisionHeight, targetX, targetY) {
    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				  frameRate, collisionWidth, collisionHeight, targetX, targetY);

    this.spriteAnim = Object.create(SpriteAnimClass);
    this.spriteAnim.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames, 1000, 0, 0);
    this.collisionRect = Object.create(RectClass);
    this.collisionRect.init(x, y, collisionWidth, collisionHeight, 0);

    this.state = State.DEFAULT;
    this.health = PLAYER_START_HEALTH;
};

Player.toggleAlpha = function ()
{
    if (this.spriteAnim.alpha == 1)
    {
        this.spriteAnim.alpha = 0;
    }
    else
    {
        this.spriteAnim.alpha = 1;
    }

    var self = this;
    this.toggleAlphaTimer = setTimeout(function () { self.toggleAlpha(); }, PLAYER_FLASH_LENGTH);
};


Player.update = function (deltaTime)
{
    
    switch (this.state)
    {
        case States.DEFAULT:
        
        case States.DEAD:
            {
                //change the image of the castle to the destroyed one.
                //remove the castle from the assetToLoad list and add the new one.
            }
                
            break;
    }
};

Player.setDefaultState = function ()
{
    this.state = States.DEFAULT;
    clearTimeout(this.toggleAlphaTimer);
    this.spriteAnim.alpha = 1;
}

Player.removeFromGame = function ()
{
    this.state = States.INACTIVE;
}

Player.applyDamage = function (amount)
{
    if (this.state == States.INVULNERABLE) {
        console.log("Can't touch this!!! player invulnerable");
        return;
    }

    this.health -= amount;

    if (this.health <= 0)
    {
        this.state = States.DEAD;
        this.spriteAnim.startFrame = PLAYER_DEAD_FRAME_INDEX;
        this.spriteAnim.stop(true);
        this.spriteAnim.play(true);
        var self = this;
        setTimeout(function () { self.removeFromGame(); }, PLAYER_DEATH_TIME);
    }
    else
    {
        this.state = States.INVULNERABLE;
        var self = this;
        setTimeout(function () { self.setDefaultState(); },
                    PLAYER_INVULNERABLE_TIME);
        this.spriteAnim.alpha = 0;
        this.toggleAlphatimer = setTimeout(function () { self.toggleAlpha(); }, PLAYER_FLASH_LENGTH);
    }
};

Player.left = function ()
{
    return this.spriteAnim.rect.x;
};

Player.top = function ()
{
    return this.spriteAnim.rect.y;
};

Player.right = function ()
{
    return this.spriteAnim.rect.x + this.spriteAnim.rect.width;
};

Player.bottom = function ()
{
    return this.spriteAnim.rect.y + this.spriteAnim.rect.height;
}
