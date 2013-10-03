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


MathFunc.MIN_VALUE = 0;
MathFunc.MAX_VALUE = 12147483647;

// Returns a random number between 0 (inclusive) and 1 (exclusive)
MathFunc.getRandom = function() {
  return Math.random();
};

// Returns a random number between min and max
MathFunc.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
};

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
MathFunc.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};