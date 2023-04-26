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
  // iterate over all of our cells
  // for each cell, try to move it up one
  // combine as necessary

  let cellWasChanged = false;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i == 0)
        continue;

      let cellAbove = gameState.cells[i - 1][j];
      let curCell = gameState.cells[i][j];

      if (cellAbove.value == null) {
        gameState.cells[i - 1][j] = curCell;
        gameState.cells[i][j] = new Cell(null);
        cellWasChanged = true;
      }

      if (cellAbove.value == curCell.value) {
        cellAbove.value *= 2;
        gameState.cells[i][j] = new Cell(null);
      }
    }
    if (cellWasChanged) {
      i--;
      cellWasChanged = false;
    }
  }

}

function moveDown() {

}

function moveLeft() {}

function moveRigbht() {}


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