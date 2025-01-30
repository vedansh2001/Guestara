import express from "express";
import { 
    createCategory, 
    deleteCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory 
} from "../controllers/Category.controllers.js"

const router = express.Router();

// Create a new category
router.post("/", createCategory);

// Get all categories
router.get("/", getCategories);

// Get a specific category by ID
router.get("/:id", getCategoryById);

// Update a specific category
router.put("/:id", updateCategory);

// Delete a specific category
router.delete("/:id", deleteCategory);

export default router;
