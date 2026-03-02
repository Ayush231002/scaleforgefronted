import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
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
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[520px] h-[520px] flex items-center justify-center perspective-[1200px]">

      {/* Glow Background */}
      <div className="absolute w-[600px] h-[600px] rounded-full 
      bg-gradient-to-r from-[#00B3C6]/20 via-purple-500/20 to-[#1ECAD3]/20 
      blur-3xl"></div>

      {/* 3D Card Stack */}
      <div className="relative w-full h-full flex items-center justify-center">

        {images.map((img, i) => {
          const position = (i - index + images.length) % images.length;

          if (position > 2) return null;

          return (
            <motion.img
              key={img}
              src={img}
              className="absolute w-72 h-72 rounded-3xl object-cover border border-[#1ECAD3]/50 shadow-xl"
              animate={{
                x: position === 0 ? 0 : position === 1 ? 80 : 160,
                y: position === 0 ? 0 : position === 1 ? 20 : 40,
                scale: position === 0 ? 1 : position === 1 ? 0.9 : 0.8,
                rotateY: position === 0 ? 0 : -20,
                opacity: position === 0 ? 1 : 0.6,
                zIndex: 10 - position,
              }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            />
          );
        })}

      </div>

    </div>
  );
}