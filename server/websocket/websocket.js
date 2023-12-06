const { Server } = require('socket.io');
const models = require('../models');
const dotenv = require('dotenv').config();
module.exports = (httpServer) => {
  const messageQueue = [];


  const io = new Server(httpServer, {
    cors: {
      origin: process.env.frontAddress,
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', function (socket) {

    socket.on('send', function (data) {
      // 메세지 큐를 활용하여 동시에 채팅이 보내졌을 경우 순차로 진행
      messageQueue.push({ socket, data });
      processMessageQueue();
    })

    function processMessageQueue() {
      if (messageQueue.length > 0) {

        const { socket, data } = messageQueue.shift();

        models.ChatMessage.create({
          chatUserId: data.chatUserId,
          chatId: data.chatId,
          message: data.data,
        }).then((chatMessage) => {
          models.User.findOne({
            where: {
              id: data.userId
            }
          }).then((user) => {
            io.to(data.chatCode).emit('broadcast', { createdAt: chatMessage.dataValues.createdAt, content: data.data, user: user.dataValues });
          })
        }).catch(err => {
          console.log(err);
        })

        processMessageQueue();
      }
    }

    socket.on('joinroom', function (data) {
      socket.join(data);
    })

    socket.on('user-send', function (data) {
      console.log(data);
      io.emit('broadcast', data);
      // io.to(socket.id).emit('broadcast', data); // 그 유저에게만 데이터를 보냄
    })
  })
}