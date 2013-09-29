var gameContext;

var images = {
    bird: 'images/bird.png',
    pidgin: 'images/pidgin.png',
    blue_bird: 'images/blue_bird.png',
    twitter: 'images/twitter.png',
    bow: 'images/Fixture/bow.png',
    arrow: 'images/Fixture/arrow.png'
};

function init() {
    ResourceLoader.loadImages(images, function() {
        settings = new Settings({
            scale: 60,
            screeSize: {
                width: 800,
                height: 480
            }
        });


        gameContext = new GameContext(settings, test1);
        gameContext.start();

        createjs.Ticker.setFPS(60);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.addListener(function(dt, paused) {
            gameContext.update();
        });
    });
}

$(document).ready(function() {
    init();

    $('#debug').on('click', function() {
        gameContext.toggleDebug();
    });
});
