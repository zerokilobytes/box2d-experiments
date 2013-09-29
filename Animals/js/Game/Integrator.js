var Integrator = function(context) {

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
        fixDef.friction = 0.4;
        fixDef.restitution = 0.2;
        var bodyDef = new b2BodyDef;

        //this.creatFixtures(fixDef, bodyDef);
        var floorHeight = 10;
        //bottom
        this.wall(this.settings.screeSize.width / 2, this.settings.screeSize.height - (floorHeight / 2), this.settings.screeSize.width, floorHeight);
        //right
        this.wall(this.settings.screeSize.width - (floorHeight / 2), this.settings.screeSize.height / 2, floorHeight, this.settings.screeSize.height);

        //top
        this.wall(this.settings.screeSize.width / 2, (floorHeight / 2), this.settings.screeSize.width, floorHeight);
    },
    wall: function(pX, pY, w, h) {
        var worldScale = this.settings.scale;
        var bodyDef = new b2BodyDef();
        bodyDef.position.Set(pX / worldScale, pY / worldScale);
        bodyDef.userData = {name: "wall"};
        var polygonShape = new b2PolygonShape();
        polygonShape.SetAsBox(w / 2 / worldScale, h / 2 / worldScale);
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = polygonShape;
        fixtureDef.density = 1;
        fixtureDef.restitution = 0.4;
        fixtureDef.friction = 1;
        var theWall = this.world.CreateBody(bodyDef);
        theWall.CreateFixture(fixtureDef);
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
        this.world.CreateBody(bodyDef).CreateFixture(fixDef).SetUserData("ceiling");

        //create left
        fixDef.shape.SetAsBox(wallWidth / this.settings.scale, wallCenterY / this.settings.scale);
        bodyDef.position.Set(wallWidth / this.settings.scale, wallCenterY / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef).SetUserData("wall");

        //create right
        fixDef.shape.SetAsBox(wallWidth / this.settings.scale, wallCenterY / this.settings.scale);
        bodyDef.position.Set((wallCenterX * 2 - wallWidth) / this.settings.scale, wallCenterY / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef).SetUserData("wall");

        //create bottom
        fixDef.shape.SetAsBox(wallCenterX / this.settings.scale, floorHeight / this.settings.scale);
        bodyDef.position.Set(wallCenterX / this.settings.scale, (wallCenterY * 2 - wallWidth) / this.settings.scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef).SetUserData("floor");
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
    },
    pauseResume: function(p) {

    }
};