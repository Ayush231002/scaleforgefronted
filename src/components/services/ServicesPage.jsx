import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryService, ServiceService } from '../../services';
import LayoutWrapper from '../layout/LayoutWrapper';
import CompactServiceCategories from "../../admin/components/CompactServiceCategories";

export default function ServicesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  // Fetch categories and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories using centralized service
        const activeCategories = await CategoryService.getAllCategories();
        setCategories(activeCategories);
        
        // Fetch services using centralized service
        const activeServices = await ServiceService.getAllServices();
        console.log('All services:', activeServices);
        setServices(activeServices);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category selection from URL parameters
  useEffect(() => {
    const categoryId = searchParams.get('category');
    console.log('Category ID from URL:', categoryId);
    console.log('Available categories:', categories);
    
    if (categoryId && categories.length > 0) {
      const category = categories.find(cat => cat._id === categoryId);
      console.log('Found category:', category);
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, categories]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category: category._id });
    } else {
      setSearchParams({});
    }
  };

  // Filter services based on selected category and active status
  const filteredServices = selectedCategory
    ? services.filter(service => {
        console.log('Filtering service:', service.name, 'Category:', service.category, 'Selected:', selectedCategory._id, 'Active:', service.isActive);
        return service.isActive === true && (
          service.category?._id === selectedCategory._id || service.category === selectedCategory._id
        );
      })
    : services.filter(service => {
        console.log('Filtering service (no category):', service.name, 'Active:', service.isActive);
        return service.isActive === true;
      });

  // Use only dynamic services from API
  const displayServices = filteredServices;

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B3C6]"></div>
              <p className="mt-4 text-gray-300">Loading services...</p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      {/* Compact Service Categories Header */}
      <CompactServiceCategories />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-bold text-white tracking-wide">
            Provided <span className="text-[#00B3C6]">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reliable, scalable, and secure technology solutions including cloud infrastructure, DevOps pipelines, data analytics, and modern web applications
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 h-full hover:transform hover:scale-105 transition-all duration-300">
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color || 'from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{service.icon || '⚙️'}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{service.title || service.name}</h3>

                {/* Description */}
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {service.description ? (
                    <>
                      {service.description.split(' ').slice(0, 20).join(' ')}...
                    </>
                  ) : (
                    <>
                      Professional service with exceptional quality and support
                    </>
                  )}
                </p>

                {/* Features */}
                {service.features && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <button 
                  onClick={() => navigate(`/services/${service._id}`)}
                  className={`w-full bg-gradient-to-r ${service.color || 'from-blue-500 to-blue-600'} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Services Found */}
        {displayServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {selectedCategory ? 'No Services in This Category' : 'No Services Available'}
            </h3>
            <p className="text-gray-400">
              {selectedCategory 
                ? 'Try selecting a different category or check back later.'
                : 'Check back later for new services.'
              }
            </p>
            {selectedCategory && (
              <button
                onClick={() => handleCategoryClick(null)}
                className="mt-4 px-6 py-2 bg-[#00B3C6] text-white rounded-lg hover:bg-[#00B3C6] transition-colors"
              >
                View All Services
              </button>
            )}
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}
