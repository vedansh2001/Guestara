import React from 'react';
import PropTypes from 'prop-types';
import CommonFields from './CommonFields';

const ItemForm = ({ formData, setFormData, categories, subcategories }) => {
  const inputClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4";
  
  return (
    <>
      <select
        className={inputClass}
        value={formData.category || ''}
        onChange={(e) => setFormData({...formData, category: e.target.value, subCategory: ''})}
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <select
        className={inputClass}
        value={formData.subCategory || ''}
        onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
      >
        <option value="">Select Subcategory (Optional)</option>
        {subcategories
          .filter(sub => sub.category === formData.category)
          .map(sub => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))
        }
      </select>
      <CommonFields formData={formData} setFormData={setFormData} />
      <input
        className={inputClass}
        type="number"
        placeholder="Base Amount"
        value={formData.baseAmount || ''}
        onChange={(e) => setFormData({...formData, baseAmount: parseFloat(e.target.value)})}
        required
      />
      <input
        className={inputClass}
        type="number"
        placeholder="Discount"
        value={formData.discount || ''}
        onChange={(e) => setFormData({...formData, discount: parseFloat(e.target.value)})}
        required
      />
    </>
  );
};

export default ItemForm;