import SubCategory from '../models/Subcategory.models.js';
import Category from '../models/Category.models.js';
import mongoose from 'mongoose';
import Item from '../models/Item.models.js';

//create subcategories
export const createSubCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        
        const category = await Category.findById(categoryId);
        
        // If the category doesn't exist, return an error
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const subCategory = new SubCategory({
            ...req.body,
            category: categoryId, // Set the categoryId in the subcategory
            taxApplicability: req.body.taxApplicability ?? category.taxApplicability,
            tax: req.body.tax ?? category.tax,
        });
        await subCategory.save();
        res.status(201).json(subCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all SubCategories
export const getSubCategories = async (req, res) => {
    try {
        const subCategory = await SubCategory.find();
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all the SubCategories under a specific category using category ID
export const getSubCategoriesByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;        

        // Validate categoryId
        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ error: "Invalid category ID format" });
        }

        const subCategory = await SubCategory.find({
            category: categoryId,
        });
        if (!subCategory || subCategory.length === 0) {
            return res.status(404).json({ message: "Subcategories not found" });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get SubCategories by ID
export const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id);
        if (!subCategory) {
            return res.status(404).json({ message: "subCategory not found" });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update SubCategories using ID
export const updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  //this will return the modified data
        );
        if (!updatedSubCategory) {
            return res.status(404).json({ message: "SubCategory not found" });
        }
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete subcategory and all related items
export const deleteSubCategory = async (req, res) => {
    try {
        // Start a session for transaction. We are using session so that either all the steps complete or none of them.
        const session = await SubCategory.startSession();
        session.startTransaction();

        try {
            // Find the subcategory first
            const subCategory = await SubCategory.findById(req.params.id);
            if (!subCategory) {
                await session.abortTransaction();
                return res.status(404).json({ message: "Subcategory not found" });
            }

            // Delete all items associated with this subcategory
            await Item.deleteMany({ subCategory: req.params.id });

            // Delete the subcategory
            const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);

            // Commit the transaction
            await session.commitTransaction();
            
            res.status(200).json({ 
                message: "Subcategory and all related items deleted successfully",
                deletedSubCategory
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
            message: "Error deleting subcategory and related items", 
            error: error.message 
        });
    }
};
