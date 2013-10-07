var Global = function() {

};

Global.prototype = {
};
Global.FPS = 60;

Global.gameSettings = {
    scale: 60,
    screeSize: {
        width: 600,
        height: 768
    }
};

Global.model = {
    spawnRate: 400,
    fireRate: 300
};

Global.arrow = {
    count: 1,
    velocity: {
        x: 50,
        y: 50
    }
}

Global.toad = {
    gravity: {
        x: 0,
        y: -9.81
    }
};