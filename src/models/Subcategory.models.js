import mongoose from 'mongoose';
import Category from './Category.models';

// Assuming that the category model has been imported correctly
// import Category from './category.js';

const subCategorySchema = new mongoose.Schema({
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
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
