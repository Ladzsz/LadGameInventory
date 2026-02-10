const {
  createUserController,
  updateUserController,
  loginUserController,
  deleteUserController,
} = require("../controlllers/userController");

const authenticateToken = require("../middleware/authMiddleware").authenticateToken;

const express = require("express");
const router = express.Router();

//user routes
router.post("/login", loginUserController);
router.post("/", createUserController);
router.put("/me", authenticateToken, updateUserController);
router.delete("/me", authenticateToken, deleteUserController);

module.exports = router;
