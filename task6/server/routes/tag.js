const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

router.post("/", tagController.addTag);
router.get("/", tagController.getTags);
// router.delete("/", tagController.deleteAllTags);

module.exports = router;
