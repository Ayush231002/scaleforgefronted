import React, { useState } from 'react';
import AdminJobManagement from './AdminJobManagement';

const AdminJobManagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Admin <span className="text-[#00B3C6]">Dashboard</span></h1>
            <div className="text-sm text-gray-400">
              Job <span className="text-[#00B3C6]">Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <AdminJobManagement />
      </div>
    </div>
  );
};

export default AdminJobManagementPage;
