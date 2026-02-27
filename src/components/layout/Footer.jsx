import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Elvora<span className="text-[#00B3C6]">Global</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Engineering Cloud Platforms That Scale. We help startups and enterprises design secure, scalable and cost-efficient cloud platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/services" 
                  className="text-gray-300 hover:text-[#00B3C6] transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/case-studies" 
                  className="text-gray-300 hover:text-[#00B3C6] transition-colors text-sm"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="block font-medium">Email:</span>
                <a href="mailto:info@scaleforce.com" className="text-[#00B3C6] hover:text-[#00B3C6] transition-colors">
                  info@scaleforce.com
                </a>
              </p>
              <p className="text-gray-300">
                <span className="block font-medium">Phone:</span>
                <a href="tel:+1234567890" className="text-[#00B3C6] hover:text-[#00B3C6] transition-colors">
                  +1 (234) 567-890
                </a>
              </p>
              <div className="flex space-x-4 pt-4">
                <a 
                  href="https://twitter.com/scaleforce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00B3C6] transition-colors"
                >
                  <span className="text-xl">𝕏</span>
                </a>
                <a 
                  href="https://linkedin.com/company/scaleforce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00B3C6] transition-colors"
                >
                  <span className="text-xl">in</span>
                </a>
                <a 
                  href="https://github.com/scaleforce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00B3C6] transition-colors"
                >
                  <span className="text-xl">⚡</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ScaleForce. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with <span className="text-[#00B3C6]">♥</span> for cloud engineering excellence
            </p>
          </div>
        </div>
      </div>
      </footer>
  );
};

export default Footer;
