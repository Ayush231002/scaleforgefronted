import { apiService } from '../config';
import { API_ENDPOINTS } from '../config/routes';

/**
 * Category Service - Single source of truth for all category-related API methods
 */
class CategoryService {
  /**
   * Get all active categories
   * @returns {Promise} - List of active categories
   */
  static async getAllCategories() {
    try {
      const response = await apiService.get(API_ENDPOINTS.SERVICE_CATEGORIES.GET_ALL);
      const allCategories = response.data?.data || response.data || [];
      
      // Filter only active categories and sort by order
      const activeCategories = allCategories
        .filter(category => category.isActive === true)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return activeCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Create new category
   * @param {Object} categoryData - Category data
   * @returns {Promise} - Created category
   */
  static async createCategory(categoryData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.SERVICE_CATEGORIES.CREATE, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  /**
   * Update category
   * @param {string} categoryId - Category ID
   * @param {Object} categoryData - Updated category data
   * @returns {Promise} - Updated category
   */
  static async updateCategory(categoryId, categoryData) {
    try {
      // Fix the endpoint path - replace :id with actual categoryId
      const endpoint = API_ENDPOINTS.SERVICE_CATEGORIES.UPDATE.replace(':id', categoryId);
      const response = await apiService.put(endpoint, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  /**
   * Delete category
   * @param {string} categoryId - Category ID
   * @returns {Promise} - Delete response
   */
  static async deleteCategory(categoryId) {
    try {
      // Fix the endpoint path - replace :id with actual categoryId
      const endpoint = API_ENDPOINTS.SERVICE_CATEGORIES.DELETE.replace(':id', categoryId);
      const response = await apiService.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  /**
   * Get categories with pagination
   * @param {Object} params - Pagination parameters
   * @returns {Promise} - Paginated categories
   */
  static async getCategoriesWithPagination(params = {}) {
    try {
      const response = await apiService.get(API_ENDPOINTS.SERVICE_CATEGORIES.GET_ALL, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories with pagination:', error);
      throw error;
    }
  }
}

export default CategoryService;
