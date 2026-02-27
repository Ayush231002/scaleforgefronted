import { FaEnvelope, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function FloatingContactIcons() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-4">

      {/* WhatsApp */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="w-14 h-14 flex items-center justify-center rounded-full
                   bg-[#25D366] hover:bg-[#1ebe57]
                   border-2 border-[#25D366]
                   shadow-xl hover:scale-110 transition"
      >
        <FaWhatsapp className="text-white text-2xl" />
      </a>

      {/* Mail */}
      <a
        href="mailto:contact@scaleforge.com"
        title="Mail Us"
        className="w-14 h-14 flex items-center justify-center rounded-full
                   bg-gradient-to-br from-[#00B3C6] to-[#00B3C6]
                   border-2 border-blue-500
                   shadow-xl hover:scale-110 transition"
      >
        <FaEnvelope className="text-white text-xl" />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/scaleforge"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        className="w-14 h-14 flex items-center justify-center rounded-full
                   bg-[#0A66C2] hover:bg-[#004182]
                   border-2 border-[#0A66C2]
                   shadow-xl hover:scale-110 transition"
      >
        <FaLinkedinIn className="text-white text-xl" />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/scaleforge"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        className="w-14 h-14 flex items-center justify-center rounded-full
                   bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500
                   border-2 border-pink-500
                   shadow-xl hover:scale-110 transition"
      >
        <FaInstagram className="text-white text-xl" />
      </a>

    </div>
  );
}
