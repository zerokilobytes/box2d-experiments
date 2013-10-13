var GameLoader = function() {
    throw Error("Cannot instantiate GameLoader");
};

GameLoader.prototype = {
};

GameLoader.load = function(context, level) {
    context.lifes = level.lives;
    for (var i = 0; i < level.fixtures.length; i++) {
        var fixture = new level.fixtures[i].type(context);
        fixture.spawn(level.fixtures[i].data);
        context.modelManager.models.push(fixture);
    }
};