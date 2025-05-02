const API = "https://jogodavelha-api.onrender.com/salas";
let salaAtual = "";
let simbolo = "X";
let estado = Array(9).fill("");
let terminou = false;

function entrarSala() {
  salaAtual = document.getElementById("sala").value;
  if (!salaAtual) return alert("Digite o nome da sala");
  fetch(API + "/" + salaAtual)
    .then(res => res.ok ? res.json() : criarSala())
    .then(data => {
      estado = data.estado;
      renderizar();
    }).catch(() => criarSala());
  document.getElementById("jogo").classList.remove("d-none");
}

function criarSala() {
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: salaAtual, estado })
  });
}

function renderizar() {
  const tab = document.getElementById("tabuleiro");
  tab.innerHTML = "";
  estado.forEach((v, i) => {
    const c = document.createElement("div");
    c.className = "celula " + v.toLowerCase();
    c.textContent = v;
    c.onclick = () => jogar(i);
    tab.appendChild(c);
  });
  verificarVencedor();
}

function jogar(i) {
  if (estado[i] || terminou) return;
  estado[i] = simbolo;
  simbolo = simbolo === "X" ? "O" : "X";
  fetch(API + "/" + salaAtual, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  }).then(() => renderizar());
}

function verificarVencedor() {
  const linhas = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of linhas) {
    if (estado[a] && estado[a] === estado[b] && estado[b] === estado[c]) {
      document.getElementById("mensagem").textContent = `${estado[a]} venceu!`;
      terminou = true;
      soltarConfete();
      return;
    }
  }
}

function reiniciar() {
  estado = Array(9).fill("");
  terminou = false;
  fetch(API + "/" + salaAtual, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado })
  }).then(() => renderizar());
}

function soltarConfete() {
  const canvas = document.getElementById("confete");
  const confetti = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    c: `hsl(${Math.random() * 360}, 100%, 50%)`,
    v: Math.random() * 5 + 2
  }));
  function draw() {
    confetti.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      confetti.beginPath();
      confetti.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      confetti.fillStyle = p.c;
      confetti.fill();
      p.y += p.v;
      if (p.y > canvas.height) p.y = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();
}
