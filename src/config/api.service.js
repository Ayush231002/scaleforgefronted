import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './routes.js';

class ApiService {
  constructor() {
    // Create axios instance with base configuration
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add request interceptor to include auth token
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('adminToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        console.error('Error response:', error.response);
        console.error('Error data:', error.response?.data);
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          let errorMessage = `HTTP error! status: ${error.response.status}`;
          
          if (error.response.data) {
            if (typeof error.response.data === 'string') {
              errorMessage = error.response.data;
            } else if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data.error) {
              errorMessage = error.response.data.error;
            } else if (error.response.data.msg) {
              errorMessage = error.response.data.msg;
            } else {
              // Try to stringify the error data safely
              try {
                errorMessage = JSON.stringify(error.response.data);
              } catch (stringifyError) {
                errorMessage = `Server error: ${error.response.status}`;
              }
            }
          }
          
          throw new Error(errorMessage);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error('Network error: No response received');
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(error.message || 'Request setup error');
        }
      }
    );
  }

  // Generic HTTP methods
  async get(endpoint, config = {}) {
    const response = await this.axios.get(endpoint, config);
    return response.data;
  }

  async post(endpoint, data = {}, config = {}) {
    const response = await this.axios.post(endpoint, data, config);
    return response.data;
  }

  async put(endpoint, data = {}, config = {}) {
    const response = await this.axios.put(endpoint, data, config);
    return response.data;
  }

  async patch(endpoint, data = {}, config = {}) {
    const response = await this.axios.patch(endpoint, data, config);
    return response.data;
  }

  async delete(endpoint, config = {}) {
    const response = await this.axios.delete(endpoint, config);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
