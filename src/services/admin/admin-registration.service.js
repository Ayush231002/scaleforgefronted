import { apiService } from '../../config/api.service.js';
import { API_ENDPOINTS } from '../../config/routes.js';

class AdminRegistrationService {
  
  // ==================== REGISTRATION SETTINGS METHODS ====================
  
  // Get registration status
  async getRegistrationStatus() {
    try {
      return await apiService.get(API_ENDPOINTS.REGISTRATION.GET_STATUS);
    } catch (error) {
      // If endpoint doesn't exist, return default enabled status
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        console.warn('Registration status endpoint not found, using default enabled status');
        return { data: { isRegisterEnabled: true } };
      }
      throw error;
    }
  }

  // Update registration status
  async updateRegistrationStatus(isEnabled) {
    try {
      return await apiService.put(API_ENDPOINTS.REGISTRATION.UPDATE_STATUS, { 
        isRegisterEnabled: isEnabled 
      });
    } catch (error) {
      // If endpoint doesn't exist, show appropriate message
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        console.warn('Registration status update endpoint not found');
        throw new Error('Registration settings are not available on server. Please contact administrator.');
      }
      throw error;
    }
  }
}

export const adminRegistrationService = new AdminRegistrationService();
export default adminRegistrationService;
