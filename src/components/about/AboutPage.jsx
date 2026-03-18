import LayoutWrapper from '../layout/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Server,
  Cloud,
  Cpu,
  GitBranch,
  Lock,
  Activity,
  Database,
  Terminal,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  const fade = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };

  return (
    <LayoutWrapper>
      <div className="bg-[#02040f] text-white relative overflow-hidden">

        {/* ══════════════════════════════════════
            AMBIENT BACKGROUND SYSTEM
        ══════════════════════════════════════ */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute w-[900px] h-[900px] bg-cyan-500/8 blur-[180px] rounded-full -top-64 -left-64" />
          <div className="absolute w-[700px] h-[700px] bg-blue-600/10 blur-[160px] rounded-full top-1/2 -right-48" />
          <div className="absolute w-[500px] h-[500px] bg-violet-600/8 blur-[140px] rounded-full bottom-0 left-1/3" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
            style={{
              background: 'repeating-linear-gradient(-45deg, #00e5ff, #00e5ff 1px, transparent 1px, transparent 24px)'
            }}
          />
        </div>

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <section className="relative pt-20 pb-16 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#020c1b]/90 via-[#02040f]/70 to-[#02040f] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          <div className="max-w-7xl mx-auto relative z-10">

            <motion.div initial="hidden" animate="show" variants={fade} className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">Cloud Infrastructure Specialists</span>
              </div>
              <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-cyan-500/40 to-transparent" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* LEFT */}
              <motion.div initial="hidden" animate="show" variants={stagger}>
                <motion.h1 variants={fade} className="text-5xl md:text-[3.75rem] font-black tracking-tight leading-[1.04] mb-6">
                  <span className="block text-white">Dominate the Cloud.</span>
                  <span className="block text-white">Own Your</span>
                  <span className="block relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#00e5ff] to-blue-400">Infrastructure.</span>
                    <span className="absolute -bottom-1 left-0 w-3/4 h-[2px] bg-gradient-to-r from-cyan-400/70 to-transparent" />
                  </span>
                </motion.h1>

                <motion.p variants={fade} className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                  Elvora Global engineers <span className="text-cyan-400 font-semibold">battle-hardened cloud systems</span> — from zero-downtime migrations to fully automated DevOps pipelines. We don't just manage IT. We weaponize it for your growth.
                </motion.p>

                <motion.div variants={fade} className="flex items-center gap-4 mb-10">
                  <button
                    onClick={() => navigate('/services')}
                    className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-black overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                    style={{ background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)' }}
                  >
                    <span className="relative z-10">Deploy Now</span>
                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button
                    onClick={() => navigate('/services')}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-cyan-400 border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                  >
                    View Services
                  </button>
                </motion.div>

                <motion.div variants={fade} className="flex flex-wrap gap-2.5">
                  {[
                    { text: '99.99% Uptime', icon: <Activity size={11} /> },
                    { text: 'Zero-Trust Security', icon: <Lock size={11} /> },
                    { text: 'PAN India Coverage', icon: <Globe size={11} /> },
                    { text: 'Enterprise-Grade', icon: <Shield size={11} /> }
                  ].map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-gray-300 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-300">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-sm shadow-cyan-500/50">{item.icon}</span>
                      {item.text}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              {/* RIGHT — COMMAND CARD */}
              <motion.div
                initial="hidden" animate="show" variants={fade}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/50 via-blue-600/20 to-violet-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
                <div className="relative rounded-2xl border border-white/[0.08] bg-[#050d1a]/80 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/60">
                  <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-gray-500 font-mono">elvora_status.dashboard</span>
                  </div>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p className="text-xs text-cyan-400/70 font-mono uppercase tracking-widest mb-1">// System Status</p>
                        <h3 className="text-3xl font-black text-white">18+ Years</h3>
                        <p className="text-sm text-gray-400 mt-0.5">Engineering Cloud Excellence</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-xs font-semibold">LIVE</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { value: '500+', label: 'Deployments', icon: <GitBranch size={14} /> },
                        { value: '10K+', label: 'Systems', icon: <Server size={14} /> },
                        { value: '7+', label: 'Fortune Corps', icon: <Award size={14} /> }
                      ].map((s, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                          <div className="flex justify-center text-cyan-400 mb-1.5">{s.icon}</div>
                          <p className="text-xl font-black text-white leading-none">{s.value}</p>
                          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {[
                      { label: 'Infrastructure Health', val: 99, color: 'from-green-400 to-cyan-400' },
                      { label: 'Cloud Availability', val: 100, color: 'from-cyan-400 to-blue-500' },
                      { label: 'Security Score', val: 97, color: 'from-blue-400 to-violet-500' }
                    ].map((m, i) => (
                      <div key={i} className="mb-3 last:mb-0">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400 font-mono">{m.label}</span>
                          <span className="text-white font-bold">{m.val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${m.val}%` }}
                            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TRUST BAR
        ══════════════════════════════════════ */}
        <section className="py-6 px-6 border-y border-white/[0.05] bg-white/[0.01] backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
              {[
                { icon: <Star size={18} className="fill-yellow-400 text-yellow-400" />, value: '4.9 / 5', label: 'Client Satisfaction', sub: 'Avg. rating' },
                { icon: <Users size={18} className="text-cyan-400" />, value: '1,000+', label: 'Happy Clients', sub: 'Across industries' },
                { icon: <Globe size={18} className="text-blue-400" />, value: 'PAN India', label: 'Support Network', sub: 'Onsite & remote' },
                { icon: <TrendingUp size={18} className="text-violet-400" />, value: '99.99%', label: 'Uptime SLA', sub: 'Guaranteed' }
              ].map((t, i) => (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-300">
                    {t.icon}
                  </div>
                  <div>
                    <p className="text-base font-black text-white leading-none">{t.value}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WHO WE ARE + FOUNDATION + CLIENTS
        ══════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-6 py-14 space-y-12">

          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            
            <h2 className="text-4xl font-black tracking-tight mb-5 leading-tight">
              We Are the Engineers<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Behind Your Uptime.</span>
            </h2>
            <div className="space-y-4 max-w-3xl">
              <p className="text-gray-300 text-base leading-relaxed">
                Elvora Global Pvt. Ltd. is a <span className="text-white font-semibold">cloud-first IT infrastructure and managed services powerhouse</span> — built by engineers who've operated inside the world's most demanding enterprise environments. We architect, automate, and own your infrastructure so you can focus on what you build.
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                We are not a vendor. We are your <span className="text-cyan-400 font-semibold">single, accountable technology command center</span> — delivering predictable outcomes, zero excuses, and measurable ROI across every engagement.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35 }}
            className="group relative"
          >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/25 via-blue-600/10 to-violet-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-7 rounded-2xl border border-white/[0.07] bg-[#050d1a]/60 backdrop-blur-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center">
                  <Database size={16} className="text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Our Foundation</h2>
              </div>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Incorporated in 2026, Elvora Global was built with one mission: to transform how Indian enterprises operate cloud infrastructure — with <span className="text-white font-medium">military precision, enterprise discipline, and startup velocity.</span>
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our foundation runs 18+ years deep — hands-on delivery across mission-critical IT infrastructure for Fortune-listed companies. Prior to incorporation, this pedigree operated under <span className="text-cyan-400">"Entire IT Solution"</span>.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <h2 className="text-3xl font-black tracking-tight mb-2">Battle-Tested Inside</h2>
            
            <div className="flex flex-wrap gap-3">
              {['IBM', 'Wipro', 'Capgemini', 'HCL', 'Pfizer', 'Lloyds Banking Group', 'Expedia Group'].map((item, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-md border border-white/[0.07] rounded-xl text-gray-300 text-sm font-medium hover:border-cyan-500/40 hover:text-white hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-default"
                >
                  <CheckCircle size={12} className="text-cyan-400/60" />
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════
            WHAT MAKES US DIFFERENT
        ══════════════════════════════════════ */}
        <section className="py-14 relative">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/60 to-transparent" />
          <div className="max-w-6xl mx-auto px-6">

            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mb-10">
              
              <h2 className="text-4xl font-black tracking-tight">
                Why Enterprises{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Choose Elvora</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { text: 'Cloud-First Infrastructure Strategy', desc: 'Every solution designed natively for cloud scale, resilience, and cost efficiency.', icon: <Cloud size={18} />, accent: 'from-cyan-400 to-blue-500' },
                { text: 'Zero-Downtime Deployments', desc: 'Blue-green, canary, and rolling strategies that eliminate maintenance windows.', icon: <Zap size={18} />, accent: 'from-yellow-400 to-orange-500' },
                { text: 'Automated DevOps Pipelines', desc: 'CI/CD at enterprise scale — code to production in minutes, not days.', icon: <GitBranch size={18} />, accent: 'from-violet-400 to-purple-600' },
                { text: 'PAN India Cloud Support', desc: 'Onsite engineers + 24/7 remote helpdesk covering every major city and region.', icon: <Globe size={18} />, accent: 'from-cyan-400 to-teal-500' },
                { text: 'Enterprise Security & Compliance', desc: 'Zero-trust architecture, VAPT, and audit-ready compliance frameworks built in.', icon: <Lock size={18} />, accent: 'from-red-400 to-rose-600' },
                { text: 'Predictable SLA-Driven Delivery', desc: 'Contractual uptime guarantees with centralized accountability and real-time reporting.', icon: <Activity size={18} />, accent: 'from-green-400 to-cyan-500' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl hover:border-cyan-500/25 hover:bg-[#050d1a]/80 hover:shadow-xl hover:shadow-cyan-500/8 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className={`relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} p-[1px]`}>
                    <div className="w-full h-full rounded-[11px] bg-[#050d1a] flex items-center justify-center">
                      <span className={`text-transparent bg-clip-text bg-gradient-to-br ${item.accent}`}>{item.icon}</span>
                    </div>
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.accent} opacity-20 blur-md`} />
                  </div>

                  <div className="relative z-10">
                    <p className="text-white font-bold text-sm mb-1.5">{item.text}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            CLOUD CAPABILITIES
        ══════════════════════════════════════ */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">

            <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
              
              
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Cpu size={20} />,
                  title: 'Managed IT Services',
                  accent: 'from-cyan-400 to-blue-500',
                  items: [
                    { label: 'AMC & Preventive Maintenance', tag: 'SLA' },
                    { label: 'PAN India Onsite Support', tag: 'Coverage' },
                    { label: '24/7 Remote Helpdesk', tag: 'Always-On' },
                    { label: 'Server & Network Management', tag: 'Mission-Critical' },
                    { label: 'IT Asset Lifecycle', tag: 'Full-Lifecycle' }
                  ]
                },
                {
                  icon: <Cloud size={20} />,
                  title: 'Cloud & DevOps Engineering',
                  accent: 'from-violet-400 to-blue-600',
                  items: [
                    { label: 'Cloud Migration & Modernization', tag: 'AWS / Azure' },
                    { label: 'DevOps & CI/CD Automation', tag: 'Pipeline' },
                    { label: 'Infrastructure as Code', tag: 'Terraform' },
                    { label: 'Monitoring & Observability', tag: 'Real-Time' },
                    { label: 'Security & Compliance', tag: 'Zero-Trust' }
                  ]
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.35 }}
                  className="group relative rounded-2xl border border-white/[0.07] bg-[#050d1a]/50 backdrop-blur-2xl overflow-hidden hover:border-cyan-500/20 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
                >
                  <div className={`h-[2px] bg-gradient-to-r ${card.accent}`} />
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/[0.015] to-transparent pointer-events-none" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${card.accent} p-[1px]`}>
                        <div className="w-full h-full rounded-[11px] bg-[#050d1a] flex items-center justify-center text-white">{card.icon}</div>
                      </div>
                      <h3 className="text-white font-bold text-base">{card.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-1 h-1 rounded-full bg-gradient-to-br ${card.accent} flex-shrink-0`} />
                            <span className="text-gray-300 text-sm">{item.label}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.07] bg-white/[0.03] text-gray-500 font-mono flex-shrink-0 ml-2">{item.tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA
        ══════════════════════════════════════ */}
        <section className="py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[800px] h-[400px] bg-cyan-500/8 blur-[120px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[400px] h-[400px] bg-violet-600/6 blur-[100px] rounded-full right-1/4 top-0" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative z-10 max-w-2xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-cyan-500/25 bg-cyan-500/5">
              <Zap size={12} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">Ready to Deploy</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
              Your Infrastructure.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#00e5ff] to-blue-400">
                Engineered to Dominate.
              </span>
            </h2>

            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Stop tolerating downtime, security gaps, and IT chaos. Let Elvora Global architect a cloud infrastructure that performs when it matters most.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate('/services')}
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-black overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                style={{ background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)' }}
              >
                <span className="relative z-10">Explore Services</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={14} className="text-green-400" />
                No lock-in contracts
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </LayoutWrapper>
  );
}
