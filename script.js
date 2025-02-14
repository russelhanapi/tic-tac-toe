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
    displayController.renderMessage(
      `${players[currentPlayerIndex].name}'s turn`
    );
  }

  // Check if current player won
  function checkWinner() {
    const board = Gameboard.getBoard();
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  // Check if the game is a tie
  function checkTie() {
    return Gameboard.getBoard().every((cell) => cell !== '');
  }

  function handleClick(event) {
    if (gameOver) return;

    const index = Number(event.target.id.split('-')[1]);
    if (Gameboard.getBoard()[index]) return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkWinner()) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} won!`
      );
      return;
    }

    if (checkTie()) {
      gameOver = true;
      displayController.renderMessage("It's a tie!");
      return;
    }

    // Switch Players Between Turns
    currentPlayerIndex = 1 - currentPlayerIndex;
    displayController.renderMessage(
      `${players[currentPlayerIndex].name}'s turn`
    );
  }

  return {
    start,
    handleClick,
  };
})();

// Module to control display messages
const displayController = (function () {
  const displayText = document.querySelector('.player-turn-display');
  function renderMessage(message) {
    displayText.innerHTML = message;
  }
  return { renderMessage };
})();
// Init
Game.start();
