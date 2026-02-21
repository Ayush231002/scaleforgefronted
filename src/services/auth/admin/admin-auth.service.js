import { apiService } from '../../../config/api.service.js';
import { API_ENDPOINTS } from '../../../config/routes.js';

class AdminAuthService {
  
  // ==================== ADMIN AUTH METHODS ====================
  
  // Admin register
  async register(userData) {
    return apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  // Admin login (uses same endpoint as user login)
  async login(credentials) {
    return apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  // Get current admin (uses same endpoint as user)
  async getCurrentAdmin() {
    return apiService.get(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
  }

  // Admin logout (uses same endpoint as user)
  async logout() {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  // Change admin password (uses same endpoint as user)
  async changePassword(passwordData) {
    return apiService.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
  }

  // Forgot password
  async forgotPassword(email) {
    return apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  // Reset password
  async resetPassword(resetData) {
    return apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
  }

  // ==================== ADMIN MANAGEMENT METHODS ====================
  
  // Get all users
  async getAllUsers() {
    return apiService.get(API_ENDPOINTS.ADMIN.GET_ALL_USERS);
  }

  // Update user status
  async updateUserStatus(userId, status) {
    return apiService.put(API_ENDPOINTS.ADMIN.UPDATE_USER_STATUS.replace(':userId', userId), { status });
  }

  // Delete user
  async deleteUser(userId) {
    return apiService.delete(API_ENDPOINTS.ADMIN.DELETE_USER.replace(':userId', userId));
  }

  // Get system stats
  async getSystemStats() {
    return apiService.get(API_ENDPOINTS.ADMIN.GET_SYSTEM_STATS);
  }
}

export const adminAuthService = new AdminAuthService();
export default adminAuthService;
