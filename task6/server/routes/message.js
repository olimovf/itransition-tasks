const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.post("/", messageController.sendMessage);
router.get("/", messageController.fetchMessages);
router.delete("/", messageController.deleteAllMessages);

module.exports = router;
