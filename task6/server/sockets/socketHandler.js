// sockets/socketHandler.js
// const socketIO = require("socket.io");

// let io = socketIO(httpServer);

// exports.initializeSocketServer = (httpServer) => {
//   io.on("connection", (socket) => {
//     console.log("A user connected");

//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
//   });
// };

// exports.emitMessage = (message) => {
//   if (io) {
//     io.emit("newMessage", message);
//     console.log(message);
//   }
// };

// // const Message = require("../model/Message");

// // const handleSocketConnection = (socket) => {
// //   Message.find()
// //     .sort("timestamp")
// //     .then((messages) => {
// //       socket.emit("messages", messages);
// //     });

// //   socket.on("sendMessage", (data) => {
// //     const { text, tags } = data;
// //     const newMessage = new Message({ text, tags });
// //     newMessage.save().then((message) => {
// //       io.emit("newMessage", message);
// //     });
// //   });
// // };

// // module.exports = { handleSocketConnection };
