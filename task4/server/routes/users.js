const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  blockSelectedUsers,
  unblockSelectedUsers,
  deleteSelectedUsers,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.put("/block", blockSelectedUsers);
router.put("/unblock", unblockSelectedUsers);
router.delete("/delete", deleteSelectedUsers);

module.exports = router;
