import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../config/api.service.js';
import AdminRegisterPage from './RegisterPage';
import RegistrationDisabledPage from '../../components/auth/RegistrationDisabledPage';

export default function AdminRegistrationWrapper() {
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkRegistrationStatus();
  }, []);

  const checkRegistrationStatus = async () => {
    try {
      const response = await apiService.getRegistrationStatus();
      setIsRegisterEnabled(response.data.isRegisterEnabled);
    } catch (error) {
      console.error('Failed to fetch registration status:', error);
      // Default to disabled if there's an error
      setIsRegisterEnabled(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isRegisterEnabled) {
    return <RegistrationDisabledPage />;
  }

  return <AdminRegisterPage />;
}
