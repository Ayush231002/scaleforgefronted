import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/first.jpeg",
  "/images/second.jpeg",
  "/images/third.jpeg",
  "/images/fourth.jpeg",
  "/images/five.jpeg",
];

export default function HeroSlider() {
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-96 h-96 flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#00B3C6]/20 via-purple-500/20 to-[#1ECAD3]/20 blur-3xl animate-pulse"></div>

      {/* Rotating Orbit Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
        className="absolute w-full h-full"
      >
        {images.map((img, i) => {
          const angle = (i * 360) / images.length;
          const radius = 160;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                transform: `
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(-${angle}deg)
                `,
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
            >
              <img
                src={img}
                alt="orbit"
                className="w-20 h-20 rounded-xl object-cover border border-[#1ECAD3]/40 shadow-lg"
              />
            </div>
          );
        })}
      </motion.div>

      {/* Center Main Image */}
      <motion.img
        key={centerIndex}
        src={images[centerIndex]}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-52 h-52 rounded-2xl object-cover border border-[#1ECAD3]/50 shadow-[0_0_40px_rgba(0,179,198,0.3)] z-10"
      />
    </div>
  );
}