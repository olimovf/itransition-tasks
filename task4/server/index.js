require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

connectDB();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/users", require("./routes/users"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
