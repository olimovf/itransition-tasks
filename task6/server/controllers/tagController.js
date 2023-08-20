const Tag = require("../model/Tag");

const addTag = async (req, res) => {
  try {
    const { name } = req.body;

    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(200).json({ message: "Tag already exists" });
    }

    const newTag = new Tag({ name });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: "Error adding tag" });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({}, "name");
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tags" });
  }
};

// const deleteAllTags = async (req, res) => {
//   try {
//     await Tag.deleteMany({});
//     res.status(200).json({ message: "All tags deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting tags" });
//   }
// };

module.exports = { addTag, getTags /*, deleteAllTags */ };
