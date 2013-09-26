var gameContext;

var images = {
    bird: 'images/bird.png',
    pidgin: 'images/pidgin.png',
    blue_bird: 'images/blue_bird.png',
    twitter: 'images/twitter.png'
};

function init() {
    ResourceLoader.loadImages(images, function() {
        settings = new Settings({
            scale: 60,
            screeSize: {
                width: 800,
                height: 600
            }
        });

        gameContext = new GameContext(settings);
        gameContext.start();

        var bird1 = new Twitter();
        var bird2 = new BlueBird();
        var bird3 = new Pidgin();

        //gameContext.addEntity(bird1);
        //gameContext.addEntity(bird2);
        //gameContext.addEntity(bird3);

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
