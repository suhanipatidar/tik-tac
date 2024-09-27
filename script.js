const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
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

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        alert('Game is a draw!');
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
