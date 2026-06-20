import { useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { THEMES } from './config/themes';
import { links } from './config/links';
import Logo from './components/Logo';
import SplashScreen from './components/SplashScreen';
import ThemeSwitcher from './components/ThemeSwitcher';
import LinkButton from './components/LinkButton';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    // 模拟Material Design的启动屏加载时间
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const currentTheme = THEMES[themeIndex];

  const handleCycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div
      style={currentTheme.colors as CSSProperties}
      className="min-h-screen flex flex-col items-center justify-center bg-[var(--md-surface)] text-[var(--md-on-surface)] transition-colors duration-700 ease-in-out font-sans antialiased selection:bg-[var(--md-primary-container)] selection:text-[var(--md-on-primary-container)]"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen />
        ) : (
          <motion.div
            key="content"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center w-full max-w-sm px-6 py-8 sm:py-12 md:max-w-md lg:max-w-lg relative"
          >
            {/* MD3 Dynamic Theme Switcher FAB */}
            <ThemeSwitcher onCycleTheme={handleCycleTheme} />

            {/* Logo */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              className="w-[124px] h-[124px] sm:w-[140px] sm:h-[140px] flex items-center justify-center mb-5 sm:mb-7 drop-shadow-sm hover:drop-shadow-xl transition-all cursor-pointer"
            >
              <Logo />
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl tracking-[0.16em] font-medium mb-3 sm:mb-4 text-center transition-colors duration-700"
            >
              NovaClient
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-[14px] sm:text-[16px] tracking-[0.25em] text-[var(--md-on-surface-variant)] font-normal mb-10 sm:mb-12 text-center transition-colors duration-700"
            >
              高效 · 简洁 · 实用
            </motion.p>

            {/* Links - MD3 Tonal Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col w-full max-w-[240px] sm:max-w-[280px] gap-4 sm:gap-5"
            >
              {links.map((link, i) => (
                <LinkButton
                  key={i}
                  href={link.href}
                  label={link.label}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
