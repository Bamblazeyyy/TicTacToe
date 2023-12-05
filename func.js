const player1 = "X";
const player2 = "O";

let currentPlayer = player1;
let boardFull = false;
let playBoard = ["", "", "", "", "", "", "", "", ""];

const boardContainer = document.querySelector(".play-area");
const winnerStatement = document.getElementById("winner");

const checkBoardComplete = () => {
  let flag = true;
  playBoard.forEach(element => {
    if (element !== player1 && element !== player2) {
      flag = false;
    }
  });
  boardFull = flag;
};

const checkLine = (a, b, c) => {
  return (
    playBoard[a] === playBoard[b] &&
    playBoard[b] === playBoard[c] &&
    (playBoard[a] === player1 || playBoard[a] === player2)
  );
};

const checkMatch = () => {
  for (let i = 0; i < 9; i += 3) {
    if (checkLine(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 1}`).classList.add("win");
      document.querySelector(`#block_${i + 2}`).classList.add("win");
      return playBoard[i];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (checkLine(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 3}`).classList.add("win");
      document.querySelector(`#block_${i + 6}`).classList.add("win");
      return playBoard[i];
    }
  }
  if (checkLine(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_8").classList.add("win");
    return playBoard[0];
  }
  if (checkLine(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_6").classList.add("win");
    return playBoard[2];
  }
  return "";
};

const checkForWinner = () => {
  const result = checkMatch();
  if (result === player1) {
    winnerStatement.innerText = "Player 1 Wins!";
    winnerStatement.classList.add("playerWin");
    boardFull = true;
  } else if (result === player2) {
    winnerStatement.innerText = "Player 2 Wins!";
    winnerStatement.classList.add("playerWin");
    boardFull = true;
  } else if (boardFull) {
    winnerStatement.innerText = "It's a Draw!";
    winnerStatement.classList.add("draw");
  }
};

const renderBoard = () => {
  boardContainer.innerHTML = "";
  playBoard.forEach((e, i) => {
    boardContainer.innerHTML += `<div id="block_${i}" class="block" onclick="addMove(${i})">${playBoard[i]}</div>`;
    if (e === player1 || e === player2) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const addMove = index => {
  if (!boardFull && playBoard[index] === "") {
    playBoard[index] = currentPlayer;
    gameLoop();
  }
};

const gameLoop = () => {
  renderBoard();
  checkBoardComplete();
  checkForWinner();
  togglePlayer();
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
};

const resetBoard = () => {
  playBoard = ["", "", "", "", "", "", "", "", ""];
  boardFull = false;
  winnerStatement.classList.remove("playerWin");
  winnerStatement.classList.remove("draw");
  winnerStatement.innerText = "";
  renderBoard();
};

// Initial render
renderBoard();
