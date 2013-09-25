

var Integrator = function(context) {
    this.timeStep = 1 / 60;
    this.velocityIterations = 10;
    this.positionIterations = 10;

    this.settings = context.settings;
    this.world = context.world;
    this.lastTimestamp = Date.now();
    this.fixedTimestepAccumulator = 0;
    this.bodiesToRemove = [];
    this.actors = [];
    this.bodies = [];
};
Integrator.prototype = {
    setup: function() {

        var wallWidth = 2.5;
        var wallCenterX = this.settings.screeSize.width / 2;
		var wallCenterY = this.settings.screeSize.height / 2;

        this.addDebug();

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef;

        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
		
		//create top
       fixDef.shape.SetAsBox(wallCenterX / this.settings.scale, wallWidth/ this.settings.scale);
		bodyDef.position.Set(wallCenterX / this.settings.scale, wallWidth/ this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //create left
        fixDef.shape.SetAsBox(wallWidth / this.settings.scale, wallCenterY/ this.settings.scale);
        bodyDef.position.Set(wallWidth/ this.settings.scale, wallCenterY / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

        //create right
        fixDef.shape.SetAsBox(wallWidth / this.settings.scale, wallCenterY/ this.settings.scale);
        bodyDef.position.Set((wallCenterX*2 - wallWidth) / this.settings.scale, wallCenterY / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);

		//create bottom
        fixDef.shape.SetAsBox(wallCenterX / this.settings.scale, wallWidth/ this.settings.scale);
		bodyDef.position.Set(wallCenterX / this.settings.scale, (wallCenterY*2 -wallWidth)  / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
    },
    addDebug: function() {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(debugContext);
        debugDraw.SetDrawScale(this.settings.scale);
        debugDraw.SetFillAlpha(0.7);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
    },
    addEntity: function(entity) {
        this.actors.push(entity);
        this.bodies.push(entity.body);
    },
    removeActor: function(actor) {
        stage.removeChild(actor.skin);
        actors.splice(actors.indexOf(actor), 1);
    },
    update: function() {
        for (var i = 0, l = this.actors.length; i < l; i++) {
            this.actors[i].update();
        }

        this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
        this.world.ClearForces();
        this.world.m_debugDraw.m_sprite.graphics.clear();
        this.world.DrawDebugData();
    },
    pauseResume: function(p) {

    }
};