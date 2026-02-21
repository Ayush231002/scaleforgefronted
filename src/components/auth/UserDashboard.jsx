import { useUserAuth } from "../../context/UserAuthContext";

export default function UserDashboard() {
  const { user, logout } = useUserAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/header logo.png" alt="ScaleForge" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">User Dashboard</h1>
                <p className="text-gray-400 text-sm">Welcome back, {user?.username}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-medium">{user?.username || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">{user?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Account Type</p>
                <p className="text-green-400 font-medium">User</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium transition-colors">
                Edit Profile
              </button>
              <button className="w-full bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-white font-medium transition-colors">
                Change Password
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition-colors">
                View Activity
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Your Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Login Count</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Login</span>
                <span className="text-white font-medium">Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-gray-300">Logged in successfully</p>
                <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <p className="text-gray-300">Updated profile information</p>
                <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <p className="text-gray-300">Changed password</p>
                <span className="text-gray-500 text-sm ml-auto">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
