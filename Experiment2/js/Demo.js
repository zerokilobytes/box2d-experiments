var gameContext;
var loader;
var numEnterPoints = 0;
function initVisual() {
    // Preload JS Manifest			
    manifest = [
        {src: "images/smoke.png", id: "smoke"},
        {src: "images/Fixture/bow.png", id: "bow"},
        {src: "images/Fixture/arrow.png", id: "arrow"},
        {src: "images/Actor/frog.png", id: "frog"},
        {src: "images/Fixture/nav.png", id: "nav"},
        {src: "images/Fixture/part01.png", id: "part01"}
    ];

    Resource.load(manifest, handleComplete, handleFileLoad);

}

function handleFileLoad() {

}
function handleComplete() {

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


    spriteSheet = {"images": [Resource.loader.getResult("smoke")], "animations": {"jump": [10, 19], "boom": [0, 9]}, "frames": {"height": 94, "regX": 0, "count": 20, "regY": 0, "width": 96}};

    // Spritesheet creation
    var ss = new createjs.SpriteSheet(spriteSheet);

    // BitmaAnimation 
    smoke = new createjs.BitmapAnimation(ss);

    // MouseDown event listener
    gameContext.smokeDisplay = smokeDisplay;
}

function smokeDisplay(e) {

    // Get the animation label ("boom" or "jump") from the HTML Select
    var aniLabel = "boom";

    // Display the smoke BitmapAnimation
    gameContext.stage.addChild(smoke);

    // Start the animation using the label ("boom" or "jump")
    smoke.gotoAndPlay(aniLabel);

    // Set the smoke position (equal to mouse position)
    smoke.x = e.x;
    smoke.y = e.y;

    // Remove smoke when animation ends
    smoke.onAnimationEnd = function() {
        gameContext.stage.removeChild(smoke);
    }
}


function init() {
    ResourceLoader.loadImages(images, function() {

        //initVisual();
    });
}

$(document).ready(function() {

    initVisual();

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
