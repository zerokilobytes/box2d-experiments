var EntitySkin = function(image, positionVector, centerVector, scaleVector) {
    this.image = image;
    this.positionVector = positionVector;
    this.centerVector = centerVector;
    this.scaleVector = scaleVector;
    this.bitmap = null;

    this.init();
};

EntitySkin.prototype = {
    init: function() {
        this.bitmap = new createjs.Bitmap(this.image);

        //Initialize Bitmap
        this.bitmap.x = this.positionVector.x;
        this.bitmap.y = this.positionVector.y;
        this.bitmap.regX = this.centerVector.x;
        this.bitmap.regY = this.centerVector.y;
        this.bitmap.snapToPixel = true;
        this.bitmap.mouseEnabled = false;

        //Scale Image
        this.bitmap.scaleX = this.scaleVector.x;
        this.bitmap.scaleY = this.scaleVector.y;
    },
    getBitmap: function() {
        return this.bitmap;
    }
};