var Visual = function() {
    throw new Error("Visual object cannot be instantiated");
};

Visual.prototype = {
};

Visual.context = null;

Visual.load = function(context) {
    Visual.context = context;
    Visual.Effects.loadToadExplosion();
};

Visual.Effects = function() {

};

Visual.Effects.prototype = {
};

Visual.Effects.loadToadExplosion = function() {
    var spriteSheet = {"images": [Resource.loader.getResult("smoke")], "animations": {"jump": [10, 19], "boom": [0, 9]}, "frames": {"height": 94, "regX": 0, "count": 20, "regY": 0, "width": 96}};

    // Spritesheet creation
    var sheet = new createjs.SpriteSheet(spriteSheet);

    // BitmaAnimation 
    Visual.Effects.toadExplosion = new createjs.BitmapAnimation(sheet);
};

Visual.Effects.displayToadExplosion = function(e) {
    // Display the smoke BitmapAnimation
    Visual.context.stage.addChild(Visual.Effects.toadExplosion);

    // Start the animation using the label ("boom" or "jump")
    Visual.Effects.toadExplosion.gotoAndPlay("boom");

    // Set the smoke position (equal to mouse position)
    Visual.Effects.toadExplosion.x = e.x;
    Visual.Effects.toadExplosion.y = e.y;

    // Remove smoke when animation ends
    Visual.Effects.toadExplosion.onAnimationEnd = function() {
        gameContext.stage.removeChild(Visual.Effects.toadExplosion);
    };
};