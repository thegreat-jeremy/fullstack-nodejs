const express = require("express");
const { createServer } = require("http"); // HTTP 웹 서버와 클라이언트를 생성하는 것과 관련된 모든 기능을 담당.
// web socket
// socket.io
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app); // 서버 객체 생성

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// io 객체는 socket.io 서버와 연결된 전체 클라이언트와 메시지를 송수신하는 인터랙션을 위한 객체
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    // 클라이언트가 접속을 종료했을 때
  });

  socket.on("cleint2server", (data) => {
    console.log(data);
    // io.emit("event_name", msg); // 접속된 모든 클라이언트에게 msg를 전송
    // socket.emit("event_name", msg); // 메시지를 전송한 클라이언트에게만 전송
    // socket.broadcast.emit("event_name", msg); // 메시지를 전송한 클라이언트를 제외한 나머지 모두에게 전송
    // io.to(socket_id).emit("event_name", msg); // 지정된(socket_id) 특정 클라이언트에게만 메시지 전송
  });
});

const sendMsgToClient = () => {
  setInterval(() => {
    io.emit("server2client1", {
      code: `item${Math.round(Math.random() * 1000)}`,
      price: Math.round(Math.random() * 1000),
    });
  }, 1000);
};

app.get("/socket", (req, res) => {
  sendMsgToClient();
  res.send("서버로 부터 메시지 전송 시작");
});

httpServer.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});
