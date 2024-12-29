'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const frameVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0.5 },
};

const lineVariants = {
  visible: { pathLength: 1, opacity: 1 },
  hidden: { pathLength: 0, opacity: 0 },
};

const ScanTextIcon = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Menggunakan useEffect untuk memulai animasi berulang saat komponen dimuat
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHovered(prev => !prev); // Toggle hover state setiap interval
    }, 3000); // Interval per 3 detik untuk menyeimbangkan animasi

    return () => clearInterval(interval); // Bersihkan interval saat komponen tidak digunakan
  }, []);

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          variants={frameVariants}
          d="M3 7V5a2 2 0 0 1 2-2h2"
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : [0.5, 1, 0.5], // Ubah sesuai kondisi hover
            transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
        />
        <motion.path
          variants={frameVariants}
          d="M17 3h2a2 2 0 0 1 2 2v2"
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
        />
        <motion.path
          variants={frameVariants}
          d="M21 17v2a2 2 0 0 1-2 2h-2"
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
        />
        <motion.path
          variants={frameVariants}
          d="M7 21H5a2 2 0 0 1-2-2v-2"
          animate={{
            opacity: isHovered ? [0.5, 1, 0.5] : [0.5, 1, 0.5],
            transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          }}
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={{
            pathLength: isHovered ? [0, 1, 0] : [0, 1, 0],
            opacity: isHovered ? [0, 1, 0] : [0, 1, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
          }}
          d="M7 8h8"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={{
            pathLength: isHovered ? [0, 1, 0] : [0, 1, 0],
            opacity: isHovered ? [0, 1, 0] : [0, 1, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
          }}
          d="M7 12h10"
        />
        <motion.path
          variants={lineVariants}
          initial="visible"
          animate={{
            pathLength: isHovered ? [0, 1, 0] : [0, 1, 0],
            opacity: isHovered ? [0, 1, 0] : [0, 1, 0],
            transition: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
          }}
          d="M7 16h6"
        />
      </svg>
    </div>
  );
};

export { ScanTextIcon };
