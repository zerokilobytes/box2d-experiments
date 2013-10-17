var EventMonitor = function() {

};

EventMonitor.prototype = {
};
EventMonitor.register = function(context) {
    EventMonitor.context = context;
}
EventMonitor.exec = function() {
    var actions = EventMonitor.context.level.actions;
    for (var i = actions.length - 1; i >= 0; i--) {
        if (EventMonitor.context.intervals >= actions[i].intervals) {
            var action = actions.splice(i, 1)[0];
            action.event.call(EventMonitor.context);
        }
    }
    EventMonitor.context.intervals += (1000 / Global.FPS);
    
    if(EventMonitor.context.intervals >= EventMonitor.context.durtations){
        EventMonitor.context.success();
    }
};
EventMonitor.context = null;