import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../../config';
import { API_ENDPOINTS } from '../../../config/routes';

const AdminEditCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
    order: 0,
    imageUrl: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch category details and categories for order reference
  useEffect(() => {
    fetchCategoryDetails();
    fetchCategories();
  }, [id]);

  const fetchCategoryDetails = async () => {
    setFetchLoading(true);
    try {
      // Since backend doesn't have GET by ID route, fetch all and find the specific one
      const response = await apiService.get(API_ENDPOINTS.SERVICE_CATEGORIES.GET_ALL);
      const categories = response.data?.data || response.data || [];
      const category = categories.find(cat => cat._id === id);
      
      if (category) {
        setFormData({
          name: category.name || '',
          description: category.description || '',
          isActive: category.isActive !== undefined ? category.isActive : true,
          order: category.order || 0,
          imageUrl: category.imageUrl || ''
        });
      } else {
        alert('Category not found');
        navigate('/admin/add-category');
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
      alert('Failed to fetch category details');
      navigate('/admin/add-category');
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(API_ENDPOINTS.SERVICE_CATEGORIES.GET_ALL);
      const activeCategories = response.data?.data || response.data || [];
      setCategories(activeCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const categoryData = {
        ...formData,
        order: formData.order ? parseInt(formData.order) : 0
      };

      const response = await apiService.put(
        API_ENDPOINTS.SERVICE_CATEGORIES.UPDATE.replace(':id', id),
        categoryData
      );
      
      alert('Category updated successfully');
      navigate('/admin/services');
    } catch (error) {
      console.error('Error updating category:', error);
      alert(error.response?.data?.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 ml-2">Loading category details...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Category</h1>
        <button
          onClick={() => navigate('/admin/services')}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Categories
        </button>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter category description"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Category order (lower number = higher priority)"
                min="0"
              />
              <p className="text-xs text-gray-400 mt-1">
                Current categories have orders from {Math.min(...categories.map(c => c.order || 0))} to {Math.max(...categories.map(c => c.order || 0))}
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL (optional)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter image URL or click to upload"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('imageUpload').click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128x128?text=Preview';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Active
                </span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/admin/services')}
              className="px-4 py-2 text-gray-300 bg-gray-600 hover:bg-gray-700 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCategoryPage;
