define(
  'draw', ['jquery'],
  function(jQ) {
    var drawObj = {};

    drawObj.init = function() {
      div = document.createElement('div');
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      canvas.width = 204;
      canvas.height = 224;
      body = document.getElementsByTagName('body')[0];
      body.appendChild(div);
      div.appendChild(canvas);


      //button = document.createElement('button');
      // body.appendChild(button);

    }

    drawObj.drawMain = function(score, level) {
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

    drawObj.showGameOver = function(score) {

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.font = '16px sans-serif';

      ctx.fillText('Game Over!', ((canvas.width / 2) - (ctx.measureText('Game Over!').width / 2)), 50);

      ctx.font = '12px sans-serif';

      ctx.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (ctx.measureText('Your Score Was: ' + score).width / 2)), 70);

    }

    drawObj.showMap = function(map) {
      // Start cycling the matrix
      for (var x = 0; x < map.point.length; x++) {
        for (var y = 0; y < map.point[0].length; y++) {
          if (map.isPointHereXY(x, y, 1)) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
          } else if (map.isPointHereXY(x, y, 2)) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
          }
        }
      }
    }


    return drawObj;

  })
