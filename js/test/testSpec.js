define(['map', 'snake'], function(mapModule, snakeModule) {

  var map,
    snake

  beforeEach(function() {
    map = new mapModule();
    snake = new snakeModule();
  });


  describe('Test for map module', function() {

    it('works setPoint', function() {
      var point = {
        x: 5,
        y: 6
      }
      map.setPoint(point, 4);
      expect(map.point[5][6]).toEqual(4);
    });

    it('works isPointHere', function() {
      var point = {
        x: 2,
        y: 3
      }
      map.setPoint(point, 5);
      expect(map.isPointHere(point, 5)).toEqual(true);
    });

    it('works isPointHereXY', function() {
      var point = {
        x: 10,
        y: 5
      }
      map.setPoint(point, 3);
      expect(map.isPointHereXY(10, 5, 3)).toEqual(true);
      expect(map.isPointHereXY(10, 2, 1)).toEqual(false);
    });

    it('works generateFood', function() {
      var find = false;
      map.generateFood();
      for (var x = 0; x < map.point.length; x++) {
        for (var y = 0; y < map.point[x].length; y++) {
          if (map.isPointHereXY(x, y, 1)) {
            find = true;
          }
        }
      }
      expect(find).toEqual(true);
    });

    it('works generateSnake', function() {
      var find = 0;
      map.generateSnake(snake);
      for (var x = 0; x < map.point.length; x++) {
        for (var y = 0; y < map.point[x].length; y++) {
          if (map.isPointHereXY(x, y, 2)) {
            find += 1;
          }
        }
      }
      expect(find).toEqual(snake.length());
    });

  });


  describe('Test for snake module', function() {

    it('works moveDirection and getHead', function() {
      map.generateSnake(snake);
      var head = snake.getHead();
      snake.moveDirection(0);
      var headBefore = snake.getHead();
      expect(head.x + 1).toEqual(headBefore.x);
      expect(head.y).toEqual(headBefore.y);

      head = headBefore;
      snake.moveDirection(1);
      headBefore = snake.getHead();
      expect(head.x - 1).toEqual(headBefore.x);
      expect(head.y).toEqual(headBefore.y);

      head = headBefore;
      snake.moveDirection(2);
      headBefore = snake.getHead();
      expect(head.x).toEqual(headBefore.x);
      expect(head.y - 1).toEqual(headBefore.y);

      head = headBefore;
      snake.moveDirection(3);
      headBefore = snake.getHead();
      expect(head.x).toEqual(headBefore.x);
      expect(head.y + 1).toEqual(headBefore.y);
    });

    it('works isOutOfBounds and setBodyPiece', function() {
      snake.setBodyPiece(0, 1, 1);
      expect(snake.isOutOfBounds()).toEqual(false);
      snake.setBodyPiece(0, -1, 1);
      expect(snake.isOutOfBounds()).toEqual(true);
      snake.setBodyPiece(0, 1, -1);
      expect(snake.isOutOfBounds()).toEqual(true);
      snake.setBodyPiece(0, 21, 1);
      expect(snake.isOutOfBounds()).toEqual(true);
      snake.setBodyPiece(0, 1, 21);
      expect(snake.isOutOfBounds()).toEqual(true);
    });

    it('works addBodyPiece and length', function() {
      map.generateSnake(snake);
      var l = snake.length();
      var x = snake.snake[l - 1].x;
      var y = snake.snake[l - 1].y;
      snake.addBodyPiece();
      expect(snake.length()).toBeGreaterThan(l);
      expect(snake.snake[snake.length() - 1].x).toEqual(x);
      expect(snake.snake[snake.length() - 1].y).toEqual(y);
    });

    it('works getBodyPiece', function() {
      snake.setBodyPiece(1, 3, 5);
      var piece = snake.getBodyPiece(1);
      expect(piece.x).toEqual(3);
      expect(piece.y).toEqual(5);
    });

    it('works Shift', function() {
      snake.setBodyPiece(0, 7, 1);
      snake.Shift(1);

      expect(snake.snake[1]).toEqual({
        x: 7,
        y: 1
      });

    });

  });
});
