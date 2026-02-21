import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Password reset email sent to:', email);
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/admin/login');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex">
        {/* Left Side - Logo and Company Info */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center">
          <div className="max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">ScaleForge</h1>
              <p className="text-orange-400 text-lg">Engineering Cloud Platforms</p>
            </div>

            {/* Company Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white leading-tight">
                Password <span className="text-orange-500">recovery</span> made simple
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We've got you covered. If you're having trouble accessing your account, we'll help you get back in quickly and securely.
              </p>
            </div>

            {/* Support Info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">Instant email delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">Secure reset links</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-300">24/7 support available</span>
              </div>
            </div>

            {/* Image/Illustration */}
            <div className="mt-12">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0b1d3a] to-[#020617] border border-blue-500/30 shadow-2xl">
                <img
                  src="/cloud.png"
                  alt="Cloud Security"
                  className="w-full max-w-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Success Message */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>
              
              <p className="text-gray-300 mb-6">
                We've sent a password reset link to<br />
                <span className="text-orange-400 font-medium">{email}</span>
              </p>

              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
                <p className="text-blue-200 text-sm">
                  <strong>Didn't receive the email?</strong> Check your spam folder or try again with a different email address.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Try Another Email
                </button>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-white/20"
                >
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex">
      {/* Left Side - Logo and Company Info */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center">
        <div className="max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">ScaleForge</h1>
            <p className="text-orange-400 text-lg">Engineering Cloud Platforms</p>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Password <span className="text-orange-500">recovery</span> made simple
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Forgot your password? No worries. We'll help you reset it securely and get you back to managing your cloud infrastructure in no time.
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-12 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300">Instant email delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300">Secure reset links</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300">24/7 support available</span>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="mt-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0b1d3a] to-[#020617] border border-blue-500/30 shadow-2xl">
              <img
                src="/cloud.png"
                alt="Cloud Security"
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
        {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400">Enter your email to receive reset instructions</p>
          </div>

        {/* Forgot Password Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          {/* Instructions */}
          <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">How it works:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Enter your registered email address</li>
                  <li>We'll send you a password reset link</li>
                  <li>Click the link to create a new password</li>
                </ol>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending reset link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Alternative Options */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-center text-sm text-gray-400 mb-4">
              Remember your password?
            </p>
            <div className="space-y-3">
              <Link
                to="/admin/login"
                className="block w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-center border border-white/20"
              >
                Back to Sign In
              </Link>
              
              <Link
                to="/admin/register"
                className="block w-full text-orange-400 hover:text-orange-300 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-center"
              >
                Create New Account
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact{' '}
              <a href="mailto:support@scaleforce.com" className="text-orange-400 hover:text-orange-300 underline">
                support@scaleforce.com
              </a>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
