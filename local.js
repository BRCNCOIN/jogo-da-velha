let estado = Array(9).fill("");
let simboloAtual = "X";
let terminou = false;

const tabuleiro = document.getElementById("tabuleiro");
const turnoEl = document.getElementById("turno");

function renderizar() {
  tabuleiro.innerHTML = "";
  estado.forEach((val, i) => {
    const div = document.createElement("div");
    div.className = "casa";
    div.textContent = val;
    div.onclick = () => jogar(i);
    tabuleiro.appendChild(div);
  });
}

function jogar(i) {
  if (estado[i] || terminou) return;
  estado[i] = simboloAtual;
  simboloAtual = simboloAtual === "X" ? "O" : "X";
  turnoEl.textContent = "Vez de: " + simboloAtual;
  renderizar();
  verificarVencedor();
}

function verificarVencedor() {
  const linhas = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b,c] of linhas) {
    if (estado[a] && estado[a] === estado[b] && estado[b] === estado[c]) {
      document.querySelectorAll(".casa")[a].classList.add("vencedor");
      document.querySelectorAll(".casa")[b].classList.add("vencedor");
      document.querySelectorAll(".casa")[c].classList.add("vencedor");
      terminou = true;
      turnoEl.textContent = `🏆 ${estado[a]} venceu!`;
    }
  }
}

function reiniciar() {
  estado = Array(9).fill("");
  simboloAtual = "X";
  terminou = false;
  turnoEl.textContent = "Vez de: X";
  renderizar();
}

renderizar();
