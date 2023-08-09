const User = require("../model/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const blockSelectedUsers = async (req, res) => {
  try {
    const { userIds } = req?.body;
    await User.updateMany({ _id: { $in: userIds } }, { status: "blocked" });

    res.status(200).json({ message: "Selected user(s) blocked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const unblockSelectedUsers = async (req, res) => {
  try {
    const { userIds } = req?.body;
    await User.updateMany({ _id: { $in: userIds } }, { status: "active" });

    res
      .status(200)
      .json({ message: "Selected user(s) unblocked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteSelectedUsers = async (req, res) => {
  try {
    const { userIds } = req?.body;
    await User.deleteMany({ _id: { $in: userIds } });

    res.status(200).json({ message: "Selected user(s) deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  blockSelectedUsers,
  unblockSelectedUsers,
  deleteSelectedUsers,
};
