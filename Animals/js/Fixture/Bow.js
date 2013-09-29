var Bow = function(context) {
    this.context = context;
    this.rotation = 45;
    this.active = false;
    this.arrowHead = null;
    this.arrowTail = null;
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

        this.arrowHead = this.addMarker(position);
        this.context.stage.addChild(this.arrowHead);

        this.arrowTail = this.addMarker(position);
        this.context.stage.addChild(this.arrowTail);
        this.context.stage.update();

        this.arrowHead.addEventListener("mousedown", function(evt) {
            _this.active = true;
        });

        this.skin = this.createSkin(
                Resource.images['bow'],
                position,
                new Vector2D(this.bodyVector.x / 2, this.bodyVector.y / 2));
                
        this.skin.getBitmap().rotation = this.rotation;        

        this.context.stage.addChild(this.skin.getBitmap());

        var _this = this;

        this.context.stage.addEventListener("stagemouseup", function(event) {
            if (_this.active) {
                _this.context.addArrow(new Vector2D(_this.arrowTail.x,
                        _this.arrowTail.y), _this.getPosition());

                _this.arrowTail.x = _this.arrowHead.x;
                _this.arrowTail.y = _this.arrowHead.y;
            }
            _this.active = false;
        });

        this.context.stage.addEventListener("stagemousemove", function(event) {
            if (_this.active) {
                _this.update(new Vector2D(event.stageX, event.stageY));
            }
        });

        this.context.stage.addEventListener("stagemouseover", function(event) {

        });
    },
    getPosition: function() {
        return this.bowCenter;
    },
    update: function(position) {
        var angleRadian = Math.atan2(position.y - this.bowCenter.y, position.x - this.bowCenter.x);
        var angle = MathFunc.normalizeAngle((angleRadian * 180 / Math.PI));
        this.rotation = angle;
        this.skin.getBitmap().rotation = angleRadian * 180 / Math.PI - 90;

        this.arrowTail.x = position.x;
        this.arrowTail.y = position.y;

        var xDist = this.arrowHead.x - position.x;
        var yDist = this.arrowHead.y - position.y;

        var distSquarRt = Math.sqrt(xDist * xDist + yDist * yDist);
        if (distSquarRt > 30) {
            x = this.arrowHead.x + Math.cos(Math.atan2(yDist, xDist)) * -30;
            y = this.arrowHead.y + Math.sin(Math.atan2(yDist, xDist)) * -30;

            this.arrowTail.x = x;
            this.arrowTail.y = y;
        }
    },
    createSkin: function(image, positionVector, centerVector) {
        var skin = new EntitySkin(image, positionVector, centerVector, this.scaleVector);
        return skin;
    },
    addMarker: function(position) {
        var stage = new createjs.Stage();
        //Create a Shape DisplayObject.
        circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 5);
        //Set position of Shape instance.
        circle.x = position.x;
        circle.y = position.y;
        //Add Shape instance to stage display list.
        stage.addChild(circle);
        //Update stage will render next frame
        stage.update();
        return circle;
    },
    getRotation: function() {
        return this.rotation;
    }
};
