// Code by M. Andres Pagella <andres.pagella at gmail dot com>
// Do whatever you want with this code :)
// Please visit http://www.andrespagella.com
// This is the complete code for this article: http://www.andrespagella.com/snake-game

define(
    "game", ['jquery', 'map', 'snake', 'draw'],
    function(jQ, map, snakeModule, draw) {

        function gameObj() {
            this.defaultProperties();
            draw.init();
            this.playGame();

            var self = this;

            jQ(document).keydown(function(e) {
                if (e.keyCode === 38 && self.direction !== 3) {
                    self.direction = 2; // Up
                } else if (e.keyCode === 40 && self.direction !== 2) {
                    self.direction = 3; // Down
                } else if (e.keyCode === 37 && self.direction !== 0) {
                    self.direction = 1; // Left
                } else if (e.keyCode === 39 && self.direction !== 1) {
                    self.direction = 0; // Right
                }
            });
        }

        gameObj.prototype.defaultProperties =function(){
            this.score = 0;
            this.level = 0;
            this.direction = 0;
            this.active = true;
            this.speed = 500;
            this.start = -1;
            this.beforeStartId;

            // Initialize the matrix.
            this.mapGame = new map();

            // Add the snake
            this.snake = new snakeModule();
            this.mapGame.generateSnake(this.snake);

            // Add the food
            this.mapGame.generateFood();
        }

        gameObj.prototype.restartGame = function() {
            var self = this;
            var button;
            button = "<button class='button' name='restart'>";
            button += "Restart</button>";
            jQ("body").append(jQ(button));
            jQ(".button").click(function(event) {
                nameButton = jQuery(this).attr("name");
                if (nameButton == 'restart' && self.start == -1) {
                    self.start = 3;
                    jQ('.button').text(self.start);
                    self.beforeStartId = setInterval(function() {
                        self.beforeStart();
                    }, 1000);
                }
            });

        }

        gameObj.prototype.beforeStart = function() {
            this.start -= 1;
            var self = this;
            if (this.start == -1) {
                jQ('button').remove()
                clearInterval(function() {
                    self.beforeStartId();
                });
                this.defaultProperties();
                this.playGame();
            } else {
                jQ('.button').text(this.start);
            }
        }


        gameObj.prototype.playGame = function() {
            var self = this;
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Traverse all the body pieces of the snake, starting from the last one
            for (var i = this.snake.length() - 1; i >= 0; i--) {

                // We're only going to perform the collision detection using the head
                // so it will be handled differently than the rest
                if (i === 0) {

                    this.snake.moveDirection(this.direction);

                    // Check that it's not out of bounds. If it is show the game over popup
                    // and exit the function.


                    if (this.snake.isOutOfBounds()) {
                        this.restartGame();
                        draw.showGameOver(this.score);
                        return;
                    }

                    // Detect if we hit food and increase the this.scoredrawM if we do,
                    // generating a new food position in the process, and also
                    // adding a new element to the snake array.
                    if (this.mapGame.isPointHere(this.snake.getHead(), 1)) {
                        this.score += 10;
                        this.mapGame.generateFood();

                        // Add a new body piece to the array
                        this.snake.addBodyPiece();
                        this.mapGame.setPoint(this.snake.getBodyPiece(this.snake.length() - 1), 2);

                        // If the this.score is a multiplier of 100 (such as 100, 200, 300, etc.)
                        // increase the this.level, which will make it go faster.
                        if ((this.score % 100) == 0) {
                            this.level += 1;
                        }

                        // Let's also check that the head is not hitting other part of its body
                        // if it does, we also need to end the game.
                    } else if (this.mapGame.isPointHere(this.snake.getHead(), 2)) {
                        //console.log("yes");
                        //debugger;

                        // Disable the game.

                        this.active = false;
                        this.restartGame();
                        draw.showGameOver();



                        return;
                    }

                    this.mapGame.setPoint(this.snake.getHead(), 2);
                } else {
                    // Remember that when they move, the body pieces move to the place
                    // where the previous piece used to be. If it's the last piece, it
                    // also needs to clear the last position from the matrix
                    if (i === (this.snake.length() - 1)) {
                        this.mapGame.setPoint(this.snake.getBodyPiece(i), null)
                    }

                    this.snake.Shift(i);
                    this.mapGame.setPoint(this.snake.getBodyPiece(i), 2);
                }
            }

            // Draw the border as well as the this.score
            draw.drawMain(this.score, this.level);
            draw.showMap(this.mapGame);
            if (this.active) {
                setTimeout(function() {
                    self.playGame();
                }, this.speed - (this.level * 50));
            }
        }

        return gameObj;
    });
