import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <SectionReveal id="education" className={`py-20 border-t relative transition-colors ${
      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121A30]/60 border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 transition-colors ${
            isLight
              ? 'bg-blue-50 border border-blue-200 text-[#2196F3]'
              : 'bg-[#152442] border border-[#2196F3]/30 text-[#2196F3]'
          }`}>
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Education
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Foundational university degree fostering analytical methodology, research rigor, and scientific problem-solving.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-3xl mx-auto">
          {data.education.map((item) => (
            <FadeInItem key={item.id} delay={0.15}>
              <div
                className={`rounded-3xl p-6 sm:p-8 border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#2196F3]/50'
                    : 'bg-[#152442] border-slate-800/90 shadow-xl hover:border-[#2196F3]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3.5 rounded-2xl border shrink-0 ${
                    isLight
                      ? 'bg-blue-50 border-blue-200 text-[#2196F3]'
                      : 'bg-gradient-to-br from-[#2196F3]/20 to-[#F0445B]/20 border-[#2196F3]/40 text-[#2196F3]'
                  }`}>
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {item.degree}
                    </h3>
                    <p className={`font-medium text-base mt-0.5 ${
                      isLight ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {item.institution}
                    </p>
                    <div className={`flex items-center gap-1.5 text-xs font-mono mt-2 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <MapPin className="w-3.5 h-3.5 text-[#F0445B]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-mono ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-slate-800/90 border-slate-700 text-slate-300'
                }`}>
                  <Calendar className="w-3.5 h-3.5 text-[#2196F3]" />
                  <span>{item.period}</span>
                </div>
              </div>
            </FadeInItem>
          ))}
        </div>

      </div>
    </SectionReveal>
  );
};
