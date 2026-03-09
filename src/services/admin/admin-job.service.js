import { apiService } from '../../config/api.service.js';
import { API_ENDPOINTS } from '../../config/routes.js';

class AdminJobService {
  
  // ==================== JOB MANAGEMENT METHODS ====================
  
  // Get all jobs
  async getAllJobs() {
    return apiService.get(API_ENDPOINTS.JOBS.GET_ALL);
  }

  // Get job by ID
  async getJobById(jobId) {
    try {
      // Since backend doesn't have GET by ID route for jobs, fetch all and find the specific one
      const response = await this.getAllJobs();
      const jobs = response.data?.data || response.data || [];
      const job = jobs.find(j => j._id === jobId);
      
      if (job) {
        return {
          success: true,
          data: job
        };
      } else {
        return {
          success: false,
          message: 'Job not found'
        };
      }
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      throw error;
    }
  }

  // Create new job
  async createJob(jobData) {
    return apiService.post(API_ENDPOINTS.JOBS.CREATE, jobData);
  }

  // Update job
  async updateJob(jobId, jobData) {
    return apiService.put(API_ENDPOINTS.JOBS.UPDATE.replace(':id', jobId), jobData);
  }

  // Delete job
  async deleteJob(jobId) {
    return apiService.delete(API_ENDPOINTS.JOBS.DELETE.replace(':id', jobId));
  }

  // Toggle job status (draft, published, closed)
  async toggleJobStatus(jobId, status) {
    return apiService.patch(API_ENDPOINTS.JOBS.TOGGLE_STATUS.replace(':id', jobId), { status });
  }

  // Get active jobs only
  async getActiveJobs() {
    return apiService.get(API_ENDPOINTS.JOBS.GET_ACTIVE_JOBS);
  }

  // Get jobs by status
  async getJobsByStatus(status) {
    return apiService.get(API_ENDPOINTS.JOBS.GET_JOBS_BY_STATUS.replace(':status', status));
  }
}

export const adminJobService = new AdminJobService();
export default adminJobService;
