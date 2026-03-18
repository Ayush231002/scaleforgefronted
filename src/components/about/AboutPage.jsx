import LayoutWrapper from '../layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Server,
  Cloud
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  const fade = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <LayoutWrapper>
      <div className="bg-[#020617] text-white relative overflow-hidden">

        {/* 🔥 BACKGROUND GLOW */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[500px] h-[500px] bg-[#00B3C6]/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]"></div>
        </div>

        {/* HERO */}
        <section className="py-20 px-6 bg-gradient-to-r from-[#031525] to-[#020617]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <motion.div initial="hidden" animate="show" variants={fade}>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
                About <span className="text-[#00B3C6]">Elvora Global</span>
              </h1>

              <p className="text-gray-300 text-lg mb-5 leading-relaxed">
                End-to-end IT infrastructure, managed services and cloud operations company helping businesses build reliable, secure and scalable technology environments.
              </p>

              <button
                onClick={() => navigate('/services')}
                className="px-6 py-3 bg-gradient-to-r from-[#00B3C6] to-cyan-400 text-black rounded-xl font-medium hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition duration-300"
              >
                Explore Services <ArrowRight className="inline ml-2"/>
              </button>

              <div className="flex flex-wrap gap-3 mt-6">
                {[
                  { text: "Reliable", icon: <Shield size={14}/> },
                  { text: "Secure", icon: <Shield size={14}/> },
                  { text: "Scalable", icon: <Globe size={14}/> },
                  { text: "Enterprise Ready", icon: <Zap size={14}/> }
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full text-sm text-gray-300">
                    <span className="p-1 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/30">
                      {item.icon}
                    </span>
                    {item.text}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fade} initial="hidden" whileInView="show"
              className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-cyan-500/10">
              <h3 className="text-xl font-semibold text-[#00B3C6] mb-3">18+ Years Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                Enterprise-grade IT infrastructure, cloud and DevOps expertise across global organizations.
              </p>
            </motion.div>

          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-14 space-y-14">

          <motion.div variants={fade} initial="hidden" whileInView="show">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Who We Are</h2>
            <p className="text-gray-300 mb-3 leading-relaxed">
              Elvora Global Pvt. Ltd. is an end-to-end IT infrastructure, managed services and cloud operations company helping businesses build reliable, secure and scalable technology environments.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We serve as a single, accountable technology partner for organizations looking to simplify IT operations, reduce downtime and enable long-term digital growth.
            </p>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="show"
            className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold text-[#00B3C6] mb-3">Our Foundation</h2>

            <p className="text-gray-300 mb-2 leading-relaxed">
              Elvora Global Pvt. Ltd. was incorporated in 2026 with a vision to build a structured, scalable and process-driven technology services organization.
            </p>

            <p className="text-gray-300 mb-2 leading-relaxed">
              The foundation of the company comes from 18+ years of hands-on industry experience delivering IT infrastructure support and managed services across India.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Prior to incorporation, services were delivered under “Entire IT Solution”.
            </p>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="show">
            <h2 className="text-3xl font-semibold tracking-tight mb-5">Enterprise Experience</h2>

            <div className="flex flex-wrap gap-3">
              {["IBM","Wipro","Capgemini","HCL","Pfizer","Lloyds Banking Group","Expedia Group"].map((item,i)=>(
                <span key={i} className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-gray-300">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* DIFFERENCE */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-semibold tracking-tight mb-8">
              What Makes Us <span className="text-[#00B3C6]">Different</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {text:"Centralized SLA-driven delivery", icon:<Server/>},
                {text:"PAN India onsite support", icon:<Globe/>},
                {text:"Standardized processes", icon:<Shield/>},
                {text:"Cloud & DevOps consulting", icon:<Cloud/>},
                {text:"Single point of contact", icon:<Zap/>},
                {text:"Faster resolution & predictable service", icon:<Zap/>}
              ].map((item,i)=>(
                <motion.div key={i} variants={fade} initial="hidden" whileInView="show"
                  className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">

                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30">
                    {item.icon}
                  </div>

                  <p className="text-gray-300">{item.text}</p>

                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-5">
            Ready to Transform Your IT?
          </h2>

          <button
            onClick={() => navigate('/services')}
            className="px-8 py-3 bg-gradient-to-r from-[#00B3C6] to-cyan-400 text-black rounded-xl font-medium hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 transition duration-300"
          >
            Explore Services →
          </button>
        </section>

      </div>
    </LayoutWrapper>
  );
}