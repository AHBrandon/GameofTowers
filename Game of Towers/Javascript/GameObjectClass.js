var GameObjectClass =
{
    JUMP_POWER: 500,
    BOUNCE: 250,
    vx: 0,
    vy: 0,
    health: 0,
    spriteAnim: undefined,
    grounded: false,
    collisionRect: undefined,

    init: function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionX, collisionY, collisionWidth, collisionHeight)
    {
        this.spriteAnim = Object.create(SpriteAnimClass);
        this.spriteAnim.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames, 1000);
        this.collisionRect = Object.create(RectClass);
        this.collisionRect.init(collisionX, collisionY, collisionWidth, collisionHeight, 0);
    },

    jump: function ()
    {
        if (this.grounded)
        {
            this.grounded = false;
            this.vy = -this.JUMP_POWER;
        }
    },

    bounce: function()
    {
        this.vy = -this.BOUNCE;
    },

    translate: function (x, y)
    {
        this.collisionRect.translate(x, y);
        this.spriteAnim.rect.translate(x, y);
    },

    setPos: function (x, y)
    {
        this.collisionRect.setPos(x, y);
        this.spriteAnim.rect.setPos(x, y);
    },

    rotate: function (angle)
    {
        this.collisionRect.rotate(angle);
        this.spriteAnim.rect.rotate(angle);
    },

    setRotation: function (angle)
    {
        this.collisionRect.setRotation(angle);
        this.spriteAnim.rect.setRotation(angle);
    }
}