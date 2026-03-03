import { apiService } from '../../config/api.service.js';
import { API_ENDPOINTS } from '../../config/routes.js';

class JobService {
  async getActiveJobs(page = 1, limit = 10) {
    try {
      const response = await apiService.get(API_ENDPOINTS.JOBS.GET_ACTIVE_JOBS, {
        params: { page, limit }
      });
      return response;
    } catch (error) {
      console.error('Error fetching active jobs:', error);
      throw error;
    }
  }

  async getJobById(jobId) {
    try {
      const response = await apiService.get(API_ENDPOINTS.JOBS.GET_JOB_BY_ID.replace(':id', jobId));
      return response;
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      throw error;
    }
  }
}

export const jobService = new JobService();
export default jobService;
