import express from "express";
import { 
    createSubCategory, 
    deleteSubCategory, 
    getSubCategories, 
    getSubCategoriesByCategoryId, 
    getSubCategoryById, 
    updateSubCategory 
} from "../controllers/Subcategory.controllers.js";

const router = express.Router();

// Create a new sub-category under a category
router.post("/:categoryId", createSubCategory);

// Get all sub-categories
router.get("/", getSubCategories);

// Get all sub-categories under a specific category
router.get("/category/:categoryId", getSubCategoriesByCategoryId);

// Get a specific sub-category by ID
router.get("/:id", getSubCategoryById);

// Update a specific sub-category
router.put("/:id", updateSubCategory);

// delete a specific sub-category
router.delete("/:id", deleteSubCategory);

export default router; 
