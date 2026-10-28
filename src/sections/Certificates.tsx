import React from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

export const Certificates: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <SectionReveal id="certificates" className={`py-20 relative transition-colors ${
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
            <span>CREDENTIAL VERIFICATION</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Certificates &amp; Credentials
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Accredited certifications across Data Science fundamentals, data literacy, and AI ethics with direct third-party verification.
          </p>
        </div>

        {/* Certificates Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.certificates.map((cert, idx) => (
            <FadeInItem key={cert.id} delay={idx * 0.12} className="h-full">
              <div
                className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between h-full group ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-[#2196F3]/50'
                    : 'bg-[#152442] border-slate-800/90 shadow-xl hover:border-[#2196F3]/60'
                }`}
              >
                <div>
                  {/* Header Icon + Verification Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl border ${
                      isLight
                        ? 'bg-blue-50 border-blue-200 text-[#2196F3]'
                        : 'bg-gradient-to-br from-[#2196F3]/20 to-[#F0445B]/20 border-[#2196F3]/30 text-[#2196F3]'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold'
                        : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className={`text-lg font-bold mb-1.5 group-hover:text-[#2196F3] transition-colors leading-snug ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {cert.title}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    {cert.issuer}
                  </p>

                  {cert.badgeCode && (
                    <div className={`inline-block text-[11px] font-mono px-2 py-0.5 rounded border mb-4 ${
                      isLight
                        ? 'text-slate-600 bg-slate-100 border-slate-200'
                        : 'text-slate-400 bg-slate-800/80 border-slate-700/60'
                    }`}>
                      Course Code: {cert.badgeCode}
                    </div>
                  )}
                </div>

                {/* Verify Link Button */}
                <div className={`pt-5 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                      isLight
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-[#2196F3]/50'
                        : 'bg-slate-800 hover:bg-[#1a2d52] text-white border-slate-700 hover:border-[#2196F3]/50'
                    }`}
                    aria-label={`Verify certificate for ${cert.title}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2196F3]" />
                      <span>Verify Certificate</span>
                    </span>
                    <ExternalLink className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400 group-hover:text-slate-700' : 'text-slate-400 group-hover:text-white'}`} />
                  </a>
                </div>
              </div>
            </FadeInItem>
          ))}
        </div>

      </div>
    </SectionReveal>
  );
};
