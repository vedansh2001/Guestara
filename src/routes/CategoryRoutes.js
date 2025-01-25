import express from "express";
import { 
    createCategory, 
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

export default router;
