const Message = require("../model/Message");

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const tagsRegex = /#(\w+)/g;
    const tags = text.match(tagsRegex) || [];
    const messageText = text.replace(tagsRegex, "").trim();

    const newMessage = new Message({ text: messageText, tags });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort("timestamp");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({ message: "All messages deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting messages" });
  }
};

module.exports = { sendMessage, fetchMessages, deleteAllMessages };
