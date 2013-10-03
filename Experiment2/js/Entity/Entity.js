var Entity = function() {
    throw new Error("Entity object cannot be instantiated");
};
Entity.prototype = {
    init: function() {
        this.skin = null;
        this.body = null;
        this.actor = null;
        this.scaleVector = new Vector2D(1.0, 1.0);
    },
    spawn: function() {

    },
    update: function() {
        var scale = this.context.settings.scale;

        //this.skin.getBitmap().rotation = this.body.GetAngle() * (180 / Math.PI);
        this.skin.getBitmap().x = this.body.GetWorldCenter().x * scale;
        this.skin.getBitmap().y = this.body.GetWorldCenter().y * scale;
    },
    createSkin: function(image, positionVector, centerVector) {
        var skin = new EntitySkin(image, positionVector, centerVector, this.scaleVector);
        return skin;
    },
    createEntityBody: function(postion, scale) {
        var scaleX = this.bodyVector.x * this.scaleVector.x;
        var scaleY = this.bodyVector.y * this.scaleVector.y;
        var bodyVector = new Vector2D(scaleX, scaleY);
        var body = new EntityBody(this.context, postion, bodyVector, scale);
        body.body.SetUserData(this);
        return body;
    },
    destroy: function() {
        this.enabled = false;
        var world = this.context.world;
        var body = this.body;
        world.DestroyBody(body);
        this.enabled = false;
        this.removeSkin();
    },
    removeSkin: function() {
        this.context.stage.removeChild(this.skin.getBitmap());
    }
};