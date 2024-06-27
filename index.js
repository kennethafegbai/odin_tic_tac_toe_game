document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return boardState.every(cell => cell !== null);
    };

    const displayInfo = (msg, color) => {
        const h4 = document.querySelector('h4');
        h4.textContent = msg;
        h4.style.backgroundColor = color;
        h4.style.color = 'white';
        h4.style.display = 'block';
    }

    const clearInfo = () => {
        const h4 = document.querySelector('h4');
        h4.style.display = 'none';
    }

    const handleCellClick = (e) => {
        const cellIndex = e.target.getAttribute('data-index');
        if (boardState[cellIndex] || !gameActive) return;

        boardState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
           // alert(`${winner} wins!`);
            displayInfo(`${winner} wins!`, 'green');
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            //alert("It's a draw!");
            displayInfo(`It's a draw!`, 'yellow');
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const resetGame = () => {
        clearInfo();
        currentPlayer = 'X';
        boardState = Array(9).fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        gameActive = true;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
