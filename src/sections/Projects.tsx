import React, { useState } from 'react';
import { Github, ExternalLink, Database, Bot, Check, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { ProjectItem } from '../types/portfolio';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [filter, setFilter] = useState<'all' | 'production' | 'independent'>('all');

  const filteredProjects = data.projects.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  return (
    <SectionReveal id="projects" className={`py-20 relative transition-colors ${
      isLight ? 'bg-white' : 'bg-[#0e1629]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 transition-colors ${
            isLight
              ? 'bg-blue-50 border border-blue-200 text-[#2196F3]'
              : 'bg-[#152442] border border-[#2196F3]/30 text-[#2196F3]'
          }`}>
            <span>FEATURED WORK</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Production Pipelines &amp;{' '}
            <span className="bg-gradient-to-r from-[#2196F3] to-[#F0445B] bg-clip-text text-transparent">
              GenAI Agents
            </span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Real enterprise data engineering delivering millions of monthly records alongside hands-on agentic tool-calling architectures.
          </p>

          {/* Filter Tabs */}
          <div className={`inline-flex p-1.5 rounded-2xl border mt-8 transition-colors ${
            isLight ? 'bg-slate-100 border-slate-200 shadow-xs' : 'bg-[#152442] border-slate-800'
          }`}>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#2196F3] to-[#F0445B] text-white shadow-sm'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('production')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                filter === 'production'
                  ? 'bg-gradient-to-r from-[#2196F3] to-[#F0445B] text-white shadow-sm'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
              }`}
            >
              Production Projects
            </button>
            <button
              onClick={() => setFilter('independent')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                filter === 'independent'
                  ? 'bg-gradient-to-r from-[#2196F3] to-[#F0445B] text-white shadow-sm'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
              }`}
            >
              Independent Projects
            </button>
          </div>
        </div>

        {/* Projects Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project: ProjectItem, idx: number) => {
            const isProd = project.type === 'production';
            const isFeaturedWide = !isProd && filteredProjects.length === 3;

            return (
              <FadeInItem
                key={project.id}
                delay={idx * 0.1}
                className={`h-full ${isFeaturedWide ? 'lg:col-span-2' : ''}`}
              >
                <div
                  className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative h-full ${
                    isProd
                      ? isLight
                        ? 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#2196F3]/50'
                        : 'bg-[#152442] border border-slate-800/90 hover:border-[#2196F3]/50 shadow-xl'
                      : isLight
                        ? 'bg-gradient-to-b from-rose-50/50 via-white to-white border border-[#F0445B]/40 shadow-sm hover:shadow-md hover:border-[#F0445B]/70'
                        : 'bg-gradient-to-b from-[#162547] to-[#1e1c3a] border border-[#F0445B]/40 shadow-2xl shadow-[#F0445B]/10 hover:border-[#F0445B]/70'
                  }`}
                >
                  <div className={isFeaturedWide ? 'grid grid-cols-1 lg:grid-cols-12 gap-8' : ''}>
                    <div className={isFeaturedWide ? 'lg:col-span-7' : ''}>
                      {/* Top Badges & Context */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-mono font-medium px-3 py-1 rounded-full border ${
                              isProd
                                ? isLight
                                  ? 'bg-blue-50 text-[#2196F3] border-blue-200'
                                  : 'bg-blue-500/10 text-[#2196F3] border-blue-500/30'
                                : isLight
                                  ? 'bg-rose-50 text-[#F0445B] border-rose-200'
                                  : 'bg-[#F0445B]/10 text-[#F0445B] border-[#F0445B]/30'
                            }`}
                          >
                            {isProd ? 'Production Project' : 'Independent Technical Project'}
                          </span>
                          {project.context && (
                            <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {project.context}
                            </span>
                          )}
                        </div>

                        <div className={`p-2 rounded-xl ${
                          isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800/80 text-slate-300'
                        }`}>
                          {isProd ? <Database className="w-4 h-4 text-[#2196F3]" /> : <Bot className="w-4 h-4 text-[#F0445B]" />}
                        </div>
                      </div>

                      {/* Title & Summary */}
                      <h3 className={`text-2xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {project.summary}
                      </p>

                      {/* Tech Stack Tags for wide view */}
                      <div className={`pt-2 border-t mb-6 ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
                                isLight 
                                  ? 'bg-slate-100 text-slate-800 border-slate-200' 
                                  : 'bg-[#0e1629]/90 text-slate-300 border-slate-800'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions / Links */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.repoUrl ? (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B] hover:brightness-110 shadow-md shadow-[#2196F3]/25 transition-all"
                            aria-label={`View GitHub repository for ${project.title}`}
                          >
                            <Github className="w-4 h-4" />
                            <span>View GitHub Repository</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                          </a>
                        ) : (
                          <div className={`inline-flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg border ${
                            isLight
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-slate-800/40 text-slate-400 border-slate-800'
                          }`}>
                            <Layers className="w-3.5 h-3.5 text-blue-500" />
                            <span>Internal Enterprise Pipeline (Proprietary Production Code)</span>
                          </div>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors ${
                              isLight
                                ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            }`}
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Highlights / Features column */}
                    <div className={isFeaturedWide ? 'lg:col-span-5 pt-4 lg:pt-0' : 'pt-6'}>
                      <div className={`space-y-2.5 mb-2 p-5 rounded-2xl border ${
                        isLight 
                          ? 'bg-slate-50/80 border-slate-200/80' 
                          : 'bg-[#0e1629]/60 border-slate-800/80'
                      }`}>
                        <h4 className={`text-xs font-mono tracking-wider uppercase mb-1 flex items-center justify-between ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          <span>Key Highlights &amp; Features</span>
                          <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{project.highlights.length} items</span>
                        </h4>
                        {project.highlights.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <div className={`p-0.5 rounded-sm shrink-0 mt-1 ${
                              isLight ? 'bg-blue-100 text-[#2196F3]' : 'bg-[#2196F3]/20 text-[#2196F3]'
                            }`}>
                              <Check className="w-3 h-3" />
                            </div>
                            <p className={`text-xs leading-snug ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              {feat}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
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
