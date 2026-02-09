const {
  getAllGamesConroller,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
  searchGameController,
} = require("../controlllers/gameController");

const { authenticateToken } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

router.get("/", getAllGamesConroller);
router.get("/search", searchGameController);
router.get("/:id", getGameByIdController);
router.post("/", authenticateToken, createGameController);
router.put("/:id", authenticateToken, updateGameController);
router.delete("/:id", authenticateToken, deleteGameController);

module.exports = router;
