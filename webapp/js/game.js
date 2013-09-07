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
                x: 100,
                y: 300,
                z: 1,
                w: 64,
                h: 32,
                turnDegree: 0
            });

            this.speed = 1;
            this.direction = "e";
            this.speedMultiplier = 2;

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

                if (this.x < WIDTH-100) {
                    this.move(this.direction, this.speed * this.speedMultiplier);
                }
            });
        }
    });

    Crafty.e("Player");
});