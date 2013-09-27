var Vector2D = function(x, y) {
    this.x = x;
    this.y = y;

    this.init();
};

Vector2D.prototype = {
    init: function() {

    }
};

function getAngle(x1, y1, x2, y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
}

function toRadiant(degrees)
{
    return   degrees * (Math.PI / 180);
}

function toDegree(radians) {
    return  radians * (180 / Math.PI);
}

function rotate(degrees) {
    var orientation = degrees % 360;
    
    return orientation;
}