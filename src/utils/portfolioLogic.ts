import { PortfolioData, ProjectItem } from '../types/portfolio';

/**
 * Validates the core required fields of a portfolio dataset
 */
export function validatePortfolioData(data: Partial<PortfolioData>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!data.title || data.title.trim() === '') {
    errors.push('Title is required');
  }

  if (!data.social?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.social.email)) {
    errors.push('Valid email address is required');
  }

  if (!Array.isArray(data.projects) || data.projects.length === 0) {
    errors.push('At least one project is required');
  }

  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    errors.push('At least one skill category is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Filters projects by type (production vs independent)
 */
export function filterProjectsByType(projects: ProjectItem[], type: 'all' | 'production' | 'independent'): ProjectItem[] {
  if (type === 'all') return projects;
  return projects.filter(p => p.type === type);
}

/**
 * Safe generation of mailto link with optional subject
 */
export function generateMailtoLink(email: string, subject?: string, body?: string): string {
  const cleanEmail = email.trim();
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return params.length > 0 ? `mailto:${cleanEmail}?${params.join('&')}` : `mailto:${cleanEmail}`;
}

/**
 * Checks if a URL is an external link (http/https)
 */
export function isExternalUrl(url?: string): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Toggles theme between 'dark' and 'light'
 */
export function toggleThemeMode(current: 'dark' | 'light'): 'dark' | 'light' {
  return current === 'dark' ? 'light' : 'dark';
}

/**
 * Resolves theme from saved storage or system preference
 */
export function resolveTheme(savedTheme?: string | null, systemPrefersDark: boolean = true): 'dark' | 'light' {
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  return systemPrefersDark ? 'dark' : 'light';
}

