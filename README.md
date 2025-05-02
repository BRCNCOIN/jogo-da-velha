# 🕹️ Jogo da Velha Multiplayer com Salas e Tema

Este projeto é uma versão moderna e multiplayer do Jogo da Velha, com suporte a **salas protegidas por senha**, **jogadas em tempo real via WebSocket** e interface moderna com **temas, ajuda interativa e cores vibrantes**.

---

## 📁 Estrutura

- `frontend/`: Interface do jogo para o usuário final (HTML5 + Bootstrap + Socket.io)
- `backend/`: Servidor WebSocket com suporte a múltiplas salas (Node.js + Express + Socket.io)

---

## 🚀 Como usar

### 🔧 Backend (Render.com)

1. Crie um novo serviço **Web Service** no [Render.com](https://render.com).
2. Faça upload da pasta `backend/` ou envie para um repositório Git.
3. Defina o comando de inicialização como:

   ```
   npm install && npm start
   ```

4. O servidor será iniciado na porta que o Render definir (Render usa automaticamente `process.env.PORT`).

---

### 🌐 Frontend (GitHub Pages ou servidor próprio)

1. Faça upload da pasta `frontend/` em um repositório no GitHub.
2. Ative o GitHub Pages apontando para a pasta principal (root).
3. O arquivo `script.js` já está configurado para conectar no servidor Render (`https://jogo-da-velha-api.onrender.com`).

---

## ✅ Recursos

- Salas privadas com senha
- Jogadas em tempo real com WebSocket
- Bootstrap 5 e estilo responsivo
- Placar por jogador
- Interface moderna com efeito visual
- 🎨 **Seletor de temas** (Claro, Escuro, Neon)
- 📘 **Ajuda interativa** com instruções dentro do site
- ✨ **Cores vibrantes e animações**
- 🎆 **Fogos e confete quando alguém vence**

---

## 💡 Sugestões de melhorias

- Adicionar chat nas salas
- Mostrar jogadores online
- Criar leaderboard global
- Salvar histórico de partidas

---

Feito com ❤️ para diversão!
