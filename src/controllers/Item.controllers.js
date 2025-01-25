import Item from '../models/Item.models.js';
import SubCategory from '../models/Subcategory.models.js';
import Category from '../models/Category.models.js';
import mongoose from 'mongoose';

export const createItem = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        const subCategory = req.body.subCategory ? await SubCategory.findById(req.body.subCategory) : null;
        
        const item = new Item({
            ...req.body,
            taxApplicability: req.body.taxApplicability ?? (subCategory ? subCategory.taxApplicability : category.taxApplicability),
            tax: req.body.tax ?? (subCategory ? subCategory.tax : category.tax),
            totalAmount: req.body.baseAmount - req.body.discount,
        });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all the items under a specific category
export const getItemsByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        
        // Validate categoryId
        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ error: "Invalid category ID format" });
        }

        const items = await Item.find({
            category: categoryId,
        });
        if (!items || items.length === 0) {
            return res.status(404).json({ message: "Subcategories not found" });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all the items under a specific subCategory
export const getItemsBySubCategoryId = async (req, res) => {
    try {
        const subCategoryId = req.params.subCategoryId;
        
        // Validate categoryId
        if (!mongoose.isValidObjectId(subCategoryId)) {
            return res.status(400).json({ error: "Invalid category ID format" });
        }

        const items = await Item.find({
            subCategory: subCategoryId,
        });
        if (!items || items.length === 0) {
            return res.status(404).json({ message: "Subcategories not found" });
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get item by ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for items by name 
export const searchItem = async (req, res) => {
    try {
        const itemName = req.query.name; // Use query parameters
        if (!itemName) {
            return res.status(400).json({ message: "Name is required" });
        }

        // Use a regular expression for case-insensitive matching
        const items = await Item.find({
            name: { $regex: new RegExp(itemName, "i") }, // "i" makes it case-insensitive
        });

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        res.status(200).json(items); // Return the array of items
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update items
export const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  //this will return the modified data
        );
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
