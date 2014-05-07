var PlatformEnemy = Object.create(GameObjectClass);

//PlatformEnemy.speed = ENEMY_SPEED;
PlatformEnemy.isLeft = false; //if this is false then the dir is right
PlatformEnemy.levelData; 
PlatformEnemy.baseInit = PlatformEnemy.init;

PlatformEnemy.init = function (levelData, image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				                frameRate, collisionX, collisionY, collisionWidth, collisionHeight)
{
    this.levelData = levelData;
    this.baseInit(image, x, y, frameWidth, frameHeight, startFrame, numFrames,
				                frameRate, collisionX, collisionY, collisionWidth, collisionHeight);
}

PlatformEnemy.update = function (deltaTime)
{
    var colOffset = 0;
    //move the enemy according to its direction
    if (this.isLeft)
    {
        this.translate(-this.speed * deltaTime, 0);
        colOffset = 0;
    }
    else
    {
        this.translate(this.speed * deltaTime, 0);
        colOffset = 1;
    }

    //check to see if we need to change direction
    //check same row, if its a wall / brick, turn around
    var row = this.collisionRect.y - this.levelData.top;
    row = Math.floor(row / this.levelData.tileSize);

    var col = this.collisionRect.x - this.levelData.left;
    col = Math.floor(col / this.levelData.tileSize);
    col += colOffset;

    if (this.levelData.tiles[row][col] != LevelClass.AIR)
    {
        //correct if collision is to the right, by moving x to start
        //of column
        if (!this.isLeft)
        {
            this.setPos(this.levelData.left + (col - 1) * this.levelData.tileSize);
        }
        else
        {
            this.setPos(this.levelData.left + (col + 1) * this.levelData.tileSize);
        }

        this.isLeft = !this.isLeft;
    }

    //check row below, if it's air turn around
    row++;
    if (this.levelData.tiles[row][col] == LevelClass.AIR)
    {
        this.isLeft = !this.isLeft;
    }
};
