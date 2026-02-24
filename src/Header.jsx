import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-linear-to-r from-[#050b1e] via-[#0b1d3a] to-[#020617]">
      <div className="max-w-7xl mx-auto px-12 py-7 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src="/Logo_Elvora_Global.png" alt="ScaleForge Logo" className="h-16 w-auto" />
          <span className="text-2xl font-bold text-white tracking-wide">
            Scale<span className="text-orange-500">Forge</span>
          </span>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-gray-200">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/about" className="hover:text-orange-400">About</Link>
          <Link to="/services" className="hover:text-orange-400">Services</Link>
          <Link to="/case-studies" className="hover:text-orange-400">Case Studies</Link>
          <Link to="/career" className="hover:text-orange-400">Career</Link>
          <Link to="/contact" className="hover:text-orange-400">Contact</Link>
        </nav>

        <Link
          to="/contact"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold"
        >
          Free Consultation
        </Link>

      </div>
    </header>
  );
}
