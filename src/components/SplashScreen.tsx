import { motion } from 'motion/react';
import Logo from './Logo';

export default function SplashScreen() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] drop-shadow-xl"
      >
        <Logo />
      </motion.div>
    </motion.div>
  );
}
