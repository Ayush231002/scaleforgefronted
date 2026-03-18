import LayoutWrapper from '../layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <LayoutWrapper>
      <div className="bg-[#0b0f1a] text-white">

        {/* HERO */}
        <section className="relative py-28 px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1a] via-[#0d1b2a] to-[#0b0f1a]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6">
              About <span className="text-[#00B3C6]">Elvora Global</span>
            </h1>
            <p className="text-gray-400 text-lg">
              End-to-end IT infrastructure, managed services and cloud operations company helping businesses build reliable, secure and scalable technology environments.
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#00B3C6]">Who We Are</h2>
            <p className="text-gray-400 mb-3">
              Elvora Global Pvt. Ltd. is an end-to-end IT infrastructure, managed services and cloud operations company helping businesses build reliable, secure and scalable technology environments.
            </p>
            <p className="text-gray-400">
              We serve as a single, accountable technology partner for organizations looking to simplify IT operations, reduce downtime and enable long-term digital growth.
            </p>
          </div>
        </motion.section>

        {/* FOUNDATION */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="max-w-6xl mx-auto px-6 pb-16"
        >
          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#00B3C6]">Our Foundation</h2>
            <p className="text-gray-400 mb-3">
              Elvora Global Pvt. Ltd. was incorporated in 2026 with a vision to build a structured, scalable and process-driven technology services organization.
            </p>
            <p className="text-gray-400 mb-3">
              The foundation of the company comes from 18+ years of hands-on industry experience delivering IT infrastructure support and managed services across India.
            </p>
            <p className="text-gray-400">
              Prior to Elvora Global, these services were delivered under the brand “Entire IT Solution”, establishing strong execution capability and long-term client relationships.
            </p>
          </div>
        </motion.section>

        {/* ENTERPRISE */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="max-w-6xl mx-auto px-6 pb-16"
        >
          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-[#00B3C6]">Enterprise Experience</h2>

            <div className="flex flex-wrap gap-4">
              {["IBM","Wipro","Capgemini","HCL","Pfizer","Lloyds Banking Group","Expedia Group"].map((item,i)=>(
                <div key={i} className="px-4 py-2 bg-[#0d1b2a] rounded-lg border border-white/10 hover:border-[#00B3C6]/50 transition">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* DIFFERENCE */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-semibold mb-8">What Makes Us Different</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Centralized SLA-driven service delivery model",
              "Remote helpdesk + PAN India onsite support",
              "Standardized service processes",
              "Single point of contact",
              "Faster resolution time",
              "Predictable service experience"
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                className="p-6 rounded-xl bg-[#111827] border border-white/10 hover:border-[#00B3C6]/50 transition shadow-md hover:shadow-xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-2 gap-8">

          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#00B3C6]">Managed IT Services</h3>
            <ul className="text-gray-400 space-y-2">
              <li>AMC</li>
              <li>PAN India Onsite IT Support</li>
              <li>Remote Helpdesk</li>
              <li>Server & Network Management</li>
              <li>IT Asset Lifecycle</li>
              <li>Dedicated Engineers</li>
            </ul>
          </div>

          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-[#00B3C6]">Cloud & DevOps Consulting</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Cloud Migration</li>
              <li>DevOps Implementation</li>
              <li>CI/CD Automation</li>
              <li>Infrastructure as Code</li>
              <li>SRE & Monitoring</li>
            </ul>
          </div>

        </section>

        {/* APPROACH */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-[#00B3C6]">Our Approach</h2>
            <ul className="text-gray-400 space-y-2">
              <li>✔ Proactive, not reactive</li>
              <li>✔ Standardized, not person-dependent</li>
              <li>✔ Scalable, not location-bound</li>
              <li>✔ Business-aligned approach</li>
            </ul>
          </div>
        </section>

        {/* VISION + MISSION */}
        <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-8">

          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-[#00B3C6]">Vision</h3>
            <p className="text-gray-400">
              To become a trusted nationwide technology partner for organizations seeking reliable managed services and modern cloud transformation.
            </p>
          </div>

          <div className="bg-[#111827] p-8 rounded-xl border border-white/10 shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-[#00B3C6]">Mission</h3>
            <p className="text-gray-400">
              To simplify and standardize IT operations through integrated infrastructure, support and cloud solutions — delivered with accountability, consistency and speed.
            </p>
          </div>

        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center border-t border-white/10">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your IT?</h2>
          <Button
            onClick={() => navigate('/services')}
            className="bg-gradient-to-r from-[#00B3C6] to-purple-500 px-6 py-3 hover:scale-105 transition"
          >
            Explore Services <ArrowRight className="ml-2" />
          </Button>
        </section>

      </div>
    </LayoutWrapper>
  );
}