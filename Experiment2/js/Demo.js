var gameContext;

function init() {
    Resource.load(manifest, handleComplete);
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
    createjs.Ticker.addListener(function() {
        gameContext.update();
    });
};

$(document).ready(function() {
    init();
    $('#debug').on('click', function() {
        gameContext.toggleDebug();
    });
});