var GameContext = function(settings) {
    this.settings = settings;
    this.integrator = null;
    this.init();
};

GameContext.prototype = {
    init: function() {
        this.gameCanvas = this.createConvas('$gameCanvas', this.settings.screeSize.width, this.settings.screeSize.height);
        this.debugCanvas = this.createConvas('$debugCanvas', this.settings.screeSize.width, this.settings.screeSize.height);
        this.debugCanvas.style.display = 'none';

        //Get Context
        context = this.gameCanvas.getContext('2d');
        debugContext = this.debugCanvas.getContext('2d');

        //Setup stage
        this.stage = new createjs.Stage(this.gameCanvas);
        this.stage.snapPixelsEnabled = true;

        //Create world
        this.world = new b2World(new b2Vec2(0, 9.81), true);
    },
    start: function() {
        this.integrator = new Integrator(this);
        this.integrator.setup();
    },
    update: function() {
        this.integrator.update();
        this.stage.update();
    },
    createConvas: function(name, width, height) {
        var canvas = document.createElement('canvas');

        canvas.id = name;
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";

        var element = document.getElementById("game");
        element.appendChild(canvas);
        return document.getElementById(name);
    },
    addEntity: function(entity) {
        this.integrator.addEntity(entity);

        var positionVector = new Vector2D(Math.round(Math.random() * this.settings.screeSize.width), 50);
        entity.spawn(this, positionVector);
    },
    showDebug: function() {
        this.debugCanvas.style.display = '';
    }
};