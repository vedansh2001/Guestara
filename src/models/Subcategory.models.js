import mongoose from 'mongoose';
import Category from './Category.models.js'; // Ensure the path is correct

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String, // URL of the image
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        taxApplicability: {
            type: Boolean,
            default: true, // Default is category's tax applicability
        },
        tax: {
            type: Number,
            default: 0, // Default tax will be the category tax
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true }
);

// Prevent OverwriteModelError by checking if the model already exists
const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
