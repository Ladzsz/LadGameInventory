const pool = require("./pool");
const bcrypt = require("bcryptjs");


//user queries for CRUD operations

const getUsers = async () => {
  const res = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return res.rows;
};

const getUserById = async (id) => {
  const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

const createUser = async (username, email, password, is_admin = false) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const res = await pool.query(
    "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, is_admin]
  );

  return res.rows[0];
};

// Update an existing user
const updateUser = async (id, username, email, password, is_admin) => {
  // If password is provided, hash it
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Update user in database
  const res = await pool.query(
    `UPDATE users 
     SET username = $1, email = $2, password = COALESCE($3, password), is_admin = $4 
     WHERE id = $5 
     RETURNING *`,
    [username, email, hashedPassword, is_admin, id]
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