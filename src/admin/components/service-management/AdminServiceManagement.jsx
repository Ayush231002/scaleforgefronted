import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminServiceService } from '../../../services/admin/admin-service.service.js';
import { adminCategoryService } from '../../../services/admin/admin-category.service.js';

const AdminServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
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

  // Fetch services and categories
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch services and categories in parallel
      const [servicesResponse, categoriesResponse] = await Promise.all([
        adminServiceService.getAllServices(),
        adminCategoryService.getAllCategories()
      ]);
      
      const activeServices = servicesResponse.data || [];
      const activeCategories = categoriesResponse.data || [];
      
      setServices(activeServices);
      setCategories(activeCategories);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const serviceData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        price: formData.price ? parseFloat(formData.price) : 0,
        duration: formData.duration || '',
        order: formData.order ? parseInt(formData.order) : 0
      };

      if (editingService) {
        // Update service
        await adminServiceService.updateService(editingService._id, serviceData);
        alert('Service updated successfully');
      } else {
        // Create new service
        await adminServiceService.createService(serviceData);
        alert('Service created successfully');
      }
      
      setShowModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      alert(error.response?.data?.message || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete service
  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await adminServiceService.deleteService(serviceId);
        alert('Service deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  // Handle toggle service status
  const toggleServiceStatus = async (serviceId, currentStatus) => {
    try {
      await adminServiceService.toggleServiceStatus(serviceId, { isActive: !currentStatus });
      alert(`Service ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      fetchData();
    } catch (error) {
      console.error('Error toggling service status:', error);
      alert('Failed to toggle service status');
    }
  };

  // Handle edit service
  const handleEdit = (service) => {
    navigate(`/admin/edit-service/${service._id}`);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
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
    setEditingService(null);
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
    const features = e.target.value.split(',').map(f => f.trim()).filter(f => f !== '');
    setFormData(prev => ({
      ...prev,
      features
    }));
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Service<span className="text-orange-500"> Management</span></h1>
        <button
          onClick={() => navigate('/admin/add-service')}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Add New Service
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      )}

      {/* Services Table */}
      {!loading && (
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        {service.imageUrl && (
                          <img
                            src={service.imageUrl}
                            alt={service.name}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40x40?text=Service';
                            }}
                          />
                        )}
                        <span className="text-sm font-medium text-white truncate">
                          {service.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">
                        {service.category?.name || 'No category'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">
                        ${service.price ? `$${service.price}` : 'Not set'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">
                        {service.duration || 'Not set'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleServiceStatus(service._id, service.isActive)}
                          className={`text-sm font-medium px-3 py-1 rounded ${
                            service.isActive
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {service.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-5 z-40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter service name"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter service description"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter service price"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., '2 weeks', '1 month', '3 days'"
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Features (comma-separated)
                      </label>
                      <textarea
                        name="features"
                        value={formData.features.join(', ')}
                        onChange={handleFeaturesChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                        <span className="ml-2 text-sm text-gray-700">
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
                        <span className="ml-2 text-sm text-gray-700">
                          Popular
                        </span>
                      </label>
                    </div>

                    {/* Order */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Service order (lower number = higher priority)"
                        min="0"
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL (optional)
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/128x128?text=Preview';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Modal Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          resetForm();
                        }}
                        className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : (editingService ? 'Update' : 'Create')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminServiceManagement;
