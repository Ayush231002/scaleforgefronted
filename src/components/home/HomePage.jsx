import LayoutWrapper from '../layout/LayoutWrapper';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../config';
import { API_ENDPOINTS } from '../../config/routes';

export default function HomePage() {
  const navigate = useNavigate();
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [popularServices, setPopularServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    description: '',
    isBooked: true // Free consultant booking is always booked by default
  });
  const [errors, setErrors] = useState({});

  // Fetch popular services
  useEffect(() => {
    const fetchPopularServices = async () => {
      try {
        const response = await apiService.get(API_ENDPOINTS.SERVICES.GET_ALL);
        const allServices = response.data?.data || response.data || [];
        const popular = allServices
          .filter(service => service.isActive === true && service.isPopular === true)
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .slice(0, 6); // Show max 6 popular services
        
        setPopularServices(popular);
      } catch (error) {
        console.error('Error fetching popular services:', error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchPopularServices();
  }, []);

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
      console.log('Submitting form data:', formData); // Debug log
      
      try {
        const response = await apiService.post(API_ENDPOINTS.CONSULTATION.CREATE, formData);
        
        if (!response.data) {
          throw new Error('Failed to submit consultation');
        }
        
        console.log('Form submitted:', response.data);
        alert('Free consultant booking confirmed! We will contact you soon.');
        setIsConsultModalOpen(false);
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          subject: '',
          description: '',
          isBooked: true
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert(`Failed to submit consultation: ${error.message}`);
      }
    }
  };

  return (
    <LayoutWrapper>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden py-20 bg-[#050b1e]">

        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* GRADIENT OVERLAY (FIXED – NOT TOO DARK) */}
        <div className="absolute inset-0 bg-linear-to-br from-[#050b1e]/70 via-[#0b1d3a]/60 to-[#020617]/70"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Single Partner for IT Infrastructure, <br />
                <span className="text-[#1ECAD3]">Managed</span> Services & Cloud
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                We help startups and enterprises design secure, scalable and cost-efficient cloud platforms using modern DevOps and platform engineering practices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsConsultModalOpen(true)}
                  className="bg-linear-to-r from-[#00B3C6] to-[#00B3C6] hover:from-[#00B3C6] hover:to-orange-700 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
                >
                  Book a Free Assessment
                </button>

                <button
                  onClick={() => window.location.href = "/services"}
                  className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-white border border-white/20 transition-colors"
                >
                  View Services
                </button>
              </div>
            </div>

            {/* RIGHT GRAPHIC */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-blue-500/40 to-purple-600/40 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">☁️</span>
                        </div>
                        <p className="text-white font-semibold text-sm">
                          Cloud Infrastructure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="absolute top-1/4 left-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute mid-1/2 right-0 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

     {/* ================= TRUSTED BY SECTION ================= */}
<section className="relative bg-linear-to-b from-[#f8fafc] to-white py-12 overflow-hidden">

  {/* Top divider */}
  <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    <p className="text-center text-sm md:text-base font-medium text-gray-600 mb-14 tracking-wide">
      Trusted by engineers at leading global enterprises
    </p>

    {/* Marquee container */}
    <div className="overflow-hidden">
      <div
        className="flex w-max items-center gap-x-20"
        style={{
          animation: "scroll 25s linear infinite"
        }}
      >

        {[
          { src: "/section-logos/aws-2.svg", alt: "AWS" },
          { src: "/section-logos/expedia.svg", alt: "Expedia" },
          { src: "/section-logos/ibm.svg", alt: "IBM" },
          { src: "/section-logos/paypal.svg", alt: "PayPal" },
          { src: "/section-logos/salesforce-2.svg", alt: "Salesforce" },
          { src: "/section-logos/wipro-1.svg", alt: "Wipro" },
          { src: "/section-logos/docker-1.svg", alt: "Docker" },
          { src: "/section-logos/ibm-cloud-1.svg", alt: "ibm" },

          /* duplicate for seamless loop */
          { src: "/section-logos/aws-2.svg", alt: "AWS" },
          { src: "/section-logos/expedia.svg", alt: "Expedia" },
          { src: "/section-logos/ibm.svg", alt: "IBM" },
          { src: "/section-logos/paypal.svg", alt: "PayPal" },
          { src: "/section-logos/salesforce-2.svg", alt: "Salesforce" },
          { src: "/section-logos/wipro-1.svg", alt: "Wipro" },
          { src: "/section-logos/docker-1.svg", alt: "Docker" },
          { src: "/section-logos/ibm-cloud-1.svg", alt: "ibm" },
        ].map((logo, index) => (
          <div
            key={index}
            className="transition-all duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 md:h-11 opacity-80 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Bottom divider */}
  <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

  {/* Inline styles for animations */}
  <style>{`
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `}</style>
</section>




      {/* ================= POPULAR SERVICES SECTION ================= */}
      <section className="py-20 bg-linear-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular <span className="text-[#00B3C6]">Services</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover our most sought-after cloud solutions trusted by startups and enterprises
            </p>
          </div>

          {/* Services Grid */}
          {loadingServices ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B3C6]"></div>
            </div>
          ) : popularServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularServices.map((service) => (
                <div key={service._id} className="group">
                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 h-full hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Service Header */}
                    <div className="flex items-center mb-4">
                      {service.imageUrl && (
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48x48?text=Service';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {service.category?.name || 'Service'}
                        </p>
                      </div>
                    </div>

                    {/* Service Description */}
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Service Features */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className="inline-block bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="inline-block bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded-full">
                              +{service.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Service Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      {/* <div className="text-2xl font-bold text-orange-400">
                        ${service.price || 'Contact'}
                      </div> */}
                      <button
                        onClick={() => navigate(`/services/${service._id}`)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Popular Services Yet</h3>
              <p className="text-gray-400 mb-6">Check back soon for our featured services</p>
              <button
                onClick={() => navigate('/services')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All Services
              </button>
            </div>
          )}

          {/* View All Services Button */}
          {popularServices.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/services')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-gray-700"
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      </section>
    
      {/* ================= WHY CHOOSE US / IMPACT SECTION ================= */}
<section className="py-24 bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

      {/* LEFT */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Why clients <span className="text-[#00B3C6]">choose us</span>
        </h2>

        <ul className="space-y-6">
          {[
            "Enterprise architecture experience",
            "Proven AWS & Kubernetes expertise",
            "Focus on measurable business outcomes",
            "Clear & transparent communication",
            "No unnecessary over-engineering"
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="mt-1 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="h-2.5 w-2.5 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT (WITH HOVER ANIMATION) */}
      <div
        className="
          bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10
          transition-all duration-500 ease-out
          hover:-translate-y-2
          hover:border-orange-500/40
          hover:shadow-[0_20px_60px_rgba(255,140,0,0.15)]
          group
        "
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
          Impact we <span className="text-[#00B3C6]">deliver</span>
        </h2>

        <ul className="space-y-6">
          {[
            "20–40% cloud cost reduction",
            "Faster & safer deployments",
            "Highly available & resilient systems",
            "Improved developer productivity"
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-4 transition-all duration-300 group-hover:translate-x-1"
            >
              <div
                className="
                  mt-1 h-6 w-6 rounded-full
                  bg-orange-500/20
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:bg-orange-500
                "
              >
                <div className="h-2.5 w-2.5 bg-orange-500 rounded-full group-hover:bg-white"></div>
              </div>

              <p className="text-gray-200 text-lg leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</section>




      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Cloud Infrastructure?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you build scalable, secure, and cost-efficient cloud platforms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="bg-gradient-to-r from-[#00B3C6] to-[#00B3C6] hover:from-[#00B3C6] hover:to-[#00B3C6] px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
            >
              Let’s Get Started
            </button>
            <button
              onClick={() => window.location.href = "/case-studies"}
              className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-white border border-white/20 transition-colors"
            >
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* ================= CONSULTATION MODAL ================= */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] border border-gray-700 rounded-2xl shadow-2xl my-auto">
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
                <h2 className="text-2xl font-bold text-white mb-2">Free <span className="text-orange-500">Assessment</span> </h2>
                <p className="text-gray-400">Schedule your free cloud infrastructure consultation with our experts</p>
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-colors ${
                      errors.description ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Tell us about your project and requirements..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isBooked"
                      checked={formData.isBooked}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-800/50 text-[#1ECAD3] focus:ring-[#1ECAD3] focus:ring-2"
                    />
                    <span className="text-sm leading-tight text-gray-300">
                      Book a free Assessment (check to confirm booking, uncheck for general inquiry)
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 pb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsConsultModalOpen(false);
                      setErrors({});
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </LayoutWrapper>
  );
}
