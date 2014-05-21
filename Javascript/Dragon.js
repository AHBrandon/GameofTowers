// JavaScript source code
// JavaScript source code
var Dragon = Object.create(GameObjectClass);
Dragon.baseInit = Dragon.init;

var fireBallList = [];
Dragon.init = function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight)
{
    this.state = States.DEFAULT;
    this.image = image;
    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight);
    this.inputDirection = Object.create(VectorClass);
    this.inputDirection.x = 0;
    this.inputDirection.y = 0;
    this.vx = 1;
};

Dragon.update = function (deltaTime)
{

    switch (this.state) {
        case States.DEFAULT:
        {
            this.translate(this.vx,0.0);

            if ((this.spriteAnim.rect.x + this.spriteAnim.rect.width) > backGroundWidth)
            {
                this.spriteAnim.startFrame = 0;
                this.vx = -this.vx;
            }
            if (this.spriteAnim.rect.x < 0)
            {
                this.spriteAnim.startFrame = 4;
                this.vx = -this.vx;
            } 
        }
        break;

        case States.DEAD:
        {
            //remove the enemy from the array list.
        }

            break;
    }
   
  
   // var interval = setInterval(onInterval, 3000);	//every three seconds
};
/*
onInterval = function ()
{
    var newFireBall = Object.create(FireBall);

    newFireBall.init(this.assets[5], dragonXPos, dragonYPos, fireBallWidth, fireBallHeight, 1, 1,
                    100, castleXPos, castleYPos, fireBallWidth, fireBallHeight);
    this.fireBallList.push(newFireBall);
}
*/
Dragon.applyDamage = function (amount) {
    if (this.state == States.INVULNERABLE) {
        console.log("Can't touch this!!! Enemy invulnerable");
        return;
    }

    this.health -= amount;

    if (this.health <= 0) {
        this.state = States.DEAD;
        this.spriteAnim.startFrame = Enemy_DEAD_FRAME_INDEX;
        this.spriteAnim.stop(true);
        this.spriteAnim.play(true);
        var self = this;
        setTimeout(function () { self.removeFromGame(); }, ENEMY_DEATH_TIME);
    }
    else {
        this.state = States.INVULNERABLE;
        var self = this;
        setTimeout(function () { self.setDefaultState(); }, ENEMY_INVULNERABLE_TIME);
        this.spriteAnim.alpha = 0;
        this.toggleAlphatimer = setTimeout(function () { self.toggleAlpha(); }, ENEMY_FLASH_LENGTH);
    }
};




