var Entity = function() {
    throw new Error("Abstract Entity object cannot be instantiated");
};
Entity.prototype = {
    init: function() {
        this.skin = null;
        this.body = null;
        this.actor = null;
    },
    update: function() {
        this.skin.getBitmap().rotation = this.body.getDefinition().GetAngle() * (180 / Math.PI);
        this.skin.getBitmap().x = this.body.getDefinition().GetWorldCenter().x * this.settings.scale;
        this.skin.getBitmap().y = this.body.getDefinition().GetWorldCenter().y * this.settings.scale;
    },
    createSkin: function(image, positionVector, centerVector) {
        var skin = new EntitySkin(image, positionVector, centerVector);
        return skin;
    },
    createBody: function(postion, scale) {
        var body = new EntityBody(this.world, postion, this.bodyVector, scale);
        return body;
    }
};