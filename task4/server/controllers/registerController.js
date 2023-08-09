const User = require("../model/User");
const bcrypt = require("bcrypt");
const { format } = require("date-fns");

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email already exists" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPwd,
      registrationTime: format(new Date(), "yyyy-MM-dd\tHH:mm:ss"),
    });

    res.status(201).json({ success: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleNewUser };
