const playArea = document.querySelector('.play-area');
const winnerText = document.getElementById('winner');
const resetButton = document.querySelector('button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateGameBoard();
        checkForWinner();
        togglePlayer();
    }
}

function updateGameBoard() {
    playArea.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const block = document.createElement('div');
        block.classList.add('block');
        block.textContent = cell;
        block.addEventListener('click', () => handleCellClick(index));
        playArea.appendChild(block);
    });
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinner(combination);
            displayWinner(`${currentPlayer} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        displayWinner('It\'s a draw!');
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winnerText.textContent = '';
    updateGameBoard();
}

function displayWinner(message) {
    winnerText.textContent = message;
}

function highlightWinner(combination) {
    combination.forEach(index => {
        playArea.children[index].classList.add('win');
    });
}

resetButton.addEventListener('click', resetBoard);

updateGameBoard();
