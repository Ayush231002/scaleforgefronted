import React from 'react';
import { Link } from 'react-router-dom';

const ConsultantManagement = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Consultant Management</h1>
      </div>

      {/* Management Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Enquiries */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">User <span className="text-[#00B3C6]"> Enquiries</span> </h3>
              <p className="text-gray-400 text-sm">Manage user <span className="text-[#00B3C6]"> consultation</span> requests</p>
            </div>
          </div>
          <Link
            to="/admin/consultant/enquiries"
            className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Enquiries
          </Link>
        </div>

        {/* Consultation Requests */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
          <div className="flex items-center mb-4">
            <div className="bg-green-600 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Consultation Requests</h3>
              <p className="text-gray-400 text-sm">View and manage consultation bookings</p>
            </div>
          </div>
          <Link
            to="/admin/consultant/requests"
            className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            View Requests
          </Link>
        </div>

        {/* Consultant Schedule */}
        <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
          <div className="flex items-center mb-4">
            <div className="bg-purple-600 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Schedule</h3>
              <p className="text-gray-400 text-sm">Manage consultant schedules</p>
            </div>
          </div>
          <Link
            to="/admin/consultant/schedule"
            className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Manage Schedule
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Pending Enquiries</h3>
          <p className="text-3xl font-bold text-blue-400">12</p>
          <p className="text-gray-400 text-sm mt-1">Awaiting response</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Today's Consultations</h3>
          <p className="text-3xl font-bold text-green-400">8</p>
          <p className="text-gray-400 text-sm mt-1">Scheduled for today</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Completed This Week</h3>
          <p className="text-3xl font-bold text-purple-400">24</p>
          <p className="text-gray-400 text-sm mt-1">Successfully completed</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultantManagement;
