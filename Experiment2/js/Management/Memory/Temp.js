var Temp = function() {

};

Temp.prototype = {
};

Temp.Memory = {
};

Temp.set = function(key, value) {
    Temp.Memory[key] = value;
};
Temp.get = function(key) {
    var value = Temp.Memory[key];
    Temp.Memory[key] = null;
    return value;
};