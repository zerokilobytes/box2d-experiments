/**
 * 
 * @param {Context} context
 * @returns {Arrow}
 */
var Arrow = function(context) {
    this.context = context;
    this.body = null;
    this.hitList = [];
    this.ttl = 5000.0;
    this.collisionTime = null;
    this.init();
};

Arrow.prototype = {
    init: function() {
        this.name = "arrow";
        this.freeFlight = false;
        this.hasCollided = false;
    },
    spawn: function(mousePosition, bowPosition) {
        var scale = this.context.settings.scale;

        var angle = Math.atan2(mousePosition.y - bowPosition.y, mousePosition.x - bowPosition.x);
        var vertices = [];
        vertices.push(new b2Vec2(-1.4, 0));
        vertices.push(new b2Vec2(0, -0.1));
        vertices.push(new b2Vec2(0.6, 0));
        vertices.push(new b2Vec2(0, 0.1));
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(mousePosition.x / scale, mousePosition.y / scale);
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.userData = this;

        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsVector(vertices, 4);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = polygonShape;
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.1;
        var body = this.context.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);

        //velocity must be applied in the opposite direction
        body.SetLinearVelocity(new b2Vec2(-50 * Math.cos(angle), -50 * Math.sin(angle)));
        body.SetAngle(angle);

        this.body = body;
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
        var body = this.body.GetDefinition();
        //console.log(this.body.GetDefinition().awake);
        if (this.collisionTime !== null) {
            var currentTime = new Date();
            var diff = currentTime.getTime() - this.collisionTime.getTime();

            if (diff >= this.ttl) {
                Undertaker.add(this.body, this.context.world);
            }
            
        }
    }
};
