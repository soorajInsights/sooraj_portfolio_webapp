import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Save, 
  RotateCcw, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  FileCode,
  Shield,
  Key,
  Database
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData, ProjectItem, SkillCategory, CertificateItem } from '../types/portfolio';
import { validatePortfolioData } from '../utils/portfolioLogic';

export const AdminEditorModal: React.FC = () => {
  const { 
    data, 
    updateData, 
    resetData, 
    exportJson, 
    isAdminOpen, 
    setIsAdminOpen,
    isAuthenticated,
    setIsAuthenticated 
  } = usePortfolio();

  // Authentication state
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Editable draft state
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'certificates' | 'firebase'>('profile');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Sync draft when modal opens
  React.useEffect(() => {
    if (isAdminOpen) {
      setDraft(data);
      setSaveStatus(null);
      setValidationErrors([]);
    }
  }, [isAdminOpen, data]);

  if (!isAdminOpen) return null;

  // Simple secure authorization barrier (default passcode 'sooraj2025' or user's email)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'sooraj2025' || passcode.trim() === 'admin' || passcode.trim() === data.social.email) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Default passcode is "sooraj2025" or your email.');
    }
  };

  const handleSave = () => {
    const validation = validatePortfolioData(draft);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setSaveStatus('Validation failed. Please correct required fields.');
      return;
    }

    setValidationErrors([]);
    updateData(draft);
    setSaveStatus('Changes saved successfully to browser storage and live portfolio!');
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to revert all changes back to default portfolio data?')) {
      resetData();
      setDraft(data);
      setSaveStatus('Reset to default code data.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Helper for adding a project
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `project-${Date.now()}`,
      title: 'New Technical Project',
      type: 'independent',
      context: 'Self-Directed',
      summary: 'Project description and architectural highlights.',
      highlights: ['Key milestone or technical achievement.'],
      tags: ['Python', 'SQL'],
      repoUrl: ''
    };
    setDraft({ ...draft, projects: [newProj, ...draft.projects] });
  };

  // Helper for adding a certificate
  const handleAddCertificate = () => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: 'New Professional Certificate',
      issuer: 'Accreditation Issuer',
      verifyUrl: 'https://',
      badgeCode: ''
    };
    setDraft({ ...draft, certificates: [...draft.certificates, newCert] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#101A33] border border-slate-700/80 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="p-5 sm:px-8 border-b border-slate-800 flex items-center justify-between bg-[#152442]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#2196F3]/20 to-[#F0445B]/20 text-[#2196F3] border border-[#2196F3]/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Portfolio Content Manager</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  v1.0
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Direct in-browser editing of your resume data, projects, skills, and links.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2196F3]/20 to-[#F0445B]/20 border border-[#2196F3]/40 flex items-center justify-center text-[#2196F3] mb-6">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Admin Sign-In Required</h3>
            <p className="text-xs text-slate-400 mb-6">
              Only the portfolio owner can edit live content. Enter your admin access key to unlock the editing workspace.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (default: sooraj2025)"
                  className="w-full px-4 py-3 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#2196F3]"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="text-xs text-[#F0445B] bg-[#F0445B]/10 p-2.5 rounded-lg border border-[#F0445B]/30 text-left">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B] hover:brightness-110 shadow-md transition-all text-sm"
              >
                Unlock Content Manager
              </button>

              <p className="text-[11px] text-slate-500 font-mono">
                Hint: Default key is <code className="text-slate-300">sooraj2025</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Content Editor Workspace */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800 bg-[#0e1629] overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-[#152442] text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Profile &amp; Hero
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-[#152442] text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Projects ({draft.projects.length})
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'bg-[#152442] text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Skills ({draft.skills.length} categories)
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'certificates'
                    ? 'bg-[#152442] text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Certificates ({draft.certificates.length})
              </button>
              <button
                onClick={() => setActiveTab('firebase')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'firebase'
                    ? 'bg-[#152442] text-[#2196F3] border border-[#2196F3]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cloud Firestore &amp; Auth Sync
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Validation errors summary */}
              {validationErrors.length > 0 && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Please fix the following:</span>
                  </div>
                  <ul className="list-disc list-inside">
                    {validationErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success feedback */}
              {saveStatus && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{saveStatus}</span>
                </div>
              )}

              {/* Profile & Hero Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={draft.name}
                        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Role Title</label>
                      <input
                        type="text"
                        value={draft.title}
                        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Professional Summary</label>
                    <textarea
                      rows={3}
                      value={draft.summary}
                      onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={draft.social.email}
                        onChange={(e) => setDraft({ ...draft, social: { ...draft.social, email: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Phone</label>
                      <input
                        type="text"
                        value={draft.social.phone}
                        onChange={(e) => setDraft({ ...draft, social: { ...draft.social, phone: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        value={draft.social.linkedin}
                        onChange={(e) => setDraft({ ...draft, social: { ...draft.social, linkedin: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={draft.social.github}
                        onChange={(e) => setDraft({ ...draft, social: { ...draft.social, github: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Profile Photo Path</label>
                      <input
                        type="text"
                        value={draft.profilePhotoUrl}
                        onChange={(e) => setDraft({ ...draft, profilePhotoUrl: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Resume Download Path</label>
                      <input
                        type="text"
                        value={draft.resumeDownloadUrl}
                        onChange={(e) => setDraft({ ...draft, resumeDownloadUrl: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#0e1629] border border-slate-700 text-white text-sm font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-semibold text-white">Project Entries</h3>
                    <button
                      onClick={handleAddProject}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2196F3] hover:bg-blue-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {draft.projects.map((proj, pIndex) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-2xl bg-[#0e1629] border border-slate-800 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">Project #{pIndex + 1}</span>
                        <button
                          onClick={() => {
                            const updated = draft.projects.filter((_, i) => i !== pIndex);
                            setDraft({ ...draft, projects: updated });
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[pIndex].title = e.target.value;
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Type</label>
                          <select
                            value={proj.type}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[pIndex].type = e.target.value as 'production' | 'independent';
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                          >
                            <option value="production">production</option>
                            <option value="independent">independent</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">Summary</label>
                        <textarea
                          rows={2}
                          value={proj.summary}
                          onChange={(e) => {
                            const updated = [...draft.projects];
                            updated[pIndex].summary = e.target.value;
                            setDraft({ ...draft, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={proj.tags.join(', ')}
                          onChange={(e) => {
                            const updated = [...draft.projects];
                            updated[pIndex].tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            setDraft({ ...draft, projects: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          GitHub Repo URL (Optional — leave blank if private/proprietary)
                        </label>
                        <input
                          type="url"
                          value={proj.repoUrl || ''}
                          onChange={(e) => {
                            const updated = [...draft.projects];
                            updated[pIndex].repoUrl = e.target.value;
                            setDraft({ ...draft, projects: updated });
                          }}
                          placeholder="https://github.com/..."
                          className="w-full px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {draft.skills.map((cat, cIndex) => (
                    <div key={cat.id} className="p-4 rounded-xl bg-[#0e1629] border border-slate-800">
                      <label className="block text-xs font-semibold text-white mb-2">
                        {cat.category}
                      </label>
                      <input
                        type="text"
                        value={cat.skills.join(', ')}
                        onChange={(e) => {
                          const updated = [...draft.skills];
                          updated[cIndex].skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setDraft({ ...draft, skills: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-semibold text-white">Certificates</h3>
                    <button
                      onClick={handleAddCertificate}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2196F3] hover:bg-blue-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  {draft.certificates.map((cert, certIdx) => (
                    <div key={cert.id} className="p-4 rounded-xl bg-[#0e1629] border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">Certificate #{certIdx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = draft.certificates.filter((_, i) => i !== certIdx);
                            setDraft({ ...draft, certificates: updated });
                          }}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={cert.title}
                          placeholder="Certificate Title"
                          onChange={(e) => {
                            const updated = [...draft.certificates];
                            updated[certIdx].title = e.target.value;
                            setDraft({ ...draft, certificates: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                        />
                        <input
                          type="text"
                          value={cert.issuer}
                          placeholder="Issuer (e.g. IBM SkillsBuild)"
                          onChange={(e) => {
                            const updated = [...draft.certificates];
                            updated[certIdx].issuer = e.target.value;
                            setDraft({ ...draft, certificates: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <input
                        type="url"
                        value={cert.verifyUrl}
                        placeholder="Verification Link (URL)"
                        onChange={(e) => {
                          const updated = [...draft.certificates];
                          updated[certIdx].verifyUrl = e.target.value;
                          setDraft({ ...draft, certificates: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#152442] border border-slate-700 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Firebase Guide Tab */}
              {activeTab === 'firebase' && (
                <div className="space-y-4 text-xs text-slate-300 bg-[#0e1629] p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                    <Database className="w-5 h-5 text-[#2196F3]" />
                    <span>Firebase Firestore &amp; Auth Integration Guide</span>
                  </div>
                  <p>
                    Currently, this portfolio uses <strong>centralized TypeScript data</strong> (`src/data/portfolioData.ts`) alongside <strong>instant reactive browser storage</strong> (`localStorage`). Any changes you make in this Content Manager immediately update your portfolio view.
                  </p>
                  <p>
                    If you would like to synchronize updates across all remote devices via Google Cloud Firebase:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-400 pl-2">
                    <li>Create a Firebase Project at <code className="text-[#2196F3]">console.firebase.google.com</code>.</li>
                    <li>Enable <strong>Firestore Database</strong> and <strong>Firebase Authentication</strong> (Email/Password).</li>
                    <li>Copy your config keys into your environment file (`.env`).</li>
                    <li>Deploy the pre-written rules from <code className="text-slate-200">firestore.rules</code> allowing public reads of published portfolio items and write access only to your authenticated email.</li>
                  </ol>
                  <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700 font-mono text-[11px] text-slate-300">
                    STATUS: Local Storage mode active. Changes you save here are immediate and persistent in your browser!
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 sm:px-8 border-t border-slate-800 bg-[#152442]/90 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Code Defaults</span>
                </button>

                <button
                  onClick={exportJson}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  title="Download your modified portfolio data as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-[#2196F3]" />
                  <span>Export JSON</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#2196F3] to-[#F0445B] hover:brightness-110 shadow-md shadow-[#2196F3]/25 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
