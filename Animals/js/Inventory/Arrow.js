/**
 * 
 * @param {Context} context
 * @returns {Arrow}
 */
var Arrow = function(context) {
    this.context = context;
    this.body = null;
    this.init();
};

Arrow.prototype = {
    init: function() {

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
        bodyDef.userData = {name: "arrow", freeFlight: false, hasCollided: false};
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
    }
};
