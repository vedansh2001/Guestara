import React from 'react';
import PropTypes from 'prop-types';

const CommonFields = ({ formData, setFormData }) => {
  const inputClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4";
  
  return (
    <>
      <input
        className={inputClass}
        type="text"
        name="name"
        placeholder="Name"
        value={formData?.name || ''}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        className={inputClass}
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData?.image || ''}
        onChange={(e) => setFormData({...formData, image: e.target.value})}
        required
      />
      <textarea
        className={inputClass}
        name="description"
        placeholder="Description"
        value={formData?.description || ''}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />
      <select
        className={inputClass}
        name="taxType"
        value={formData?.taxType || ''}
        onChange={(e) => setFormData({...formData, taxType: e.target.value})}
        required
      >
        <option value="">Select Tax Type</option>
        <option value="GST">GST</option>
        <option value="VAT">VAT</option>
        <option value="NONE">None</option>
      </select>
      <select
        className={inputClass}
        name="taxApplicability"
        value={formData?.taxApplicability || ''}
        onChange={(e) => setFormData({...formData, taxApplicability: e.target.value})}
        required
      >
        <option value="">Select Tax Applicability</option>
        <option value="APPLICABLE">Applicable</option>
        <option value="NOT_APPLICABLE">Not Applicable</option>
        <option value="EXEMPT">Exempt</option>
      </select>
    </>
  );
};

CommonFields.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    taxType: PropTypes.oneOf(['', 'GST', 'VAT', 'NONE']),
    taxApplicability: PropTypes.oneOf(['', 'APPLICABLE', 'NOT_APPLICABLE', 'EXEMPT'])
  }).isRequired,
  setFormData: PropTypes.func.isRequired
};

export default CommonFields;