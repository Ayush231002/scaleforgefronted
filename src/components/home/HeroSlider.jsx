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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[520px] h-[520px] flex items-center justify-center perspective-[1200px]">

      {/* Soft Background Aura */}
      <div className="absolute w-[650px] h-[650px] rounded-full 
      bg-gradient-to-r from-[#00B3C6]/20 via-purple-500/20 to-[#1ECAD3]/20 
      blur-3xl"></div>

      <div className="relative w-full h-full flex items-center justify-center">

        {images.map((img, i) => {
          const position = (i - index + images.length) % images.length;
          if (position > 2) return null;

          return (
            <motion.div
              key={img}
              className="absolute"
              animate={{
                x: position === 0 ? 0 : position === 1 ? 100 : 200,
                y: position === 0 ? 0 : position === 1 ? 25 : 50,
                scale: position === 0 ? 1 : position === 1 ? 0.9 : 0.8,
                rotateY: position === 0 ? 0 : -25,
                opacity: position === 0 ? 1 : 0.6,
                zIndex: 10 - position,
              }}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Lighting Wrapper */}
              <div className="relative">

                {/* Side Glow Lighting */}
                <div className="absolute -inset-1 rounded-3xl 
                bg-gradient-to-r from-[#00B3C6]/40 via-transparent to-purple-500/40 
                blur-xl opacity-70"></div>

                {/* Animated Light Sweep */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r 
                  from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <img
                  src={img}
                  alt="stack"
                  className="relative w-72 h-72 rounded-3xl object-cover 
                  border border-[#1ECAD3]/60 shadow-[0_0_50px_rgba(0,179,198,0.3)]"
                />
              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}