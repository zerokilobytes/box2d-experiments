var gameContext;

function init() {
    Resource.load(manifest, handleComplete);
}
function handleComplete() {

    settings = new Settings(Global.gameSettings);

    gameContext = new GameContext(settings, test1);
    gameContext.start();

    createjs.Ticker.setFPS(Global.FPS);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.addListener(function() {
        gameContext.update();
    });
}
;

$(document).ready(function() {
    init();
    $('#debug').on('click', function() {
        gameContext.toggleDebug();
    });
});