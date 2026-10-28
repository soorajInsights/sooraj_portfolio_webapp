export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  location: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  type: 'production' | 'independent';
  context?: string;
  summary: string;
  highlights: string[];
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  verifyUrl: string;
  badgeCode?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  aboutParagraphs: string[];
  keyHighlights: {
    number: string;
    label: string;
    description: string;
  }[];
  profilePhotoUrl: string;
  resumeDownloadUrl: string;
  resumeFileName: string;
  social: SocialLinks;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
}
