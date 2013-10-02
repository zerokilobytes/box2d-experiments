var Guid = function() {
    throw Error("Guid cannot be instantiated");
};

Guid.prototype = {
    set: function() {
        this.guid = Guid.get();
    }
};

Guid.get = function() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};