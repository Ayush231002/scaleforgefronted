import { apiService } from '../../config/api.service.js';
import { API_ENDPOINTS } from '../../config/routes.js';

class AdminServiceService {
  
  // ==================== SERVICE MANAGEMENT METHODS ====================
  
  // Get all services
  async getAllServices() {
    return apiService.get(API_ENDPOINTS.SERVICES.GET_ALL);
  }

  // Get service by ID
  async getServiceById(serviceId) {
    return apiService.get(API_ENDPOINTS.SERVICES.GET_BY_ID.replace(':id', serviceId));
  }

  // Create new service
  async createService(serviceData) {
    return apiService.post(API_ENDPOINTS.SERVICES.CREATE, serviceData);
  }

  // Update service
  async updateService(serviceId, serviceData) {
    return apiService.put(API_ENDPOINTS.SERVICES.UPDATE.replace(':id', serviceId), serviceData);
  }

  // Delete service
  async deleteService(serviceId) {
    return apiService.delete(API_ENDPOINTS.SERVICES.DELETE.replace(':id', serviceId));
  }

  // Toggle service status
  async toggleServiceStatus(serviceId, statusData) {
    return apiService.patch(API_ENDPOINTS.SERVICES.TOGGLE_STATUS.replace(':id', serviceId), statusData);
  }

  // ==================== SERVICE CATEGORY METHODS ====================
  
  // Get all service categories
  async getAllCategories() {
    return apiService.get(API_ENDPOINTS.SERVICE_CATEGORIES.GET_ALL);
  }

  // Get category by ID
  async getCategoryById(categoryId) {
    return apiService.get(API_ENDPOINTS.SERVICE_CATEGORIES.GET_BY_ID?.replace(':id', categoryId) || `/service/category/${categoryId}`);
  }

  // Create new category
  async createCategory(categoryData) {
    return apiService.post(API_ENDPOINTS.SERVICE_CATEGORIES.CREATE, categoryData);
  }

  // Update category
  async updateCategory(categoryId, categoryData) {
    return apiService.put(API_ENDPOINTS.SERVICE_CATEGORIES.UPDATE.replace(':id', categoryId), categoryData);
  }

  // Delete category
  async deleteCategory(categoryId) {
    return apiService.delete(API_ENDPOINTS.SERVICE_CATEGORIES.DELETE.replace(':id', categoryId));
  }

  // Toggle category status
  async toggleCategoryStatus(categoryId) {
    return apiService.patch(API_ENDPOINTS.SERVICE_CATEGORIES.TOGGLE_STATUS.replace(':id', categoryId));
  }
}

export const adminServiceService = new AdminServiceService();
export default adminServiceService;
