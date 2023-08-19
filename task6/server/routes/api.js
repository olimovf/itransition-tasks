const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/messages", messageController.sendMessage);
router.get("/messages", messageController.fetchMessages);
router.delete("/messages", messageController.deleteAllMessages);

module.exports = router;
