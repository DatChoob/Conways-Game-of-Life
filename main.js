const SCALE = 40;
const WIDTH = 800;
const HEIGHT = 600;
let stop = false;
let grid = [];
let numCellsWidth;
let numCellsHeight;
let graphics;
function initGrid() {
    numCellsWidth = Math.floor(WIDTH / SCALE);
    numCellsHeight = Math.floor(HEIGHT / SCALE);
    for (let i = 0; i < numCellsHeight; i++) {
        for (let j = 0; j < numCellsWidth; j++) {
            grid.push(Math.random() >= 0.5 ? 1 : 0);
        }
    }
}
function begin() {
    const app = new PIXI.Application();
    document.body.appendChild(app.view);

    graphics = new PIXI.Graphics();
    clearScreen();
    initGrid();
    app.stage.addChild(graphics);

    // Listen for animate update
    app.ticker.add((delta) => {
        loopIteration();
        if (stop == true) {
            app.ticker.stop();
            console.log("stopped");
        }
        drawGrid();
    });
}
function drawGrid() {
    clearScreen();

    for (let y = 0; y < numCellsHeight; y++) {
        for (let x = 0; x < numCellsWidth; x++) {
            let index = x + y * numCellsHeight;
            graphics.beginFill(grid[index] == 1 ? 0xffffff : 0x000000);
            // console.log(x*scale, y*scale)
            graphics.drawRect(x * SCALE, y * SCALE, SCALE, SCALE);
            graphics.endFill();
        }
    }
}

function loopIteration() {
    clearScreen();
    let continueLoop = false;
    let newGrid = [...grid];
    for (let y = 0; y < numCellsHeight; y++) {
        for (let x = 0; x < numCellsWidth; x++) {
            let index = x + y * numCellsHeight;
            let activeNeighbors = countActiveNeighbors(grid, x, y);
            // console.log(x, y, newGrid[index], activeNeighbors);
            if (grid[index] == 1 && (activeNeighbors < 2 || activeNeighbors > 3)) {
                newGrid[index] = 0;
                continueLoop = true;
            } else if (grid[index] == 0 && activeNeighbors == 3) {
                newGrid[index] = 1;
                continueLoop = true;
            }
        }
    }
    if (continueLoop == false) {
        stop = true;
    }
    grid = newGrid;
}

function countActiveNeighbors(grid, x, y) {
    let count = 0;
    if (y - 1 >= 0) {
        //is top active?
        let topIndex = x + (y - 1) * numCellsHeight;
        count += grid[topIndex];
        if (x - 1 >= 0) {
            //is top left active?
            let topLeftIndex = x - 1 + (y - 1) * numCellsHeight;
            count += grid[topLeftIndex];

        }
        if (x + 1 <= numCellsWidth) {
            //is top right active?
            let topRightIndex = x + 1 + (y - 1) * numCellsHeight;
            count += grid[topRightIndex];
        }

    }
    if (y + 1 <= numCellsHeight) {
        //is bottom active
        let bottomIndex = x + (y + 1) * numCellsHeight;
        count += grid[bottomIndex];
        if (x - 1 >= 0) {
            //is bottom left active?
            let bottomLeftIndex = x - 1 + (y + 1) * numCellsHeight;
            count += grid[bottomLeftIndex];
        }
        if (x + 1 <= numCellsWidth) {
            //is bottom right active?
            let bottomRightIndex = x + 1 + (y + 1) * numCellsHeight;
            count += grid[bottomRightIndex];
        }
    }
    if (x - 1 >= 0) {
        //is left active?
        let leftIndex = x - 1 + y * numCellsHeight;
        count += grid[leftIndex];
    }
    if (x + 1 <= numCellsWidth) {
        //is right active?
        let rightIndex = x + 1 + y * numCellsHeight;
        count += grid[rightIndex];
    }

    return count;
}
function clearScreen() {
    graphics.beginFill(0x000000);
    graphics.drawRect(0, 0, WIDTH, HEIGHT);
    graphics.endFill();
}

begin();


