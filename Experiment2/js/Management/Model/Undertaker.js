var Undertaker = function() {    throw new Error("Undertaker cannot be instanciated");};Undertaker.prototype = {};Undertaker.bodies = [];Undertaker.add = function(entity) {    console.log(entity);    Undertaker.bodies.push(entity);};Undertaker.getBodies = function() {    return Undertaker.bodies;};Undertaker.purge = function() {    for (var i = Undertaker.bodies.length - 1; i >= 0; i--) {        console.log( "X");        Undertaker.bodies[i].destroy();        //var world = Undertaker.bodies[i].world;        //var body = Undertaker.bodies[i].body;        //world.DestroyBody(body);    }};