import LayoutWrapper from '../layout/LayoutWrapper';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Cloud Migration for E-commerce Platform",
      client: "TechMart Solutions",
      category: "Cloud Migration",
      description: "Successfully migrated a 10M+ user e-commerce platform to AWS with 99.99% uptime and 40% cost reduction.",
      image: "/api/placeholder/400/250",
      results: ["40% cost reduction", "99.99% uptime", "Zero downtime migration"],
      technologies: ["AWS", "Kubernetes", "Terraform", "Docker"]
    },
    {
      title: "DevOps Pipeline Implementation",
      client: "FinanceFlow Inc",
      category: "DevOps",
      description: "Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes with automated testing.",
      image: "/api/placeholder/400/250",
      results: ["87% faster deployments", "Zero manual errors", "Automated testing"],
      technologies: ["Jenkins", "GitLab CI", "Docker", "Kubernetes"]
    },
    {
      title: "Microservices Architecture",
      client: "HealthTech Systems",
      category: "Architecture",
      description: "Transformed monolithic application to microservices improving scalability and development velocity.",
      image: "/api/placeholder/400/250",
      results: ["3x faster development", "Improved scalability", "Better fault tolerance"],
      technologies: ["Node.js", "Docker", "Kubernetes", "MongoDB"]
    }
  ];

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-bold text-white tracking-wide">
            Case
            <span className="text-orange-500"> Studies</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world examples of how we've helped businesses transform their infrastructure and achieve remarkable results
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012-2v-7a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">Case Study {index + 1}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-xs text-orange-400 font-semibold uppercase tracking-wide">
                    {study.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Client: {study.client}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {study.description}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Key Results:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.results.map((result, idx) => (
                      <span key={idx} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our successful clients and let us help you achieve your infrastructure goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "/user/register"}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-Orange-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
            <button
              onClick={() => window.location.href = "/services"}
              className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg font-semibold text-white border border-white/20 transition-colors"
            >
              View Services
            </button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
