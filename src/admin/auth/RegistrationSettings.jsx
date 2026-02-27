import { useState, useEffect } from 'react';
import { apiService } from '../../config/api.service.js';

export default function RegistrationSettings() {
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRegistrationStatus();
  }, []);

  const fetchRegistrationStatus = async () => {
    try {
      const response = await apiService.getRegistrationStatus();
      setIsRegisterEnabled(response.data.isRegisterEnabled);
    } catch (error) {
      console.error('Failed to fetch registration status:', error);
    }
  };

  const handleToggleRegistration = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiService.updateRegistrationStatus(!isRegisterEnabled);
      setIsRegisterEnabled(!isRegisterEnabled);
      setSuccess(`Registration ${!isRegisterEnabled ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      setError('Failed to update registration status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Registration Settings</h2>
      
      {error && (
        <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
          <div>
            <h3 className="text-lg font-semibold text-white">User Registration</h3>
            <p className="text-gray-400 text-sm mt-1">
              {isRegisterEnabled 
                ? 'New users can register for accounts' 
                : 'New user registration is currently disabled'}
            </p>
          </div>
          
          <button
            onClick={handleToggleRegistration}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B3C6] focus:ring-offset-2 ${
              isRegisterEnabled ? 'bg-[#00B3C6]' : 'bg-gray-600'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isRegisterEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-2">Current Status</h4>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isRegisterEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-white">
              Registration is <span className="font-bold">{isRegisterEnabled ? 'ENABLED' : 'DISABLED'}</span>
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>• When disabled, new users cannot create accounts</p>
          <p>• Existing users can still log in and manage their accounts</p>
          <p>• This setting takes effect immediately</p>
        </div>
      </div>
    </div>
  );
}
