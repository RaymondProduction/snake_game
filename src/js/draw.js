define(
  'draw', ['jquery'],
  function(jQ) {

    function drawObj(){
      // Size pixel
      this.sizePix=30;

      div = document.createElement('div');
      canvas = document.createElement('canvas');
      this.ctx = canvas.getContext('2d');
      canvas.width = this.sizePix*20+4;  // w*count+4
      canvas.height = this.sizePix*(20+1)+24; //h*count+24
      body = document.getElementsByTagName('body')[0];
      body.appendChild(div);
      div.appendChild(canvas);
    }

    drawObj.prototype.clearCanvas = function(){
       this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   this.ctx.fillStyle = 'yellow';
    //   this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawObj.prototype.drawMain = function(score, level) {
      this.ctx.lineWidth = 2; // Our border will have a thickness of 2 pixels
      this.ctx.strokeStyle = 'black'; // The border will also be black

      // The border is drawn on the outside of the rectangle, so we'll
      // need to move it a bit to the right and up. Also, we'll need
      // to leave a 20 pixels space on the top to draw the interface.
      this.ctx.strokeRect(2, 2*this.sizePix, canvas.width - 4, canvas.height-2*this.sizePix-1);

      this.ctx.fillStyle = 'black';
      this.ctx.font = 1.2+this.sizePix+'px sans-serif';
      this.ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 1.2*this.sizePix);
    }

    drawObj.prototype.showGameOver = function(score) {

      // Clear the canvas
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.ctx.fillStyle = 'black';
      this.ctx.font = 1.6*this.sizePix+'px sans-serif';

      this.ctx.fillText('Game Over!', ((canvas.width / 2) - (this.ctx.measureText('Game Over!').width / 2)), 6*this.sizePix);

      this.ctx.font = 1.2*this.sizePix+'px sans-serif';

      this.ctx.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (this.ctx.measureText('Your Score Was: ' + score).width / 2)), 8*this.sizePix);

    }

    drawObj.prototype.showMap = function(map) {
      // Start cycling the matrix
      for (var x = 0; x < map.point.length; x++) {
        for (var y = 0; y < map.point[0].length; y++) {
          if (map.isPointHereXY(x, y, 1)) {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(x * this.sizePix, (y+2) * this.sizePix, this.sizePix, this.sizePix);
          } else if (map.isPointHereXY(x, y, 2)) {
            this.ctx.fillStyle = 'orange';
            this.ctx.fillRect(x * this.sizePix, (y+2) * this.sizePix, this.sizePix, this.sizePix);
          }
        }
      }
    }


    return drawObj;

  })
