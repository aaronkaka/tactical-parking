define ([
    'crafty'
], function(Crafty) {

    var initialize = function() {

        var WIDTH = 1024,
            HEIGHT = 512;

        // Set the canvas play boundaries
        Crafty.init(WIDTH, HEIGHT);
        Crafty.canvas.init();
        Crafty.background('black');

        // Prepare the sprites for game use
        Crafty.sprite(256, 128, "assets/corvette.png", {
            player: [0, 0] // player car
        });

        // Parking bumpers for Set 1
        for (var i=1; i < 5; i++) {
            Crafty.e("Set1Bumper" + i + ", 2D, Canvas, Color")
                .color('rgb(255,255,255)')
                .attr({ x: 100*i + 350, y: 200, w: 30, h: 5 });
        }

        // Parking bumpers for Set 2
        for (var j=1; j < 4; j++) {
            Crafty.e("Set2Bumper" + j + ", 2D, Canvas, Color")
                .color('rgb(255,255,255)')
                .attr({ x: 1000, y: 110*j, w: 5, h: 30 });
        }

        // Display scoreboard
        Crafty.e("Scoreboard, DOM, 2D, Text")
            .attr({ x: 20, y: 20, w: 100, h: 20, points: 0 })
            .css({color:"yellow"})
            .text("0 Points");

        // Initialize the player entity
        Crafty.e("Player");
    };

    return {
        initialize: initialize
    };

});