// JavaScript source code
var Character = Object.create(GameObjectClass);
Character.baseInit = Character.init;
Character.speed = 0;


Character.init = function (image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				           frameRate, collisionWidth, collisionHeight, targetX, targetY) {
    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				  frameRate, collisionWidth, collisionHeight, targetX, targetY);

    this.spriteAnim = Object.create(SpriteAnimClass);
    this.spriteAnim.init(image, x, y, frameWidth, frameHeight, startFrame, numFrames, 1000, 0, 0);
    this.collisionRect = Object.create(RectClass);
    this.collisionRect.init(x, y, collisionWidth, collisionHeight, 0);
};

