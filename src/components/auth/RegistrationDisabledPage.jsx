export default function RegistrationDisabledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Registration Disabled</h2>
          <p className="text-gray-300 mb-6">
            User registration is currently disabled. Please contact an administrator if you need access to this platform.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = "/admin/login"}
            className="w-full bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Login
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold border border-white/20 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
