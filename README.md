# 🎮 Jogo da Velha - Multiplayer Online (Frontend)

Este é o frontend completo do jogo da velha multiplayer com todos os recursos integrados.

## ✅ Funcionalidades

- 👥 Multiplayer com suporte a salas e nomes personalizados
- 🔒 Salas com senha (implementado no backend)
- 💬 Chat com:
  - Envio de mensagens e emojis (`:D`, `:fire:`, `<3`)
  - Stickers (🔥 😂 👍)
  - Botão de envio
  - Som ao receber mensagens
- 🎨 Temas:
  - Fundo animado que muda automaticamente
  - Botão para troca manual de tema
- 🎉 Animações ao vencer
- 🌐 Responsivo e moderno com Bootstrap 5

## 🧠 Tecnologias

- HTML5 + CSS3
- JavaScript (vanilla)
- WebSocket (via socket.io)
- Bootstrap 5

## 🚀 Como usar

1. Suba os arquivos no GitHub
2. Ative o GitHub Pages (branch `main`, pasta `/`)
3. Certifique-se de que o `script.js` aponta para o backend Render:

```js
const socket = io("https://jogo-da-velha-api.onrender.com");
```

> Altere a URL se necessário!

## 📂 Estrutura

- `index.html`: interface principal
- `script.js`: lógica de comunicação e interface
- `style.css`: estilos e animações
- `audio/chat.mp3`: som do chat
- `stickers/`: imagens para emojis gráficos
- `README.md`: instruções

---

Feito com 💙 para diversão e aprendizado!
