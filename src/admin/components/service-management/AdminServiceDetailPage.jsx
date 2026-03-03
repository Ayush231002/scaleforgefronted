import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminServiceService } from '../../../services/admin/admin-service.service.js';
import { adminCategoryService } from '../../../services/admin/admin-category.service.js';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Clock, 
  DollarSign, 
  Tag, 
  Package, 
  Star, 
  CheckCircle, 
  XCircle,
  Calendar,
  User
} from 'lucide-react';

const AdminServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const [serviceResponse, categoriesResponse] = await Promise.all([
        adminServiceService.getServiceById(id),
        adminCategoryService.getAllCategories()
      ]);
      
      const serviceData = serviceResponse.data;
      setService(serviceData);
      
      // Find category details
      const categories = categoriesResponse.data || [];
      const serviceCategory = categories.find(cat => 
        cat._id === serviceData.category?._id || cat._id === serviceData.category
      );
      setCategory(serviceCategory);
      
      setError('');
    } catch (err) {
      console.error('Error fetching service details:', err);
      setError(err.message || 'Failed to fetch service details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/edit-service/${service._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await adminServiceService.deleteService(service._id);
        alert('Service deleted successfully');
        navigate('/admin/services');
      } catch (err) {
        console.error('Error deleting service:', err);
        alert('Failed to delete service');
      }
    }
  };

  const handleToggleStatus = async () => {
    try {
      await adminServiceService.toggleServiceStatus(service._id, { 
        isActive: !service.isActive 
      });
      alert(`Service ${!service.isActive ? 'activated' : 'deactivated'} successfully`);
      fetchServiceDetails();
    } catch (err) {
      console.error('Error toggling service status:', err);
      alert('Failed to toggle service status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error</div>
          <p className="text-gray-300">{error}</p>
          <Button 
            onClick={() => navigate('/admin/services')} 
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Service not found</p>
          <Button 
            onClick={() => navigate('/admin/services')} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/admin/services"
                className="flex items-center text-gray-300 hover:text-white transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Services
              </Link>
              <h1 className="text-xl font-semibold text-white">Service Details</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Service
              </Button>
              <Button
                onClick={handleToggleStatus}
                variant={service.isActive ? "destructive" : "default"}
                className={service.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {service.isActive ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                {service.isActive ? 'Deactivate' : 'Activate'}
              </Button>
              <Button
                onClick={handleDelete}
                variant="ghost"
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header Card */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  {service.imageUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-32 h-32 rounded-lg object-cover border border-gray-600"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/128x128?text=Service';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                      <Badge variant={service.isActive ? "default" : "secondary"} className={
                        service.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    {service.isPopular && (
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-yellow-400 text-sm font-medium">Popular Service</span>
                      </div>
                    )}
                    <p className="text-gray-300 leading-relaxed">
                      {service.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Card */}
            {service.features && service.features.length > 0 && (
              <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Service Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Service ID:</span>
                    <span className="text-white font-mono text-sm">{service._id}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Display Order:</span>
                    <span className="text-white">{service.order || 0}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Created Date:</span>
                    <span className="text-white">
                      {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white">
                      {service.updatedAt ? new Date(service.updatedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Duration Card */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Pricing & Duration</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>Price:</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    ${service.price || 'Not set'}
                  </span>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration:</span>
                  </div>
                  <span className="text-white">
                    {service.duration || 'Not set'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Category Card */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Category
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {category ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white font-medium">{category.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        {category.description || 'No description available'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Status:</span>
                      <Badge variant={category.isActive ? "default" : "secondary"} className={
                        category.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Tag className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">No category assigned</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={handleEdit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Service
                </Button>
                <Button
                  onClick={() => navigate('/admin/services')}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceDetailPage;
