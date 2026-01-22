const  {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../model/categoryQueries');

// Controller functions for category routes
const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryByIdController = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = await createCategory(name, description);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedCategory = await updateCategory(req.params.id, name, description);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController
};