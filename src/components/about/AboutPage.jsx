import LayoutWrapper from '../layout/LayoutWrapper';

export default function AboutPage() {
  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/200/200",
      bio: "Visionary leader with 15+ years in cloud computing and enterprise architecture.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/api/placeholder/200/200",
      bio: "Technical expert specializing in scalable infrastructure and DevOps practices.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Roberts",
      role: "Head of Engineering",
      image: "/api/placeholder/200/200",
      bio: "Passionate about building high-performance teams and cutting-edge solutions.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Davis",
      role: "VP of Product",
      image: "/api/placeholder/200/200",
      bio: "Product strategist focused on delivering exceptional user experiences.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Mission-Driven",
      description: "We're committed to helping businesses succeed in their cloud journey with innovative solutions."
    },
    {
      icon: "🔧",
      title: "Engineering Excellence",
      description: "We build robust, scalable, and secure cloud infrastructure that stands the test of time."
    },
    {
      icon: "🤝",
      title: "Customer Success",
      description: "Our clients' success is our success. We go above and beyond to ensure their goals are met."
    },
    {
      icon: "🚀",
      title: "Innovation First",
      description: "We stay ahead of the curve by continuously exploring new technologies and approaches."
    }
  ];

  const stats = [
    { number: "500+", label: "Clients Served" },
    { number: "99.9%", label: "Uptime SLA" },
    { number: "50+", label: "Team Members" },
    { number: "10M+", label: "Users Supported" }
  ];

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-wide ">
            About Scale<span className="text-orange-500"> Forge</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're a team of passionate cloud engineers dedicated to helping businesses build scalable, secure, and efficient cloud infrastructure.
          </p>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div> */}

        {/* Our Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                ScaleForge was founded in 2020 with a simple mission: to make cloud engineering accessible and efficient for businesses of all sizes. We saw too many companies struggling with complex cloud infrastructure, wasting time and resources on avoidable mistakes.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Today, we're proud to be a trusted partner for hundreds of companies, from startups to Fortune 500 enterprises. Our team of expert engineers combines deep technical knowledge with practical business understanding to deliver solutions that truly make a difference.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that great cloud infrastructure shouldn't be complicated. That's why we focus on simplicity, reliability, and scalability in everything we do.
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Building the Future</h3>
              <p className="text-gray-300">Of Cloud Infrastructure</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Our <span className="text-orange-500">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        

        {/* CTA Section */}
        <div className="text-center bg-linear-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies that trust ScaleForge for their cloud engineering needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "/services"}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
            >
              View Services
            </button>
            <button
              onClick={() => window.location.href = "/career"}
              className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg font-semibold text-white border border-white/20 transition-colors"
            >
              Join Our Team
            </button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
