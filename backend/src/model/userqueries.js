const pool = require("./pool");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//user queries for CRUD operations

// const getUsers = async () => {
//   const res = await pool.query("SELECT * FROM users ORDER BY id ASC");
//   return res.rows;
// };

// const getUserById = async (id) => {
//   const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//   return res.rows[0];
// };

const createUser = async (username, email, password, is_admin = false) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const res = await pool.query(
    "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, hashedPassword, is_admin],
  );

  return res.rows[0];
};

// Update an existing user
const updateUser = async (id, username, email, password, is_admin) => {
  // If password is provided, hash it
  let hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  // Update user in database
  const res = await pool.query(
    `UPDATE users 
     SET username = COALESCE($1, username), email = COALESCE($2, email), password = COALESCE($3, password), is_admin = COALESCE($4, is_admin)
     WHERE id = $5 
     RETURNING *`,
    [username, email, hashedPassword, is_admin, id],
  );

  return res.rows[0];
};

const loginUser = async (email, password) => {
  // Find user by email
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = res.rows[0];

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, is_admin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION },
  );

  // Return user info + token
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
    },
    token,
  };
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

const findUserByEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

const updateuserPassword = async (id, hashedPassword) => {
  const res = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
    [hashedPassword, id],
  );
  return res.rows[0];
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  findUserByEmail,
  updateuserPassword,
};
