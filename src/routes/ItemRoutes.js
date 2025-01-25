import express from "express";
import { 
    createItem, 
    getItems, 
    getItemsByCategoryId, 
    getItemsBySubCategoryId, 
    getItemById, 
    searchItem, 
    updateItem 
} from "../controllers/Item.controllers.js";

const router = express.Router();

// Create a new item under a category or sub-category
router.post("/", createItem);

// Get all items
router.get("/", getItems);
 
// Get all items under a category
router.get("/category/:categoryId", getItemsByCategoryId);

// Get all items under a sub-category
router.get("/subcategory/:subCategoryId", getItemsBySubCategoryId);

// Search for an item by name
router.get("/search", searchItem);

// Get a specific item by ID
router.get("/:id", getItemById);


// Update a specific item
router.put("/:id", updateItem);

export default router;
