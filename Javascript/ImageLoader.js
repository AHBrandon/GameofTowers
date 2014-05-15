var assetsToLoad = new Array();

var backgroundImage = new Image();
backgroundImage.src = "Assets/BGs/Backgroundday.png";
backgroundImage.addEventListener("load", assetLoaded, false);
assetsToLoad.push(backgroundImage);

var castle = new Image();
castle.src = "Assets/Sprites/Castle.png";
castle.addEventListener("load", assetLoaded, false);
assetsToLoad.push(castle);

var wizard = new Image();
wizard.src = "Assets/Sprites/wizard.png";
wizard.addEventListener("load", assetLoaded, false);
assetsToLoad.push(wizard);

var imgDragon = new Image();
imgDragon.src = "Assets/Sprites/wyvern.png"
imgDragon.addEventListener("load", assetLoaded, false);
assetsToLoad.push(imgDragon);

var imgBullet = new Image();
imgBullet.src = "Assets/Sprites/bullet.png";
imgBullet.addEventListener("load", assetLoaded, false);
assetsToLoad.push(imgBullet);

var imgFireBall = new Image();
imgFireBall.src = "Assets/Sprites/fireball.png";
imgFireBall.addEventListener("load", assetLoaded, false);
assetsToLoad.push(imgFireBall);

var imgHealth = new Image();
imgHealth.src = "Assets/Sprites/HealthRestore.png";
imgHealth.addEventListener("load", assetLoaded, false);
assetsToLoad.push(imgHealth);

var imgDamage = new Image();
imgDamage.src = "Assets/Sprites/DamagePowerUp.png";
imgDamage.addEventListener("load", assetLoaded, false);
assetsToLoad.push(imgDamage);