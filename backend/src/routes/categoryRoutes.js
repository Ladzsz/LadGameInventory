//category routes
const {getAllCategories,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    searchCategoriesController,
    deleteCategoryController} = require('../controlllers/categoryController');

const { authenticateToken } = require('../middleware/authMiddleware');     

const express = require('express');
const router = express.Router();

//category routes
router.get('/', getAllCategories);
router.get('/search', searchCategoriesController);
router.get('/:id', getCategoryByIdController);
router.post('/', authenticateToken, createCategoryController);
router.put('/:id', authenticateToken, updateCategoryController);
router.delete('/:id', authenticateToken, deleteCategoryController);

module.exports = router;