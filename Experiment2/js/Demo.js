var gameContext;
var numEnterPoints = 0;
var images = {
    bow: 'images/Fixture/bow.png',
    arrow: 'images/Fixture/arrow.png',
    frog: 'images/Actor/frog.png',
    nav: 'images/Fixture/nav.png',
    part01: 'images/Fixture/part01.png'
};
function initVisual() {

    // Canvas reference
    var canvas = document.getElementById("testCanvas");

    // CreateJS stage
    //stage = new Stage(canvas);

    // SpriteSheet: copy/paste from the ZOE JSON output	
    spriteSheet = {"images": ["images/smoke.png"], "animations": {"jump": [10, 19], "boom": [0, 9]}, "frames": {"height": 94, "regX": 0, "count": 20, "regY": 0, "width": 96}};

    // Spritesheet creation
    var ss = new createjs.SpriteSheet(spriteSheet);

    // BitmaAnimation 
    smoke = new createjs.BitmapAnimation(ss);

    // Preload JS Manifest			
    manifest = [
        {src: "images/smoke.png", id: "smoke"}
    ];

    // PreloadJS init
    loader = new PreloadJS();
    loader.onComplete = handleComplete;
    loader.loadManifest(manifest);


}

function handleComplete() {
console.log(gameContext);
    // MouseDown event listener
    gameContext.stage.onMouseDown = smokeDisplay;
}

function smokeDisplay(e) {

    // Get the animation label ("boom" or "jump") from the HTML Select
    var aniLabel = "boom";

    // Display the smoke BitmapAnimation
    gameContext.stage.addChild(smoke);

    // Start the animation using the label ("boom" or "jump")
    smoke.gotoAndPlay(aniLabel);

    // Set the smoke position (equal to mouse position)
    smoke.x = e.stageX;
    smoke.y = e.stageY;

    // Remove smoke when animation ends
    smoke.onAnimationEnd = function() {
        gameContext.stage.removeChild(smoke);
    }
}


function init() {
    ResourceLoader.loadImages(images, function() {
        settings = new Settings({
            scale: 60,
            screeSize: {
                width: 600,
                height: 768
            }
        });

        gameContext = new GameContext(settings, test1);
        gameContext.start();

        createjs.Ticker.setFPS(60);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.addListener(function(dt, paused) {
            gameContext.update();
        });
         initVisual();
    });
}

$(document).ready(function() {
   
    init();

    $('#debug').on('click', function() {
        gameContext.toggleDebug();
    });

    $("body").on("mouseover", function(e) {
        e.preventDefault();
        $(this).addClass("mouseDown");
    }).on("mouseup", function() {
        //$(this).removeClass("mouseDown");
    });

    $("body").on("mousedown", function(e) {
        e.preventDefault();
        $(this).addClass("mouseDown");
    }).on("mouseup", function() {
        //$(this).removeClass("mouseDown");
    });
});
