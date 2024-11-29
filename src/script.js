const sudoku = [ 
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let table = document.querySelector('tbody');

for (let i = 0; i < 9; i++) {
    let row = document.createElement('tr');

    for (let j = 0; j < 9; j++) {
        let cell = document.createElement('td');

        cell.classList.add("border", "w-14", "h-14", "text-center", "p-1", "bg-sky-950");

        if (sudoku[i][j] !== 0) {
            cell.textContent = sudoku[i][j];
            
            cell.classList.add("font-bold", "text-white");
        } else {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;

            
            input.classList.add("w-full", "h-full", "text-center", "text-blue-600", "border", "rounded", "outline-none", "font-bold");
            

            input.addEventListener('input', () => validateInput(input, i, j));

            cell.appendChild(input);
        }

        row.appendChild(cell);
    }
    table.appendChild(row);
}

function validateInput(input, row, col) {
    const value = parseInt(input.value);

   
    if (isValidMove(row, col, value)) {
        input.classList.add("text-green-600");
        input.classList.remove("text-red-600");
    } else {
        input.classList.add("text-red-600");
        input.classList.remove("text-green-600");
    }
}

function isValidMove(row, col, value) {
    if (value > 9) return false;

    const sudokuCopy = Array.from(document.querySelectorAll('tr')).map(row =>
        Array.from(row.querySelectorAll('td')).map(cell =>
            cell.querySelector('input') ? Number(cell.querySelector('input').value) || 0 : Number(cell.textContent)
        )
    );

    for (let i = 0; i < 9; i++) {
        if (i !== col && sudokuCopy[row][i] === value) return false;
    }

    for (let i = 0; i < 9; i++) {
        if (i !== row && sudokuCopy[i][col] === value) return false;
    }

    const subGridRowStart = Math.floor(row / 3) * 3;
    const subGridColStart = Math.floor(col / 3) * 3;
    for (let r = subGridRowStart; r < subGridRowStart + 3; r++) {
        for (let c = subGridColStart; c < subGridColStart + 3; c++) {
            if ((r !== row || c !== col) && sudokuCopy[r][c] === value) return false;
        }
    }

    return true;
}