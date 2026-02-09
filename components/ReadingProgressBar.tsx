"use client"; // Важно: Това казва на Next.js, че този файл е за браузъра

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgressBar() {
  // Следи прогреса на скролване (от 0 до 1)
  const { scrollYProgress } = useScroll();
  
  // Прави движението на линията "мазно"
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#00ff41] origin-left z-[100] shadow-[0_0_15px_#00ff41]"
      style={{ scaleX }}
    />
  );
}