/**
 **
 * Bird object
 * @returns {Bird}
 */
var Bird = function() {
    this.init();
};

/**
 * Bird prototype
 * @type type
 */
Bird.prototype = {
    /**
     * 
     * @returns {undefined}
     */
    init: function() {
        this.bodyVector = new Vector2D(25, 25);
        Entity.prototype.init.call(this);
    },
            
    /**
     * 
     * @param {type} context
     * @param {type} positionVector
     * @returns {undefined}
     */
    spawn: function(context, positionVector) {
        this.stage = context.stage;
        this.world = context.world;
        this.settings = context.settings;

        this.skin = this.createSkin(Resource.images['bird'], positionVector);
        this.body = this.createBody(positionVector, this.settings.scale);
        this.stage.addChild(this.skin.getBitmap());
    },
    /**
     * 
     * @returns {undefined}
     */
    update: function() {
        Entity.prototype.update.call(this);
    },
    /**
     * 
     * @returns {@exp;Entity@pro;prototype@pro;getSkin@call;call}
     */
    getSkin: function() {
        return Entity.prototype.getSkin.call(this);
    },
    /**
     * 
     * @returns {@exp;Entity@pro;prototype@pro;getBody@call;call}
     */
    getBody: function() {
        return Entity.prototype.getBody.call(this);
    },
    /**
     * 
     * @param {type} image
     * @param {type} positionVector
     * @returns {EntitySkin}
     */
    createSkin: function(image, positionVector) {
        return Entity.prototype.createSkin.call(this, image, positionVector, this.bodyVector);
    },
    /**
     * 
     * @param {type} postion
     * @param {type} scale
     * @returns {EntityBody}
     */
    createBody: function(postion, scale) {
        return Entity.prototype.createBody.call(this, postion, scale);
    }
};