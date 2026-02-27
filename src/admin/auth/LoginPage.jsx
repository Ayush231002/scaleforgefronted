import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { adminRegistrationFormEnableDisableApiService } from "../../config";
import { API_ENDPOINTS } from "../../config/routes.js";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const navigate = useNavigate();
  const { login, error, clearError } = useAdminAuth();

  useEffect(() => {
    checkRegistrationStatus();
  }, []);

  const checkRegistrationStatus = async () => {
    try {
      const response = await adminRegistrationFormEnableDisableApiService.getRegistrationStatus();
      setIsRegisterEnabled(response.isRegisterEnabled);
    } catch (error) {
      console.error('Failed to fetch registration status:', error);
      // Default to disabled if there's an error
      setIsRegisterEnabled(false);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    
    try {
      await login(formData);
      navigate("/admin/dashboard");
    } catch (err) {
      // Error is handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">

      {/* LEFT CONTENT */}
      <div className="hidden lg:flex w-1/2 px-20 flex-col justify-center">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
          Engineering cloud platforms <br />
          that <span className="text-[#00B3C6]">scale</span>
        </h2>
  
  
       </div>
          
        </div>


        <p className="mt-6 text-gray-300 max-w-xl leading-relaxed">
          We help startups and enterprises design secure, scalable and
          cost-efficient cloud platforms using modern DevOps and platform
          engineering practices.
        </p>

        <div className="mt-10 space-y-4">
         {[
           "Secure cloud infrastructure",
          "Scalable platform engineering",
          "Modern DevOps practices",
          "Cost-efficient solutions",
          ].map((text, i) => (
        <div key={i} className="flex items-start gap-3">
        <span className="mt-2 h-2 w-2 rounded-full bg-[#00B3C6]"></span>
        <span className="text-gray-300">{text}</span>
        </div>
        ))}
        </div>


        <div className="mt-10 w-[320px] h-[70px] rounded-xl border border-white/20 bg-white/5 flex items-center justify-center text-gray-400">
          Cloud Growth
        </div>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex gap-2 items-center text-gray-300">
                <input type="checkbox" /> Remember me
              </label>
              <Link
                to="/admin/forgot-password"
                className="text-[#00B3C6] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00B3C6] hover:bg-[#00B3C6] text-white py-3 rounded-lg font-semibold transition"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Show Sign Up link only when registration is enabled */}
            {!checkingStatus && isRegisterEnabled && (
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/admin/register"
                    className="text-[#00B3C6] hover:underline font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            )}

            <div className="text-center text-gray-400 text-sm my-4">
              Or continue with
            </div>

             {/* Social Signup */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-white text-sm">GitHub</span>
            </button>
          </div>

          </form>
        </div>
      </div>
    </div>
  );
}
