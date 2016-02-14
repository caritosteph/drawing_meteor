points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX = 0;
var lastY = 0;
var strokeWidt = 1;
var thickness = 1;
var r = 10;
var strokeColor = "black";
var width = 100;
var height = 50;

Meteor.startup(function() {
    canvas = new Canvas();

    Deps.autorun(function() {
        var data_line = points.find().fetch();
        // var data_circle = points.find({"type":"circle"}).fetch();
        if (canvas) {
            canvas.draw(data_line);
            // canvas.draw(data_circle);
        }
    });
});

Template.wall.events({

    "click button.line": function(event) {
        Session.set('type', 'line');
        $('#Dashes').prop('disabled', false);
        $('#Line').prop('disabled', false);
        $('#Thicker').prop('disabled', false);
        $('#Thinner').prop('disabled', false);
    },
    "click button.circle": function(event) {
        Session.set('type', 'circle');
        $('#Dashes').prop('disabled', true);
        $('#Line').prop('disabled', true);
        $('#Thicker').prop('disabled', false);
        $('#Thinner').prop('disabled', false);
    },
    "click button.rect": function(event) {
        Session.set('type', 'rect');
        $('#Dashes').prop('disabled', true);
        $('#Line').prop('disabled', true);
        $('#Thicker').prop('disabled', false);
        $('#Thinner').prop('disabled', false);
    },

    "click button.clear": function(event) {
        Meteor.call('clear', function() {
            canvas.clear();
        });
    },
    //choose a color. Initialise the last vals, otherwise a stray line will appear.

    "click button.red": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "red";
    },

    "click button.black": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "black";
    },

    "click button.white": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "white";
    },

    "click button.blue": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "blue";
    },

    "click button.green": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "green";
    },
    "click button.beige": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "beige";
    },
    "click button.yellow": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "yellow";
    },
    "click button.orange": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "orange";
    },
    "click button.pink": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "pink";
    },
    "click button.brown": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "brown";
    },
    "click button.cyan": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "cyan";
    },
    "click button.gray": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "gray";
    },
    "click button.violet": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "violet";
    },
    "click button.aqua": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "aqua";
    },
    "click button.skyblue": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "skyblue";
    },
    "click button.fuchsia": function() {
        lastX = 0;
        lastY = 0;
        strokeColor = "fuchsia";
    },

    "click button.thicker": function() {

        thickness += 1;
        r += 10;
        height += 5;
        width += 10
    },

    "click button.thinner": function() {

        if (thickness > 0) {
            thickness -= 1;

        } else {
            thickness = 1;
        }
        if (r > 0) {
            r -= 10;
        } else {
            r = 10;
        }
        if (width > 0) {
            width -= 5;
        } else {
            width = 100;
        }
        if (height > 0) {
            height -= 10;
        } else {
            height = 100;
        }
    },
    "click button.dash": function() {
        Session.set('dash', true);
    },
    "click button.lines": function() {
        Session.set('dash', false);
    }
    // "click button.download": function() {
    //     Meteor.call('clear', function() {
    //         console.log("drawingapp.js")
    //         canvas.exportSvg();
    //     });
    // }

})

var markPoint = function() {

    var offset = $('#canvas').offset();

    // In the first frame, lastX and lastY are 0.
    // This means the line gets drawn to the top left of the screen
    // Which is annoying, so we test for this and stop it happening.

    if (lastX == 0) { // check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
    }

    if (Session.get('type') === 'circle') {
        points.insert({
            x: (event.pageX - offset.left),
            y: (event.pageY - offset.top),
            x1: lastX,
            y1: lastY,
            r: r,
            color: strokeColor
        });
    } else if (Session.get('type') === 'line') {
        points.insert({
            x: (event.pageX - offset.left),
            y: (event.pageY - offset.top),
            x1: lastX,
            y1: lastY,
            w: thickness,
            c: strokeColor

        });
    } else {
        points.insert({
            x: (event.pageX - offset.left),
            y: (event.pageY - offset.top),
            x1: lastX,
            y1: lastY,
            width: width,
            height: height,
            colorRect: strokeColor
        });
    }
    // points.insert({
    //     //this draws a point exactly where you click the mouse
    //     // x: (event.pageX - offset.left),
    //     // y: (event.pageY - offset.top)});


    //     //We can do more interesting stuff
    //     //We need to input data in the right format
    //     //Then we can send this to d3 for drawing


    //     //1) Algorithmic mouse follower
    //     // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
    //     // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

    //     //2) draw a line - requires you to change the code in drawing.js
    //     x: (event.pageX - offset.left),
    //     y: (event.pageY - offset.top),
    //     x1: lastX,
    //     y1: lastY,
    //     r: r,
    //     // We could calculate the line thickness from the distance
    //     // between current position and last position
    //     //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
    //     //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
    //     // Or we could just set the line thickness using buttons and variable
    //     // w: thickness,
    //     // We can also use strokeColor, defined by a selection
    //     c: strokeColor

    // }); // end of points.insert()

    // points.insert({
    //   x: (event.pageX - offset.left),
    //   y: (event.pageY - offset.top),
    //   x1: lastX,
    //   y1: lastY,
    //   w: thickness,
    //   c: strokeColor,
    //   type:"circle"
    // });
    lastX = (event.pageX - offset.left);
    lastY = (event.pageY - offset.top);

}

Template.canvas.events({
    'click': function(event) {
        markPoint();
    },
    'mousedown': function(event) {
        Session.set('draw', true);
    },
    'mouseup': function(event) {
        Session.set('draw', false);
        lastX = 0;
        lasyY = 0;
    },
    'mousemove': function(event) {
        if (Session.get('draw')) {
            markPoint();
        }
    }
});
