var Bonus = function(context) {
    this.type = "";
    this.context = null;
    this.enabled = false;
    this.onAcquire = null;
    this.init(context);
};

Bonus.prototype = {
    init: function(context) {
        this.context = context;

        this.type = "fixture";
        this.bodyVector = new Vector2D(64, 64);
        this.scaleVector = new Vector2D(1, 1);
        this.enabled = true;
    },
    spawn: function(data) {
        this.skin = this.createSkin(
                Resource.get('arrow_bonus'),
                new Vector2D(data.position.x, data.position.y),
                new Vector2D(this.bodyVector.x / 2, this.bodyVector.y / 2));
        this.context.stage.addChild(this.skin.getBitmap());

        var _this = this;

        this.skin.getBitmap().onMouseOver = function(event) {
           
        };
        this.skin.getBitmap().onPress = function(event) {
			 _this.takeAction();
        };
        this.skin.getBitmap().onMouseOut = function(event) {

        };

        this.skin.getBitmap().addEventListener("mousedown", function(event) {

        });
    },
	takeAction:function(){
		if (this.context.isPlaying()) {
                this.onAcquire.call(this, event);
                this.enabled = false;
                this.removeSkin();
            }
	},
    update: function() {
        this.updatePosition();
    },
    updatePosition: function() {
        var y = this.skin.getBitmap().y + 1000 / (Global.FPS * 3);
        this.skin.getBitmap().y = y;
    },
    createSkin: function(image, positionVector, centerVector) {
        var skin = new EntitySkin(image, positionVector, centerVector, this.scaleVector);
        return skin;
    },
    removeSkin: function() {
        Entity.prototype.removeSkin.call(this);
    }
};