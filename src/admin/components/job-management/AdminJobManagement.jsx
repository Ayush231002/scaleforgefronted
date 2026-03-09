import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminJobService } from '../../../services/admin/admin-job.service';

const AdminJobManagement = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await adminJobService.getAllJobs();
      if (response.success) {
        setJobs(response.data.jobs || []);
      } else {
        setError('Failed to fetch jobs');
      }
    } catch (err) {
      setError('Error fetching jobs: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const response = await adminJobService.toggleJobStatus(jobId, newStatus);
      if (response.success) {
        setSuccessMessage(`Job status changed to ${newStatus} successfully`);
        fetchJobs(); // Refresh the jobs list
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to update job status');
      }
    } catch (err) {
      setError('Error updating job status: ' + err.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await adminJobService.deleteJob(jobId);
        if (response.success) {
          setSuccessMessage('Job deleted successfully');
          fetchJobs(); // Refresh the jobs list
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setError('Failed to delete job');
        }
      } catch (err) {
        setError('Error deleting job: ' + err.message);
      }
    }
  };

  const handleJobCreated = () => {
    setSuccessMessage('Job created successfully!');
    fetchJobs();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    const { min, max, currency } = salary;
    return `${currency} ${min?.toLocaleString()} - ${max?.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B3C6]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Job Management</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/admin/jobs/create')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Create New Job
          </button>
          <button
            onClick={fetchJobs}
            className="bg-[#00B3C6] hover:bg-[#0095a8] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button onClick={() => setError('')} className="float-right text-red-500">&times;</button>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
          <button onClick={() => setSuccessMessage('')} className="float-right text-green-500">&times;</button>
        </div>
      )}

      {/* Jobs Table */}
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{job.title}</div>
                      <div className="text-sm text-gray-400">{job.employmentType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {job.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {job.location?.city ? `${job.location.city}, ${job.location.country}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatSalary(job.salary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(job.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* Status Change Dropdown */}
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job._id, e.target.value)}
                          className="bg-gray-700 text-gray-300 border border-gray-600 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="closed">Closed</option>
                        </select>
                        
                        {/* View Details Button */}
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="text-blue-400 hover:text-blue-300"
                          title="View Details"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="text-red-400 hover:text-red-300"
                          title="Delete Job"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobManagement;
