var Toad = function(context) {
    this.context = context;
    this.init();
};

Toad.prototype = {
    init: function() {
        this.type = "enemy";
        this.bodyVector = new Vector2D(32, 32);
        Entity.prototype.init.call(this);
        this.scaleVector = new Vector2D(1, 1);
        this.canRotate = false;
    },
    show: function(positionVector) {
        var scale = this.context.settings.scale;

        this.skin = this.createSkin(Resource.images['frog'], positionVector, this.bodyVector);
        this.context.stage.addChild(this.skin.getBitmap());
    },
    spawn: function(positionVector) {
        this.enabled = true;
        var scale = this.context.settings.scale;

        this.skin = this.createSkin(Resource.images['frog'], positionVector, this.bodyVector);
        this.body = this.createEntityBody(positionVector, scale).body;

        //this.body.SetLinearVelocity(new b2Vec2(0, 0));
        //this.body.SetAngularVelocity(new b2Vec2(0, 0));

        //this.body.GetFixtureList().m_density = -10;//MathFunc.getRandomArbitrary(1, 200);
        this.context.stage.addChild(this.skin.getBitmap());

        Entity.prototype.spawn.call(this);
    },
    update: function() {
        //this.body.SetLinearVelocity(new b2Vec2(0, 0));
        this.body.SetFixedRotation(true);
        //this.body.ApplyForce(0, this.body.GetPosition());
        //this.body.ApplyForce(this.body.GetMass() * this.context.world.GetGravity(), this.body.GetWorldCenter());
        Entity.prototype.update.call(this);
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
        return Entity.prototype.createEntityBody.call(this, postion, scale);
    },
    destroy: function() {
        Entity.prototype.destroy.call(this);

        for (var i = 0; i < 4; i++) {
            var a = MathFunc.getRandomArbitrary(1, 360) * Math.PI / 180;
            var pos = this.getAbsolutePosition();
            var rad = 150;
            var radX = rad * Math.cos(a);
            var radY = rad * Math.sin(a);
            var piece = new BodyPart(this.context);
            piece.spawn(new Vector2D(pos.x + radX, pos.y + radY));
            this.context.modelManager.add(piece);
        }
    },
    removeSkin: function() {
        Entity.prototype.removeSkin.call(this);
    },
    getPosition: function() {
        return this.body.GetPosition();
    },
    getAbsolutePosition: function() {
        var scale = this.context.settings.scale;
        var box2dVec = this.body.GetPosition();
        return new Vector2D(box2dVec.x * scale, box2dVec.y * scale);
    }
};