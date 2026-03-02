import React, { useState, useEffect } from 'react';
import { adminCategoryService } from '../../services/admin/admin-category.service.js';
import "../../styles/ServiceCategories.css";

const ServiceCategories = ({ onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await adminCategoryService.getAllCategories();
        
        // Extract data from response
        const allCategories = response.data || response;
        
        // Filter only active categories and sort by order
        const activeCategories = allCategories
          .filter(category => category.isActive === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setCategories(activeCategories);
        setError(null);
      } catch (err) {
        setError('Failed to load categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      // Default behavior - navigate to services page
      console.log('Navigate to services for category:', category);
      // You can use React Router here:
      // navigate(`/services?category=${category._id}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="service-categories-container min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="service-categories-container min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No categories found
  if (categories.length === 0) {
    return (
      <div className="service-categories-container min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📁</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Categories Available</h2>
          <p className="text-gray-600">Check back later for new service categories.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-categories-container min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Service Categories
            </h1>
            <p className="text-gray-600">
              Choose from our wide range of professional services
            </p>
          </div>
        </div>
      </div>

      {/* Categories Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold">{categories.length}</span> categories available
          </p>
          {/* Optional: Add search or filter here */}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="category-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="category-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleCategoryClick(category)}
            >
              {/* Category Image */}
              <div className="category-image-container relative overflow-hidden rounded-t-lg">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-image w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* Badge for order/featured */}
                {category.order === 0 && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>

              {/* Category Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {category.name}
                </h3>
                
                {category.description && (
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {category.description}
                  </p>
                )}

                {/* View Services Button */}
                <button 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    handleCategoryClick(category);
                  }}
                >
                  View Services
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 ElvoraGlobal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
