import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const settingsRef = useRef(null);
  const sidebarRef = useRef(null);

  // Close settings popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/admin/login');
    }
  };

  const adminSettings = [
    { name: 'Change Password', href: '/admin/change-password', icon: '🔑' },
    { name: 'Registration Settings', href: '/admin/registration-settings', icon: '⚙️' },
    { name: 'Profile Settings', href: '/admin/profile', icon: '👤' },
    { name: 'Logout', href: '#', icon: '🚪', action: handleLogout, isLogout: true }
  ];

  const menuItems = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: '⚡' },
    { name: 'About Management', href: '/admin/about', icon: '📋' },
    { name: 'Services Management', href: '/admin/services', icon: '⚙️' },
    { name: 'Case Studies Management', href: '/admin/case-studies', icon: '📊' },
    { name: 'Job Posting Management', href: '/admin/jobs', icon: '💼' },
    { name: 'User Management', href: '/admin/users', icon: '👥' },
    { name: 'User Enquiries', href: '/admin/enquiries', icon: '📧' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
    { name: 'System Settings', href: '/admin/system', icon: '⚙️' }
  ];

  return (
    <>
      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
          
          {/* Sidebar */}
          <div ref={sidebarRef} className="relative bg-gray-900 border-r border-gray-700 w-64 h-full shadow-xl">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Navigation</h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="py-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 shadow-sm relative z-50 sticky top-0">
        <div className="max-w-10xl mx-auto px-2 sm:px-6 lg:px-3">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Menu Button, Logo and Name */}
            <div className="flex items-center gap-2">
              {/* Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Clickable Logo and Name */}
              <Link 
                to="/admin/dashboard"
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <img src="/header_logo.png" alt="ScaleForge" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-xl font-bold text-white">
                  Elvora<span className="text-[#00B3C6]">Global</span>
                </h1>
              </Link>
            </div>

            {/* Right Side - Settings Button */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Settings Popup Menu - Only Admin Settings */}
              {isSettingsOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-[9999]">
                  {/* Admin Profile Section */}
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {admin?.fullName?.charAt(0) || admin?.email?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{admin?.fullName || 'Admin User'}</h3>
                        <p className="text-gray-400 text-xs">{admin?.email || 'admin@example.com'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Settings Only */}
                  <div className="py-1">
                    {adminSettings.map((item, index) => (
                      <div key={index}>
                        {item.action ? (
                          <button
                            onClick={() => {
                              setIsSettingsOpen(false);
                              item.action();
                            }}
                            className={`w-full px-4 py-2 text-left transition-colors flex items-center gap-3 ${
                              item.isLogout 
                                ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105' 
                                : 'hover:bg-gray-700 text-gray-300'
                            }`}
                          >
                            <span className={`text-lg ${item.isLogout ? 'bg-white/20 rounded-full p-2' : ''}`}>
                              {item.icon}
                            </span>
                            <span className={`text-sm font-medium ${item.isLogout ? 'text-white' : 'text-gray-300'}`}>
                              {item.name}
                            </span>
                            {item.isLogout && (
                              <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            )}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setIsSettingsOpen(false)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center gap-3"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-gray-300 text-sm">{item.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
