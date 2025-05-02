const socket = io("https://jogo-da-velha-api.onrender.com"); // Altere se necessário
let simbolo = "";
let salaAtual = "";

const casas = Array.from({ length: 9 }, (_, i) => {
  const div = document.createElement("div");
  div.className = "casa";
  div.dataset.index = i;
  div.onclick = () => socket.emit("jogada", { sala: salaAtual, index: i });
  return div;
});

document.getElementById("tabuleiro").append(...casas);

document.getElementById("form-sala").onsubmit = (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const sala = document.getElementById("sala").value;
  const senha = document.getElementById("senha").value;
  salaAtual = sala;
  socket.emit("entrarNaSala", { sala, senha, nome });
};

socket.on("simbolo", (s) => {
  simbolo = s;
  document.getElementById("info").textContent = `Você é: ${simbolo}`;
});

socket.on("estado", (estado) => {
  estado.forEach((val, i) => {
    casas[i].textContent = val;
    casas[i].style.color = val === "X" ? "#0cf" : "#fc0";
  });
  verificarVencedor(estado);
});

socket.on("jogadores", (lista) => {
  if (lista.length === 2) {
    document.getElementById("turno").textContent = `Vez de: ${lista[0].simbolo === simbolo ? lista[1].nome : lista[0].nome}`;
  }
});

socket.on("erro", (msg) => {
  alert(msg);
});

function verificarVencedor(estado) {
  const linhas = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let l of linhas) {
    const [a, b, c] = l;
    if (estado[a] && estado[a] === estado[b] && estado[b] === estado[c]) {
      l.forEach(i => casas[i].classList.add("vencedor"));
      confete();
    }
  }
}

function confete() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.id = "confetti";
  document.body.append(canvas);
  import("https://cdn.skypack.dev/canvas-confetti").then(mod => {
    const confetti = mod.default;
    confetti({ particleCount: 150, spread: 80 });
    setTimeout(() => canvas.remove(), 3000);
  });
}



// 🎨 Temas dinâmicos de fundo a cada 5 minutos
const backgroundThemes = [
  "bg-theme-1", "bg-theme-2", "bg-theme-3", "bg-theme-4"
];

let currentThemeIndex = 0;

function rotateBackgroundTheme() {
  document.body.classList.remove(...backgroundThemes);
  currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;
  document.body.classList.add(backgroundThemes[currentThemeIndex]);
}

// Inicia a rotação
setInterval(rotateBackgroundTheme, 300000); // 5 minutos
rotateBackgroundTheme();



// 🎛️ Botão para trocar tema manualmente
const themeToggleBtn = document.getElementById("themeToggle");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.remove(...backgroundThemes);
    currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;
    document.body.classList.add(backgroundThemes[currentThemeIndex]);
  });
}


document.addEventListener("DOMContentLoaded", () => {

// 🎨 Temas dinâmicos de fundo a cada 5 minutos
const backgroundThemes = [
  "bg-theme-1", "bg-theme-2", "bg-theme-3", "bg-theme-4"
];

let currentThemeIndex = 0;

function rotateBackgroundTheme() {
  document.body.classList.remove(...backgroundThemes);
  currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;
  document.body.classList.add(backgroundThemes[currentThemeIndex]);
}

// Inicia a rotação
setInterval(rotateBackgroundTheme, 300000); // 5 minutos
rotateBackgroundTheme();


// 🎛️ Botão para trocar tema manualmente
const themeToggleBtn = document.getElementById("themeToggle");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.remove(...backgroundThemes);
    currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;
    document.body.classList.add(backgroundThemes[currentThemeIndex]);
  });
}

});



// 💬 Chat entre jogadores
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

if (chatInput && chatMessages && socket) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      socket.emit("chatMessage", { roomId, name: playerName, text: chatInput.value });
      addChatMessage("me", chatInput.value);
      chatInput.value = "";
    }
  });

  socket.on("chatMessage", (data) => {
    if (data.name !== playerName) {
      addChatMessage("other", `${data.name}: ${data.text}`);
    }
  });

  function addChatMessage(who, text) {
    const div = document.createElement("div");
    div.className = who;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}



if (chatInput && chatMessages && socket) {
  const chatSend = document.getElementById("chatSend");

  function sendChat() {
    const msg = chatInput.value.trim();
    if (msg) {
      const emojiMsg = msg
        .replace(":)", "😊")
        .replace(":(", "😢")
        .replace(":D", "😄")
        .replace("<3", "❤️");
      socket.emit("chatMessage", { roomId, name: playerName, text: emojiMsg });
      addChatMessage("me", emojiMsg);
      chatInput.value = "";
    }
  }

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendChat();
  });
  chatSend.addEventListener("click", sendChat);

  socket.on("chatMessage", (data) => {
    if (data.name !== playerName) {
      addChatMessage("other", `${data.name}: ${data.text}`);
    }
  });

  function addChatMessage(who, text) {
    const div = document.createElement("div");
    div.className = who;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
