var Fruit = function(context) {
    this.context = context;
    this.init();
};

Fruit.prototype = {
    init: function() {
        this.name = "food";
        this.bodyVector = new Vector2D(32, 32);
        Entity.prototype.init.call(this);
        this.scaleVector = new Vector2D(1, 1);
    },
    show: function(positionVector) {
        var scale = this.context.settings.scale;

        this.skin = this.createSkin(Resource.images['apple'], positionVector, this.bodyVector);
        this.context.stage.addChild(this.skin.getBitmap());
    },
    spawn: function(positionVector) {
        var scale = this.context.settings.scale;

        this.skin = this.createSkin(Resource.images['apple'], positionVector, this.bodyVector);
        this.body = this.createEntityBody(positionVector, scale).body;
        this.context.stage.addChild(this.skin.getBitmap());

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
    createEntityBody: function(postion, scale) {
        console.log(this.context);
        return Entity.prototype.createEntityBody.call(this, postion, scale);
    },
    destroy: function() {
        Entity.prototype.destroy.call(this);
    },
    removeSkin: function() {
        Entity.prototype.removeSkin.call(this);
    }
};