import { apiService } from '../config';
import { API_ENDPOINTS } from '../config/routes';

/**
 * Service Service - Single source of truth for all service-related API methods
 */
class ServiceService {
  /**
   * Get all active services
   * @returns {Promise} - List of active services
   */
  static async getAllServices() {
    try {
      const response = await apiService.get(API_ENDPOINTS.SERVICES.GET_ALL);
      const allServices = response.data?.data || response.data || [];
      
      // Filter only active services and sort by order
      const activeServices = allServices
        .filter(service => service.isActive === true)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return activeServices;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  /**
   * Get service by ID
   * @param {string} serviceId - Service ID
   * @returns {Promise} - Service details
   */
  static async getServiceById(serviceId) {
    try {
      // Fix the endpoint path - replace :id with actual serviceId
      const endpoint = API_ENDPOINTS.SERVICES.GET_BY_ID.replace(':id', serviceId);
      const response = await apiService.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  }

  /**
   * Create new service
   * @param {Object} serviceData - Service data
   * @returns {Promise} - Created service
   */
  static async createService(serviceData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.SERVICES.CREATE, serviceData);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }

  /**
   * Update service
   * @param {string} serviceId - Service ID
   * @param {Object} serviceData - Updated service data
   * @returns {Promise} - Updated service
   */
  static async updateService(serviceId, serviceData) {
    try {
      // Fix the endpoint path - replace :id with actual serviceId
      const endpoint = API_ENDPOINTS.SERVICES.UPDATE.replace(':id', serviceId);
      const response = await apiService.put(endpoint, serviceData);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  /**
   * Delete service
   * @param {string} serviceId - Service ID
   * @returns {Promise} - Delete response
   */
  static async deleteService(serviceId) {
    try {
      // Fix the endpoint path - replace :id with actual serviceId
      const endpoint = API_ENDPOINTS.SERVICES.DELETE.replace(':id', serviceId);
      const response = await apiService.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }

  /**
   * Get services by category
   * @param {string} categoryId - Category ID
   * @returns {Promise} - Services in the specified category
   */
  static async getServicesByCategory(categoryId) {
    try {
      const response = await apiService.get(`${API_ENDPOINTS.SERVICES.GET_BY_CATEGORY}/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching services by category:', error);
      throw error;
    }
  }

  /**
   * Get services with pagination
   * @param {Object} params - Pagination parameters
   * @returns {Promise} - Paginated services
   */
  static async getServicesWithPagination(params = {}) {
    try {
      const response = await apiService.get(API_ENDPOINTS.SERVICES.GET_ALL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching services with pagination:', error);
      throw error;
    }
  }

  /**
   * Search services
   * @param {string} query - Search query
   * @returns {Promise} - Search results
   */
  static async searchServices(query) {
    try {
      const response = await apiService.get(`${API_ENDPOINTS.SERVICES.SEARCH}?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error searching services:', error);
      throw error;
    }
  }
}

export default ServiceService;
