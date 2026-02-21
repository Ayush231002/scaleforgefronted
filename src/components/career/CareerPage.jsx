import LayoutWrapper from '../layout/LayoutWrapper';

export default function CareerPage() {
  const openings = [
    {
      title: "Senior Cloud Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "We're looking for an experienced Cloud Engineer to help design and implement scalable cloud solutions for our clients.",
      requirements: [
        "5+ years of experience with AWS/Azure/GCP",
        "Strong knowledge of Kubernetes and Docker",
        "Experience with Infrastructure as Code (Terraform, CloudFormation)",
        "Proficiency in CI/CD pipelines",
        "Strong problem-solving skills"
      ],
      benefits: ["Competitive salary", "Remote work", "Health insurance", "Professional development"]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Join our DevOps team to build and maintain robust infrastructure and deployment pipelines.",
      requirements: [
        "3+ years of DevOps experience",
        "Experience with containerization and orchestration",
        "Knowledge of monitoring and logging tools",
        "Scripting skills (Python, Bash, etc.)",
        "Understanding of security best practices"
      ],
      benefits: ["Competitive salary", "Remote work", "Health insurance", "Tech budget"]
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "We're seeking a talented Frontend Developer to create amazing user experiences for our cloud platform.",
      requirements: [
        "3+ years of React/Next.js experience",
        "Strong knowledge of TypeScript",
        "Experience with modern CSS frameworks",
        "Understanding of responsive design",
        "Knowledge of performance optimization"
      ],
      benefits: ["Competitive salary", "Remote work", "Health insurance", "Creative freedom"]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Lead product strategy and development for our cloud engineering platform.",
      requirements: [
        "4+ years of product management experience",
        "Background in cloud computing or DevOps",
        "Strong analytical and communication skills",
        "Experience with agile methodologies",
        "Ability to work with technical teams"
      ],
      benefits: ["Competitive salary", "Remote work", "Health insurance", "Equity options"]
    }
  ];

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-bold text-white tracking-wide">
            Join Our <span className="text-orange-400">Team</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us build the future of cloud engineering. We're looking for talented individuals who are passionate about technology and innovation.
          </p>
        </div>

        {/* Why Join Us */}
        <div className="mb-16 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Why Scale <span className="text-orange-400">Forge</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation",
                description: "Work on cutting-edge cloud technologies and shape the future of infrastructure"
              },
              {
                icon: "🌍",
                title: "Remote First",
                description: "Work from anywhere with flexible hours and work-life balance"
              },
              {
                icon: "📈",
                title: "Growth",
                description: "Continuous learning opportunities and career advancement"
              },
              {
                icon: "🤝",
                title: "Culture",
                description: "Collaborative environment with talented and supportive team"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Open <span className="text-orange-500">Positions</span>
          </h2>
          <div className="space-y-6">
            {openings.map((job, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300">
                
                {/* Job Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {job.department}
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        {job.location}
                      </span>
                      <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                        {job.type}
                      </span>
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105">
                    Apply Now
                  </button>
                </div>

                {/* Job Description */}
                <p className="text-gray-300 mb-4">{job.description}</p>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, idx) => (
                      <span key={idx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don't See the Right Fit?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-blue-600 hover:to-blue-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105">
            Send Resume
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
