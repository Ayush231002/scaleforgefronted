import LayoutWrapper from '../layout/LayoutWrapper';

export default function ContentPage() {
  const categories = [
    {
      title: "Technical Articles",
      description: "In-depth technical guides and tutorials",
      icon: "📚",
      articles: [
        {
          title: "Kubernetes Best Practices for Production",
          excerpt: "Learn the essential best practices for running Kubernetes in production environments",
          readTime: "8 min read",
          date: "2024-01-15"
        },
        {
          title: "Understanding Cloud Cost Optimization",
          excerpt: "Strategies and techniques for optimizing cloud infrastructure costs without sacrificing performance",
          readTime: "6 min read",
          date: "2024-01-10"
        },
        {
          title: "DevOps Culture Transformation",
          excerpt: "How to build and maintain a strong DevOps culture in your organization",
          readTime: "10 min read",
          date: "2024-01-05"
        }
      ]
    },
    {
      title: "Case Studies",
      description: "Real-world success stories and implementations",
      icon: "📊",
      articles: [
        {
          title: "E-commerce Platform Migration to AWS",
          excerpt: "How we migrated a 10M+ user platform to AWS with zero downtime",
          readTime: "12 min read",
          date: "2024-01-12"
        },
        {
          title: "CI/CD Pipeline Implementation",
          excerpt: "Building automated deployment pipelines for a fintech company",
          readTime: "9 min read",
          date: "2024-01-08"
        },
        {
          title: "Microservices Architecture Design",
          excerpt: "Transforming monolithic applications to microservices architecture",
          readTime: "15 min read",
          date: "2024-01-03"
        }
      ]
    },
    {
      title: "Industry Insights",
      description: "Trends, analysis, and future predictions",
      icon: "🔍",
      articles: [
        {
          title: "The Future of Cloud Computing in 2024",
          excerpt: "Emerging trends and technologies shaping the cloud landscape",
          readTime: "7 min read",
          date: "2024-01-20"
        },
        {
          title: "AI in DevOps: Opportunities and Challenges",
          excerpt: "How artificial intelligence is transforming DevOps practices",
          readTime: "11 min read",
          date: "2024-01-18"
        },
        {
          title: "Sustainability in Cloud Architecture",
          excerpt: "Building environmentally friendly and cost-effective cloud solutions",
          readTime: "8 min read",
          date: "2024-01-14"
        }
      ]
    }
  ];

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-bold text-white tracking-wide">
            Content
            <span className="text-[#00B3C6]"> Hub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technical articles, case studies, and industry insights from our cloud engineering experts
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <span className="text-3xl mr-4">{category.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.articles.map((article, articleIndex) => (
                  <article key={articleIndex} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    
                    {/* Article Meta */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-[#00B3C6] font-semibold uppercase tracking-wide">
                        {category.title}
                      </span>
                      <span className="text-xs text-gray-400">
                        {article.readTime}
                      </span>
                    </div>

                    {/* Article Content */}
                    <h3 className="text-lg font-semibold text-white mb-3 hover:text-[#00B3C6] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    {/* Article Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {article.date}
                      </span>
                      <button className="text-[#00B3C6] hover:text-[#00B3C6] text-sm font-medium transition-colors">
                        Read More →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-[#00B3C6]/20 to-purple-600/20 border border-[#00B3C6]/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest cloud engineering insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B3C6]"
            />
            <button className="bg-gradient-to-r from-[#00B3C6] to-purple-600 hover:from-[#00B3C6] hover:to-purple-700 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to Write for Us?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Share your expertise and help the community learn from your experiences
          </p>
          <button
            onClick={() => window.location.href = "/user/register"}
            className="bg-gradient-to-r from-[#00B3C6] to-purple-600 hover:from-[#00B3C6] hover:to-purple-700 px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
          >
            Become a Contributor
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
}
