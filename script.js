
const board = document.getElementById("board");
const restartBtn = document.getElementById("restart");
const toggleThemeBtn = document.getElementById("toggleTheme");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let currentPlayer = "x";
let gameActive = true;
let gameState = Array(9).fill("");

function createBoard() {
  board.innerHTML = "";
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = "x";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;
  if (!gameActive || gameState[index] !== "") return;

  clickSound.play();
  gameState[index] = currentPlayer;
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();

  if (checkWin()) {
    winSound.play();
    gameActive = false;
    alert(`${currentPlayer.toUpperCase()} venceu!`);
    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    alert("Empate!");
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(comb => {
    return comb.every(i => gameState[i] === currentPlayer);
  });
}

restartBtn.onclick = createBoard;

toggleThemeBtn.onclick = () => {
  document.body.classList.toggle("light-mode");
};

createBoard();
