var ModelManager = function(context) {
    this.context = context;
    this.arrowVector = [];
    this.models = [];
    this.lastTime = null;
    this.fireRate = 500;
    this.init();
};

ModelManager.prototype = {
    init: function() {
        this.lastTime = new Date();
    },
    update: function() {
        this.updateArrow();
        this.updateModel();
        this.spawnEnemy();
    },
    updateModel: function() {
        for (var i = 0; i < this.models.length; i++) {
            if (this.models[i].enabled) {
                this.models[i].update();
            }
        }
    },
    add: function(model) {
        this.models.push(model);
    },
    updateArrow: function() {
        var dragConstant = 0.05;
        var worldScale = this.context.settings.scale;

        for (var i = this.arrowVector.length - 1; i >= 0; i--) {
            if (this.arrowVector[i].enabled) {
                var body = this.arrowVector[i].body;
                var flightSpeed = Vector2D.normalize(body.GetLinearVelocity());
                var bodyAngle = body.GetAngle();
                var pointingDirection = new b2Vec2(Math.cos(bodyAngle), -Math.sin(bodyAngle));
                var flyingAngle = Math.atan2(body.GetLinearVelocity().y, body.GetLinearVelocity().x);
                var flightDirection = new b2Vec2(Math.cos(flyingAngle), Math.sin(flyingAngle));
                var dot = Vector2D.dot(flightDirection, pointingDirection);
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

                if (body.GetType() === b2Body.b2_dynamicBody) {
                    if (!body.GetUserData().freeFlight) {
                        var flyingAngle = Math.atan2(body.GetLinearVelocity().y, body.GetLinearVelocity().x);
                        body.SetAngle(flyingAngle);
                    }
                }
                this.arrowVector[i].update();
            }
        }
    },
    spawnEnemy: function() {
        var currentTime = new Date();
        var diff = currentTime.getTime() - this.lastTime.getTime();
        if (diff >= this.fireRate) {
            this.lastTime = currentTime;
            this.addEnemy();

        }
    },
    addEnemy: function() {
        var x = this.context.settings.screeSize.width * Math.random();
        var bird = new Fruit(this.context);
        this.add(bird);
        bird.spawn(new Vector2D(x, 50));
    }
};