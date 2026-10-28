import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
];

export const Navbar: React.FC = () => {
  const { data, setIsResumeModalOpen } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3.5'
            : 'bg-[#0B132B]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2196F3] rounded-lg p-1"
            aria-label={`${data.name} Home`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#F0445B] p-[1.5px] shadow-sm shadow-[#2196F3]/20 group-hover:shadow-md group-hover:shadow-[#2196F3]/40 transition-all">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center transition-colors ${
                isLight ? 'bg-white' : 'bg-[#101A33]'
              }`}>
                <span className="font-mono font-bold text-sm bg-gradient-to-r from-[#2196F3] to-[#F0445B] bg-clip-text text-transparent">
                  SK
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-semibold tracking-tight group-hover:text-[#2196F3] transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {data.name}
              </span>
              <span className={`text-[11px] tracking-wide font-mono hidden sm:block ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Data Engineer &amp; GenAI
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-1 border rounded-full px-3 py-1.5 backdrop-blur-md transition-colors ${
            isLight 
              ? 'bg-slate-100/90 border-slate-200/90 shadow-xs' 
              : 'bg-[#131F38]/70 border-slate-800/80'
          }`}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? isLight
                        ? 'bg-gradient-to-r from-[#2196F3]/15 to-[#F0445B]/15 text-[#2196F3] border border-[#2196F3]/40 font-semibold'
                        : 'bg-gradient-to-r from-[#2196F3]/20 to-[#F0445B]/20 text-white border border-[#2196F3]/40 shadow-xs'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: Theme Switcher + Resume + Contact */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300/80 shadow-xs'
                  : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white border-slate-700/60'
              }`}
              aria-label="View Resume inside portfolio"
              title="View Resume in-page"
            >
              <FileText className="w-3.5 h-3.5 text-[#2196F3]" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B] hover:brightness-110 shadow-sm shadow-[#2196F3]/25 transition-all"
            >
              <span>Contact</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile menu button and theme switcher */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isLight 
                  ? 'bg-white border-slate-200 text-slate-700' 
                  : 'bg-slate-800/80 border-slate-700 text-slate-300'
              }`}
              aria-label="View Resume inside portfolio"
              title="View Resume in-page"
            >
              <FileText className="w-4 h-4 text-[#2196F3]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#2196F3] ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`sm:hidden mt-3 p-4 border rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50'
              : 'bg-[#101A33] border-slate-800 shadow-black/60'
          }`}>
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? isLight
                          ? 'bg-blue-50 text-[#2196F3] font-semibold border border-blue-200'
                          : 'bg-gradient-to-r from-[#2196F3]/25 to-[#F0445B]/25 text-white border border-[#2196F3]/30'
                        : isLight
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className={`pt-3 mt-2 border-t flex flex-col gap-2 ${
                isLight ? 'border-slate-200' : 'border-slate-800'
              }`}>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsResumeModalOpen(true);
                  }}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#2196F3]" />
                  <span>View Resume</span>
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B]"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
