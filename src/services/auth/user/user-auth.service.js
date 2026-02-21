import { apiService } from '../../../config/api.service.js';
import { API_ENDPOINTS } from '../../../config/routes.js';

class UserAuthService {
  
  // ==================== USER AUTH METHODS ====================
  
  // User registration
  async register(userData) {
    return apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  // User login
  async login(credentials) {
    return apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  // Get current user
  async getCurrentUser() {
    return apiService.get(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
  }

  // Change password
  async changePassword(passwordData) {
    return apiService.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
  }

  // Logout
  async logout() {
    return apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  // Forgot password
  async forgotPassword(email) {
    return apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  // Reset password
  async resetPassword(resetData) {
    return apiService.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
  }
}

export const userAuthService = new UserAuthService();
export default userAuthService;
