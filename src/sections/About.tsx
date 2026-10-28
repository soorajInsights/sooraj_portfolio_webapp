import React from 'react';
import { FileText, Cpu, Workflow, BarChart3, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <SectionReveal id="about" className={`py-20 border-t relative transition-colors ${
      isLight 
        ? 'bg-slate-50 border-slate-200' 
        : 'bg-[#121A30]/60 border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 transition-colors ${
            isLight
              ? 'bg-blue-50 border border-blue-200 text-[#2196F3]'
              : 'bg-[#152442] border border-[#2196F3]/30 text-[#2196F3]'
          }`}>
            <span>ABOUT ME</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Data Engineering at Scale with{' '}
            <span className="bg-gradient-to-r from-[#2196F3] to-[#F0445B] bg-clip-text text-transparent">
              Agentic Intelligence
            </span>
          </h2>
        </div>

        {/* Story & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Paragraphs and narrative */}
          <div className={`lg:col-span-7 space-y-6 leading-relaxed text-base sm:text-lg transition-colors ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {data.aboutParagraphs.map((para, idx) => (
              <FadeInItem key={idx} delay={idx * 0.1}>
                <p className={`p-5 rounded-2xl border transition-colors ${
                  isLight 
                    ? 'bg-white border-slate-200 shadow-xs text-slate-700' 
                    : 'bg-[#152442]/40 border-slate-800/80 text-slate-300'
                }`}>
                  {para}
                </p>
              </FadeInItem>
            ))}

            <FadeInItem delay={0.25} className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={data.resumeDownloadUrl}
                download={data.resumeFileName}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  isLight 
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 text-[#2196F3]" />
                <span>Download Resume (PDF)</span>
              </a>
              <a
                href="#skills"
                className="text-sm font-medium text-[#2196F3] hover:underline"
              >
                View Technical Skills &amp; Technologies →
              </a>
            </FadeInItem>
          </div>

          {/* Key metrics / highlights from resume */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.keyHighlights.map((item, index) => {
              const icons = [Workflow, BarChart3, Cpu, ShieldCheck];
              const Icon = icons[index % icons.length];
              return (
                <FadeInItem key={index} delay={0.1 + index * 0.08}>
                  <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between h-full ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-[#2196F3]/50 shadow-xs hover:shadow-md' 
                      : 'bg-[#152442] border-slate-800/80 hover:border-[#2196F3]/40'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#2196F3] to-[#F0445B] bg-clip-text text-transparent font-mono">
                        {item.number}
                      </span>
                      <div className={`p-2 rounded-lg ${
                        isLight ? 'bg-blue-50 text-[#2196F3]' : 'bg-slate-800/80 text-[#2196F3]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.label}</h3>
                      <p className={`text-xs leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{item.description}</p>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </div>

        </div>

      </div>
    </SectionReveal>
  );
};
