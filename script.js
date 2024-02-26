let matrixData = [];
let matrixSize = 20;

//creating the world 
function createMatrix() {
    const matrix = document.getElementById('matrix');
    
    for (let i = 0; i < matrixSize; i++) {
        matrixData[i] = [];
        const row = document.createElement('div');
        row.className = 'row';
        row.id = i;
        matrix.appendChild(row);
        for (let j = 0; j < matrixSize; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', j);
            cell.className = 'cell';
            cell.value = 0;
            row.appendChild(cell);
            cell.addEventListener('mouseover', cellStatus);
            matrixData[i][j] = cell;
        }
    }
    console.log(matrixData);
}
createMatrix();

// when you mouseover on a cell, it becomes a alive.
function cellStatus(event) {
    const cell = event.target;
    if (cell.value == 0) {
        cell.value = 1;
        cell.className = 'cell live';
    } else if (cell.value == 1) {
        cell.value = 0;
        cell.className = 'cell';
    }
}

function getNumberOfLivingNeighbors(i, j) {
    let sumOfLivingNeighbors = 0;
    // directions for searching neighbors around
    const directions = [
        { rowOffset: -1, colOffset: 0, name: 'up' },
        { rowOffset: 1, colOffset: 0, name: 'down' },
        { rowOffset: 0, colOffset: 1, name: 'right' },
        { rowOffset: 0, colOffset: -1, name: 'left' },
        { rowOffset: -1, colOffset: -1, name: 'up-left' },
        { rowOffset: -1, colOffset: 1, name: 'up-right' },
        { rowOffset: 1, colOffset: -1, name: 'down-left' },
        { rowOffset: 1, colOffset: 1, name: 'down-right' }
    ];

    for (const direction of directions) {
        // in this loop we go over all cells around and check if we have lives cells
        let newRow = i + direction.rowOffset;
        let newCol = j + direction.colOffset;

        const lastRow = matrixData.length - 1;
        const lastCol = matrixData[0].length - 1;

        //if its first str we search in last str
        if (newRow < 0) {
            newRow = lastRow;
        }
        //if its last str we search in first str
        if (newRow > lastRow) {
            newRow = 0;
        }
        // if its first column we search in last col
        if (newCol < 0) {
            newCol = lastCol;
        }
        // if it last col we search in first col
        if (newCol > lastCol) {
            newCol = 0;
        }
        if (matrixData[newRow][newCol].value === 1) {            
            sumOfLivingNeighbors += 1;
        }
    }
    return sumOfLivingNeighbors;
}


let isLoopEnabled = false; // toggle

function loopFunction() {
    if (isLoopEnabled) {
        let changedCells = [];
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                const numberOfLivingNeighbors = getNumberOfLivingNeighbors(i, j);

                if (matrixData[i][j].value === 1 && (numberOfLivingNeighbors < 2 || numberOfLivingNeighbors > 3)) {
                    changedCells.push({i,j,value: 0})
                }
                if (matrixData[i][j].value === 0 && numberOfLivingNeighbors === 3) {
                    changedCells.push({i,j,value: 1})
                }
            }
        }             
        for (let x = 0; x < changedCells.length; x++) {
            let currentCell = changedCells[x];             
            if (currentCell.value == 1) {
                matrixData[currentCell.i][currentCell.j].value = 1;
                matrixData[currentCell.i][currentCell.j].className = 'cell live';
            }
            if (currentCell.value == 0) {
                matrixData[currentCell.i][currentCell.j].value = 0;
                matrixData[currentCell.i][currentCell.j].className = 'cell';
            }
        }
        console.log("cycle work");

        setTimeout(loopFunction, 100);
    }
}

// turn off/turn on for cycle
function toggleLoop() {
    isLoopEnabled = !isLoopEnabled;
    startButton.textContent = 'Start'
    startButton.className = 'button';

    if (isLoopEnabled) {
        loopFunction();
        startButton.textContent = 'Stop';
        startButton.className = 'active';
    }
}


const startButton = document.getElementById('button');
startButton.addEventListener("click", toggleLoop);





