var ModelManager = function(context) {
    this.context = context;
    this.arrowVector = [];
    this.models = [];
    this.lastTime = null;
    this.spawnRate = 0;
    this.fireRate = 0;
    this.init();
};

ModelManager.prototype = {
    init: function() {
        this.lastTime = new Date();
        this.spawnRate = Global.model.spawnRate;
        this.fireRate = Global.model.fireRate;
    },
    update: function() {
        this.updateArrow();
        this.updateModel();
        this.spawnEnemy();
        this.cleanUp();
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
    cleanUp: function() {
        Undertaker.purge();
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
        if (diff >= this.spawnRate) {
            this.lastTime = currentTime;
            this.addEnemy();

        }
    },
    addEnemy: function() {
        var x = MathFunc.getRandomArbitrary(64, this.context.settings.screeSize.width - 64);
        var y = MathFunc.getRandomArbitrary(80, 400) * -1;

        var enemy = new Toad(this.context);
        this.add(enemy);
        enemy.spawn(new Vector2D(x, y));
    },
    pop: function(position) {
        for (var i = 0; i < this.models.length; i++) {
            if (this.models[i].enabled && (this.models[i].type === "enemy" || this.models[i].type === "particle")) {
                var objA = this.models[i].getPosition();
                var objB = position;

                var xDist = objA.x - objB.x;
                var yDist = objA.y - objB.y;

                var distSqr = (xDist * xDist) + (yDist * yDist);
                var force = 5;
                var a = Math.atan2(yDist, xDist);
                var bpt = this.models[i].body.GetPosition();

                if (distSqr < 5) {
                    this.models[i].body.ApplyImpulse(new b2Vec2(Math.cos(a) * force, Math.sin(a) * force), bpt);
                }
            }
        }
    }

};