var Resource = function() {
    throw new Error("Resource object cannot be instantiated");
};

Resource.loader = new createjs.LoadQueue(true);

Resource.prototype = {
};

Resource.get = function(key) {
    return Resource.loader.getResult(key);
};

Resource.load = function(manifest, handleComplete, handleFileLoad) {
    if (handleComplete) {
        Resource.loader.addEventListener("complete", handleComplete);
    }
    if (handleFileLoad) {
        Resource.loader.addEventListener("fileload", handleFileLoad);
    }
    Resource.loader.loadManifest(manifest);
};

Resource.images = {
};