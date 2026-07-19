import { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorSpotlight } from './components/CursorSpotlight';
import { AppLoader } from './components/AppLoader';

const INTRO_SESSION_KEY = 'portfolio-intro-seen';

function shouldShowIntro() {
  if (typeof window === 'undefined') return false;

  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true';
  } catch {
    return true;
  }
}

function PortfolioApp() {
  const { isDark } = useTheme();
  const [showLoader, setShowLoader] = useState(shouldShowIntro);

  const completeLoader = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    } catch {
      // The loader should still close when browser storage is unavailable.
    }

    setShowLoader(false);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: isDark ? '#0D0D12' : '#F0F4FF',
        minHeight: '100vh',
        scrollBehavior: 'smooth',
      }}
    >
      <AnimatePresence>
        {showLoader && <AppLoader key="portfolio-loader" onComplete={completeLoader} />}
      </AnimatePresence>
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <WorkExperience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
