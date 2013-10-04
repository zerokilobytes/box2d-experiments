var EntityBody = function(context, postion, sizeVector, scale) {
    this.context = context;
    this.postion = postion;
    this.scale = scale;
    this.sizeVector = sizeVector;
    this.body = null;

    this.init();
};

EntityBody.prototype = {
    init: function() {

        /* var birdFixture = new b2FixtureDef;
         birdFixture.density = 1.0;
         birdFixture.friction = 0.5;
         birdFixture.restitution = 0.3;
         birdFixture.shape = new b2CircleShape(this.sizeVector.x / this.scale);
         var birdBodyDef = new b2BodyDef;
         birdBodyDef.type = b2Body.b2_dynamicBody;
         birdBodyDef.position.x = this.postion.x / this.scale;
         birdBodyDef.position.y = this.postion.y / this.scale;
         //console.log(this.context);
         this.body = this.context.world.CreateBody(birdBodyDef);
         this.body.CreateFixture(birdFixture);
         this.body.SetUserData(this);
         */
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsBox(this.sizeVector.x / this.scale, this.sizeVector.y / this.scale);

        var birdFixture = new b2FixtureDef;

        birdFixture.density = MathFunc.getRandomArbitrary(1, 5);
        birdFixture.friction = MathFunc.getRandomArbitrary(0.1, 1);
        birdFixture.restitution = MathFunc.getRandomArbitrary(0.2, 1);
        birdFixture.shape = polygonShape;
        var birdBodyDef = new b2BodyDef;
        birdBodyDef.type = b2Body.b2_dynamicBody;
        birdBodyDef.position.x = this.postion.x / this.scale;
        birdBodyDef.position.y = this.postion.y / this.scale;

        this.body = this.context.world.CreateBody(birdBodyDef);
        this.body.CreateFixture(birdFixture);
        //this.body.SetUserData(this);

        var angle = MathFunc.getRandomArbitrary(180, 360) * Math.PI / 180;
        var velocityX = MathFunc.getRandomArbitrary(2, 10) * -1;
        var velocityY = MathFunc.getRandomArbitrary(0.1, 1.0) * -1;
        this.body.SetLinearVelocity(new b2Vec2(Math.cos(angle) * velocityX, Math.sin(angle) * velocityY));
        this.body.SetAngle(angle);
    },
    getDefinition: function() {
        return this.body;
    }
};