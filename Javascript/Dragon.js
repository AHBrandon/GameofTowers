// JavaScript source code
// JavaScript source code
var Dragon = Object.create(Enemy);

Dragon.update = function (deltaTime) {

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

Dragon.render = function () {

};

Dragon.attack = function (castle) {
    var newFireBall = Object.create(FireBall);

    newFireBall.init(imgDragon, dragonXPos, dragonYPos, fireBallWidth, fireBallHeight, 1, 1,
                    100, fireBallWidth, fireBallHeight, castle.x, castle.y);
    fireBallList.push(newFireBall);
};

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




