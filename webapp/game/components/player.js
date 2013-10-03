define([
    'crafty'
], function (Crafty) {

    // Define the player component
    Crafty.c("Player", {
        // Define game loop behavior
        init: function () {
            this.addComponent("2D, Canvas, Collision, player");

            this.attr({
                x: 20,
                y: 400,
                z: 1,
                w: 64,
                h: 32,
                turnDegree: 0,
                isParking: false
            });

            this.speed = 1;
            this.direction = "e";
            this.speedMultiplier = 3;

            this.bind("EnterFrame",function () {

                // execute demo left turn to north
                if (this.x > 200 && this.y >= 200) {
                    this.turn("n");
                }

                // execute demo right turn to east
                if (this.x < 390 && this.y < 200) {
                    this.turn("e");
                }

                // execute demo right turn to south
                if (this.x > 390) {
                    this.turn("s");
                }

                if (!this.isParking) {
                    this.move(this.direction, this.speed * this.speedMultiplier);
                }

            }).onHit('Set1Bumper1', function () {
                    // Collision detected!
                    this.isParking = true;
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