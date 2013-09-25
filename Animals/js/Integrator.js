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
        //this.addDebug();
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;
        var bodyDef = new b2BodyDef;

        this.creatFixtures(fixDef, bodyDef);
    },
    creatFixtures: function(fixDef, bodyDef) {
        var wallWidth = 2.5;
        var floorHeight = 20;
        
        var wallCenterX = this.settings.screeSize.width / 2;
        var wallCenterY = this.settings.screeSize.height / 2;

        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        
        //create top
        fixDef.shape.SetAsBox(wallCenterX / this.settings.scale, wallWidth / this.settings.scale);
        bodyDef.position.Set(wallCenterX / this.settings.scale, wallWidth / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        //create left
        fixDef.shape.SetAsBox(wallWidth / this.settings.scale, wallCenterY / this.settings.scale);
        bodyDef.position.Set(wallWidth / this.settings.scale, wallCenterY / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        //create right
        fixDef.shape.SetAsBox(wallWidth / this.settings.scale, wallCenterY / this.settings.scale);
        bodyDef.position.Set((wallCenterX * 2 - wallWidth) / this.settings.scale, wallCenterY / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        //create bottom
        fixDef.shape.SetAsBox(wallCenterX / this.settings.scale, floorHeight / this.settings.scale);
        bodyDef.position.Set(wallCenterX / this.settings.scale, (wallCenterY * 2 - wallWidth) / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
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
    },
    pauseResume: function(p) {

    }
};