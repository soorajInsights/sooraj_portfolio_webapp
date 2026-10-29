import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { Certificates } from './sections/Certificates';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CursorFollower } from './components/CursorFollower';

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="min-h-screen theme-bg-app bg-[#0e1629] text-[#F5F7FC] theme-text-main font-sans selection:bg-[#2196F3]/30 selection:text-white relative transition-colors duration-250">
          <CursorFollower />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certificates />
            <Contact />
          </main>
          <Footer />
          <ResumeModal />
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
