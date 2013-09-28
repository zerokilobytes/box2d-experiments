var Bow = function(context) {
    this.settings = context.settings;
    this.world = context.world;
    this.stage = context.stage;
    this.context = context;
    this.rotation = 0;
    this.active = false;
    this.init();
};

Bow.prototype = {
    init: function() {
        this.bowCenter = null;
        this.bodyVector = new Vector2D(310, 73);
        this.scaleVector = new Vector2D(0.5, 0.5);
    },
    spawn: function(position) {
        this.bowCenter = position;
        var shape = new createjs.Shape();

        var g = shape.graphics;
        g.beginFill("#FF0000");
        g.drawCircle(this.bowCenter.x, this.bowCenter.y, 5);
        g.endFill();
        shape.alphs = 0.5;
        this.stage.addChild(shape);

        this.skin = this.createSkin(Resource.images['bow'], position,
                new Vector2D(this.bodyVector.x / 2, this.bodyVector.y / 2)
                );

        this.stage.addChild(this.skin.getBitmap());

        var _this = this;
        shape.addEventListener("mousedown", function(evt) {
            _this.active = true;
        });
        this.context.stage.addEventListener("stagemouseup", function(event) {
            if (_this.active) {
                console.log(event);
                _this.context.addArrow(new Vector2D(event.stageX,
                        event.stageY), _this.getPosition());
            }
            _this.active = false;
        });

        this.context.stage.addEventListener("stagemousemove", function(event) {
            console.log("stagemousemove");
            _this.update(new Vector2D(event.stageX, event.stageY));
        });

        this.context.stage.addEventListener("stagemouseover", function(event) {

        });
    },
    getPosition: function() {
        return this.bowCenter;
    },
    update: function(position) {
        if (this.active) {
            var angleRadian = Math.atan2(position.y - this.bowCenter.y, position.x - this.bowCenter.x);
            var angle = normalizeAngle((angleRadian * 180 / Math.PI));
            this.rotation = angle;
            //console.log(angle + " > " + (angleRadian * 180 / Math.PI ));

            this.skin.getBitmap().rotation = angleRadian * 180 / Math.PI - 90;
        }
    },
    createSkin: function(image, positionVector, centerVector) {
        var skin = new EntitySkin(image, positionVector, centerVector, this.scaleVector);
        return skin;
    },
    getRotation: function() {
        return this.rotation;
    }
};
