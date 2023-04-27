class Cell {
  constructor(num) {
    this.value = num;
  }
}

const gameState = {
  cells: [
    [
      new Cell(2), new Cell(4), new Cell(null), new Cell(16)
    ],
    [
      new Cell(null), new Cell(1024), new Cell(null), new Cell(16)
    ],
    [
      new Cell(null), new Cell(null), new Cell(8), new Cell(null)
    ],
    [
      new Cell(null), new Cell(4), new Cell(8), new Cell(16)
    ],
  ]
}

function render() {
  const boardElem = document.querySelector(".board");
  boardElem.textContent = "";

  for (let row of gameState.cells) {
    for (let cell of row) {
      boardElem.insertAdjacentHTML("beforeend", `
        <div class="square">${cell.value ?? ""}</div>
      `);
    }
  }
}

function resetGame() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      gameState.cells[i][j].value = null;
    }
  }

  generateNewCell();
}

function getRandomEmptyCell() {
  const emptyList = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (gameState.cells[i][j].value === null) {
        emptyList.push([i, j]);
      }
    }
  }

  return emptyList[
    Math.floor(Math.random() * emptyList.length)
  ];
}

function generateNewCell() {
  [row, col] = getRandomEmptyCell();
  
  const newCellValue = Math.random() > 0.67 ? 4 : 2;
  gameState.cells[row][col] = new Cell(newCellValue);
}

function handleInput(key) {
  let cellMoved = false;

  switch (key) {
    case "ArrowUp":
      cellMoved = moveUp();
      break;
    
    case "ArrowDown":
      cellMoved = moveDown();
      break;
    
    case "ArrowLeft":
      cellMoved = moveLeft();
      break;
    
    case "ArrowRight":
      cellMoved = moveRight();
      break;
  }

  if (cellMoved) {
    generateNewCell();
  }
}

function moveUp() {
  // axis of movement: vertical
  // for each column, iterate in opposite direction
  // "moveUp" means we iterate downward (incrementing)
  // starting from second last cell
  // if a cell was moved, repeat this column

  let cellChanged = false;

  for (let col = 0; col < 4; col++) {
    let columnChanged = false;
    for (let i = 1; i < 4; i++) {
      const curCell = gameState.cells[i][col];
      const aboveCell = gameState.cells[i - 1][col];

      if (curCell.value !== null && aboveCell.value === null) {
        // can safely slide up
        aboveCell.value = curCell.value;
        curCell.value = null;
        columnChanged = true;
        cellChanged = true;
      }

      if (curCell.value === aboveCell.value && aboveCell.value !== null) {
        // equal value collision: merge
        aboveCell.value *= 2;
        curCell.value = null;
        columnChanged = true;
        cellChanged = true;
      }
    }

    if (columnChanged) {
      // repeat column until no changes
      col--;
    }
  }

  return cellChanged;
}

function moveDown() {
  // axis of movement: vertical
  // for each column, iterate in opposite direction
  // "moveDown" means we iterate upward (decrementing)
  // starting from second last cell
  // if a cell was moved, repeat this column

  let cellChanged = false;

  for (let col = 0; col < 4; col++) {
    let columnChanged = false;
    for (let i = 2; i >= 0; i--) {
      const curCell = gameState.cells[i][col];
      const belowCell = gameState.cells[i + 1][col];

      if (curCell.value !== null && belowCell.value === null) {
        // can safely slide up
        belowCell.value = curCell.value;
        curCell.value = null;
        columnChanged = true;
        cellChanged = true;
      }

      if (curCell.value === belowCell.value && belowCell.value !== null) {
        // equal value collision: merge
        belowCell.value *= 2;
        curCell.value = null;
        columnChanged = true;
        cellChanged = true;
      }
    }

    if (columnChanged) {
      // repeat column until no changes
      col--;
    }
  }

  return cellChanged;
}

function moveLeft() {
  // axis of movement: horizontal
  // for each row, iterate in opposite direction
  // "moveLeft" means we iterate rightward (incrementing)
  // starting from second last cell
  // if a cell was moved, repeat this column

  let cellChanged = false;

  for (let row = 0; row < 4; row++) {
    let rowChanged = false;
    for (let i = 1; i < 4; i++) {
      const curCell = gameState.cells[row][i];
      const leftCell = gameState.cells[row][i - 1];

      if (curCell.value !== null && leftCell.value === null) {
        // can safely slide up
        leftCell.value = curCell.value;
        curCell.value = null;
        rowChanged = true;
        cellChanged = true;
      }

      if (curCell.value === leftCell.value && leftCell.value !== null) {
        // equal value collision: merge
        leftCell.value *= 2;
        curCell.value = null;
        rowChanged = true;
        cellChanged = true;
      }
    }

    if (rowChanged) {
      // repeat column until no changes
      row--;
    }
  }

  return cellChanged;
}

function moveRight() {
  // axis of movement: horizontal
  // for each row, iterate in opposite direction
  // "moveRight" means we iterate leftward (decrementing)
  // starting from second last cell
  // if a cell was moved, repeat this column

  let cellChanged = false;

  for (let row = 0; row < 4; row++) {
    let rowChanged = false;
    for (let i = 2; i >= 0; i--) {
      const curCell = gameState.cells[row][i];
      const rightCell = gameState.cells[row][i + 1];

      if (curCell.value !== null && rightCell.value === null) {
        // can safely slide up
        rightCell.value = curCell.value;
        curCell.value = null;
        rowChanged = true;
        cellChanged = true;
      }

      if (curCell.value === rightCell.value && rightCell.value !== null) {
        // equal value collision: merge
        rightCell.value *= 2;
        curCell.value = null;
        rowChanged = true;
        cellChanged = true;
      }
    }

    if (rowChanged) {
      // repeat column until no changes
      row--;
    }
  }

  return cellChanged;
}


// render();

document.addEventListener('keydown', (event) => {
  if (event.key == "ArrowLeft"
  || event.key == "ArrowRight"
  || event.key == "ArrowUp"
  || event.key == "ArrowDown"
  ) {
    event.preventDefault();
    handleInput(event.key);
    render();
  }
});

document.getElementById('reset').addEventListener('click', (event) => {
  resetGame();
  render();
});

resetGame();
render();
