require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });
const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/messages", require("./routes/message"));
app.use("/tags", require("./routes/tag"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user-message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
