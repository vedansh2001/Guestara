import Category from "../models/Category.models.js";
import Item from "../models/Item.models.js";
import SubCategory from "../models/Subcategory.models.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(409).json({ message: "Category already exists" });
        }
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update category using its Id
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  //this will return the modified data
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete category and all related subcategories and items
export const deleteCategory = async (req, res) => {
    try {
        // Start a session for transaction
        const session = await Category.startSession();
        session.startTransaction();

        try {
            // Find the category first
            const category = await Category.findById(req.params.id);
            if (!category) {
                await session.abortTransaction();
                return res.status(404).json({ message: "Category not found" });
            }

            // Delete all items associated with any subcategory of this category
            await Item.deleteMany({ 
                subCategory: { 
                    $in: await SubCategory.find({ category: req.params.id }).distinct('_id') 
                } 
            });

            // Delete all subcategories associated with this category
            await SubCategory.deleteMany({ category: req.params.id });

            // Finally delete the category
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);

            // Commit the transaction
            await session.commitTransaction();
            
            res.status(200).json({ 
                message: "Category and all related subcategories and items deleted successfully",
                deletedCategory
            });

        } catch (error) {
            // If anything fails, abort transaction
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error) {
        res.status(500).json({ 
            message: "Error deleting category and related data", 
            error: error.message 
        });
    }
};