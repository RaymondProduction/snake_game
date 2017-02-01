// Code by M. Andres Pagella <andres.pagella at gmail dot com>
// Do whatever you want with this code :)
// Please visit http://www.andrespagella.com
// This is the complete code for this article: http://www.andrespagella.com/snake-game

define(
    "game", ['jquery', 'map', 'snake', 'draw'],
    function(jQ, map, snakeModule, draw) {
        var gameObj = {};

        gameObj.load = function() {
            var score = 0,
                level = 0,
                direction = 0,
                snake = new snakeModule(),
                active = true,
                speed = 500;

            // Initialize the matrix.
            var mapGame = new map();

            // Add the snake
            snake = mapGame.generateSnake(snake);

            // Add the food
            mapGame.generateFood();

            draw.init();
            playGame();

            jQ(document).keydown(function(e) {
                if (e.keyCode === 38 && direction !== 3) {
                    direction = 2; // Up
                } else if (e.keyCode === 40 && direction !== 2) {
                    direction = 3; // Down
                } else if (e.keyCode === 37 && direction !== 0) {
                    direction = 1; // Left
                } else if (e.keyCode === 39 && direction !== 1) {
                    direction = 0; // Right
                }
            });

            function playGame() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Traverse all the body pieces of the snake, starting from the last one
                for (var i = snake.length() - 1; i >= 0; i--) {

                    // We're only going to perform the collision detection using the head
                    // so it will be handled differently than the rest
                    if (i === 0) {

                        snake.moveDirection(direction);

                        // Check that it's not out of bounds. If it is show the game over popup
                        // and exit the function.
                        if (snake.isOutOfBounds()) {
                            draw.showGameOver(score);
                            return;
                        }

                        // Detect if we hit food and increase the scoredrawM if we do,
                        // generating a new food position in the process, and also
                        // adding a new element to the snake array.
                        if (mapGame.isPointHere(snake.getHead(), 1)) {
                            score += 10;
                            mapGame.generateFood();

                            // Add a new body piece to the array
                            snake.addBodyPiece();
                            mapGame.setPoint(snake.getBodyPiece(snake.length() - 1), 2);

                            // If the score is a multiplier of 100 (such as 100, 200, 300, etc.)
                            // increase the level, which will make it go faster.
                            if ((score % 100) == 0) {
                                level += 1;
                            }

                            // Let's also check that the head is not hitting other part of its body
                            // if it does, we also need to end the game.
                        } else if (mapGame.isPointHere(snake.getHead(), 2)) {
                            // Disable the game.
                            active = false;
                            draw.showGameOver();
                            return;
                        }

                        mapGame.setPoint(snake.getHead(), 2);
                    } else {
                        // Remember that when they move, the body pieces move to the place
                        // where the previous piece used to be. If it's the last piece, it
                        // also needs to clear the last position from the matrix
                        if (i === (snake.length() - 1)) {
                            mapGame.setPoint(snake.getBodyPiece(i), null)
                        }

                        snake.Shift(i);
                        mapGame.setPoint(snake.getBodyPiece(i), 2);
                    }
                }

                // Draw the border as well as the score
                draw.drawMain(score,level);
                draw.showMap(mapGame);
                if (active) {
                    setTimeout(playGame, speed - (level * 50));
                }
            }

        };

        return gameObj;
    });
