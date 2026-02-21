import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminHeader from "./header/AdminHeader";
import Footer from "../components/layout/Footer";

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // Add a small delay for smooth transition
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 500);
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect on error
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] text-white">
      {/* Full-screen loading overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-linear-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] z-50 flex items-center justify-center transition-opacity duration-500">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Logging out...</h2>
            <p className="text-gray-400 mb-8">Please wait while we secure your session</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Main content with fade transition */}
      <div className={`transition-opacity duration-300 ${
        isLoggingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {/* Admin Header */}
        <AdminHeader />

        {/* PAGE CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-32">
          <Outlet />
        </main>
        
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
