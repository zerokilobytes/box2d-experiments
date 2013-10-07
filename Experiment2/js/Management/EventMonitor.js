var EventMonitor = function() {

};

EventMonitor.prototype = {
};
EventMonitor.load = function(context) {
    EventMonitor.context = context;
}
EventMonitor.exec = function() {
    var actions = EventMonitor.context.data.actions;
    for (var i = actions.length - 1; i >= 0; i--) {
        if (EventMonitor.context.intervals >= actions[i].intervals) {
            console.log(EventMonitor.context.intervals);

            //actions[i].action
            var action = actions.splice(i, 1)[0];
            //console.log(action.event);
            action.event.call(EventMonitor.context);
            console.log(action.event);
        }
    }
    EventMonitor.context.intervals += 1000/(Global.FPS);
};
EventMonitor.context = null;