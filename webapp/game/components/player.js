define([
    'crafty'
], function (Crafty) {

    // Define the player component
    Crafty.c("Player", {
        // Define game loop behavior
        init: function () {
            this.addComponent("2D, Canvas, Collision, player");

            // Upon keydown event, check for change in direction
            this.bind('KeyDown', function(e) {

                var oldDirection = this.direction;

                // Storing the new direction if there is a valid keypress
                var newDirection = {
                    38: "n",
                    39: "e",
                    40: "s",
                    37: "w"
                } [e.keyCode] || this.direction;

                // If new direction is not the opposite of the old, change to the new direction
                if (newDirection !== {
                    "n": "s",
                    "s": "n",
                    "e": "w",
                    "w": "e"
                } [oldDirection]) {
                    this.direction = newDirection;
                }

            });

            this.attr({
                x: 20,
                y: 400,
                z: 1,
                w: 64,
                h: 32,
                turnDegree: 0,
                isParked: false
            });

            this.speed = 1;
            this.direction = "e";
            this.speedMultiplier = 3;

            this.bind("EnterFrame",function () {

                if (this.direction === "w") {
                    this.attr({
                        rotation: 180
                    });
                }
                if (this.direction === "e") {
                    this.attr({
                        rotation: 0
                    });
                }
                if (this.direction === "n") {
                    this.attr({
                        rotation: 270
                    });
                }
                if (this.direction === "s") {
                    this.attr({
                        rotation: 90
                    });
                }

                if (!this.isParked) {
                    this.move(this.direction, this.speed * this.speedMultiplier);
                }

            }).onHit('Set1Bumper1', function () {
                    // Collision detected!
                    this.isParked = true;
                    this.bumpBackFor(this.direction);
            });
        },
        // Handle the car action after colliding with a parking bumper
        bumpBackFor: function (originalDirection) {

            var bumpDirection;

            switch (originalDirection) {
                case "n":
                    bumpDirection = "s";
                    break;
                case "s":
                    bumpDirection = "n";
                    break;
                case "e":
                    bumpDirection = "w";
                    break;
                case "w":
                    bumpDirection = "e";
                    break;
            }

            this.move(bumpDirection, 2);
            this.move(bumpDirection, 2);
        }
    });

});