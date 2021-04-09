const Player = (mark) => {
  const playerMark = mark;
  return { playerMark };
};

const player1 = Player('X');
const player2 = Player('O');
let currentPlayer = player1;
let gameRunning = true;

const gameBoard = (() => {
  const gameboard = ['', '', '', '', '', '', '', '', ''];
  return { gameboard };
})();

const displayController = (() => {
  const fields = document.querySelectorAll('.field');
  const reset = document.querySelector('.reset');
  const winTxt = document.querySelector('#win-txt');
  const xWon = document.querySelector('.x-won');
  const oWon = document.querySelector('.o-won');
  const drawTxt = document.querySelector('#draw-txt');
  const container = document.querySelector('.container');
  const againBtn = document.querySelector('.again-btn');

  const changingTurns = () => {
    if (currentPlayer == player1) {
      currentPlayer = player2;
    } else if (currentPlayer != player1) {
      currentPlayer = player1;
    }
  };

  const winCheck = () => {
    if (
      (gameBoard.gameboard[0] == currentPlayer.playerMark &&
        gameBoard.gameboard[1] == currentPlayer.playerMark &&
        gameBoard.gameboard[2] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[3] == currentPlayer.playerMark &&
        gameBoard.gameboard[4] == currentPlayer.playerMark &&
        gameBoard.gameboard[5] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[6] == currentPlayer.playerMark &&
        gameBoard.gameboard[7] == currentPlayer.playerMark &&
        gameBoard.gameboard[8] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[0] == currentPlayer.playerMark &&
        gameBoard.gameboard[3] == currentPlayer.playerMark &&
        gameBoard.gameboard[6] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[1] == currentPlayer.playerMark &&
        gameBoard.gameboard[4] == currentPlayer.playerMark &&
        gameBoard.gameboard[7] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[2] == currentPlayer.playerMark &&
        gameBoard.gameboard[5] == currentPlayer.playerMark &&
        gameBoard.gameboard[8] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[0] == currentPlayer.playerMark &&
        gameBoard.gameboard[4] == currentPlayer.playerMark &&
        gameBoard.gameboard[8] == currentPlayer.playerMark) ||
      (gameBoard.gameboard[2] == currentPlayer.playerMark &&
        gameBoard.gameboard[4] == currentPlayer.playerMark &&
        gameBoard.gameboard[6] == currentPlayer.playerMark)
    ) {
      if (currentPlayer.playerMark == 'X') {
        container.style.filter = 'blur(8px)';
        winTxt.classList.remove('hide');
        xWon.classList.remove('hide');
        againBtn.classList.remove('hide');
      } else if (currentPlayer.playerMark == 'O') {
        container.style.filter = 'blur(8px)';
        winTxt.classList.remove('hide');
        oWon.classList.remove('hide');
        againBtn.classList.remove('hide');
      }
      gameRunning = false;
      againBtn.addEventListener('click', () => {
        container.style.filter = 'blur(0px)';
        winTxt.classList.add('hide');
        againBtn.classList.add('hide');
        gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
        fillFields();
        currentPlayer = player1;
        gameRunning = true;
        oWon.classList.add('hide');
        xWon.classList.add('hide');
        drawTxt.classList.add('hide');
      });
    } else if (
      gameBoard.gameboard[0] !== '' &&
      gameBoard.gameboard[1] !== '' &&
      gameBoard.gameboard[2] !== '' &&
      gameBoard.gameboard[3] !== '' &&
      gameBoard.gameboard[4] !== '' &&
      gameBoard.gameboard[5] !== '' &&
      gameBoard.gameboard[6] !== '' &&
      gameBoard.gameboard[7] !== '' &&
      gameBoard.gameboard[8] !== ''
    ) {
      container.style.filter = 'blur(8px)';
      drawTxt.classList.remove('hide');
      againBtn.classList.remove('hide');
      gameRunning = false;
      againBtn.addEventListener('click', () => {
        container.style.filter = 'blur(0px)';
        winTxt.classList.add('hide');
        againBtn.classList.add('hide');
        gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
        fillFields();
        currentPlayer = player1;
        gameRunning = true;
        oWon.classList.add('hide');
        xWon.classList.add('hide');
        drawTxt.classList.add('hide');
      });
    }
  };

  const addMark = (() => {
    fields.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (gameBoard.gameboard[e.target.dataset.index] == '' && gameRunning) {
          gameBoard.gameboard[e.target.dataset.index] =
            currentPlayer.playerMark;
          winCheck();
          changingTurns();
          fillFields();
        }
      });
    });
  })();

  const fillFields = () => {
    for (let i = 0; i < gameBoard.gameboard.length; i++) {
      fields[i].innerText = gameBoard.gameboard[i];
    }
  };

  const resetGame = (() => {
    reset.addEventListener('click', () => {
      gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
      fillFields();
      currentPlayer = player1;
      gameRunning = true;
      winTxt.classList.add('hide');
      oWon.classList.add('hide');
      xWon.classList.add('hide');
      drawTxt.classList.add('hide');
    });
  })();
  return { fillFields, addMark, resetGame };
})();

displayController.fillFields();
