const { Server } = require('socket.io');
const models = require('../models');
module.exports = (httpServer) => {
  const messageQueue = [];


  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });
  let chatName = '';

  io.on('connection', function (socket) {

    socket.on('send', function (data) {
      // 메세지 큐를 활용하여 동시에 채팅이 보내졌을 경우 순차로 진행
      messageQueue.push({ socket, data });
      processMessageQueue();
    })

    function processMessageQueue() {
      if (messageQueue.length > 0) {

        const { socket, data } = messageQueue.shift();
        models.chatMessage.create({
          chatUserId: data.chatUserId,
          message: data.data,
        })
        models.chatUser.findAll({
          include: [models.user],
          where: {
            id: data.chatUserId,
          },
        }).then(value => {
          console.log(value)
          io.to(chatName).emit('broadcast', { content: data.data, name: value[0].get('user').get('nickName') });

        })
        processMessageQueue();
      }
    }

    socket.on('joinroom', function (data) {
      socket.join(data);
      chatName = data;
      console.log(data)
    })

    socket.on('user-send', function (data) {
      console.log(data);
      io.emit('broadcast', data);
      // io.to(socket.id).emit('broadcast', data); // 그 유저에게만 데이터를 보냄
    })
  })
}