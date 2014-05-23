var Ballista = Object.create(Enemy);
var arrowList = new Array();
Ballista.interval = undefined;

Ballista.update = function (deltaTime) {
   
    switch (this.state) {
        case States.DEFAULT:
            {
                
            }
            break;

        case States.DEAD:
            {
                //remove the enemy from the array list.
            }

            break;
    }
    if (this.interval === undefined)
    {
        if (gameState === States.GAME)
        {
            var self = this;
            this.interval = setInterval(function () { self.setAttack(); }, 1000);
        }
    }
};

Ballista.setAttack = function () {
    this.attack = true;
};

Ballista.applyDamage = function (amount) {
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