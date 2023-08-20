const Message = require("../model/Message");
const Tag = require("../model/Tag");

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const tagsRegex = /#(\w+)/g;
    let tags = text.match(tagsRegex) || [];
    tags = tags.map((w) => w.slice(1));
    const messageText = text.replace(tagsRegex, "").trim();

    for (const tag of tags) {
      const existingTag = await Tag.findOne({ name: tag });
      if (!existingTag) {
        const newTag = new Tag({ name: tag });
        await newTag.save();
      }
    }

    const newMessage = new Message({ text: messageText, tags });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Error sending message" });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort("timestamp");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// const deleteAllMessages = async (req, res) => {
//   try {
//     await Message.deleteMany({});
//     res.status(200).json({ message: "All messages deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting messages" });
//   }
// };

module.exports = { sendMessage, fetchMessages /*, deleteAllMessages */ };
