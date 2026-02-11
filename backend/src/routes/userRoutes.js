const {
  createUserController,
  updateUserController,
  loginUserController,
  deleteUserController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controlllers/userController");

const authenticateToken = require("../middleware/authMiddleware").authenticateToken;

const express = require("express");
const router = express.Router();

//user routes
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post("/login", loginUserController);
router.post("/", createUserController);
router.put("/me", authenticateToken, updateUserController);
router.delete("/me", authenticateToken, deleteUserController);

module.exports = router;
