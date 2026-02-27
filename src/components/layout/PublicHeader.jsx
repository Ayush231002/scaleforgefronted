import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/routes';

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    description: '',
    isBooked: false // Header form is for general inquiry by default
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },
    { name: 'Content', href: '/content' },
    
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Submitting form data:', formData);
      
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CONSULTATION.CREATE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Backend validation error:', errorData);
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Form submitted:', data);
        alert('Consultation inquiry submitted successfully! We will contact you soon.');
        setIsConsultModalOpen(false);
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          subject: '',
          description: '',
          isBooked: false
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert(`Failed to submit consultation: ${error.message}`);
      }
    }
  };

  const isActiveTab = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-1">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-0">
              <div className="w-50 h-50 flex items-center justify-center">
                <img src="/Logo_Elvora_Global-removebg-preview.png" alt="ScaleForge" className="w-auto h-auto object-cover" />
              </div>
              {/* <span className="text-2xl font-bold text-white tracking-wide">
            Elvora<span className="text-[#00B3C6]">Global</span>
          </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActiveTab(item.href)
                    ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
           { /*<Link
              to="/user/login"
              className="bg-linear-to-r from-[#00B3C6] to-[#00B3C6] hover:from-[#00B3C6] hover:to-[#00B3C6] px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 transform hover:scale-105"
            >
              Sign In
            </Link>
            */}
            <button
              onClick={() => setIsConsultModalOpen(true)}
               className="bg-linear-to-r from-[#00B3C6] to-[#00B3C6] hover:from-[#00B3C6] hover:to-[#00B3C6] px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 transform hover:scale-105"
            >
              Free Consultant
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveTab(item.href)
                      ? 'text-blue-400 bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                {/* <Link
                  to="/user/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                >
                  Sign In
                </Link> */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsConsultModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                >
                  Free Consultant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Consultation Modal */}
      {isConsultModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-linear-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] border border-gray-700 rounded-2xl shadow-2xl my-auto">
            <div className="p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 bg-gray-800/50 rounded-full p-2 hover:bg-gray-700/50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Free <span className="text-[#00B3C6]">Consultation</span></h2>
                <p className="text-gray-400">Get expert advice on your cloud infrastructure needs</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B3C6] focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B3C6] focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B3C6] focus:border-transparent transition-colors ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B3C6] focus:border-transparent transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Cloud infrastructure consultation"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B3C6] focus:border-transparent resize-none transition-colors ${
                      errors.description ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Tell us about your project and requirements..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4 pb-4">
                  <button
                    type="button"
                    onClick={() => setIsConsultModalOpen(false)}
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00B3C6] to-[#00B3C6] hover:from-[#00B3C6] hover:to-[#00B3C6] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
