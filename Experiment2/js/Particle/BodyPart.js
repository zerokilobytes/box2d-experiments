var BodyPart = function(context) {
    this.context = context;
    this.init();
};

BodyPart.prototype = {
    init: function() {
        this.type = "particle";
        this.bodyVector = new Vector2D(0.02, 0.02);
        Entity.prototype.init.call(this);
        this.scaleVector = new Vector2D(1, 1);
        this.canRotate = true;
        this.creationTime = null;
        this.ttl = 10000;
    },
    spawn: function(positionVector) {
        this.enabled = true;
        var scale = this.context.settings.scale;

        this.skin = this.createSkin(Resource.get('part01'), positionVector, this.bodyVector);
        this.body = this.createEntityBody(positionVector, scale);
        this.context.stage.addChild(this.skin.getBitmap());
        this.creationTime = new Date();

        Entity.prototype.spawn.call(this);
    },
    update: function() {
        this.body.SetLinearVelocity(new b2Vec2(0, 0));
        this.body.SetFixedRotation(true);
        Entity.prototype.update.call(this);

        if (this.creationTime !== null) {
            var currentTime = new Date();
            var diff = currentTime.getTime() - this.creationTime.getTime();

            if (diff >= this.ttl) {
                this.destroy();
            }
        }
    },
    getSkin: function() {
        return Entity.prototype.getSkin.call(this);
    },
    getBody: function() {
        return Entity.prototype.getBody.call(this);
    },
    createSkin: function(image, positionVector) {
        return Entity.prototype.createSkin.call(this, image, positionVector, this.bodyVector);
    },
    createEntityBody: function(postion, scale) {
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsBox(this.bodyVector.x / scale, this.bodyVector.y / scale);
        var birdFixture = new b2FixtureDef;
        birdFixture.density = 0.001;
        birdFixture.friction = 0.001;
        birdFixture.restitution = 0.001;
        birdFixture.shape = polygonShape;
        var birdBodyDef = new b2BodyDef;
        birdBodyDef.type = b2Body.b2_dynamicBody;
        birdBodyDef.position.x = postion.x / scale;
        birdBodyDef.position.y = postion.y / scale;

        this.body = this.context.world.CreateBody(birdBodyDef);
        this.body.CreateFixture(birdFixture);
        return this.body;
    },
    destroy: function() {
        //this.body.SetLinearVelocity(new b2Vec2(0, 0));
        Entity.prototype.destroy.call(this);
    },
    removeSkin: function() {
        Entity.prototype.removeSkin.call(this);
    },
    getPosition: function() {
        return this.body.GetPosition();
    }
};