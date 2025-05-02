
const socket = io("https://seu-backend-render.onrender.com"); // substitua pelo seu real
const roomId = localStorage.getItem("roomId") || "sala1";
const playerName = localStorage.getItem("username") || "Jogador";

socket.emit("joinRoom", { roomId, name: playerName });

const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");

chatSend.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (msg) {
    socket.emit("chatMessage", {
      roomId,
      name: playerName,
      text: msg
    });
    addChatMessage("me", msg);
    chatInput.value = "";
  }
});

socket.on("chatMessage", (data) => {
  if (data.name !== playerName) {
    addChatMessage("other", `${data.name}: ${data.text}`);
  }
});

function addChatMessage(type, message) {
  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = message;
  document.getElementById("chatMessages").appendChild(div);
}
