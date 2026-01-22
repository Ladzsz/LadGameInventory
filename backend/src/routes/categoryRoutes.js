//category routes
const {getAllCategories,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController} = require('../controlllers/categoryController');

const express = require('express');
const router = express.Router();

//category routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryByIdController);
router.post('/', createCategoryController);
router.put('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

module.exports = router;