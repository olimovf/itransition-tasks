const User = require("../model/User");
const bcrypt = require("bcrypt");
const { format } = require("date-fns");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    if (foundUser.status === "blocked") {
      return res.status(403).json({ message: "This email is blocked" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    foundUser.lastLoginTime = foundUser.lastLoginTime = format(
      new Date(),
      "yyyy-MM-dd\tHH:mm:ss"
    );

    await foundUser.save();

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleLogin };
