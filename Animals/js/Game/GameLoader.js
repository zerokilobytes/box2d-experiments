var GameLoader = function(data) {
    throw Error("Cannot instantiate GameLoader");
};

GameLoader.prototype = {
};

GameLoader.load = function(context) {
    for (var i = 0; i < context.data.fixtures.length; i++) {
        var fixture = new context.data.fixtures[i].type(context);
        fixture.spawn(context.data.fixtures[i].data);
        context.modelManager.models.push(fixture);
    }
};
