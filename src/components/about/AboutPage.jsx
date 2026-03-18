import LayoutWrapper from '../layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <LayoutWrapper>
      <div className="bg-[#020617] text-white">

        {/* HERO */}
        <section className="py-32 px-6 bg-gradient-to-r from-[#031525] to-[#020617]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <h1 className="text-6xl font-bold mb-6">
                About <span className="text-[#00B3C6]">Elvora Global</span>
              </h1>

              <p className="text-gray-400 mb-6 text-lg">
                End-to-end IT infrastructure, managed services and cloud operations company helping businesses build reliable, secure and scalable technology environments.
              </p>

              <button
                onClick={() => navigate('/services')}
                className="bg-[#00B3C6] hover:bg-[#0097a7] px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              >
                Explore Services <ArrowRight size={18}/>
              </button>

              {/* BADGES */}
              <div className="flex flex-wrap gap-3 mt-8">
                {["Reliable", "Secure", "Scalable", "Enterprise Ready"].map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#0b1220] border border-white/10 rounded-full text-sm hover:border-[#00B3C6]/60 transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="p-8 rounded-2xl bg-[#0b1220] border border-white/10 shadow-xl">
              <h3 className="text-xl text-[#00B3C6] mb-3">
                18+ Years Experience
              </h3>
              <p className="text-gray-400">
                Enterprise-grade IT infrastructure, cloud and DevOps expertise across global organizations.
              </p>
            </div>

          </div>
        </section>

        {/* MAIN CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-16">

          {/* WHO WE ARE */}
          <div>
            <h2 className="text-3xl mb-4">Who We Are</h2>
            <p className="text-gray-400 mb-3">
              Elvora Global Pvt. Ltd. is an end-to-end IT infrastructure, managed services and cloud operations company helping businesses build reliable, secure and scalable technology environments.
            </p>
            <p className="text-gray-400">
              We serve as a single, accountable technology partner for organizations looking to simplify IT operations, reduce downtime and enable long-term digital growth.
            </p>
          </div>

          {/* FOUNDATION */}
          <div className="p-8 bg-[#0b1220] rounded-xl border border-white/10">
            <h2 className="text-2xl mb-4 text-[#00B3C6]">Our Foundation</h2>
            <p className="text-gray-400 mb-3">
              Elvora Global Pvt. Ltd. was incorporated in 2026 with a vision to build a structured, scalable and process-driven technology services organization.
            </p>
            <p className="text-gray-400 mb-3">
              The foundation of the company comes from 18+ years of hands-on industry experience delivering IT infrastructure support, managed services and nationwide onsite assistance.
            </p>
            <p className="text-gray-400">
              Prior to incorporation, services were delivered under “Entire IT Solution”.
            </p>
          </div>

          {/* ENTERPRISE */}
          <div>
            <h2 className="text-3xl mb-6">Enterprise Experience</h2>

            <div className="flex flex-wrap gap-3">
              {["IBM","Wipro","Capgemini","HCL","Pfizer","Lloyds Banking Group","Expedia Group"].map((item,i)=>(
                <span key={i} className="px-4 py-2 bg-[#0b1220] border border-white/10 rounded-md">
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* DIFFERENCE */}
        <section className="py-24 bg-gradient-to-b from-[#020617] to-[#0b1220]">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-semibold mb-12">
              What Makes Us <span className="text-[#00B3C6]">Different</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Centralized SLA-driven delivery model",
                "Remote helpdesk + PAN India support",
                "Standardized scalable processes",
                "Modern cloud & DevOps consulting",
                "Single point of contact",
                "Faster resolution & predictable service"
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    group relative p-6 rounded-xl
                    bg-gradient-to-br from-[#0b1220] to-[#020617]
                    border border-white/10
                    hover:border-[#00B3C6]/60
                    transition-all duration-300
                    hover:-translate-y-1
                    shadow-md hover:shadow-[0_0_30px_rgba(0,179,198,0.2)]
                  "
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#00B3C6] rounded-l-xl"></div>
                  <p className="text-gray-300 text-lg pl-3">{item}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CAPABILITIES */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">

          <div className="p-6 bg-[#0b1220] rounded-lg border border-white/10">
            <h3 className="mb-3 text-[#00B3C6]">Managed IT Services</h3>
            <ul className="text-gray-400 space-y-2">
              <li>AMC</li>
              <li>PAN India Support</li>
              <li>Remote Helpdesk</li>
              <li>Server & Network Management</li>
              <li>IT Asset Lifecycle</li>
            </ul>
          </div>

          <div className="p-6 bg-[#0b1220] rounded-lg border border-white/10">
            <h3 className="mb-3 text-[#00B3C6]">Cloud & DevOps Consulting</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Cloud Migration</li>
              <li>DevOps Implementation</li>
              <li>CI/CD Automation</li>
              <li>Infrastructure as Code</li>
            </ul>
          </div>

        </div>

        {/* CTA */}
        <section className="py-28 text-center relative">

          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#0b1220] to-[#020617]" />
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#00B3C6]/20 blur-[120px] rounded-full"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your IT?
            </h2>

            <button
              onClick={() => navigate('/services')}
              className="
                px-8 py-3 rounded-lg
                bg-gradient-to-r from-[#00B3C6] to-cyan-400
                text-black font-medium
                hover:scale-105 transition
                hover:shadow-[0_0_25px_rgba(0,179,198,0.6)]
              "
            >
              Explore Services →
            </button>
          </div>

        </section>

      </div>
    </LayoutWrapper>
  );
}