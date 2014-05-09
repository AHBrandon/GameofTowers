var GameObjectClass =
{
    vx: 0,
    vy: 0,
    health: 0,
    spriteAnim: undefined,
    grounded: false,
    collisionRect: undefined,
    targetX: 0,
    targetY: 0,

    init: function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				   frameRate, collisionWidth, collisionHeight, targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
        this.spriteAnim = Object.create(SpriteAnimClass);
        this.spriteAnim.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames, 1000, 0, 0);
        this.collisionRect = Object.create(RectClass);
        this.collisionRect.init(x, y, collisionWidth, collisionHeight, 0);
    },

    translate: function (x, y) {
        this.collisionRect.translate(x, y);
        this.spriteAnim.rect.translate(x, y);
    },

    setPos: function (x, y) {
        this.collisionRect.setPos(x, y);
        this.spriteAnim.rect.setPos(x, y);
    },

    rotate: function (angle) {
        this.collisionRect.rotate(angle);
        this.spriteAnim.rect.rotate(angle);
    },

    setRotation: function (angle) {
        this.collisionRect.setRotation(angle);
        this.spriteAnim.rect.setRotation(angle);
    }
}