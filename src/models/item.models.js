import mongoose from 'mongoose';
import SubCategory from './Subcategory.models.js';
import Category from './Category.models.js';



const itemSchema = new mongoose.Schema({
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
        required: true,
    },
    tax: {
        type: Number,
        default: 0,
    },
    baseAmount: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

export default Item;
