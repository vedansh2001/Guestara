import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './components/Card/Card';
import Modal from './components/Modal/Modal';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// const Card = ({ title, data, onEdit, onView, selectedIds, onToggleSelect }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//       <h2 className="text-xl font-semibold text-gray-700 mb-3">{title}</h2>
//       <div className="space-y-2">
//         {data.map((item) => (
//           <div 
//             key={item._id} 
//             className={`flex justify-between items-center p-2 rounded-md transition-colors 
//               ${selectedIds.includes(item._id) ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'}
//             `}
//           >
//             <div className="flex items-center space-x-2">
//               <input 
//                 type="checkbox" 
//                 checked={selectedIds.includes(item._id)}
//                 onChange={() => onToggleSelect(item._id)}
//                 className="form-checkbox h-4 w-4 text-blue-600"
//               />
//               <div>
//                 <h3 className="font-medium">{item.name}</h3>
//                 {item.description && <p className="text-sm text-gray-600">{item.description.slice(0, 50)}...</p>}
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onView(item._id);
//                 }}
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
//               >
//                 View
//               </button>
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onEdit(item);
//                 }}
//                 className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string,
//     })
//   ).isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onView: PropTypes.func.isRequired,
//   selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onToggleSelect: PropTypes.func.isRequired,
// };

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
//         <button 
//           onClick={onClose} 
//           className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//         >
//           ✕
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node,
// };

