// script.js

// Module to manage the gameboard
const Gameboard = (function () {
  const gameboardGrid = document.querySelector('#gameboard');
  let board = Array(9).fill('');

  // Render the gameboard in the UI
  function render() {
    let html = ``;
    board.forEach(
      (cell, index) =>
        (html += `<div class="cell" id="cell-${index}">${cell}</div>`)
    );
    gameboardGrid.innerHTML = html;

    // Add event listeners to each cell
    document.querySelectorAll('.cell').forEach((cell) => {
      cell.addEventListener('click', Game.handleClick);
    });
  }

  // Update a specific cell and re-render the board
  function update(index, value) {
    board[index] = value;
    render();
  }

  // Start/Reset the gameboard
  function reset() {
    board.fill('', 0, 9);
    render();
  }
  // Get a copy of the current gameboard
  function getBoard() {
    return [...board];
  }

  return {
    render,
    update,
    reset,
    getBoard,
  };
})();

// Factory function to create players
const createPlayer = (name, mark) => ({ name, mark });

// Module to manage the game logic
const Game = (function () {
  const players = [
    createPlayer('Player X', 'X'),
    createPlayer('Player O', 'O'),
  ];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Start or restart the game
  function start() {
    Gameboard.reset();
  }

  function checkWinner() {
    const board = Gameboard.getBoard();
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  function handleClick(event) {
    if (gameOver) return;

    const index = Number(event.target.id.split('-')[1]);
    if (Gameboard.getBoard()[index]) return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    // Check if current player won
    if (checkWinner()) {
      gameOver = true;
      return;
    }
    // Switch Players Between Turns
    currentPlayerIndex = 1 - currentPlayerIndex;
  }

  return {
    start,
    handleClick,
  };
})();

// Init
Game.start();
