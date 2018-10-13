
exports.connect= function (io) {
    var connectedUsers=[]
    var clients={}

    // Create Socket Connection
    io.on('connection', function (socket) {

        var userInfo = {username: socket.handshake.query.userConnected, id: socket.id}
          if (connectedUsers.length == 0){
                connectedUsers.push(userInfo)
            }
          else{
            for (var i = 0; i < connectedUsers.length; i++) {

                    if (connectedUsers[i].username == userInfo.username) {
                        connectedUsers.splice(i,1)
                        break
                    }
            }
              // Add user to connectedUsers array
              connectedUsers.push(userInfo)
            }

        // Emit List of Connected Users
        io.sockets.emit('getUsers',connectedUsers)

        // Emit count of Connected Users
        var total=io.engine.clientsCount;
        socket.emit('getCount',[total])

        // Remove user from connectedUsers array on disconnection
        socket.on('disconnect', function () {

            for (var i = 0; i < connectedUsers.length; i++) {
                if (connectedUsers[i].username == socket.handshake.query.userConnected) {
                    console.log("Disconnected "+ connectedUsers[i].username)
                    connectedUsers.splice(i,1)
                    break
                }
            }
        });

        // Broadcast private message to specific user based on socket id
        socket.on('privatemessage', function(data){
            for (var i = 0; i < connectedUsers.length; i++) {
                if (connectedUsers[i].username == data.uname) {
                    socket.broadcast.to(connectedUsers[i].id).emit('receivemessage',{message:data.msg, user:socket.handshake.query.userConnected})
                    break
                }
            }
        });

        //Broadcast the meassage to all the users with their name
        socket.on('publicmessage', function (data) {
            io.sockets.emit('receivemessage',{message:data.msg, user:socket.handshake.query.userConnected})
        })

        //listening for sendevent, and broadcasts at event connectlink
        socket.on('sendevent', function (data) {
            socket.broadcast.emit('connectlink', data);
        });
    });
};
