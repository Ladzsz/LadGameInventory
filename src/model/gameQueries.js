const pool = require("./pool");

// game queries for CRUD operations
const getGames = async () => {
  const res = await pool.query("SELECT * FROM games ORDER BY id ASC");
  return res.rows;
};

const getGameByCategory = async (category_id) => {
  const res = await pool.query("SELECT * FROM games WHERE category_id = $1", [category_id]);
  return res.rows;
};

const getGameByuserId = async (user_id) => {
  const res = await pool.query("SELECT * FROM games WHERE user_id = $1", [user_id]);
  return res.rows;
}

const getGameById = async (id) => {
  const res = await pool.query("SELECT * FROM games WHERE id = $1", [id]);
  return res.rows[0];
};

const createGame = async (name, description, category_id, user_id, quantity) => {
  const res = await pool.query(
    "INSERT INTO games (name, description, category_id, user_id, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, category_id, user_id, quantity]
  );
  return res.rows[0];
};

const updateGame = async (id, name, description, category_id, user_id, quantity) => {
  const res = await pool.query(
    "UPDATE games SET name = $1, description = $2, category_id = $3, user_id = $4, quantity = $5, updated_at = NOW() WHERE id = $6 RETURNING *",
    [name, description, category_id, user_id, quantity, id]
  );
  return res.rows[0];
};

const deleteGame = async (id) => {
  await pool.query("DELETE FROM games WHERE id = $1", [id]);  
};

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getGameByCategory,
  getGameByuserId
};