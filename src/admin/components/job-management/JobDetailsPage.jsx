import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminJobService } from '../../../services/admin/admin-job.service';

const JobDetailsPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await adminJobService.getJobById(id);
      if (response.success && response.data) {
        setJob(response.data);
      } else {
        setError('Job not found');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await adminJobService.toggleJobStatus(id, newStatus);
      if (response.success) {
        setJob(prev => ({ ...prev, status: newStatus }));
        alert('Job status updated successfully');
      } else {
        setError('Failed to update job status');
      }
    } catch (err) {
      setError('Error updating job status: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await adminJobService.deleteJob(id);
        if (response.success) {
          alert('Job deleted successfully');
          navigate('/admin/jobs');
        } else {
          setError('Failed to delete job');
        }
      } catch (err) {
        setError('Error deleting job: ' + err.message);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B3C6]"></div>
        <p className="text-gray-600 ml-3">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
          <p className="font-medium">{error}</p>
          <button
            onClick={() => navigate('/admin/jobs')}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg max-w-md">
          <p className="font-medium">Job not found</p>
          <button
            onClick={() => navigate('/admin/jobs')}
            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Admin <span className="text-[#00B3C6]">Dashboard</span></h1>
            <div className="text-sm text-gray-400">
              Job <span className="text-[#00B3C6]">Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/jobs')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Jobs
          </button>
        </div>

        {/* Job Details Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Job Header */}
          <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <span className="text-gray-300 text-sm">Priority: {job.priority}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Edit Job
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Delete Job
                </button>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Basic Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Department:</span>
                    <p className="text-white font-medium">{job.department || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Employment Type:</span>
                    <p className="text-white font-medium">{job.employmentType || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Posted Date:</span>
                    <p className="text-white font-medium">{formatDate(job.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Application Deadline:</span>
                    <p className="text-white font-medium">{formatDate(job.applicationDeadline)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Location</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Type:</span>
                    <p className="text-white font-medium">{job.location?.type || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">City:</span>
                    <p className="text-white font-medium">{job.location?.city || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Country:</span>
                    <p className="text-white font-medium">{job.location?.country || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Experience</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Level:</span>
                    <p className="text-white font-medium">{job.experience?.level || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Range:</span>
                    <p className="text-white font-medium">{job.experience?.min} - {job.experience?.max} years</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Salary</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Range:</span>
                    <p className="text-white font-medium">{formatSalary(job.salary)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Visibility:</span>
                    <p className="text-white font-medium">{job.salary?.isVisible ? 'Visible' : 'Hidden'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Job Description</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300 leading-relaxed">{job.description || 'No description available'}</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#00B3C6] mr-2">•</span>
                    <span className="text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Management */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Status Management</h3>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">Change Status:</span>
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="bg-gray-700 text-gray-300 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
