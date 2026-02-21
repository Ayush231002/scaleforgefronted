export default function DashboardPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome to <span className="text-orange-500">Dashboard</span>!
        </h2>
        <p className="text-gray-300">
          You have successfully logged in to ScaleForge.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Users */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white mt-1">1,234</p>
        </div>

        {/* Active Projects */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <p className="text-gray-400 text-sm">Active Projects</p>
          <p className="text-2xl font-bold text-white mt-1">42</p>
        </div>

        {/* Cloud Resources */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <p className="text-gray-400 text-sm">Cloud Resources</p>
          <p className="text-2xl font-bold text-white mt-1">128</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg">
            New Project
          </button>

          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg border border-white/20">
            View Reports
          </button>

          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg border border-white/20">
            Team Settings
          </button>

          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg border border-white/20">
            Billing
          </button>
        </div>
      </div>
    </>
  );
}