const App = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('category');
  const [displayItems, setDisplayItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, itemId: null, type: null });


  const handleDelete = async (id) => {
    try {
      // Get the type from the deleteConfirmation state
      const type = deleteConfirmation.type;
      let url;
      
      switch (type) {
        case 'category':
          url = `${BASE_URL}/categories/${id}`;
          break;
        case 'subcategory':
          url = `${BASE_URL}/subcategories/${id}`;
          break;
        case 'item':
          url = `${BASE_URL}/items/${id}`;
          break;
        default:
          throw new Error('Invalid type selected');
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete');
      }

      // Refresh data after successful delete
      await fetchData();
      setDeleteConfirmation({ isOpen: false, itemId: null, type: null });
      
      // Clear selections if needed
      if (type === 'category') {
        setSelectedCategories(prev => prev.filter(catId => catId !== id));
        setSelectedSubcategories([]);
      } else if (type === 'subcategory') {
        setSelectedSubcategories(prev => prev.filter(subId => subId !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message);
    }
  };

  // Add a confirmation dialog handler
  const confirmDelete = (id, type) => {
    setDeleteConfirmation({ isOpen: true, itemId: id, type });
  };

  // Convert tax applicability to boolean
  const convertTaxApplicability = (value) => {
    switch (value) {
      case 'APPLICABLE':
        return true;
      case 'NOT_APPLICABLE':
      case 'EXEMPT':
        return false;
      default:
        return null;
    }
  };

  // Convert boolean back to string for form display
  const convertBooleanToTaxApplicability = (value) => {
    if (value === true) return 'APPLICABLE';
    if (value === false) return 'NOT_APPLICABLE';
    return '';
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [catRes, subCatRes, itemRes] = await Promise.all([
        fetch(`${BASE_URL}/categories`).then(res => res.json()),
        fetch(`${BASE_URL}/subcategories`).then(res => res.json()),
        fetch(`${BASE_URL}/items`).then(res => res.json())
      ]);

      setCategories(catRes);
      setSubcategories(subCatRes);
      setItems(itemRes);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filteredItems = items;
    
    if (searchQuery.trim()) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategories.length > 0) {
      filteredItems = filteredItems.filter(item => 
        selectedCategories.includes(item.category)
      );
    }
    
    if (selectedSubcategories.length > 0) {
      filteredItems = filteredItems.filter(item => 
        selectedSubcategories.includes(item.subCategory)
      );
    }
    
    setDisplayItems(filteredItems);
  }, [items, selectedCategories, selectedSubcategories, searchQuery]);

  const validateFormData = (data, type) => {
    const requiredFields = {
      category: ['name', 'description', 'image', 'taxType', 'taxApplicability'],
      subcategory: ['name', 'description', 'image', 'category', 'taxType', 'taxApplicability'],
      item: ['name', 'description', 'image', 'category', 'baseAmount', 'discount', 'taxType', 'taxApplicability']
    };

    const missing = requiredFields[type].filter(field => !data[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    if (type === 'item') {
      if (typeof data.baseAmount !== 'number' || isNaN(data.baseAmount)) {
        throw new Error('Base amount must be a valid number');
      }
      if (typeof data.discount !== 'number' || isNaN(data.discount)) {
        throw new Error('Discount must be a valid number');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      validateFormData(formData, selectedType);

      // Prepare the data for submission
      const submissionData = {
        ...formData,
        taxApplicability: convertTaxApplicability(formData.taxApplicability)
      };

      let url, method;
      switch (selectedType) {
        case 'category':
          url = formData._id 
            ? `${BASE_URL}/categories/${formData._id}` 
            : `${BASE_URL}/categories`;
          method = formData._id ? 'PUT' : 'POST';
          break;
          
        case 'subcategory':
          if (!formData.category) {
            throw new Error('Category is required for subcategory creation');
          }
          url = formData._id 
            ? `${BASE_URL}/subcategories/${formData._id}` 
            : `${BASE_URL}/subcategories/${formData.category}`;
          method = formData._id ? 'PUT' : 'POST';
          delete submissionData.category;
          break;
          
        case 'item':
          if (!formData.category) {
            throw new Error('Category is required for item creation');
          }
          
          url = formData._id 
            ? `${BASE_URL}/items/${formData._id}` 
            : `${BASE_URL}/items`;
          method = formData._id ? 'PUT' : 'POST';
          
          break;
          
        default:
          throw new Error('Invalid type selected');
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Server error occurred');
      }

      await fetchData();
      setIsModalOpen(false);
      setFormData({});
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategorySelect = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setSelectedSubcategories([]);
  };

  const toggleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const handleEdit = (item) => {
    // Convert tax applicability back to string format for the form
    const formattedItem = {
      ...item,
      taxApplicability: convertBooleanToTaxApplicability(item.taxApplicability)
    };
    setFormData(formattedItem);
    setIsModalOpen(true);
  };

  const handleView = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      let url;
      switch (selectedType) {
        case 'category':
          url = `${BASE_URL}/categories/${id}`;
          break;
        case 'subcategory':
          url = `${BASE_URL}/subcategories/${id}`;
          break;
        case 'item':
          url = `${BASE_URL}/items/${id}`;
          break;
        default:
          throw new Error('Invalid type selected');
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      const data = await response.json();
      setViewDetails(data);
    } catch (error) {
      console.error('Error fetching details:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    const inputClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4";
  
    const commonFields = (
      <>
        <input
          className={inputClass}
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          className={inputClass}
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image || ''}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          required
        />
        <textarea
          className={inputClass}
          name="description"
          placeholder="Description"
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <select
          className={inputClass}
          name="taxType"
          value={formData.taxType || ''}
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
          value={formData.taxApplicability || ''}
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

    switch (selectedType) {
      case 'category':
        return commonFields;

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
            {commonFields}
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
            {commonFields}
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

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">CRUD Operations</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <select 
          className="px-4 py-2 border rounded-md"
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setFormData({});
            setError(null);
          }}
        >
          <option value="category">Category</option>
          <option value="subcategory">Subcategory</option>
          <option value="item">Item</option>
        </select>
        <button 
          onClick={() => {
            setFormData({});
            setError(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          Add New
        </button>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md flex-grow"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
      <Card 
          title="Categories" 
          data={categories} 
          onEdit={handleEdit}
          onView={handleView}
          onDelete={(id) => confirmDelete(id, 'category')}
          selectedIds={selectedCategories}
          onToggleSelect={toggleCategorySelect}
        />


         <Card 
          title="Subcategories" 
          data={selectedCategories.length > 0 
            ? subcategories.filter(sub => selectedCategories.includes(sub.category))
            : subcategories
          }
          onEdit={handleEdit}
          onView={handleView}
          onDelete={(id) => confirmDelete(id, 'subcategory')}
          selectedIds={selectedSubcategories}
          onToggleSelect={toggleSubcategorySelect}
        />

        <Card 
          title="Items" 
          data={displayItems} 
          onEdit={handleEdit}
          onView={handleView}
          onDelete={(id) => confirmDelete(id, 'item')}
          selectedIds={[]}
          onToggleSelect={() => {}}
        />
      </div>

      {/* Add Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({ isOpen: false, itemId: null, type: null })}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-4">Are you sure you want to delete this {deleteConfirmation.type}? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setDeleteConfirmation({ isOpen: false, itemId: null, type: null })}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(deleteConfirmation.itemId)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setError(null);
        setFormData({});
      }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">
            {formData._id ? 'Edit' : 'Create'} {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
          </h2>
          {renderForm()}
          {error && (
            <div className="text-red-500 text-sm mb-2">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-green-300"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (formData._id ? 'Update' : 'Create')}
          </button>
        </form>
      </Modal>

      <Modal isOpen={!!viewDetails} onClose={() => {
        setViewDetails(null);
        setError(null);
      }}>
        {viewDetails && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold mb-4">{viewDetails.name} Details</h2>
            {Object.entries(viewDetails).map(([key, value]) => 
              key !== '_id' && key !== '__v' ? (
                <div key={key} className="flex">
                  <span className="font-semibold mr-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span>
                    {typeof value === 'boolean' 
                      ? (value ? 'Applicable' : 'Not Applicable')
                      : value}
                  </span>
                </div>
              ) : null
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;