var Mouse = function() {

};

Mouse.prototype = {
};

Mouse.register = function(context) {
    $(context.gameCanvas).on("mouseover", function(e) {
        e.preventDefault();
        $(this).addClass("mouseDown");
    }).on("mouseup", function() {
        //$(this).removeClass("mouseDown");
    });

    $(context.gameCanvas).on("mousedown", function(e) {
        e.preventDefault();
        $(this).addClass("mouseDown");
    }).on("mouseup", function() {
        //$(this).removeClass("mouseDown");
    });
};