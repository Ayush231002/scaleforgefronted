import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateJobForm from './CreateJobForm';

const CreateJobPage = () => {
  const navigate = useNavigate();

  const handleJobCreated = () => {
    navigate('/admin/jobs');
  };

  const handleCancel = () => {
    navigate('/admin/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Admin <span className="text-[#00B3C6]">Dashboard</span></h1>
            <div className="text-sm text-gray-400">
              Create <span className="text-[#00B3C6]">New Job</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <CreateJobForm
          onJobCreated={handleJobCreated}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CreateJobPage;
