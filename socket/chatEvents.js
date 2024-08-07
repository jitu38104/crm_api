module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("A user connected");
        // if(!socket.hasOwnProperty("connectedUsers")) {
        //   socket["connectedUsers"] = {};
        // }
      
        // Handle events from the client
        socket.on("group-message", (data) => {
          // console.log('Message received from client:', data);
          // Broadcast the message to all connected clients
          io.emit("group-message", data);
        });

        //send only single user message
        socket.on("single-user-msg", (data) => {
          // console.log(data)
          io.emit("single-user-msg", data);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
      });
};

