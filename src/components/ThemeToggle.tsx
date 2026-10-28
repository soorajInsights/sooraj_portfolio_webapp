import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center gap-2 p-2 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2196F3] ${
        isLight
          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 shadow-xs'
          : 'bg-[#152442]/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 shadow-xs'
      } ${className}`}
      aria-label={`Switch to ${isLight ? 'dark navy' : 'high-contrast light'} theme`}
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -45, scale: 0.75, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.75, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        {isLight ? (
          <Moon className="w-4 h-4 text-[#2196F3]" />
        ) : (
          <Sun className="w-4 h-4 text-amber-400" />
        )}
      </motion.div>
      {showLabel && (
        <span className="text-xs font-medium">
          {isLight ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};
