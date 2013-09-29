var Vector2D = function(x, y) {
    this.x = x;
    this.y = y;

    this.init();
};

Vector2D.prototype = {
    init: function() {

    }
};

Vector2D.normalize = function(b) {
    return Math.sqrt(b.x * b.x + b.y * b.y);
};

Vector2D.dot = function(a, b) {
    return a.x * b.x + a.y * b.y;
};

Vector2D.getAngle = function(x1, y1, x2, y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
};