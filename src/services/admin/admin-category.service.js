import { apiService } from '../../config/api.service.js';
import { API_ENDPOINTS } from '../../config/routes.js';

class AdminCategoryService {
  
  // ==================== CATEGORY MANAGEMENT METHODS ====================
  
  // Get all categories
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

export const adminCategoryService = new AdminCategoryService();
export default adminCategoryService;
