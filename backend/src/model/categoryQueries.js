const pool = require("./pool");

//category queries for CRUD operations
const getCategories = async () => {
  const res = await pool.query("SELECT * FROM categories ORDER BY id ASC");
  return res.rows;
};

const getCategoryById = async (id) => {
  const res = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  return res.rows[0];
};

const createCategory = async (name, description) => {
  const res = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return res.rows[0];
};

const updateCategory = async (id, name, description) => {
  const res = await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
    [name, description, id]
  );
  return res.rows[0];
};

const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};