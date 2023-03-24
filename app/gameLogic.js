$(() => {
    //generates the grid
    const createGrid = () => {
        for(let i = 0; i < 210; i++) {
            if(i > 199) {
                $('.p-grid').append(`<div class="cell taken floor"></div>`);
            } else {
                $('.p-grid').append(`<div id="cell-${i}" class="cell"></div>`);
            } 
        } 
        for(let j = 0; j < 16; j++) {
            $('.next').append(`<div class="next-cell"></div>`);
        }
    };

    createGrid();

    const cells = Array.from(document.querySelectorAll('.cell'));
    const width = 10;

    //define tetrominoes and their orientations
    const jTetromino = [
        [width, width*2, width*2+1, width*2+2],
        [2, 1, width+1, width*2+1],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2]
    ];
    
    const lTetromino = [
        [width+2, width*2, width*2+1, width*2+2],
        [1, width+1, width*2+1, width*2+2],
        [width*2, width, width+1, width+2],
        [0, 1, width+1, width*2+1]
    ];
    
    const iTetromino = [
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1]
    ];
    
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];
    
    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
      ];
      
      const sTetromino = [
        [width+1, width+2, width*2, width*2+1],
        [1, width+1, width+2, width*2+2],
        [width+1, width+2, width*2, width*2+1],
        [1, width+1, width+2, width*2+2]
      ];
      
      const zTetromino = [
        [width, width+1, width*2+1, width*2+2],
        [2, width+1, width+2, width*2+1],
        [width, width+1, width*2+1, width*2+2],
        [2, width+1, width+2, width*2+1]
      ];
    
      const tetrominoes = [
        zTetromino, lTetromino, jTetromino, oTetromino, iTetromino, sTetromino, tTetromino
      ];
      
      //set starting point
      let currentPosition = 4;
      let tetrominoOrientation = 0;
      let randomIndex = Math.floor(Math.random() * tetrominoes.length);
      let currentTetromino = tetrominoes[randomIndex][tetrominoOrientation];
      
      //draw tetromino
      const draw = () => {
        currentTetromino.forEach(index => {
          cells[currentPosition + index].classList.add('tetromino')
        });
      };

      const undraw = () => {
        currentTetromino.forEach(index => {
            cells[currentPosition + index].classList.remove('tetromino')
        });
      };

      //rotate teromino
      const rotate = () => {
        undraw();
        tetrominoOrientation++;
        if(tetrominoOrientation === currentTetromino.length) {
            tetrominoOrientation = 0;
        }
        currentTetromino = tetrominoes[randomIndex][tetrominoOrientation];
        draw();
      };

      //check if space is occupied
      const checkCell = () => {
      }

      //freeze blocks in place if the bottom is taken
      const freeze = () => {
        if(currentTetromino.some(index => cells[currentPosition + index + width].classList.contains('taken'))) {
            currentTetromino.forEach(index => cells[currentPosition + index].classList.add('taken'));
            randomIndex = Math.floor(Math.random() * tetrominoes.length);
            tetrominoOrientation = 0;
            currentTetromino = tetrominoes[randomIndex][tetrominoOrientation];
            currentPosition = 4;
            draw();
        }
      };

      const moveDown = () => {
        undraw();
        currentPosition += width;
        draw();
        freeze();
      };

      let timerId = setInterval(moveDown, 1000);

      const moveLeft = () => {
        undraw();
        const isAtLeftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) {
            currentPosition--;
        }
        if(currentTetromino.some(index => cells[currentPosition + index].classList.contains('taken'))){
            currentPosition++;
        }
        draw();
      };

      const moveRight = () => {
        undraw();
        const isAtRightEdge = currentTetromino.some(index => (currentPosition + index) % width === 9);
        if(!isAtRightEdge) {
            currentPosition++;
        }
        if(currentTetromino.some(index => cells[currentPosition + index].classList.contains('taken'))){
            currentPosition--;
        }
        draw();
      };

      //tetromino control
      $(document).keyup((e) => {
        switch(e.which) {
            case 37:
                moveLeft();
            break;
            case 38:
                rotate();
            break;
            case 39:
                moveRight();
            break;
            case 40:
                moveDown();
            break;
        }
      });


      
});    