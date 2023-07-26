// Factory function to create players
const Player = (name, marker) => {
    return { name, marker };
  };
  
  // Module pattern for the Tic Tac Toe game
  const GameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => gameBoard;
  
    const isCellEmpty = (index) => !gameBoard[index];
  
    const placeMark = (index, currentPlayer) => {
      gameBoard[index] = currentPlayer.marker;
    };
  
    const resetBoard = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, isCellEmpty, placeMark, resetBoard };
  })();
  
  const displayController = (() => {
    const cells = document.getElementsByClassName("cell");
  
    const updateCell = (index, marker) => {
      cells[index].textContent = marker;
    };
  
    const resetDisplay = () => {
      for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
      }
    };
  
    return { updateCell, resetDisplay };
  })();
  
  const gameController = (() => {
    let currentPlayer;
    const playerX = Player("Player X", "X");
    const playerO = Player("Player O", "O");
  
    const startGame = () => {
      currentPlayer = playerX;
      displayController.resetDisplay();
      cellsSetup();
    };
  
    const cellsSetup = () => {
      const cells = document.getElementsByClassName("cell");
      for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => {
          if (GameBoard.isCellEmpty(i)) {
            GameBoard.placeMark(i, currentPlayer);
            displayController.updateCell(i, currentPlayer.marker);
            if (checkWin()) {
              alert(currentPlayer.name + " wins!");
              resetGame();
            } else if (checkDraw()) {
              alert("It's a draw!");
              resetGame();
            } else {
              currentPlayer = currentPlayer === playerX ? playerO : playerX;
            }
          }
        });
      }
    };
  
    const checkWin = () => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      const board = GameBoard.getBoard();
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
        }
      }
      return false;
    };
  
    const checkDraw = () => {
      return !GameBoard.getBoard().includes("");
    };
  
    const resetGame = () => {
      currentPlayer = playerX;
      GameBoard.resetBoard();
      displayController.resetDisplay();
    };
  
    return { startGame };
  })();
  
  gameController.startGame();
  