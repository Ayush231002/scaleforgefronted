/**
 * Services Index - Central export point for all service classes
 */

// Import all service classes
import { CategoryService } from './user/categoryService';
import { ServiceService } from './user/serviceService';

// Export all services
export {
  CategoryService,
  ServiceService
};

// Default export with all services
export default {
  CategoryService,
  ServiceService
};
