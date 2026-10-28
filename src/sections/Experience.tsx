import React from 'react';
import { Briefcase, Calendar, MapPin, Building, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <SectionReveal id="experience" className={`py-20 border-t relative transition-colors ${
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
            <span>CAREER TIMELINE</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Professional Experience
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Hands-on production track record in high-reliability web extraction, distributed ETL workflows, and exploratory LLM data integration.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {data.experience.map((job) => (
            <FadeInItem key={job.id} delay={0.15}>
              <div
                className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-300 ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#2196F3]/50'
                    : 'bg-[#152442] border-slate-800/90 shadow-xl hover:border-[#2196F3]/50'
                }`}
              >
                {/* Header details */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
                  isLight ? 'border-slate-100' : 'border-slate-800/80'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl border shrink-0 mt-1 sm:mt-0 ${
                      isLight
                        ? 'bg-blue-50 border-blue-200 text-[#2196F3]'
                        : 'bg-gradient-to-br from-[#2196F3]/20 to-[#F0445B]/20 border-[#2196F3]/40 text-[#2196F3]'
                    }`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {job.role}
                      </h3>
                      <div className={`flex items-center gap-2 font-medium text-sm mt-0.5 ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        <Building className="w-4 h-4 text-[#F0445B]" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs font-mono">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${
                      isLight 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold' 
                        : 'bg-slate-800/90 border-slate-700/80 text-emerald-400'
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{job.period}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-1 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullet points faithful to resume */}
                <div className="mt-6 space-y-3.5">
                  <h4 className={`text-xs font-mono tracking-wider uppercase mb-2 ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Key Production Responsibilities &amp; Impact:
                  </h4>
                  {job.highlights.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`p-1 rounded-md shrink-0 mt-0.5 ${
                        isLight ? 'bg-blue-100/70 text-[#2196F3]' : 'bg-[#2196F3]/10 text-[#2196F3]'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className={`text-sm sm:text-base leading-relaxed ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Core stack footer for the role */}
                <div className={`mt-8 pt-5 border-t flex flex-wrap items-center gap-2 ${
                  isLight ? 'border-slate-100' : 'border-slate-800/80'
                }`}>
                  <span className={`text-xs font-mono mr-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Core Tech:</span>
                  {['Scrapy', 'PySpark', 'PostgreSQL', 'Apache Airflow', 'AWS S3', 'Django REST', 'Docker', 'LLMs'].map((t) => (
                    <span
                      key={t}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                        isLight 
                          ? 'bg-slate-100 text-slate-800 border-slate-200' 
                          : 'bg-[#0e1629] text-slate-300 border-slate-800'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInItem>
          ))}
        </div>

      </div>
    </SectionReveal>
  );
};
