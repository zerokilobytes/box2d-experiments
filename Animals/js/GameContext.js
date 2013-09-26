var GameContext = function(settings) {
    this.timeStep = 1 / 60;
    this.velocityIterations = 10;
    this.positionIterations = 10;
    this.settings = settings;
    this.integrator = null;
    this.debugMode = true;
    this.arrowVector = [];
    this.init();
};
GameContext.prototype = {
    init: function() {
        var _this = this;
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
        //createjs.Touch.enable(stage);

        //Create world
        this.world = new b2World(new b2Vec2(0, 9.81), true);
        this.addDebug();
        this.gameCanvas.addEventListener("mousedown", function(evt) {
            _this.addArrow(evt.x, evt.y);
        });
        
   
        this.world.SetContactListener(ArrowContactListner);
    },
    start: function() {
        this.integrator = new Integrator(this);
        this.integrator.setup();
    },
    update: function() {

        this.integrator.update();
        this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
        this.world.ClearForces();
        this.updateArrow();
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
    b2Dot: function(a, b) {
        return a.x * b.x + a.y * b.y;
    },
    normalize2: function(b) {
        return Math.sqrt(b.x * b.x + b.y * b.y);
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
    updateArrow: function() {
        var dragConstant = 0.05;
        //var dampingConstant = 1.5;


        var worldScale = this.settings.scale;
        for (var i = this.arrowVector.length - 1; i >= 0; i--) {
            var body = this.arrowVector[i];
            var flightSpeed = this.normalize2(body.GetLinearVelocity());
            var bodyAngle = body.GetAngle();
            var pointingDirection = new b2Vec2(Math.cos(bodyAngle), -Math.sin(bodyAngle));
            var flyingAngle = Math.atan2(body.GetLinearVelocity().y, body.GetLinearVelocity().x);
            var flightDirection = new b2Vec2(Math.cos(flyingAngle), Math.sin(flyingAngle));
            var dot = this.b2Dot(flightDirection, pointingDirection);
            var dragForceMagnitude = (1 - Math.abs(dot)) * flightSpeed * flightSpeed * dragConstant * body.GetMass();
            var arrowTailPosition = body.GetWorldPoint(new b2Vec2(-1.4, 0));
            body.ApplyForce(new b2Vec2((dragForceMagnitude * -flightDirection.x), (dragForceMagnitude * -flightDirection.y)), arrowTailPosition);
            if (body.GetPosition().x * worldScale > 1) {
                for (var c = body.GetContactList(); c; c = c.next) {
                    var contact = c.contact;
                    var fixtureA = contact.GetFixtureA();
                    var fixtureB = contact.GetFixtureB();
                    var bodyA = fixtureA.GetBody();
                    var bodyB = fixtureB.GetBody();
                    if (bodyA.GetUserData() === "wall" || bodyB.GetUserData() === "wall") {
                        this.arrowVector.splice(i, 1);
                    }
                }
            }
        }

    },
    addArrow: function(mouseX, mouseY) {

        var angle = Math.atan2(mouseY - this.settings.screeSize.height, mouseX);
        var vertices = [];
        vertices.push(new b2Vec2(-1.4, 0));
        vertices.push(new b2Vec2(0, -0.1));
        vertices.push(new b2Vec2(0.6, 0));
        vertices.push(new b2Vec2(0, 0.1));
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(mouseX / this.settings.scale, mouseY / this.settings.scale);
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.userData = {name: "arrow"};
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsVector(vertices, 4);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = polygonShape;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.1;
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        body.SetLinearVelocity(new b2Vec2(20 * Math.cos(angle), 20 * Math.sin(angle)));
        body.SetAngle(angle);
        this.arrowVector.push(body);
        for (var i = 0; i < this.arrowVector.length; i++) {
            this.arrowVector[i].GetUserData().follow = false;
        }
    }
};