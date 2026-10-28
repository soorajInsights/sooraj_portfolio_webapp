import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultPortfolioData } from '../data/portfolioData';
import { 
  validatePortfolioData, 
  filterProjectsByType, 
  generateMailtoLink, 
  isExternalUrl,
  toggleThemeMode,
  resolveTheme
} from './portfolioLogic';

test('defaultPortfolioData passes validation with zero errors', () => {
  const result = validatePortfolioData(defaultPortfolioData);
  assert.equal(result.valid, true);
  assert.equal(result.errors.length, 0);
});

test('validatePortfolioData flags missing name and invalid email', () => {
  const invalid = {
    ...defaultPortfolioData,
    name: '',
    social: { ...defaultPortfolioData.social, email: 'not-an-email' }
  };
  const result = validatePortfolioData(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('Name is required'));
  assert.ok(result.errors.includes('Valid email address is required'));
});

test('filterProjectsByType separates production from independent projects', () => {
  const all = defaultPortfolioData.projects;
  const prod = filterProjectsByType(all, 'production');
  const indep = filterProjectsByType(all, 'independent');

  assert.equal(prod.length, 2);
  assert.equal(indep.length, 1);
  assert.equal(indep[0].id, 'ai-trip-planner-agent');
  assert.equal(indep[0].repoUrl, 'https://github.com/soorajInsights/trip_planner_agent.git');
});

test('generateMailtoLink constructs valid mailto with escaped parameters', () => {
  const link = generateMailtoLink('soorajkknmd@gmail.com', 'Job Opportunity: Data Engineer', 'Hello Sooraj!');
  assert.ok(link.startsWith('mailto:soorajkknmd@gmail.com?'));
  assert.ok(link.includes('subject=Job%20Opportunity%3A%20Data%20Engineer'));
  assert.ok(link.includes('body=Hello%20Sooraj!'));
});

test('isExternalUrl detects real HTTP and HTTPS protocols', () => {
  assert.equal(isExternalUrl('https://github.com/soorajInsights'), true);
  assert.equal(isExternalUrl('http://example.com'), true);
  assert.equal(isExternalUrl('/resume/Sooraj_KK_Resume.pdf'), false);
  assert.equal(isExternalUrl(undefined), false);
});

test('toggleThemeMode alternates between dark and light', () => {
  assert.equal(toggleThemeMode('dark'), 'light');
  assert.equal(toggleThemeMode('light'), 'dark');
});

test('resolveTheme respects saved preference or defaults to dark', () => {
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
  assert.equal(resolveTheme('invalid', true), 'dark');
});

test('resume asset path and filename are preserved and valid', () => {
  assert.equal(defaultPortfolioData.resumeDownloadUrl, '/resume/Sooraj_KK_Resume.pdf');
  assert.equal(defaultPortfolioData.resumeFileName, 'Sooraj_KK_Resume.pdf');
  assert.ok(defaultPortfolioData.resumeDownloadUrl.endsWith('.pdf'));
});

