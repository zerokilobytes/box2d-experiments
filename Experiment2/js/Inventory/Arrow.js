/**
 * 
 * @param {Context} context
 * @returns {Arrow}
 */
var Arrow = function(context) {

    this.context = context;
    this.body = null;
    this.hitList = [];
    this.ttl = 900.0;
    this.collisionTime = null;
    this.init();
};

Arrow.prototype = {
    init: function() {
        this.type = "weapon";
        this.freeFlight = false;
        this.hasCollided = false;

        this.bodyVector = new Vector2D(95, 58);
        this.scaleVector = new Vector2D(1.0, 1.0);
    },
    spawn: function(mousePosition, bowPosition) {
        this.enabled = true;
        var scale = this.context.settings.scale;

        var angle = Math.atan2(mousePosition.y - bowPosition.y, mousePosition.x - bowPosition.x);
        var deltaX = Math.cos(angle) * 30;
        var deltaY = Math.sin(angle) * 30;

        var vertices = [];
        vertices.push(new b2Vec2(-1.2, 0));
        vertices.push(new b2Vec2(0, -0.1));
        vertices.push(new b2Vec2(0.6, 0));
        vertices.push(new b2Vec2(0, 0.1));
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set((mousePosition.x - deltaX) / scale, (mousePosition.y - deltaY) / scale);
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.userData = this;

        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsVector(vertices, 4);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = polygonShape;
        fixtureDef.density = 100;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.1;
        var body = this.context.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        //velocity must be applied in the opposite direction
        body.SetLinearVelocity(new b2Vec2(Global.arrow.velocity.x * Math.cos(angle), Global.arrow.velocity.y * Math.sin(angle)));
        body.SetAngle(angle);

        this.body = body;

        this.skin = this.createSkin(Resource.get('arrow'), bowPosition);
        this.context.stage.addChild(this.skin.getBitmap());
        this.enabled = true;
    },
    show: function(position) {
        this.skin = this.createSkin(Resource.get('arrow'), position);
        this.context.stage.addChild(this.skin.getBitmap());
        this.enabled = true;
    },
    addHit: function(guid) {
        this.hitList.push(guid);
    },
    hasHit: function(guid) {
        for (var i = 0; i < this.hitList.length; i++) {
            if (guid === this.hitList[i]) {
                return true;
            }
        }
        return false;
    },
    update: function() {
        //if (this.enabled) {
        if (this.collisionTime !== null) {
            var currentTime = new Date();
            var diff = currentTime.getTime() - this.collisionTime.getTime();

            if (diff >= this.ttl) {
                this.remove();
            }
        }
        if (this.body.GetPosition().y <= 0) {
            this.remove();
        }
        this.updateSkin();
        // }
    },
    remove: function() {
        Undertaker.add(this);
    },
    destroy: function() {
        Entity.prototype.destroy.call(this);
    },
    removeSkin: function() {
        Entity.prototype.removeSkin.call(this);
    },
    getBitmap: function() {
        return this.skin.getBitmap();
    },
    updateSkin: function() {
        var scale = this.context.settings.scale;

        this.skin.getBitmap().rotation = this.body.GetAngle() * (180 / Math.PI);
        this.skin.getBitmap().x = this.body.GetWorldCenter().x * scale;
        this.skin.getBitmap().y = this.body.GetWorldCenter().y * scale;
    },
    createSkin: function(image, positionVector) {
        var centerVector = new Vector2D(this.bodyVector.x / 2, this.bodyVector.y / 2);
        var skin = new EntitySkin(image, positionVector, centerVector, this.scaleVector);
        return skin;
    },
    getPosition: function() {
        return this.body.GetPosition();
    }
};
