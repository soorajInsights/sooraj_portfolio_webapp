import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin, Phone, MapPin, Database } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const photoVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: shouldReduceMotion ? 0 : 0.2 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background ambient lighting effects matching the reference palette */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] blur-[120px] pointer-events-none -z-10 rounded-full transition-opacity ${
        isLight
          ? 'bg-gradient-to-tr from-[#2196F3]/10 via-[#7B61FF]/10 to-[#F0445B]/10 opacity-70'
          : 'bg-gradient-to-tr from-[#2196F3]/15 via-[#7B61FF]/10 to-[#F0445B]/15'
      }`} />
      <div className={`absolute top-20 right-10 w-72 h-72 blur-[100px] pointer-events-none -z-10 rounded-full ${
        isLight ? 'bg-[#2196F3]/8' : 'bg-[#2196F3]/10'
      }`} />
      <div className={`absolute bottom-10 left-10 w-80 h-80 blur-[110px] pointer-events-none -z-10 rounded-full ${
        isLight ? 'bg-[#F0445B]/8' : 'bg-[#F0445B]/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro text and actions with staggered reveal */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants}>
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-6 shadow-sm transition-colors ${
                isLight
                  ? 'bg-blue-50/90 border border-blue-200 text-[#2196F3] shadow-blue-500/5'
                  : 'bg-[#152442]/90 border border-[#2196F3]/30 text-[#2196F3] shadow-[#2196F3]/10'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2196F3] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2196F3]"></span>
                </span>
                <span>{data.eyebrow}</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 transition-colors ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Hi, I’m{' '}
              <span className="bg-gradient-to-r from-[#2196F3] via-[#8B5CF6] to-[#F0445B] bg-clip-text text-transparent">
                {data.name}
              </span>
            </motion.h1>

            {/* Sub-headline / Tagline */}
            <motion.p
              variants={itemVariants}
              className={`text-lg sm:text-xl font-medium mb-4 flex items-center gap-2 transition-colors ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              <Database className="w-5 h-5 text-[#2196F3] shrink-0" />
              <span>{data.tagline}</span>
            </motion.p>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className={`text-base leading-relaxed mb-8 max-w-2xl transition-colors ${
                isLight ? 'text-slate-600' : 'text-slate-300/90'
              }`}
            >
              {data.summary}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B] hover:brightness-110 shadow-lg shadow-[#2196F3]/25 transition-all text-sm w-full sm:w-auto focus:ring-2 focus:ring-[#2196F3]"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={data.resumeDownloadUrl}
                download={data.resumeFileName}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm w-full sm:w-auto shadow-sm border ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300/90 hover:border-slate-400'
                    : 'bg-[#152442] hover:bg-[#1a2d52] text-slate-200 hover:text-white border-slate-700 hover:border-slate-500'
                }`}
              >
                <Download className="w-4 h-4 text-[#2196F3]" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className={`inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isLight ? 'text-slate-600 hover:text-[#2196F3]' : 'text-slate-400 hover:text-[#2196F3]'
                }`}
              >
                <span>Contact Me →</span>
              </a>
            </motion.div>

            {/* Quick Contact & Social Strip */}
            <motion.div
              variants={itemVariants}
              className={`pt-6 border-t w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs transition-colors ${
                isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F0445B]" />
                <span>{data.social.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                      : 'bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-[#2196F3] border border-slate-200' 
                      : 'bg-slate-800/60 hover:bg-slate-700 text-[#2196F3] hover:text-white'
                  }`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-[#2196F3]" />
                </a>

                <a
                  href={`mailto:${data.social.email}`}
                  className={`p-2 rounded-lg transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-[#F0445B] border border-slate-200' 
                      : 'bg-slate-800/60 hover:bg-slate-700 text-[#F0445B] hover:text-white'
                  }`}
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4 text-[#F0445B]" />
                </a>

                <a
                  href={`tel:${data.social.phone}`}
                  className={`p-2 rounded-lg transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-emerald-600 border border-slate-200' 
                      : 'bg-slate-800/60 hover:bg-slate-700 text-emerald-400 hover:text-white'
                  }`}
                  aria-label="Call Phone"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Portrait with smooth reveal */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Subtle gradient frame glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#2196F3] via-[#8B5CF6] to-[#F0445B] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />

              {/* Main photo container */}
              <div className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-colors ${
                isLight ? 'bg-white border-slate-200/90' : 'bg-[#101A33] border-slate-700/80'
              }`}>
                <img
                  src={data.profilePhotoUrl}
                  alt={`${data.name} — Data Analyst & Data Engineer`}
                  className="w-full h-auto object-cover object-top max-h-[460px] sm:max-h-[500px] select-none"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('sooraj-profile.png')) {
                      target.src = '/images/sooraj-profile.jpg';
                    }
                  }}
                />

                {/* Subtle bottom gradient overlay for card badge */}
                <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t flex items-center justify-between transition-colors ${
                  isLight 
                    ? 'from-white via-white/95 to-transparent' 
                    : 'from-[#0e1629] via-[#0e1629]/80 to-transparent'
                }`}>
                  <div>
                    <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{data.name}</div>
                    <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>Calicut, Kerala, India</div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Active Roles</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
