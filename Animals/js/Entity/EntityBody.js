var EntityBody = function(world, postion, sizeVector, scale) {
    this.world = world;
    this.postion = postion;
    this.scale = scale;
    this.sizeVector = sizeVector;
    this.body = null;

    this.init();
};

EntityBody.prototype = {
    init: function() {
        var birdFixture = new b2FixtureDef;
        birdFixture.density = 1;
        birdFixture.friction = 0.5;
        birdFixture.restitution = 0.5;
        birdFixture.shape = new b2CircleShape(this.sizeVector.x / this.scale);
        var birdBodyDef = new b2BodyDef;
        birdBodyDef.type = b2Body.b2_dynamicBody;
        birdBodyDef.position.x = this.postion.x / this.scale;
        birdBodyDef.position.y = this.postion.y / this.scale;
        this.body = this.world.CreateBody(birdBodyDef);
        this.body.CreateFixture(birdFixture);
        this.body.SetUserData(this);
    },
    getDefinition: function() {
        return this.body;
    }
};