// API Configuration
const API_CONFIG = {
  // Base URL for backend API
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  
  // API endpoints
  ENDPOINTS: {
    // User endpoints
    AUTH: {
      LOGIN: '/users/login',
      REGISTER: '/users/register',
      LOGOUT: '/users/logout',
      CHANGE_PASSWORD: '/users/change-password',
      GET_CURRENT_USER: '/users/current-user',
      FORGOT_PASSWORD: '/users/forgot-password',
      RESET_PASSWORD: '/users/reset-password',
    },
    
    // Admin endpoints
    ADMIN: {
      LOGIN: '/users/login',
      REGISTER: '/users/register',
      LOGOUT: '/users/logout',
      CHANGE_PASSWORD: '/users/change-password',
      GET_CURRENT_USER: '/users/current-user',
      FORGOT_PASSWORD: '/users/forgot-password', // routes not exist
      RESET_PASSWORD: '/users/reset-password', /// route not exist
      GET_ALL_USERS: '/users/users',           // route not exist
      UPDATE_USER_STATUS: '/users/:userId/status', // route not exist
      DELETE_USER: '/users/:userId', // route not exist
      GET_SYSTEM_STATS: '/users/stats', // route not exist
    },
    
    // Registration settings
    REGISTRATION: {
      GET_STATUS: '/registration/status',
      UPDATE_STATUS: '/registration/status',
    },
    
    // Service endpoints
    SERVICES: {
      GET_ALL: '/service/all-services',
      GET_BY_ID: '/service/service/:id',
      CREATE: '/service/create-service',
      UPDATE: '/service/update-service/:id',
      DELETE: '/service/delete-service/:id',
      TOGGLE_STATUS: '/service/toggle-service/:id',
    },
    
    // Service category endpoints
    SERVICE_CATEGORIES: {
      GET_ALL: '/service/all-categories',
      CREATE: '/service/create-category',
      UPDATE: '/service/update-category/:id',
      DELETE: '/service/delete-category/:id',
      TOGGLE_STATUS: '/service/active-deactive-category/:id',
    },
    
    // Consultation endpoints
    CONSULTATION: {
      CREATE: '/consultation/create',
      GET_ALL: '/consultation/all',
      GET_BY_ID: '/consultation/:id',
      UPDATE_STATUS: '/consultation/:id/status',
      DELETE: '/consultation/:id',
    },
    
    // Health check
    HEALTH: '/healthcheck',
  }
};

export const { BASE_URL: API_BASE_URL, ENDPOINTS: API_ENDPOINTS } = API_CONFIG;
export default API_CONFIG;
