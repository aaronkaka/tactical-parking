window.onload = (function() {

    var WIDTH = 1024,
        HEIGHT = 512;

    Crafty.init(WIDTH, HEIGHT);
    Crafty.canvas.init();
    Crafty.background('black');

    //prepare the spritesheet for game use
    Crafty.sprite(256, 128, "assets/corvette.png", {
        player: [0, 0]
    });
//    Crafty.sprite(76, "assets/whitecar.png", {
//        player: [0, 2]
//    });


    Crafty.c("Player", {
        init: function() {
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

            this.bind("EnterFrame", function() {

                // execute demo left turn
                if (this.x > 200 && this.y >= 200) {

                    if (this.turnDegree === -90) {
                        this.direction = "n";
                        this.speedMultiplier = 2;
                    } else {
                        this.speedMultiplier = 1;
                        this.turnDegree--;
                        this.attr({
                            rotation: this.turnDegree
                        });
                    }
                 }

                // execute demo right turn
                if (this.y < 200) {

                    if (this.turnDegree === 0) {
                        this.direction = "e";
                        this.speedMultiplier = 2;
                    } else {
                        this.speedMultiplier = 1;
                        this.turnDegree++;
                        this.attr({
                            rotation: this.turnDegree
                        });
                    }
                }

                if (!this.isParking) {
                    this.move(this.direction, this.speed * this.speedMultiplier);
                }

            }).onHit('Wheelstop2', function () {
                this.isParking = true;
                this.bumpBackFor(this.direction);
            });
        },

        bumpBackFor: function(originalDirection) {

            var bumpDirection;

            switch(originalDirection)
            {
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

    for (var i=1; i < 5; i++) {
        Crafty.e("Wheelstop" + i + ", 2D, Canvas, Color")
            .color('rgb(255,255,255)')
            .attr({ x: 100*i + 350, y: 200, w: 30, h: 5 });
    }

    Crafty.e("Wheelstop2, 2D, Canvas, Color")
        .color('rgb(255,255,255)')
        .attr({ x: 1000, y: 110, w: 5, h: 30 });

    Crafty.e("Player");
});