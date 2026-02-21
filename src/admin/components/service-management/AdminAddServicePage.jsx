import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../config';
import { API_ENDPOINTS } from '../../../config/routes';

const AdminAddServicePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    features: [],
    isActive: true,
    isPopular: false,
    order: 0,
    imageUrl: ''
  });
  const navigate = useNavigate();

  // Fetch categories for dropdown
  useEffect(() => {
    fetchCategories();
  }, []);

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

      // Clean and validate the data with proper serialization
      const cleanedData = {
        name: String(formData.name || '').trim(),
        description: String(formData.description || '').trim(),
        category: String(formData.category || '').trim(),
        price: Number(formData.price) || 0,
        duration: String(formData.duration || '').trim(),
        features: Array.isArray(formData.features) 
          ? formData.features
              .filter(f => f && typeof f === 'string' && f.trim() !== '')
              .map(f => String(f).trim())
              .filter(f => f.length <= 200) // Ensure max length
          : [],
        isActive: Boolean(formData.isActive),
        isPopular: Boolean(formData.isPopular),
        order: Number(formData.order) || 0,
        imageUrl: String(formData.imageUrl || '').trim()
      };

      // Validate required fields
      if (!cleanedData.name) {
        alert('Service name is required');
        setLoading(false);
        return;
      }
      if (!cleanedData.description) {
        alert('Service description is required');
        setLoading(false);
        return;
      }
      if (!cleanedData.category) {
        alert('Service category is required');
        setLoading(false);
        return;
      }

      // Debug: Check if data is serializable
      try {
        JSON.stringify(cleanedData);
      } catch (jsonError) {
        console.error('JSON Serialization Error:', jsonError);
        console.error('Problematic data:', cleanedData);
        alert('Invalid data format. Please check all fields.');
        setLoading(false);
        return;
      }

      console.log('Submitting service data:', JSON.stringify(cleanedData, null, 2));

      const response = await apiService.post(API_ENDPOINTS.SERVICES.CREATE, cleanedData);
      
      alert('Service created successfully');
      navigate('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          'Failed to save service';
      alert(errorMessage);
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle features change
  const handleFeaturesChange = (e) => {
    const inputValue = String(e.target.value || '');
    const features = inputValue
      .split(',')
      .map(f => String(f).trim())
      .filter(f => f !== '')
      .filter(f => f.length <= 200); // Ensure max length
    
    setFormData(prev => ({
      ...prev,
      features
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/services')}
                className="text-gray-400 hover:text-white transition-colors mr-4"
              >
                ← Back to Services
              </button>
              <h1 className="text-2xl font-bold text-white">Add New Service</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Service Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Enter service name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Enter service description"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Enter service price"
                min="0"
                step="0.01"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="e.g., '2 weeks', '1 month', '3 days'"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Features (comma-separated)
              </label>
              <textarea
                name="features"
                value={formData.features.join(', ')}
                onChange={handleFeaturesChange}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="e.g., 'Feature 1, Feature 2, Feature 3'"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      isActive: e.target.checked
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Active
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      isPopular: e.target.checked
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">
                  Popular
                </span>
              </label>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Order
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder="Service order (lower number = higher priority)"
                min="0"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image URL (optional)
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 bg-gray-700 border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
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

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={() => navigate('/admin/services')}
                className="px-4 py-2 text-gray-300 bg-gray-600 hover:bg-gray-700 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Creating...' : 'Create Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddServicePage;
