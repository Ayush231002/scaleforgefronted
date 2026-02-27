import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-[#050b1e] via-[#0b1d3a] to-[#020617] shadow-lg">
      <div className="max-w-7xl mx-auto px-12 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/Logo_Elvora_Global.png"
            alt="Elvora Global Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-xl font-semibold text-white tracking-wide">
            Elvora<span className="text-[#00B3C6]">Global</span>
          </span>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-[#00B3C6] transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-[#00B3C6] transition duration-300">About</Link>
          <Link to="/services" className="hover:text-[#00B3C6] transition duration-300">Services</Link>
          <Link to="/case-studies" className="hover:text-[#00B3C6] transition duration-300">Case Studies</Link>
          <Link to="/career" className="hover:text-[#00B3C6] transition duration-300">Career</Link>
          <Link to="/contact" className="hover:text-[#00B3C6] transition duration-300">Contact</Link>
        </nav>

        {/* CTA BUTTON */}
        <Link
          to="/contact"
          className="bg-[#00B3C6] hover:bg-[#0095a5] transition duration-300 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md"
        >
          Free Consultation
        </Link>

      </div>
    </header>
  );
}