import { motion } from 'motion/react';
import { Palette } from 'lucide-react';

interface ThemeSwitcherProps {
  onCycleTheme: () => void;
}

export default function ThemeSwitcher({ onCycleTheme }: ThemeSwitcherProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onCycleTheme}
      className="absolute top-0 right-4 sm:-right-12 sm:top-4 w-12 h-12 rounded-2xl bg-[var(--md-fab)] text-[var(--md-on-fab)] flex items-center justify-center shadow-md hover:shadow-lg transition-all group overflow-hidden cursor-pointer"
      title="切换动态色彩 (MD3 Dynamic Color)"
    >
      {/* Ripple State Layer */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity"></span>
      <Palette size={22} className="relative z-10" />
    </motion.button>
  );
}
