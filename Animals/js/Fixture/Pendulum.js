var Pendulum = function(context) {
    this.settings = context.settings;
    this.world = context.world;

    this.init();
};

Pendulum.prototype = {
    init: function() {
        this.steelBall;
    },
    revoluteJoint: function(bodyA, bodyB, anchorA, anchorB) {
        var revoluteJointDef = new b2RevoluteJointDef();
        revoluteJointDef.localAnchorA.Set(anchorA.x, anchorA.y);
        revoluteJointDef.localAnchorB.Set(anchorB.x, anchorB.y);
        revoluteJointDef.bodyA = bodyA;
        revoluteJointDef.bodyB = bodyB;
        this.world.CreateJoint(revoluteJointDef);
    },
    spawn: function(position) {
        var worldScale = this.settings.scale;
        // number of links forming the rope
        var links = 6;
        // according to the number of links, I am setting the length of a single chain piace
        var chainLength = 80 / links;

        // ceiling polygon shape
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsBox(8 / worldScale, 8 / worldScale);
        // ceiling fixture;
        var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 1;
        fixtureDef.restitution = 0.5;
        fixtureDef.shape = polygonShape;
        // ceiling body
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(position.x / worldScale, position.y / worldScale);
        // ceiling creation;
        var wall = this.world.CreateBody(bodyDef);
        wall.CreateFixture(fixtureDef);
        // link polygon shape
        polygonShape.SetAsBox(2.5 / worldScale, chainLength / worldScale);
        // link fixture;
        fixtureDef.density = 5;
        fixtureDef.shape = polygonShape;
        // link body
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.userData = {name: "rope"};
        // link creation
        for (var i = 0; i < links; i++) {
            bodyDef.position.Set(position.x / worldScale, (chainLength + 2 * chainLength * i) / worldScale);
            if (i === 0) {
                var link = this.world.CreateBody(bodyDef);
                link.CreateFixture(fixtureDef);
                this.revoluteJoint(wall, link, new b2Vec2(0, 0), new b2Vec2(0, -chainLength / worldScale));
            }
            else {
                var newLink = this.world.CreateBody(bodyDef);
                newLink.CreateFixture(fixtureDef);
                this.revoluteJoint(link, newLink, new b2Vec2(0, chainLength / worldScale), new b2Vec2(0, -chainLength / worldScale));
                link = newLink;
            }
        }

        var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 0;
        fixtureDef.friction = 1;
        fixtureDef.restitution = 0.5;


        var bodyDef2 = new b2BodyDef();
        bodyDef2.position = bodyDef.position;
        bodyDef2.type = b2Body.b2_dynamicBody;
        bodyDef2.userData = {name: "food"};

        // attaching the ball at the end of the rope
        //var circleShape = new b2CircleShape(25 / this.settings.scale);
        //fixtureDef.shape = circleShape;
        var circleShape = new b2PolygonShape();
        circleShape.SetAsBox(25 / worldScale, 25 / worldScale);
        fixtureDef.shape = circleShape;

        this.steelBall = this.world.CreateBody(bodyDef2);
        this.steelBall.CreateFixture(fixtureDef);
        this.revoluteJoint(link, this.steelBall, new b2Vec2(0, chainLength / worldScale), new b2Vec2(0, 0));
    },
    sphereImpulse: function(e) {
        this.steelBall.ApplyImpulse(new b2Vec2(-50 + Math.random() * 100, -150), this.steelBall.GetWorldCenter());
    }
};