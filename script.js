const socket = io("https://jogo-da-velha-api.onrender.com"); // <-- substitua depois
let simbolo = "X", jogando = true;

const form = document.getElementById("formulario");
const jogo = document.getElementById("jogo");
const erro = document.getElementById("erro");
const info = document.getElementById("info");
const tabuleiro = document.getElementById("tabuleiro");
const placarEl = document.getElementById("placar");

function entrar() {
  const nome = document.getElementById("nome").value;
  const sala = document.getElementById("sala").value;
  const senha = document.getElementById("senha").value;
  if (!nome || !sala || !senha) return;
  simbolo = "X";
  socket.emit("entrar", { nome, sala, senha });
}

socket.on("erro", msg => erro.innerText = msg);

socket.on("atualizar", ({ estado, placar }) => {
  form.style.display = "none";
  jogo.style.display = "block";
  erro.innerText = "";
  renderizarTabuleiro(estado);
  renderizarPlacar(placar);
});

function renderizarTabuleiro(estado) {
  tabuleiro.innerHTML = "";
  estado.forEach((val, i) => {
    const casa = document.createElement("div");
    casa.className = "casa" + (val === "O" ? " o" : "");
    casa.innerText = val;
    casa.onclick = () => {
      if (!val && jogando) {
        socket.emit("jogada", { index: i, simbolo });
        simbolo = simbolo === "X" ? "O" : "X";
      }
    };
    tabuleiro.appendChild(casa);
  });
}

function renderizarPlacar(placar) {
  placarEl.innerHTML = "";
  for (const [nome, pontos] of Object.entries(placar)) {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.innerText = `${nome}: ${pontos}`;
    placarEl.appendChild(item);
  }
}

function reiniciar() {
  socket.emit("reiniciar");
}
