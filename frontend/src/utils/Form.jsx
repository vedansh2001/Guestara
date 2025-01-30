import React from 'react';
import PropTypes from 'prop-types';
import CommonFields from '../components/Forms/CommonFields';

const Form = ({ 
  selectedType, 
  formData, 
  setFormData, 
  categories, 
  subcategories 
}) => {
  const inputClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4";

  const renderForm = () => {
    switch (selectedType) {
      case 'category':
        return <CommonFields formData={formData} setFormData={setFormData} />;

      case 'subcategory':
        return (
          <>
            <select
              className={inputClass}
              value={formData.category || ''}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <CommonFields formData={formData} setFormData={setFormData} />
          </>
        );

      case 'item':
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
      default:
        return null;
    }
  };

  return renderForm();
};

Form.propTypes = {
  selectedType: PropTypes.oneOf(['category', 'subcategory', 'item']).isRequired,
  formData: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    baseAmount: PropTypes.number,
    discount: PropTypes.number,
    taxType: PropTypes.oneOf(['', 'GST', 'VAT', 'NONE']),
    taxApplicability: PropTypes.oneOf(['', 'APPLICABLE', 'NOT_APPLICABLE', 'EXEMPT'])
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired
};

export default Form;