import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ServiceService } from '../../services';
import LayoutWrapper from '../layout/LayoutWrapper';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      // Use centralized ServiceService to get service by ID
      const foundService = await ServiceService.getServiceById(id);
      
      if (foundService && foundService.isActive) {
        setService(foundService);
      } else {
        setError('Service not found or inactive');
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
      setError('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleConsultation = () => {
    // Navigate to consultation page with service pre-selected
    navigate('/consultation', { state: { serviceId: id, serviceName: service?.name } });
  };

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">Loading service details...</p>
        </div>
      </LayoutWrapper>
    );
  }

  if (error) {
    return (
      <LayoutWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Services
            </button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  if (!service) {
    return (
      <LayoutWrapper>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">�</div>
            <h3 className="text-xl font-semibold text-white mb-2">Service Unavailable</h3>
            <p className="text-gray-300 mb-4">
              {error === 'Service not found or inactive' 
                ? 'This service is currently inactive or has been removed.'
                : 'The service you\'re looking for doesn\'t exist.'
              }
            </p>
            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Services
            </button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
        {/* Header */}
        <div className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate('/services')}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
            {/* Service Header */}
            <div className="relative h-64 bg-gradient-to-r from-blue-600 to-blue-700">
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
                  <p className="text-xl opacity-90">{service.category?.name || 'Service'}</p>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {service.description || 'No description available.'}
                    </p>
                  </div>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Duration */}
                  {service.duration && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">Duration</h2>
                      <p className="text-gray-300">{service.duration}</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1">
                  {/* Price */}
                  <div className="bg-gray-900/50 rounded-lg p-6 mb-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-2">Price</h3>
                    <p className="text-3xl font-bold text-blue-400">
                      ${service.price || 'Contact for pricing'}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-900/50 rounded-lg p-6 mb-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-2">Availability</h3>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.isActive ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  {/* Popular Badge */}
                  {service.isPopular && (
                    <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-6 mb-6">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-yellow-300 font-medium">Popular Service</span>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={handleConsultation}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Request Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
