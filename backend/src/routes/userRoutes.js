const {
  createUserController,
  updateUserController,
  loginUserController,
  deleteUserController,
} = require("../controlllers/userController");

const express = require("express");
const router = express.Router();

//user routes
router.post("/login", loginUserController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

module.exports = router;
