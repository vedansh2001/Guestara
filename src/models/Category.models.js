import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
    taxType: {
        type: String, // Could be 'percentage' or 'flat'
        required: true,
    }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
