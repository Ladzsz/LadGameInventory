const pool = require("./pool");

//user queries for CRUD operations

const getUsers = async () => {
  const res = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return res.rows;
};

const getUserById = async (id) => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

const createUser = async (username, email, password) => {
  const res = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return res.rows[0];
};

const updateUser = async (id, username, email, password) => {
  const res = await pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
    [username, email, password, id]
  );
  return res.rows[0];
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};