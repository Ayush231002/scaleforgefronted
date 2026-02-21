import React, { useState } from 'react';
import AdminServiceManagement from './AdminServiceManagement';
import AdminServiceCategoryManagement from '../category-management/AdminServiceCategoryManagement';

const AdminServiceManagementPage = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Admin <span className="text-orange-500">Dashboard</span></h1>
            <div className="text-sm text-gray-400">
              Service <span className="text-orange-500">Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Categories
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'services' && <AdminServiceManagement />}
        {activeTab === 'categories' && <AdminServiceCategoryManagement />}
      </div>
    </div>
  );
};

export default AdminServiceManagementPage;
