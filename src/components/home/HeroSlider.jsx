import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/images/first.jpeg",
  "/images/second.jpeg",
  "/images/third.jpeg",
  "/images/fourth.jpeg",
  "/images/five.jpeg",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={heroImages[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl border border-[#1ECAD3]/30 pointer-events-none"></div>
    </div>
  );
}