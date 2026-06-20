import { motion, Variants } from 'motion/react';

interface LinkButtonProps {
  href: string;
  label: string;
  variants?: Variants;
}

export default function LinkButton({ href, label, variants }: LinkButtonProps) {
  return (
    <motion.a
      href={href}
      variants={variants}
      whileHover={{
        scale: 1.02,
        y: -2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      whileTap={{
        scale: 0.97,
        y: 0,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
      className="relative w-full py-[15px] sm:py-4 bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] rounded-full text-center text-[16px] font-medium shadow-none transition-all duration-300 ease-in-out overflow-hidden group"
    >
      {/* MD3 Hover/Pressed State Layer Overlay */}
      <span className="absolute inset-0 bg-[var(--md-on-primary-container)] opacity-0 group-hover:opacity-[0.08] group-active:opacity-[0.12] transition-opacity duration-200"></span>
      <span className="relative z-10 flex items-center justify-center gap-2 tracking-[0.05em]">
        {label}
      </span>
    </motion.a>
  );
}
