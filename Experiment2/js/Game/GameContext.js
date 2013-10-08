var GameContext = function(settings, data) {
    this.timeStep = 1 / 60;
    this.velocityIterations = 10;
    this.positionIterations = 10;
    this.settings = settings;
    this.integrator = null;
    this.debugMode = false;
    this.mouseDown = false;
    this.modelManager = null;
    this.intervals = 0;
    this.data = data;
    this.playing = false;
    actions:[];
    this.init();
};
GameContext.prototype = {
    init: function() {
        this.debugCanvas = this.createConvas('debugCanvas', this.settings.screeSize.width, this.settings.screeSize.height);
        this.gameCanvas = this.createConvas('gameCanvas', this.settings.screeSize.width, this.settings.screeSize.height);
        this.debugCanvas.style.display = this.debugMode ? '' : 'none';
        //Get Context
        context = this.gameCanvas.getContext('2d');
        debugContext = this.debugCanvas.getContext('2d');
        //Setup stage
        this.stage = new createjs.Stage(this.gameCanvas);
        this.stage.snapPixelsEnabled = true;
        this.stage.enableMouseOver(50);
        //createjs.Touch.enable(stage);

        this.modelManager = new ModelManager(this);
        //Create world
        this.world = new b2World(new b2Vec2(0, 9.81), true);
        this.addDebug();
        this.world.SetContactListener(ArrowContactListner);
        GameLoader.load(this);
        Visual.load(this);
        Mouse.load(this);
        EventMonitor.load(this);
    },
    start: function() {
        this.playing = true;
        this.integrator = new Integrator(this);
        this.integrator.setup();
    },
    update: function() {
        if (this.playing) {
            this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
            this.world.ClearForces();
            this.world.m_debugDraw.m_sprite.graphics.clear();
            this.world.DrawDebugData();
            this.integrator.update();
            this.modelManager.update();
            this.stage.update();
            EventMonitor.exec();
        }
    },
    createConvas: function(name, width, height) {
        var canvas = document.createElement('canvas');
        canvas.id = name;
        canvas.width = width;
        canvas.height = height;
        canvas.style.border = "1px solid";
        var element = document.getElementById("canvasContainer");
        element.appendChild(canvas);
        return document.getElementById(name);
    },
    addEntity: function(entity) {
        this.integrator.addEntity(entity);
        var positionVector = new Vector2D(Math.round(Math.random() * this.settings.screeSize.width), 50);
        entity.spawn(this, positionVector);
    },
    toggleDebug: function() {
        this.debugMode = !this.debugMode;
        this.debugCanvas.style.display = this.debugMode ? '' : 'none';
    },
    togglePlay: function() {
        this.playing = !this.playing;
    },
    addDebug: function() {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(this.settings.scale);
        debugDraw.SetFillAlpha(0.7);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
    },
    addArrow: function(mousePosition, bowPosition) {
        var arrow = new Arrow(this);
        arrow.spawn(mousePosition, bowPosition);
        this.modelManager.arrowVector.push(arrow);
    }
};