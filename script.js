
const socket = io("https://jogo-da-velha-api.onrender.com"); // Altere para sua URL se necessário
let playerName = "";
let roomId = "";
let simbolo = "";
let currentThemeIndex = 0;

// 🎨 Temas de fundo animado
const backgroundThemes = [
  "bg-theme-1", "bg-theme-2", "bg-theme-3", "bg-theme-4"
];

function rotateBackgroundTheme() {
  document.body.classList.remove(...backgroundThemes);
  currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;
  document.body.classList.add(backgroundThemes[currentThemeIndex]);
}
setInterval(rotateBackgroundTheme, 300000);
document.addEventListener("DOMContentLoaded", () => {
  rotateBackgroundTheme();

  // Entrada na sala
  const form = document.getElementById("form-sala");
  form.onsubmit = (e) => {
    e.preventDefault();
    playerName = document.getElementById("nome").value.trim();
    roomId = document.getElementById("sala").value.trim();
    const senha = document.getElementById("senha").value.trim();
    if (!playerName || !roomId) return alert("Preencha seu nome e sala!");
    localStorage.setItem("username", playerName);
    localStorage.setItem("roomId", roomId);
    socket.emit("joinRoom", { roomId, name: playerName });
  };

  // Troca de tema manual
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.remove(...backgroundThemes);
      currentThemeIndex = (currentThemeIndex + 1) % backgroundThemes.length;
      document.body.classList.add(backgroundThemes[currentThemeIndex]);
    });
  }

  // Chat
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");
  const audio = new Audio("audio/chat.mp3");

  function sendChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    const emojiMsg = msg
      .replace(":)", "😊")
      .replace(":(", "😢")
      .replace(":D", "😄")
      .replace("<3", "❤️")
      .replace(":fire:", "<img src='stickers/fire.png' height='18'>")
      .replace(":lol:", "<img src='stickers/lol.png' height='18'>")
      .replace(":thumbsup:", "<img src='stickers/thumbsup.png' height='18'>");

    socket.emit("chatMessage", {
      roomId,
      name: playerName,
      text: emojiMsg
    });
    addChatMessage("me", emojiMsg);
    chatInput.value = "";
  }

  chatSend.addEventListener("click", sendChat);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendChat();
  });

  function addChatMessage(type, message) {
    const div = document.createElement("div");
    div.className = type;
    div.innerHTML = message;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (type === "other") audio.play();
  }

  socket.on("chatMessage", (data) => {
    if (data.name !== playerName) {
      addChatMessage("other", `<b>${data.name}:</b> ${data.text}`);
    }
  });

  socket.on("startGame", () => {
    document.getElementById("info").innerText = "🎮 Partida iniciada!";
  });

  socket.on("systemMessage", (msg) => {
    addChatMessage("system", `<i>${msg}</i>`);
  });
});
