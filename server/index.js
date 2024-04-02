const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 3000;

const server = http.createServer(app); // это нам необходимо для socket.io
const users = [];

app.use(cors({ origin: "*" }));
app.use(express.static("public", { "Content-Type": "application/javascript" }));

const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // это порт Vite
    // methods: ["GET", "POST"],
  },
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  // пример обработчика для события "chat message"
  socket.on("message", (data) => {
    // console.log(`Message from ${socket.id}: ${data}`);
    // отправка сообщения обратно клиенту
    socketIO.emit("response", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("responseTyping", data));

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("responseNewUser", users);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log("Server is running");
});
