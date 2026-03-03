import LayoutWrapper from '../layout/LayoutWrapper';
import { useState, useEffect } from 'react';
import { jobService } from '../../services/user/jobService.js';

export default function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobService.getActiveJobs(1, 10);
        setJobs(response.data.jobs || []);
        setError(null);
      } catch (err) {
        setError('Failed to load job openings. Please try again later.');
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatSalary = (salary) => {
    if (!salary || !salary.isVisible) return 'Competitive';
    const { min, max, currency } = salary;
    const formattedMin = (min / 100000).toFixed(1);
    const formattedMax = (max / 100000).toFixed(1);
    return `${currency} ${formattedMin}L - ${formattedMax}L`;
  };

  const formatExperience = (experience) => {
    if (!experience) return 'Not specified';
    const { min, max } = experience;
    if (min === max) return `${min}+ years`;
    return `${min}-${max} years`;
  };

  const getLocationString = (location) => {
    if (!location) return 'Remote';
    if (location.type === 'Remote') return 'Remote';
    return `${location.city}, ${location.country}`;
  };

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-bold text-white tracking-wide">
            Join Our <span className="text-[#00B3C6]">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us build the future of cloud engineering. We're looking for talented individuals who are passionate about technology and innovation.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-16 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Why Elvora<span className="text-[#00B3C6]">Global</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation",
                description: "Work on cutting-edge cloud technologies and shape the future of infrastructure"
              },
              {
                icon: "🌍",
                title: "Remote First",
                description: "Work from anywhere with flexible hours and work-life balance"
              },
              {
                icon: "📈",
                title: "Growth",
                description: "Continuous learning opportunities and career advancement"
              },
              {
                icon: "🤝",
                title: "Culture",
                description: "Collaborative environment with talented and supportive team"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Open <span className="text-[#00B3C6]">Positions</span>
          </h2>
          
          {loading && (
            <div className="text-center text-white py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B3C6]"></div>
              <p className="mt-4">Loading job openings...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
          
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No active job openings at the moment. Please check back later!</p>
            </div>
          )}
          
          {!loading && !error && jobs.length > 0 && (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300">
                  
                  {/* Job Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                          {job.department}
                        </span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                          {getLocationString(job.location)}
                        </span>
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                          {job.employmentType}
                        </span>
                        <span className="bg-[#00B3C6]/20 text-[#00B3C6] px-2 py-1 rounded-full">
                          {formatExperience(job.experience)}
                        </span>
                        {job.salary?.isVisible && (
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            {formatSalary(job.salary)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105">
                      Apply Now
                    </button>
                  </div>

                  {/* Job Description */}
                  <p className="text-gray-300 mb-4">{job.description}</p>

                  {/* Requirements */}
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-400">
                            <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {job.benefits && job.benefits.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.map((benefit, idx) => (
                          <span key={idx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don't See the Right Fit?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-gradient-to-r from-[#00B3C6] to-[#00B3C6] hover:from-blue-600 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105">
            Send Resume
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
