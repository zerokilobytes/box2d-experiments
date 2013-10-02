var BlueBird = function() {
    this.init();
};

BlueBird.prototype = {
    init: function() {
        this.bodyVector = new Vector2D(32, 32);
        Entity.prototype.init.call(this);
    },
    spawn: function(context, positionVector) {
        this.stage = context.stage;
        this.world = context.world;
        this.settings = context.settings;

        this.skin = this.createSkin(Resource.images['blue_bird'], positionVector, this.bodyVector);
        this.body = this.createBody(positionVector, this.settings.scale);
        this.stage.addChild(this.skin.getBitmap());
        
        Entity.prototype.spawn.call(this);
    },
    update: function() {
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
    createBody: function(postion, scale) {
        return Entity.prototype.createBody.call(this, postion, scale);
    }
};