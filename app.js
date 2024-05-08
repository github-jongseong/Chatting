// app.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 루트 URL에 대한 GET 요청에 대한 응답
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 클라이언트가 소켓에 연결할 때 실행되는 이벤트 핸들러
io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  // 클라이언트로부터 메시지를 수신할 때 실행되는 이벤트 핸들러
  socket.on('chat message', (data) => {
    console.log('메시지 받음: ' + data.message);

    // 모든 클라이언트에게 메시지를 전달
    io.emit('chat message', { message: data.message, sender: socket.id });
  });

  // 클라이언트와의 연결이 끊겼을 때 실행되는 이벤트 핸들러
  socket.on('disconnect', () => {
    console.log('사용자가 연결을 끊었습니다.');
  });
});

// 서버를 3000번 포트에서 실행
server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});
