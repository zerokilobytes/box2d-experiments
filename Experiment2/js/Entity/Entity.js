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
        var width = this.context.settings.screeSize.width;
        var height = this.context.settings.screeSize.height;

        if (this.canRotate) {
            this.skin.getBitmap().rotation = this.body.GetAngle() * (180 / Math.PI);
        }
        this.skin.getBitmap().x = this.body.GetWorldCenter().x * scale;
        this.skin.getBitmap().y = this.body.GetWorldCenter().y * scale;

        if (this.type === "enemy") {
            if (this.getAbsolutePosition().x < -10
                    || this.getAbsolutePosition().x > width + 10)
            {
                this.destroy();
            } else if (this.getAbsolutePosition().y > height) {
                this.context.removeLife(this.getAbsolutePosition());
                this.destroy();
            }
        }
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
        var position = this.getPosition();
        var world = this.context.world;
        var body = this.body;
        world.DestroyBody(body);
        this.removeSkin();
        if (this.type === "enemy") {
            this.context.modelManager.pop(position);
        }
    },
    removeSkin: function() {
        this.context.stage.removeChild(this.skin.getBitmap());
    },
    pop: function(position) {
        this.context.modelManager.pop(position);
    },
    getAbsolutePosition: function() {
        var scale = this.context.settings.scale;
        var box2dVec = this.body.GetPosition();
        return new Vector2D(box2dVec.x * scale, box2dVec.y * scale);
    }
};