var Airship = Object.create(Enemy);
var bombList = new Array();
Airship.interval = undefined;

Airship.update = function (deltaTime) {

    switch (this.state) {
        case States.DEFAULT:
            {
                this.translate(this.vx, 0.0);

                if ((this.spriteAnim.rect.x + this.spriteAnim.rect.width) > backGroundWidth)
                {
                    this.spriteAnim.startFrame = 8;
                    this.vx = -this.vx;
                }
                if (this.spriteAnim.rect.x < 0)
                {
                    this.spriteAnim.startFrame = 9;
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
    if (this.interval === undefined) {
        if (gameState === States.GAME)
        {
            var self = this;
            this.interval = setInterval(function () { self.setAttack(); }, 3000);	
        }
    }
};

Airship.setAttack = function () {
    this.attack = true;
};

Airship.applyDamage = function (amount) {
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




