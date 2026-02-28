import { apiService } from '../../config/api.service.js';
import { API_ENDPOINTS } from '../../config/routes.js';

class AdminRegistrationFormEnableDisableApiService {
  
  // Get registration status
  async getRegistrationStatus() {
    return apiService.get(API_ENDPOINTS.REGISTRATION.GET_STATUS);
  }

  // Update registration status (admin only)
  async updateRegistrationStatus(isRegisterEnabled) {
    return apiService.put(API_ENDPOINTS.REGISTRATION.UPDATE_STATUS, { isRegisterEnabled });
  }
}

export const adminRegistrationFormEnableDisableApiService = new AdminRegistrationFormEnableDisableApiService();
export default adminRegistrationFormEnableDisableApiService;
