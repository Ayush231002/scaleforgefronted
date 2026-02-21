import LayoutWrapper from "../layout/LayoutWrapper";
import FloatingContactIcons from "./FloatingContactIcons";

export default function ContactPage() {
  return (
    <LayoutWrapper>
      {/* Floating icons – only contact page */}
      <FloatingContactIcons />

      <section className="min-h-screen bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] text-white px-4">

        {/* TOP HEADING */}
        <div className="pt-28 pb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Connect with us for scalable DevOps solutions, powerful data analytics,
            and high-performance web development.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 pb-24">

          {/* MAIL */}
          <a
            href="mailto:contact@scaleforge.com"
            className="bg-white/5 backdrop-blur-lg border border-white/10 
                       rounded-2xl p-8 text-center shadow-xl 
                       hover:scale-105 transition cursor-pointer"
          >
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-lg font-semibold mb-2">Mail Us</h3>
            <p className="text-gray-300 text-sm">contact@scaleforge.com</p>
          </a>

          {/* LOCATION */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Noida,+Uttar+Pradesh,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/5 backdrop-blur-lg border border-white/10 
                       rounded-2xl p-8 text-center shadow-xl 
                       hover:scale-105 transition cursor-pointer"
          >
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-gray-300 text-sm">
              Noida, Uttar Pradesh, India
            </p>
            <p className="text-xs text-orange-400 mt-2">
              View on Google Maps →
            </p>
          </a>

          {/* SUPPORT */}
          <div
            className="bg-white/5 backdrop-blur-lg border border-white/10 
                       rounded-2xl p-8 text-center shadow-xl"
          >
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-gray-300 text-sm">24x7 Technical Support</p>
          </div>

        </div>

        {/* GOOGLE MAP EMBED */}
        <div className="max-w-6xl mx-auto pb-24">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              title="ScaleForge Location"
              src="https://www.google.com/maps?q=Noida,Uttar+Pradesh,India&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        
      </section>
    </LayoutWrapper>
  );
}
