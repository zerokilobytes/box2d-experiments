var ResourceLoader = function() {
    throw new Error("ResourceLoader object cannot be instantiated");
};

ResourceLoader.prototype = {
};


ResourceLoader.loadImages = function(sources, callback) {
    var assetDir = '';
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        Resource.images[src] = new Image();
        Resource.images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(Resource.images);
            }
        };
        Resource.images[src].src = assetDir + sources[src];
    }
};