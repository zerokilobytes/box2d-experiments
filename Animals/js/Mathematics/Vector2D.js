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

function normalizeAngle(angle)
{
    
    if (angle < 0) 
        angle += 360;
   return angle;
    /*
     angle %= 360;
     if (angle < -179)
     angle += 360;
     else if (angle > 180)
     angle -= 360;
     
     //return Math.atan2(Math.sin(angle * Math.PI/180.0), Math.cos(angle * Math.PI/180.0)) * 180.0/Math.PI;
     return Math.asin(Math.sin(angle * Math.PI / 180.0)) * 180.0 / Math.PI;
     */
}