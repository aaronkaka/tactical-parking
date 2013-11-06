define([
    'crafty'
], function (Crafty) {

    // Car controlled by player
    Crafty.c("Car", {
        // Define game loop behavior
        init: function () {
            this.addComponent("2D, Canvas, Collision, car"); // 'car' references loaded car sprite

            this.attr({
                x: 582, // starting coordinate
                y: 135, // starting coordinate
                w: 64, // rescale sprite
                h: 32, // rescale sprite
                turnDegree: 0,
                isParked: true,
                rotation: 90 // facing south
            });

            this.speed = 0;
            this.direction = "e";
            this.speedMultiplier = 3;

            this.bind("EnterFrame",function () {

                if (!this.isParked) {
                    this.move(this.direction, this.speed * this.speedMultiplier);
                }

            }).onHit('Set1Bumper1', function () {
                    // Collision detected!
                    this.isParked = true;
                    this.bumpBackFor(this.direction);
                });
        },
        // Control turn direction and execution
        turn: function (newDirection) {

            var stopTurnDegree,
                isPositive;

            switch (this.direction) {
                case "n":
                    if (newDirection === "w") {
                        stopTurnDegree = -180;
                        isPositive = false;
                    } else if (newDirection === "e") {
                        stopTurnDegree = 0;
                        isPositive = true;
                    } else return;

                    break;
                case "s":
                    if (newDirection === "w") {
                        stopTurnDegree = -180;
                        isPositive = true;
                    } else if (newDirection === "e") {
                        stopTurnDegree = 0;
                        isPositive = false;
                    } else return;

                    break;
                case "e":
                    if (newDirection === "n") {
                        stopTurnDegree = -90;
                        isPositive = false;
                    } else if (newDirection === "s") {
                        stopTurnDegree = 90;
                        isPositive = true;
                    } else return;

                    break;
                case "w":
                    if (newDirection === "n") {
                        stopTurnDegree = -90;
                        isPositive = true;
                    } else if (newDirection === "s") {
                        stopTurnDegree = -270;
                        isPositive = false;
                    } else return;

                    break;
            }

            if (this.turnDegree === stopTurnDegree) {
                this.direction = newDirection;
                this.speedMultiplier = 2;
            } else {
                this.speedMultiplier = 1;
                if (isPositive) {
                    this.turnDegree++;
                } else {
                    this.turnDegree--;
                }
                this.attr({
                    rotation: this.turnDegree
                });
            }

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