//category routes
const {
  getAllCategories,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  searchCategoriesController,
  deleteCategoryController,
} = require("../controlllers/categoryController");

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();

//category routes
router.get("/", getAllCategories);
router.get("/search", searchCategoriesController);
router.get("/:id", getCategoryByIdController);
router.post("/", authenticateToken, requireAdmin, createCategoryController);
router.put("/:id", authenticateToken, requireAdmin, updateCategoryController);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteCategoryController,
);

module.exports = router;
