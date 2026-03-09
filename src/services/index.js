/**
 * Services Index - Central export point for all service classes
 */

// Import all service classes
import { CategoryService } from './user/categoryService';
import { ServiceService } from './user/serviceService';
import { adminJobService } from './admin/admin-job.service';

// Export all services
export {
  CategoryService,
  ServiceService,
  adminJobService
};

// Default export with all services
export default {
  CategoryService,
  ServiceService,
  adminJobService
};
