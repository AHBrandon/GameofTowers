var GameObjectData =
{
    PLAYER: 0,
    ENEMY_HEDGEHOG: 1,
    FINISH_LEVEL: 4,
    x:0,
    y:0,
    type:-1
};

var LevelClass =
{
    backgroundLayerName: "BackgroundLayer",
    foregroundLayerName: "ForegroundLayer",
    objectsLayerName: "ObjectsLayer",

    //tile ids
    BRICK: 3,
    AIR: 6,

    GRAVITY_Y : 300,
    tileSize: 64,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    tilesWide: 0,
    tilesHigh: 0,
    gravity: undefined,

    collisionRects: undefined,
    tiles: undefined,
    foregroundTiles: undefined,
    gameObjects: undefined,
    tileSheet: undefined,

    init: function (tileSheet, x, y, width, height)
    {
        this.tileSheet = tileSheet;
        this.left = x;
        this.top = y;
        this.right = x + width;
        this.bottom = y + height;
        this.tilesWide = width / this.tileSize;
        this.tilesHigh = height / this.tileSize;
        this.sourceTilesWide = tileSheet.width / this.tileSize;
        this.tiles = new Array();
        this.foregroundTiles = new Array();
        this.gameObjects = new Array();

        this.gravity = Object.create(VectorClass);
        this.gravity.x = 0;
        this.gravity.y = this.GRAVITY_Y;

        this.loadLevelData(level1String)

    },

    isTileGameObject: function (gameObject)
    {
        if (gameObject == GameObjectData.ENEMY_HEDGEHOG ||
           gameObject == GameObjectData.FINISH_LEVEL ||
           gameObject == GameObjectData.PLAYER)
        {
            return true;
        }
        else
        {
            return false;
        }

    },

    loadLevelData: function (levelFile)
    {
        var xmlDoc;
        var parser;
        if (window.DOMParser)
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(levelFile, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(levelFile);
        }
        var mapNode = xmlDoc.getElementsByTagName("map")[0];
        this.tilesWide = parseInt(mapNode.attributes.getNamedItem("width").value);
        this.tilesHigh = parseInt(mapNode.attributes.getNamedItem("height").value);
        this.tileSize = parseInt(mapNode.attributes.getNamedItem("tilewidth").value);

        var backgroundTilesNode;
        var foregroundTilesNode;
        var objectTilesNode;

        for (var i = 0; i < xmlDoc.getElementsByTagName("layer").length; ++i)
        {
            var currLayer = xmlDoc.getElementsByTagName("layer")[i];
            if (currLayer.attributes.getNamedItem("name").value == this.foregroundLayerName)
            {
                foregroundTilesNode = currLayer.childNodes[0];
            }

            else if (currLayer.attributes.getNamedItem("name").value == this.backgroundLayerName)
            {
                backgroundTilesNode = currLayer.childNodes[0];
            }

            else if (currLayer.attributes.getNamedItem("name").value == this.objectsLayerName)
            {
                objectTilesNode = currLayer.childNodes[0];
            }
        }

        for (var row = 0; row < this.tilesHigh; ++row)
        {
            this.tiles.push(new Array());
            this.foregroundTiles.push(new Array())
            for (var col = 0; col < this.tilesWide; ++col)
            {

                this.tiles[row].push(parseInt(backgroundTilesNode.childNodes[row * this.tilesWide + col].attributes.getNamedItem("gid").value) - 1);
                this.foregroundTiles[row].push(parseInt(foregroundTilesNode.childNodes[row * this.tilesWide + col].attributes.getNamedItem("gid").value) - 1);

                var object = parseInt(objectTilesNode.childNodes[row * this.tilesWide + col].attributes.getNamedItem("gid").value) - 1;
                if (this.isTileGameObject(object))
                {
                    var gameObjectData = Object.create(GameObjectData);
                    gameObjectData.type = object;
                    gameObjectData.x = this.left + col * this.tileSize;
                    gameObjectData.y = this.top + row * this.tileSize;
                    this.gameObjects.push(gameObjectData);
                }

            }
        }

        this.collisionRects = new Array();
        for (var row = 0; row < this.tilesHigh; ++row)
        {
            for (var col = 0; col < this.tilesWide; ++col)
            {

                if (this.tiles[row][col] == this.BRICK)
                {
                    //add collision rect
                    var collisionRect = Object.create(RectClass);
                    collisionRect.init(this.left + col * this.tileSize,
                                         this.top + row * this.tileSize,
                                         this.tileSize,
                                         this.tileSize);
                    this.collisionRects.push(collisionRect);

                }

            }
        }
    },

    render: function (currContext)
    {
        for (var row = 0; row < this.tilesHigh; ++row)
        {

            for (var col = 0; col < this.tilesWide; ++col)
            {
                currContext.save();
                currContext.translate(this.left + col * this.tileSize, this.top + row * this.tileSize);
                if (this.tiles[row][col] >= 0)
                {
                    var srcX = Math.floor(this.tiles[row][col] % this.sourceTilesWide) * this.tileSize;
                    var srcY = Math.floor(this.tiles[row][col] / this.sourceTilesWide) * this.tileSize;
                    currContext.drawImage(this.tileSheet, srcX, srcY, this.tileSize, this.tileSize,
								0, 0, this.tileSize, this.tileSize);
                }

                if (this.foregroundTiles[row][col] >= 0)
                {
                    var srcX = (Math.floor(this.foregroundTiles[row][col] % this.sourceTilesWide)) * this.tileSize;
                    var srcY = Math.floor(this.foregroundTiles[row][col] / this.sourceTilesWide) * this.tileSize;
                    currContext.drawImage(this.tileSheet, srcX, srcY, this.tileSize, this.tileSize,
                        this.left + col * this.tileSize, this.top + row * this.tileSize, this.tileSize, this.tileSize);
                }

                currContext.restore();
            }
        }
    }
};