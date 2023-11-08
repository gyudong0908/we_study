const {Server} = require('socket.io');

module.exports = (httpServer) => {
  
    const io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
    });

io.on('connection', function(socket){

    socket.on('room1-send', function(data){
        io.to('room1').emit('broadcast', data);
    })
  
    socket.on('joinroom', function(data){
        socket.join('room1');
    })
  
    socket.on('user-send', function(data){
        console.log(data);
        io.emit('broadcast', data);
        // io.to(socket.id).emit('broadcast', data); // 그 유저에게만 데이터를 보냄
    })
  })
}