var Bow = function(context) {
    this.settings = context.settings;
    this.world = context.world;
    this.stage = context.stage;

    this.init();
};

Bow.prototype = {
    init: function() {
        this.bowCenter = null;
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

        /* var worldScale = this.settings.scale;
         
         var ballFixDef = new b2FixtureDef();
         ballFixDef.density = 0;
         ballFixDef.friction = 0;
         ballFixDef.restitution = 0;
         ballFixDef.shape = new b2CircleShape(30 / worldScale);
         
         // definicao da parede
         var ballBodyDef = new b2BodyDef();
         ballBodyDef.type = b2Body.b2_staticBody;
         ballBodyDef.userData = 'BALL';
         
         ballBodyDef.position.Set(position.x / worldScale, position.y / worldScale);
         ballBody1 = this.world.CreateBody(ballBodyDef);
         ballBody1.CreateFixture(ballFixDef);
         */
    },
    getPosition: function() {
        return this.bowCenter;
    },
    update: function(position) {
        //this.bowCenter = position;
        /* var shape = new createjs.Shape();
         
         var g = shape.graphics;
         g.beginFill("#0000FF");
         g.drawCircle(position.x, position.y, 5);
         g.endFill();
         shape.alphs = 0.5;
         this.stage.addChild(shape);*/
        var shape = new createjs.Shape();

        var g = shape.graphics;
        //g.beginFill("#0000FF");
        g.setStrokeStyle(4).beginStroke("#0000FF");
        g.moveTo(position.x, position.y);
        g.lineTo(this.bowCenter.x, this.bowCenter.y);



        g.endFill();
        this.stage.addChild(shape);


        var angleRadian = Math.atan2(position.y - this.bowCenter.y, position.x - this.bowCenter.x);
        

        var angle = angleRadian * 180 / Math.PI;// - 90; //convert to degrees , the 90 is to have it point to the mouse

        console.log(angle);
    }
};
