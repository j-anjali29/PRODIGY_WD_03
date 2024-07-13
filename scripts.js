const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const restartBtn = document.getElementById('restartBtn');
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

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

function playMoveSound() {
    moveSound.currentTime = 0;
    moveSound.play();
}

function playWinSound() {
    winSound.currentTime = 0;
    winSound.play();
}

function playDrawSound() {
    drawSound.currentTime = 0;
    drawSound.play();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    playMoveSound();
    checkGameStatus();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkGameStatus() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
        playWinSound();
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        statusMessage.textContent = `It's a draw!`;
        playDrawSound();
        return;
    }

    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinningCells() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
        }
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
