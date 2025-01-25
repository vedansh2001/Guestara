import SubCategory from '../models/Subcategory.models.js';
import Category from '../models/Category.models.js';
import mongoose from 'mongoose';

export const createSubCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        
        // Find the category by ID
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

// Get all the SubCategories under a specific category
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

// Update SubCategories
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
