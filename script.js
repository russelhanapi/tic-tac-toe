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
  }

  // Start/Reset the gameboard
  function reset() {
    board.fill('', 0, 9);
    render();
  }

  return {
    render,
    reset,
  };
})();

// Factory function to create players
const createPlayer = (name, mark) => ({ name, mark });

// Module to manage the game logic
const Game = (function () {
  // Start or restart the game
  function start() {
    Gameboard.reset();
  }

  return {
    start,
  };
})();

// Init
Game.start();
