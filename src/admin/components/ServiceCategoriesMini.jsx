import React, { useState, useEffect } from 'react';
import { adminCategoryService } from '../../services/admin/admin-category.service.js';

const ServiceCategoriesMini = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminCategoryService.getAllCategories();
        
        // Extract data from response
        const allCategories = response.data || response;
        
        // Filter only active categories and sort by order
        const activeCategories = allCategories
          .filter(category => category.isActive === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .slice(0, 6); // Limit to 6 categories for dropdown
        
        setCategories(activeCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="col-span-2 text-center py-4">
        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <p className="text-xs text-gray-500 mt-1">Loading...</p>
      </div>
    );
  }

  // No categories found
  if (categories.length === 0) {
    return (
      <div className="col-span-2 text-center py-4">
        <p className="text-xs text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <div
          key={category._id}
          className="group cursor-pointer rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 p-2"
          onClick={() => onCategoryClick && onCategoryClick(category)}
        >
          <div className="flex items-center space-x-2">
            {/* Category Image */}
            <div className="flex-shrink-0 w-8 h-8 rounded overflow-hidden bg-gray-100">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/32x32?text=SC';
                }}
              />
            </div>
            
            {/* Category Name */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {category.name}
              </p>
              {category.description && (
                <p className="text-xs text-gray-500 truncate">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServiceCategoriesMini;
