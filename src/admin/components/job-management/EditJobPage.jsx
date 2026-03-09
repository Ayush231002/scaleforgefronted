import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminJobService } from '../../../services/admin/admin-job.service';

const EditJobPage = () => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    department: '',
    employmentType: 'Full-time',
    description: '',
    requirements: [''],
    benefits: [''],
    skills: [''],
    status: 'draft',
    priority: 'medium',
    location: {
      type: 'Remote',
      country: '',
      city: '',
      coordinates: {
        coordinates: []
      }
    },
    experience: {
      level: 'Entry Level',
      min: 0,
      max: 1
    },
    salary: {
      min: '',
      max: '',
      currency: 'USD',
      isVisible: true
    },
    applicationDeadline: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch job details
  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setFetchLoading(true);
    try {
      const response = await adminJobService.getJobById(id);
      if (response.success && response.data) {
        const job = response.data;
        setFormData({
          title: job.title || '',
          slug: job.slug || '',
          department: job.department || '',
          employmentType: job.employmentType || 'Full-time',
          description: job.description || '',
          requirements: job.requirements && job.requirements.length > 0 ? job.requirements : [''],
          benefits: job.benefits && job.benefits.length > 0 ? job.benefits : [''],
          skills: job.skills && job.skills.length > 0 ? job.skills : [''],
          status: job.status || 'draft',
          priority: job.priority || 'medium',
          location: {
            type: job.location?.type || 'Remote',
            country: job.location?.country || '',
            city: job.location?.city || '',
            coordinates: {
              coordinates: job.location?.coordinates?.coordinates || []
            }
          },
          experience: {
            level: job.experience?.level || 'Entry Level',
            min: job.experience?.min || 0,
            max: job.experience?.max || 1
          },
          salary: {
            min: job.salary?.min || '',
            max: job.salary?.max || '',
            currency: job.salary?.currency || 'USD',
            isVisible: job.salary?.isVisible !== undefined ? job.salary.isVisible : true
          },
          applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().slice(0, 16) : ''
        });
      } else {
        alert('Job not found');
        navigate('/admin/jobs');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
      alert('Failed to fetch job details');
      navigate('/admin/jobs');
    } finally {
      setFetchLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Clean up empty array items and format data properly
      const cleanedRequirements = formData.requirements.filter(req => req.trim() !== '');
      const cleanedBenefits = formData.benefits.filter(benefit => benefit.trim() !== '');
      const cleanedSkills = formData.skills.filter(skill => skill.trim() !== '');

      // Ensure arrays are not empty
      if (cleanedRequirements.length === 0) {
        setError('At least one requirement is required');
        setLoading(false);
        return;
      }

      const cleanedData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        department: formData.department,
        employmentType: formData.employmentType,
        description: formData.description,
        requirements: cleanedRequirements,
        benefits: cleanedBenefits.length > 0 ? cleanedBenefits : ['Competitive salary'],
        skills: cleanedSkills.length > 0 ? cleanedSkills : ['JavaScript'],
        status: formData.status,
        priority: formData.priority,
        location: {
          type: formData.location.type,
          country: formData.location.country,
          city: formData.location.city,
          coordinates: {
            coordinates: [] // Add missing coordinates field
          }
        },
        experience: {
          level: formData.experience.level,
          min: parseInt(formData.experience.min) || 0,
          max: parseInt(formData.experience.max) || 0
        },
        salary: {
          min: parseInt(formData.salary.min) || 0,
          max: parseInt(formData.salary.max) || 0,
          currency: formData.salary.currency,
          isVisible: formData.salary.isVisible
        },
        applicationDeadline: formData.applicationDeadline || new Date().toISOString()
      };

      const response = await adminJobService.updateJob(id, cleanedData);
      
      alert('Job updated successfully');
      navigate('/admin/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      alert(error.response?.data?.message || 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 ml-2">Loading job details...</p>
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
              Edit <span className="text-[#00B3C6]">Job</span>
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

        {/* Form */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Slug (URL-friendly) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
                    setFormData(prev => ({ ...prev, slug: value }));
                  }}
                  placeholder="e.g., software-developer"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location Type
                </label>
                <select
                  name="location.type"
                  value={formData.location.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience Level
                </label>
                <select
                  name="experience.level"
                  value={formData.experience.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Lead Level">Lead Level</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Experience (years)
                </label>
                <input
                  type="number"
                  name="experience.min"
                  value={formData.experience.min}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Experience (years)
                </label>
                <input
                  type="number"
                  name="experience.max"
                  value={formData.experience.max}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>
            </div>

            {/* Salary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Min Salary
                </label>
                <input
                  type="number"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Salary
                </label>
                <input
                  type="number"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  name="salary.currency"
                  value={formData.salary.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Application Deadline
              </label>
              <input
                type="datetime-local"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills
              </label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleArrayChange(index, 'skills', e.target.value)}
                    placeholder="Enter skill"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'skills')}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Add Skill
              </button>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Requirements
              </label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayChange(index, 'requirements', e.target.value)}
                    placeholder="Enter requirement"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'requirements')}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('requirements')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Add Requirement
              </button>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Benefits
              </label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleArrayChange(index, 'benefits', e.target.value)}
                    placeholder="Enter benefit"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'benefits')}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('benefits')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Add Benefit
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={() => navigate('/admin/jobs')}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#00B3C6] text-white rounded-md hover:bg-[#0095a8] disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;
