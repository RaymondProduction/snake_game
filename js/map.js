define(
  'map',
  function() {


    function mapObj() {
      this.point = new Array(20);
      for (var i = 0; i < this.point.length; i++) {
        this.point[i] = new Array(20);
      }
    }

    mapObj.prototype.generateFood = function() {
      // Generate a random position for the rows and the columns.
      var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);

      // We also need to watch so as to not place the food
      // on the a same matrix position occupied by a part of the
      // snake's body.
      while (this.point[rndX][rndY] === 2) {
        rndX = Math.round(Math.random() * 19);
        rndY = Math.round(Math.random() * 19);
      }

      this.point[rndX][rndY] = 1;
    }



     mapObj.prototype.generateSnake = function(snake) {
      // Generate a random position for the row and the column of the head.
      var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);

      // Let's make sure that we're not out of bounds as we also need to make space to accomodate the
      // other two body pieces
      while ((rndX - snake.length()) < 0) {
        rndX = Math.round(Math.random() * 19);
      }

      for (var i = 0; i < snake.length(); i++) {
        snake.setBodyPiece(i,rndX - i,rndY);
        this.point[rndX - i][rndY] = 2;
      }
    }

    mapObj.prototype.setPoint =function(s,e){
      this.point[s.x][s.y] = e;
    }

    mapObj.prototype.isPointHere = function(s,e){
      return this.point[s.x][s.y] === e;
    }

    mapObj.prototype.isPointHereXY = function(x,y,e){
      return this.point[x][y] === e;
    }


    return mapObj;

  });
