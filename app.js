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

function handleInput(key) {
  console.log(key);
  switch (key) {
    case "ArrowUp":
      moveUp();
      break;
    
    case "ArrowDown":
      moveDown();
      break;
    
    case "ArrowLeft":
      moveLeft();
      break;
    
    case "ArrowRight":
      moveRight();
      break;
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

function moveDown() {}

function moveLeft() {}

function moveRight() {}


// render();

document.addEventListener('keydown', (event) => {
  console.log(event);
  if (event.key == "ArrowLeft"
  || event.key == "ArrowRight"
  || event.key == "ArrowUp"
  || event.key == "ArrowDown"
  ) {
    handleInput(event.key);
    render();
  }
});

render();