const API = "https://jogodavelha-api.onrender.com/salas";
let salaAtual = "", nomeJogador = "", senhaSala = "", simbolo = "X", terminou = false;
let estado = Array(9).fill(""), placar = {};

function entrarSala() {
  nomeJogador = document.getElementById("nome").value.trim();
  salaAtual = document.getElementById("sala").value.trim();
  senhaSala = document.getElementById("senha").value.trim();
  if (!nomeJogador || !salaAtual || !senhaSala) return alert("Preencha nome, sala e senha");
  fetch(`${API}/${salaAtual}`)
    .then(res => res.ok ? res.json() : criarSala())
    .then(data => {
      if (data.senha && data.senha !== senhaSala) return alert("Senha incorreta");
      estado = data.estado;
      placar = data.placar || {};
      if (!placar[nomeJogador]) placar[nomeJogador] = 0;
      renderizar();
    }).catch(() => criarSala());
  document.getElementById("jogo").classList.remove("d-none");
}

function criarSala() {
  placar = { [nomeJogador]: 0 };
  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ id: salaAtual, estado, placar, senha: senhaSala })
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
  atualizarPlacar();
  verificarVencedor();
}

function jogar(i) {
  if (estado[i] || terminou) return;
  estado[i] = simbolo;
  simbolo = simbolo === "X" ? "O" : "X";
  fetch(`${API}/${salaAtual}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ estado })
  }).then(() => renderizar());
}

function verificarVencedor() {
  const linhas = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],
                  [1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let [a,b,c] of linhas) {
    if (estado[a] && estado[a] === estado[b] && estado[b] === estado[c]) {
      document.getElementById("mensagem").textContent = `${estado[a]} venceu!`;
      terminou = true;
      placar[nomeJogador] = (placar[nomeJogador] || 0) + 1;
      fetch(`${API}/${salaAtual}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ placar })
      });
      soltarConfete();
      atualizarPlacar();
      return;
    }
  }
}

function atualizarPlacar() {
  const p = Object.entries(placar).map(([jogador, pontos]) =>
    `${jogador}: ${pontos}`).join(" | ");
  document.getElementById("placar").textContent = "Placar - " + p;
}

function reiniciar() {
  estado = Array(9).fill("");
  terminou = false;
  fetch(`${API}/${salaAtual}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ estado })
  }).then(() => renderizar());
}

function soltarConfete() {
  const canvas = document.getElementById("confete");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const confetes = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    c: `hsl(${Math.random()*360},100%,50%)`,
    v: Math.random() * 5 + 2
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of confetes) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.c;
      ctx.fill();
      p.y += p.v;
      if (p.y > canvas.height) p.y = 0;
    }
    requestAnimationFrame(draw);
  }
  draw();
}
