import React from 'react';
import { 
  Code2, 
  Workflow, 
  BarChart2, 
  Database, 
  Server, 
  Bot, 
  GitBranch,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'programming': Code2,
  'data-engineering': Workflow,
  'analytics-bi': BarChart2,
  'databases-cloud': Database,
  'backend-dev': Server,
  'genai-agentic': Bot,
  'devops-version': GitBranch,
};

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <SectionReveal id="skills" className={`py-20 relative transition-colors ${
      isLight ? 'bg-white' : 'bg-[#0e1629]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 transition-colors ${
            isLight
              ? 'bg-blue-50 border border-blue-200 text-[#2196F3]'
              : 'bg-[#152442] border border-[#2196F3]/30 text-[#2196F3]'
          }`}>
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Skills &amp; Technologies
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Tools, frameworks, and architectures utilized across large-scale web scraping, high-throughput batch ETL pipelines, and GenAI agent workflows.
          </p>
        </div>

        {/* Categories Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.skills.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.id] || Code2;
            const isGenAi = cat.id === 'genai-agentic';

            return (
              <FadeInItem key={cat.id} delay={idx * 0.07}>
                <div
                  className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between h-full ${
                    isGenAi
                      ? isLight
                        ? 'bg-gradient-to-b from-rose-50/60 to-white border border-[#F0445B]/40 shadow-sm hover:shadow-md'
                        : 'bg-gradient-to-b from-[#182647] to-[#1e1a38] border border-[#F0445B]/40 shadow-lg shadow-[#F0445B]/10 hover:border-[#F0445B]/70'
                      : isLight
                        ? 'bg-white border border-slate-200 hover:border-[#2196F3]/50 shadow-xs hover:shadow-md'
                        : 'bg-[#152442] border border-slate-800/90 hover:border-[#2196F3]/50'
                  }`}
                >
                  <div>
                    <div className={`flex items-center justify-between mb-4 pb-3 border-b ${
                      isLight ? 'border-slate-100' : 'border-slate-800/80'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${
                          isGenAi 
                            ? isLight
                              ? 'bg-rose-100/80 text-[#F0445B]'
                              : 'bg-gradient-to-br from-[#2196F3]/20 to-[#F0445B]/20 text-[#F0445B]' 
                            : isLight
                              ? 'bg-blue-50 text-[#2196F3]'
                              : 'bg-slate-800/80 text-[#2196F3]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className={`font-semibold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {cat.category}
                        </h3>
                      </div>
                      {isGenAi && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-medium border ${
                          isLight
                            ? 'bg-rose-100/90 text-[#F0445B] border-rose-300'
                            : 'bg-[#F0445B]/20 text-[#F0445B] border-[#F0445B]/30'
                        }`}>
                          Agentic
                        </span>
                      )}
                    </div>

                    {/* Skills tags list */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            isLight
                              ? 'bg-slate-100/80 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-200/70'
                              : 'bg-[#0e1629]/80 border-slate-700/60 text-slate-200 hover:border-slate-500 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#2196F3] shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-5 pt-3 border-t text-[11px] font-mono ${
                    isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/40 text-slate-400'
                  }`}>
                    {cat.skills.length} core technologies
                  </div>
                </div>
              </FadeInItem>
            );
          })}
        </div>

      </div>
    </SectionReveal>
  );
};
