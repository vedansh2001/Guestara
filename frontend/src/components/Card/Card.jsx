import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, data, onEdit, onView, selectedIds, onToggleSelect, onDelete }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">{title}</h2>
        <div className="space-y-2">
          {data.map((item) => (
            <div 
              key={item._id} 
              className={`flex justify-between items-center p-2 rounded-md transition-colors 
                ${selectedIds.includes(item._id) ? 'bg-blue-100' : 'bg-gray-100 hover:bg-gray-200'}
              `}
            >
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(item._id)}
                  onChange={() => onToggleSelect(item._id)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  {item.description && <p className="text-sm text-gray-600">{item.description.slice(0, 50)}...</p>}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(item._id);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                >
                  View
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item);
                  }}
                  className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item._id);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onToggleSelect: PropTypes.func.isRequired,
  };

export default Card;