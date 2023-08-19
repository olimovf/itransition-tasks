// // socket.js
// const { Server } = require("socket.io");

// // Function to initialize Socket.IO and return the io instance
// const initializeSocket = (httpServer, corsOptions) => {
//   const io = new Server(httpServer, { cors: corsOptions });

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });

//     socket.on("send_message", (data) => {
//       socket.broadcast.emit("receive_message", data);
//     });
//     // Add more socket event handling here if needed
//   });

//   return io;
// };

// module.exports = { initializeSocket };
