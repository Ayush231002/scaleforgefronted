import { useState } from 'react';
import AdminHeader from '../header/AdminHeader';

export default function AdminAboutPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutData, setAboutData] = useState({
    company: {
      name: 'ElvoraGlobal',
      description: 'Engineering Cloud Platforms That Scale',
      founded: '2024',
      teamSize: '50+',
      clients: '100+',
      projects: '500+'
    },
    mission: 'To help startups and enterprises design secure, scalable and cost-efficient cloud platforms using modern DevOps and platform engineering practices.',
    vision: 'To be the leading cloud engineering partner for businesses worldwide.',
    values: [
      'Innovation',
      'Excellence',
      'Integrity',
      'Collaboration',
      'Customer Success'
    ],
    team: [
      {
        name: 'John Doe',
        role: 'CEO & Founder',
        bio: '15+ years of experience in cloud architecture and DevOps.',
        image: '/team/john.jpg'
      },
      {
        name: 'Jane Smith',
        role: 'CTO',
        bio: 'Expert in cloud security and infrastructure optimization.',
        image: '/team/jane.jpg'
      },
      {
        name: 'Mike Johnson',
        role: 'Lead DevOps Engineer',
        bio: 'Specializes in CI/CD pipelines and automation.',
        image: '/team/mike.jpg'
      }
    ]
  });

  const handleSave = () => {
    // TODO: Save to backend
    console.log('Saving about data:', aboutData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset to original data
  };

  const handleInputChange = (section, field, value) => {
    setAboutData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Company Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={aboutData.company.name}
                  onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={aboutData.company.description}
                  onChange={(e) => handleInputChange('company', 'description', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Founded</label>
                <input
                  type="text"
                  value={aboutData.company.founded}
                  onChange={(e) => handleInputChange('company', 'founded', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                <input
                  type="text"
                  value={aboutData.company.teamSize}
                  onChange={(e) => handleInputChange('company', 'teamSize', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clients</label>
                <input
                  type="text"
                  value={aboutData.company.clients}
                  onChange={(e) => handleInputChange('company', 'clients', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
                <input
                  type="text"
                  value={aboutData.company.projects}
                  onChange={(e) => handleInputChange('company', 'projects', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Purpose</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                <textarea
                  value={aboutData.mission}
                  onChange={(e) => handleInputChange('mission', '', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                <textarea
                  value={aboutData.vision}
                  onChange={(e) => handleInputChange('vision', '', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Values</label>
                <div className="flex flex-wrap gap-2">
                  {aboutData.values.map((value, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutData.team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-600 text-xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
