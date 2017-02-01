// Code by M. Andres Pagella <andres.pagella at gmail dot com>
// Do whatever you want with this code :)
// Please visit http://www.andrespagella.com
// This is the complete code for this article: http://www.andrespagella.com/snake-game

define(
    "game", ['jquery', 'map', 'snake'],
    function(jQ, map, snakeModule) {
        var gameObj = {};

        gameObj.load = function() {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                score = 0,
                level = 0,
                direction = 0,
                snake = new snakeModule(),
                active = true,
                speed = 500;

            // Initialize the matrix.
            var mapGame = new map();


            canvas.width = 204;
            canvas.height = 224;

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(canvas);

            // Add the snake
            snake = mapGame.generateSnake(snake);

            // Add the food
            mapGame.generateFood();

            drawGame();

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

            function drawGame() {
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
                            showGameOver();
                            return;
                        }

                        // Detect if we hit food and increase the score if we do,
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
                            showGameOver();
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
                drawMain();

                // Start cycling the matrix
                for (var x = 0; x < mapGame.point.length; x++) {
                    for (var y = 0; y < mapGame.point[0].length; y++) {
                        if (mapGame.isPointHereXY(x, y, 1)) {
                            ctx.fillStyle = 'black';
                            ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                        } else if (mapGame.isPointHereXY(x, y, 2)) {
                            ctx.fillStyle = 'orange';
                            ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                        }
                    }
                }

                if (active) {
                    setTimeout(drawGame, speed - (level * 50));
                }
            }


            function drawMain() {
                ctx.lineWidth = 2; // Our border will have a thickness of 2 pixels
                ctx.strokeStyle = 'black'; // The border will also be black

                // The border is drawn on the outside of the rectangle, so we'll
                // need to move it a bit to the right and up. Also, we'll need
                // to leave a 20 pixels space on the top to draw the interface.
                ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

                ctx.fillStyle = 'black';
                ctx.font = '12px sans-serif';
                ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
            }

            function showGameOver() {
                // Disable the game.
                active = false;

                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = 'black';
                ctx.font = '16px sans-serif';

                ctx.fillText('Game Over!', ((canvas.width / 2) - (ctx.measureText('Game Over!').width / 2)), 50);

                ctx.font = '12px sans-serif';

                ctx.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (ctx.measureText('Your Score Was: ' + score).width / 2)), 70);

            }
        };

        return gameObj;
    });
