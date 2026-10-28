import React from 'react';
import { Lock, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

export const Footer: React.FC = () => {
  const { data, setIsAdminOpen, hasCustomData } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 relative transition-colors ${
      isLight 
        ? 'bg-slate-100/90 border-slate-200 text-slate-600' 
        : 'bg-[#0B132B] border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          
          {/* Brand & summary */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2196F3] to-[#F0445B] p-[1.5px]">
                <div className={`w-full h-full rounded-[7px] flex items-center justify-center font-mono font-bold text-xs ${
                  isLight ? 'bg-white text-slate-900' : 'bg-[#101A33] text-white'
                }`}>
                  SK
                </div>
              </div>
              <span className={`font-bold text-base tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {data.name}
              </span>
            </div>
            <p className={`text-xs max-w-md leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Data Analyst &amp; Data Engineer specializing in automated web extraction, PySpark distributed pipelines, and Agentic GenAI tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-x-6 gap-y-2 text-xs font-medium">
            <a href="#about" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>About</a>
            <a href="#skills" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>Skills</a>
            <a href="#experience" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>Experience</a>
            <a href="#projects" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>Projects</a>
            <a href="#education" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>Education</a>
            <a href="#certificates" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>Certificates</a>
            <a href="#contact" className={`${isLight ? 'hover:text-slate-900' : 'hover:text-white'} transition-colors`}>Contact</a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLight ? 'text-slate-500' : 'text-slate-500'
        }`}>
          <div className="flex items-center gap-2">
            <span>© {currentYear} {data.name}. All rights reserved.</span>
            {hasCustomData && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-mono border border-blue-500/20">
                Custom Content Loaded
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle showLabel className="py-1 px-2.5 text-[11px]" />

            <span className={isLight ? 'text-slate-300' : 'text-slate-700'}>|</span>

            {/* Discreet Admin Editor trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className={`inline-flex items-center gap-1.5 text-[11px] transition-colors ${
                isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Open Portfolio Content Editor"
              aria-label="Open Admin Content Editor"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Editor</span>
            </button>

            <span className={isLight ? 'text-slate-300' : 'text-slate-700'}>|</span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className={`inline-flex items-center gap-1 text-[11px] transition-colors ${
                isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
