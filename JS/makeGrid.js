const board = document.getElementById("game-board");

function generateGrid(rows, cols, cellSize) {

    board.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    board.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        cell.innerHTML = i;
        cell.id = `cell-${i}`;
        board.appendChild(cell);
    }
}

// Example: Change these values to modify the grid
let rows = 7;      // Number of rows
let cols = 7;      // Number of columns
let cellSize = 40;  // Size of each cell in pixels

generateGrid(rows, cols, cellSize);

startPosition = document.getElementById['cell-2'];
