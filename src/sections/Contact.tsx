import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { SectionReveal, FadeInItem } from '../components/SectionReveal';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form state for honest mailto composer
  const [senderName, setSenderName] = useState('');
  const [senderSubject, setSenderSubject] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  const handleMailtoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = senderSubject.trim() || `Inquiry from ${senderName || 'Portfolio Visitor'}`;
    const body = `Hi Sooraj,\n\n${senderMessage}\n\nBest regards,\n${senderName || 'A recruiter/collaborator'}`;
    const mailtoUrl = `mailto:${data.social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <SectionReveal id="contact" className={`py-20 border-t relative transition-colors ${
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
            <span>GET IN TOUCH</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Let’s Connect
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto transition-colors ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Open to opportunities in Data Engineering, ETL Pipeline Development, and GenAI Tool-Calling Architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <FadeInItem delay={0.08}>
              <div className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                isLight 
                  ? 'bg-white border-slate-200 hover:border-[#2196F3]/40 shadow-xs' 
                  : 'bg-[#152442] border-slate-800/90 hover:border-[#2196F3]/40'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-xl ${
                    isLight ? 'bg-blue-50 text-[#2196F3]' : 'bg-slate-800/80 text-[#2196F3]'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Direct Email</div>
                    <a
                      href={`mailto:${data.social.email}`}
                      className={`text-sm font-semibold transition-colors break-all ${
                        isLight ? 'text-slate-900 hover:text-[#2196F3]' : 'text-white hover:text-[#2196F3]'
                      }`}
                    >
                      {data.social.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(data.social.email, 'email')}
                  className={`p-2 rounded-lg transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </FadeInItem>

            {/* Phone Card */}
            <FadeInItem delay={0.16}>
              <div className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${
                isLight 
                  ? 'bg-white border-slate-200 hover:border-[#2196F3]/40 shadow-xs' 
                  : 'bg-[#152442] border-slate-800/90 hover:border-[#2196F3]/40'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`p-3 rounded-xl ${
                    isLight ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-800/80 text-emerald-400'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Direct Phone</div>
                    <a
                      href={`tel:${data.social.phone}`}
                      className={`text-sm font-semibold transition-colors ${
                        isLight ? 'text-slate-900 hover:text-emerald-600' : 'text-white hover:text-emerald-400'
                      }`}
                    >
                      +91 {data.social.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(data.social.phone, 'phone')}
                  className={`p-2 rounded-lg transition-colors ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </FadeInItem>

            {/* Location Card */}
            <FadeInItem delay={0.24}>
              <div className={`p-5 rounded-2xl border flex items-center gap-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#152442] border-slate-800/90'
              }`}>
                <div className={`p-3 rounded-xl ${
                  isLight ? 'bg-rose-50 text-[#F0445B]' : 'bg-slate-800/80 text-[#F0445B]'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Current Location</div>
                  <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {data.social.location}
                  </div>
                </div>
              </div>
            </FadeInItem>

            {/* Social profiles row */}
            <FadeInItem delay={0.32}>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-[#2196F3]/50 text-slate-700 hover:text-[#2196F3] shadow-xs' 
                      : 'bg-[#152442] border-slate-800 hover:border-[#2196F3]/50 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#2196F3]" />
                    <span className="text-xs font-semibold">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>

                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
                    isLight 
                      ? 'bg-white border-slate-200 hover:border-[#2196F3]/50 text-slate-700 hover:text-slate-900 shadow-xs' 
                      : 'bg-[#152442] border-slate-800 hover:border-[#2196F3]/50 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4" />
                    <span className="text-xs font-semibold">GitHub</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </div>
            </FadeInItem>

          </div>

          {/* Honest Quick Email Composer */}
          <div className="lg:col-span-7">
            <FadeInItem delay={0.2}>
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-colors ${
                isLight 
                  ? 'bg-white border-slate-200 shadow-slate-200/50' 
                  : 'bg-[#152442] border-slate-800/90 shadow-black/40'
              }`}>
                <div className="mb-6">
                  <h3 className={`text-lg font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Compose an Email
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Pre-formats your inquiry and opens your default mail client directly to <span className={`font-mono font-medium ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>{data.social.email}</span>.
                  </p>
                </div>

                <form onSubmit={handleMailtoSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins (Technical Recruiter)"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm placeholder-slate-400 focus:outline-none focus:border-[#2196F3] focus:ring-1 focus:ring-[#2196F3] transition-colors ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-900' 
                          : 'bg-[#0e1629] border-slate-700/80 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      value={senderSubject}
                      onChange={(e) => setSenderSubject(e.target.value)}
                      placeholder="e.g. Data Engineer role at TechCorp"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm placeholder-slate-400 focus:outline-none focus:border-[#2196F3] focus:ring-1 focus:ring-[#2196F3] transition-colors ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-900' 
                          : 'bg-[#0e1629] border-slate-700/80 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Hi Sooraj, I came across your portfolio and would like to discuss..."
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm placeholder-slate-400 focus:outline-none focus:border-[#2196F3] focus:ring-1 focus:ring-[#2196F3] transition-colors resize-none ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-900' 
                          : 'bg-[#0e1629] border-slate-700/80 text-white'
                      }`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B] hover:brightness-110 shadow-md shadow-[#2196F3]/25 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via Email Client</span>
                    </button>
                  </div>
                </form>
              </div>
            </FadeInItem>
          </div>

        </div>

      </div>
    </SectionReveal>
  );
};
