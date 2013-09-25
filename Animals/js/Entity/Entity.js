var Entity = function() {
    throw new Error("Abstract Entity object cannot be instantiated");
};
Entity.prototype = {
    init: function() {
        this.skin = null;
        this.body = null;
        this.actor = null;
        this.scaleVector = new Vector2D(1.0, 1.0);
    },
    update: function() {
        this.skin.getBitmap().rotation = this.body.getDefinition().GetAngle() * (180 / Math.PI);
        this.skin.getBitmap().x = this.body.getDefinition().GetWorldCenter().x * this.settings.scale;
        this.skin.getBitmap().y = this.body.getDefinition().GetWorldCenter().y * this.settings.scale;
    },
    createSkin: function(image, positionVector, centerVector) {
        var skin = new EntitySkin(image, positionVector, centerVector, this.scaleVector);
        return skin;
    },
    createBody: function(postion, scale) {
        var scaleX = this.bodyVector.x * this.scaleVector.x;
        var scaleY = this.bodyVector.y * this.scaleVector.y;
        var bodyVector = new Vector2D(scaleX, scaleY);

        var body = new EntityBody(this.world, postion, bodyVector, scale);
        return body;
    }
};