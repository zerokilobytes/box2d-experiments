var gameContext;
var numEnterPoints = 0;
var images = {
    bow: 'images/Fixture/bow.png',
    arrow: 'images/Fixture/arrow.png',
    apple: 'images/Fruit/frog.png',
    nav: 'images/Fixture/nav.png'
};

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
    });
}

$(document).ready(function() {
    init();

    $('#debug').on('click', function() {
        gameContext.toggleDebug();
    });
});
