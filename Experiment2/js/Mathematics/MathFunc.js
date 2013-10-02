var MathFunc = function(){
	throw new Error("MathFunc cannot be instanciated");
};

MathFunc.prototype = {
};
   
MathFunc.toRadiant = function toRadiant(degrees){
    return   degrees * (Math.PI / 180);
};

MathFunc.toDegree = function (radians) {
    return  radians * (180 / Math.PI);
};

MathFunc.normalizeAngle = function normalizeAngle(angle){
    if (angle < 0)
        angle += 360;
    return angle;
};