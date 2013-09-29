var EntityBody = function(context, postion, sizeVector, scale) {
    this.context = world;
    this.postion = context;
    this.scale = scale;
    this.sizeVector = sizeVector;
    this.body = null;

    this.init();
};

EntityBody.prototype = {
    init: function() {
        var birdFixture = new b2FixtureDef;
        birdFixture.density = 1.0;
        birdFixture.friction = 0.5;
        birdFixture.restitution = 0.3;
        birdFixture.shape = new b2CircleShape(this.sizeVector.x / this.scale);
        var birdBodyDef = new b2BodyDef;
        birdBodyDef.type = b2Body.b2_dynamicBody;
        birdBodyDef.position.x = this.postion.x / this.scale;
        birdBodyDef.position.y = this.postion.y / this.scale;
        this.body = this.context.world.CreateBody(birdBodyDef);
        this.body.CreateFixture(birdFixture);
        this.body.SetUserData(this);
    },
    getDefinition: function() {
        return this.body;
    }
};