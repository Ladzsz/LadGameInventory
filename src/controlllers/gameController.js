const {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getGameByCategory,
  getGameByuserId
} = require("../model/gameQueries");


//controller functions for game routes 
const getAllGamesConroller = async (req, res) => {
  try {
    const games = await getGames();
    res.status(200).json(games);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGameByIdController = async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createGameController = async (req, res) => {
  try {
    const { name, description, category_id, user_id, quantity } = req.body;
    const newGame = await createGame(name, description, category_id, user_id, quantity);
    res.status(201).json(newGame);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateGameController = async (req, res) => {
  try {
    const { name, description, category_id, user_id, quantity } = req.body;
    const updatedGame = await updateGame(
      req.params.id,
      name,
      description,
      category_id,
      user_id,
      quantity
    );
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(updatedGame);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteGameController = async (req, res) => {
  try {
    await deleteGame(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGamesByCategoryController = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const games = await getGameByCategory(category_id);
    res.status(200).json(games);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getGamesByUserController = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const games = await getGameByuserId(user_id);
    res.status(200).json(games);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllGamesConroller,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
  getGamesByCategoryController,
  getGamesByUserController
};