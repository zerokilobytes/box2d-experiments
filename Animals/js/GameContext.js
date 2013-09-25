var GameContext = function(settings) {
    this.settings = settings;
    this.integrator = null;
    this.debugMode = true;
    this.init();
};

GameContext.prototype = {
    init: function() {
        this.debugCanvas = this.createConvas('$debugCanvas', this.settings.screeSize.width, this.settings.screeSize.height);
        this.gameCanvas = this.createConvas('$gameCanvas', this.settings.screeSize.width, this.settings.screeSize.height);

        this.debugCanvas.style.display = this.debugMode ? '' : 'none';

        //Get Context
        context = this.gameCanvas.getContext('2d');
        debugContext = this.debugCanvas.getContext('2d');

        //Setup stage
        this.stage = new createjs.Stage(this.gameCanvas);
        this.stage.snapPixelsEnabled = true;
        this.stage.enableMouseOver(50);

        //Create world
        this.world = new b2World(new b2Vec2(0, 9.81), true);

        this.addDebug();
    },
    start: function() {
        this.integrator = new Integrator(this);
        this.integrator.setup();
    },
    update: function() {
        this.integrator.update();
        this.stage.update();

        this.world.m_debugDraw.m_sprite.graphics.clear();
        this.world.DrawDebugData();
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
    toggleDebug: function() {
        this.debugMode = !this.debugMode;
        this.debugCanvas.style.display = this.debugMode ? '' : 'none';
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
    addArrow: function() {
        var angle = Math.atan2(mouseY - 450, mouseX);
        var vertices = [];
        vertices.push(new b2Vec2(-1.4, 0));
        vertices.push(new b2Vec2(0, -0.1));
        vertices.push(new b2Vec2(0.6, 0));
        vertices.push(new b2Vec2(0, 0.1));
        
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(0, 450 / worldScale);
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.userData = "arrow";
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsVector(vertices, 4);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = polygonShape;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.5;
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        body.SetLinearVelocity(new b2Vec2(20 * Math.cos(angle), 20 * Math.sin(angle)));
        body.SetAngle(angle);
        arrowVector.push(body);
    }
};