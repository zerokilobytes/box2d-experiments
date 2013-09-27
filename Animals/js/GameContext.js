var GameContext = function(settings) {
    this.timeStep = 1 / 60;
    this.velocityIterations = 10;
    this.positionIterations = 10;
    this.settings = settings;
    this.integrator = null;
    this.debugMode = true;
    this.arrowVector = [];
    this.mouseDown = false;
    this.bodiesToRemove = [];
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


        this.bow = new Bow(this);
        this.bow.spawn(new Vector2D(100, 400));

        //Create world
        this.world = new b2World(new b2Vec2(0, 10), true);
        this.addDebug();
        this.gameCanvas.addEventListener("mousedown", function(evt) {
            _this.mouseDown = true;
            _this.addArrow(new Vector2D(evt.x, evt.y), _this.bow.getPosition());

        });

        this.gameCanvas.addEventListener("mousemove", function(evt) {
            if (_this.mouseDown === true) {
                // console.log(evt.x);
                _this.bow.update(new Vector2D(evt.x, evt.y));
            }

        });
        this.gameCanvas.addEventListener("mouseup", function(evt) {
            _this.mouseDown = false;
        });


        this.world.SetContactListener(ArrowContactListner);

        var pendulum1 = new Pendulum(this);
        pendulum1.spawn(new Vector2D(260, 30));

        var pendulum2 = new Pendulum(this);
        pendulum2.spawn(new Vector2D(520, 30));



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


        for (var i = this.bodiesToRemove.length - 1; i >= 0; i--) {
            this.world.DestroyBody(this.bodiesToRemove[i]);
        }
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

        for (var i = this.arrowVector.length - 1; i >= 0; i--) {
            var body = this.arrowVector[i];
            if (body.GetType() === b2Body.b2_dynamicBody) {
                if (!body.GetUserData().freeFlight) {
                    var flyingAngle = Math.atan2(body.GetLinearVelocity().y, body.GetLinearVelocity().x);
                    body.SetAngle(flyingAngle);
                }
            }
            else {
                arrowVector.splice(i, 1);
                body.SetBullet(false);
                body.GetUserData().follow = false;
            }
            if (body.GetUserData().follow) {
                var posX = body.GetPosition().x * worldScale;
                posX = stage.stageWidth / 2 - posX;
                if (posX > 0) {
                    posX = 0;
                }
                if (posX < -640) {
                    posX = -640;
                }
                x = posX;
            }
        }

    },
    addArrow: function(mousePosition, bowPosition) {
        var angle = Math.atan2(mousePosition.y - bowPosition.y, mousePosition.x - bowPosition.x);
        var vertices = [];
        vertices.push(new b2Vec2(-1.4, 0));
        vertices.push(new b2Vec2(0, -0.1));
        vertices.push(new b2Vec2(0.6, 0));
        vertices.push(new b2Vec2(0, 0.1));
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(mousePosition.x / this.settings.scale, mousePosition.y / this.settings.scale);
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.userData = {name: "arrow", freeFlight: false};
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsVector(vertices, 4);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = polygonShape;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.1;
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        //velocity must be applied in the opposite direction
        body.SetLinearVelocity(new b2Vec2(-20 * Math.cos(angle), -20 * Math.sin(angle)));
        body.SetAngle(angle);
        this.arrowVector.push(body);
        for (var i = 0; i < this.arrowVector.length; i++) {
            this.arrowVector[i].GetUserData().follow = false;
        }
    }
};