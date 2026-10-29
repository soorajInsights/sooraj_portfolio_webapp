import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t py-8 text-center relative transition-colors ${
      isLight 
        ? 'bg-slate-100/90 border-slate-200 text-slate-500' 
        : 'bg-[#0B132B] border-slate-800 text-slate-500'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs sm:text-sm font-normal">
          © {currentYear} {data.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
