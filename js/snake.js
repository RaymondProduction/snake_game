define(
  'snake',
  function() {

    function snakeObj() {
      this.snake = new Array(3);
    }

    snakeObj.prototype.moveDirection = function(direction) {
      switch (direction) {
        case 0: // Right
          this.snake[0] = {
            x: this.snake[0].x + 1,
            y: this.snake[0].y
          }
          break;
        case 1: // Left
          this.snake[0] = {
            x: this.snake[0].x - 1,
            y: this.snake[0].y
          }
          break;
        case 2: // Up
          this.snake[0] = {
            x: this.snake[0].x,
            y: this.snake[0].y - 1
          }
          break;
        case 3: // Down
          this.snake[0] = {
            x: this.snake[0].x,
            y: this.snake[0].y + 1
          }
          break;
      }
    }

    snakeObj.prototype.isOutOfBounds = function() {
      return (this.snake[0].x < 0 ||
        this.snake[0].x >= 20 ||
        this.snake[0].y < 0 ||
        this.snake[0].y >= 20);
    }

    snakeObj.prototype.getHead = function() {
      return {
        x: this.snake[0].x,
        y: this.snake[0].y
      }
    }

    snakeObj.prototype.addBodyPiece = function() {
      this.snake.push({
        x: this.snake[this.snake.length - 1].x,
        y: this.snake[this.snake.length - 1].y
      });

    }

    snakeObj.prototype.setBodyPiece = function(i, x, y) {
      this.snake[i]={x : x, y: y};
    }
    snakeObj.prototype.getBodyPiece = function(i) {
      return {
        x: this.snake[i].x,
        y: this.snake[i].y
      }
    }

    snakeObj.prototype.Shift = function(i) {
      this.snake[i] = {
        x: this.snake[i - 1].x,
        y: this.snake[i - 1].y
      };
    }

    snakeObj.prototype.length = function() {
      return this.snake.length;
    }

    return snakeObj;

  });
