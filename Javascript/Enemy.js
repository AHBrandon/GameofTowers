// JavaScript source code
var Enemy = Object.create(GameObjectClass);
Enemy.baseInit = Enemy.init;
Enemy.state = undefined;
Enemy.isPlaying = true;
Enemy.loop = true;
Enemy.Attack_timer = 0;
Enemy.attack = false;

Enemy.init = function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight)
{
    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight);

    this.spriteAnim = Object.create(SpriteAnimClass);
    this.spriteAnim.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames, 1000, 0, 0);
    this.collisionRect = Object.create(RectClass);
    this.collisionRect.init(x, y, collisionWidth, collisionHeight, 0);
    this.health = 0;
    this.state = States.DEFAULT;
    this.image = image;
    this.inputDirection = Object.create(VectorClass);
    this.inputDirection.x = 0;
    this.inputDirection.y = 0;
    this.vx = 1;
};


Enemy.setDefaultState = function ()
{
    this.state = States.DEFAULT;
    clearTimeout(this.toggleAlphaTimer);
    this.spriteAnim.alpha = 1;
}

Enemy.removeFromGame = function ()
{
    this.state = States.INACTIVE;
}

Enemy.applyDamage = function (amount)
{
    if (this.state == States.INVULNERABLE)
    {
        console.log("Can't touch this!!! Enemy invulnerable");
        return;
    }

    this.health -= amount;

    if (this.health <= 0)
    {
        this.state = States.DEAD;
        this.spriteAnim.startFrame = Enemy_DEAD_FRAME_INDEX;
        this.spriteAnim.stop(true);
        this.spriteAnim.play(true);
        var self = this;
        setTimeout(function () { self.removeFromGame(); }, ENEMY_DEATH_TIME);
    }
    else
    {
        this.state = States.INVULNERABLE;
        var self = this;
        setTimeout(function () { self.setDefaultState(); }, ENEMY_INVULNERABLE_TIME);
        this.spriteAnim.alpha = 0;
        this.toggleAlphatimer = setTimeout(function () { self.toggleAlpha(); }, ENEMY_FLASH_LENGTH);
    }
};

Enemy.left = function ()
{
    return this.spriteAnim.rect.x;
};

Enemy.top = function ()
{
    return this.spriteAnim.rect.y;
};

Enemy.right = function ()
{
    return this.spriteAnim.rect.x + this.spriteAnim.rect.width;
};

Enemy.bottom = function () {
    return this.spriteAnim.rect.y + this.spriteAnim.rect.height;
};

Enemy.update = function (deltaTime) {

    switch (this.state) {
        case States.DEFAULT:
            {
                if (this.isPlaying) {
                    this.currentFrame++;
                    this.x += vx;

                    if (this.x > CANVAS_WIDTH) {
                        vx = -vx;
                    }
                    if (this.x < 0) {
                        vx = -vx;
                    }

                    if (this.currentFrame >= this.numFrames) {
                        if (this.loop) {
                            this.currentFrame = 0;
                        }
                        else {
                            this.isPlaying = false;
                            this.currentFrame--;
                        }
                    }

                    var self = this;
                    setTimeout(function () { self.updateAnimation(); }, this.frameRate);

                }
            }
            break;

        case States.DEAD:
            {
                //remove the enemy from the array list.
            }

            break;
    }
};
