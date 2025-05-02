
const board = document.getElementById("board");
const info = document.getElementById("info");
const restartBtn = document.getElementById("restart");
const startBtn = document.getElementById("start");
const toggleThemeBtn = document.getElementById("toggleTheme");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const scoreDisplay = document.getElementById("score");
const historyList = document.getElementById("history");

let currentPlayer = "x";
let gameActive = false;
let gameState = Array(9).fill("");
let mode = "pvp";
let playerX = "Jogador X";
let playerO = "Jogador O";
let score = { x: 0, o: 0 };
let history = [];

function createBoard() {
  board.innerHTML = "";
  gameState = Array(9).fill("");
  gameActive = true;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
  updateInfo();
}

function updateInfo() {
  const name = currentPlayer === "x" ? playerX : playerO;
  info.textContent = `Vez de: ${name}`;
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;
  if (!gameActive || gameState[index] !== "") return;

  clickSound.play();
  makeMove(index);

  if (mode === "pvc" && currentPlayer === "o" && gameActive) {
    setTimeout(() => {
      const empty = gameState.map((v, i) => v === "" ? i : null).filter(v => v !== null);
      const aiIndex = empty[Math.floor(Math.random() * empty.length)];
      makeMove(aiIndex);
    }, 500);
  }
}

function makeMove(index) {
  gameState[index] = currentPlayer;
  const cell = board.children[index];
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer.toUpperCase();

  if (checkWin()) {
    winSound.play();
    gameActive = false;
    const name = currentPlayer === "x" ? playerX : playerO;
    alert(`${name} venceu!`);
    score[currentPlayer]++;
    history.push(`${name} venceu`);
    saveData();
    renderScore();
    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    alert("Empate!");
    history.push("Empate");
    saveData();
    renderScore();
    return;
  }

  currentPlayer = currentPlayer === "x" ? "o" : "x";
  updateInfo();
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(comb => comb.every(i => gameState[i] === currentPlayer));
}

function renderScore() {
  scoreDisplay.textContent = `X: ${score.x} | O: ${score.o}`;
  historyList.innerHTML = history.map(item => `<li class="list-group-item">${item}</li>`).join("");
}

function saveData() {
  localStorage.setItem("ttt_score", JSON.stringify(score));
  localStorage.setItem("ttt_history", JSON.stringify(history));
}

function loadData() {
  const savedScore = JSON.parse(localStorage.getItem("ttt_score"));
  const savedHistory = JSON.parse(localStorage.getItem("ttt_history"));
  if (savedScore) score = savedScore;
  if (savedHistory) history = savedHistory;
  renderScore();
}

restartBtn.onclick = createBoard;

startBtn.onclick = () => {
  playerX = document.getElementById("playerX").value || "Jogador X";
  playerO = document.getElementById("playerO").value || "Jogador O";
  mode = document.getElementById("mode").value;
  currentPlayer = document.getElementById("firstPlayer").value;
  createBoard();
};

toggleThemeBtn.onclick = () => {
  document.body.classList.toggle("light-mode");
};

loadData();

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");
});

// Aplicar tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.add("light-mode");
}

// Alternância de tema
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
