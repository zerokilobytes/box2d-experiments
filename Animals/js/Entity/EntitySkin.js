var EntitySkin = function(image, positionVector, centerVector) {
    this.image = image;
    this.positionVector = positionVector;
    this.centerVector = centerVector;
    this.bitmap = null;

    this.init();
};

EntitySkin.prototype = {
    init: function() {
        this.bitmap = new createjs.Bitmap(this.image);

        this.bitmap.x = this.positionVector.x;
        this.bitmap.y = this.positionVector.y;
        this.bitmap.regX = this.centerVector.x;
        this.bitmap.regY = this.centerVector.y;
        this.bitmap.snapToPixel = true;
        this.bitmap.mouseEnabled = false;
    },
    getBitmap: function() {
        return this.bitmap;
    }
};