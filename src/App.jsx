import { useState, useCallback } from 'react';
import {
  Layers, Sparkles, GitCompare, Route, LayoutDashboard, Home
} from 'lucide-react';
import HeroSection from './components/HeroSection';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import Compare from './components/Compare';
import MigratePath from './components/MigratePath';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import { generateRecommendations } from './utils/engine';
import { sendToN8N } from './utils/n8n';

// Pages
const PAGE = {
  HOME: 'home',
  QUESTIONNAIRE: 'questionnaire',
  RESULTS: 'results',
  COMPARE: 'compare',
  MIGRATE: 'migrate',
  ARCHITECTURE: 'architecture',
};

export default function App() {
  const [page, setPage] = useState(PAGE.HOME);
  const [recommendations, setRecommendations] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useCallback((newPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  }, []);

  const handleStart = useCallback(() => {
    navigate(PAGE.QUESTIONNAIRE);
  }, [navigate]);

  const handleComplete = useCallback(async (formAnswers) => {
    setAnswers(formAnswers);
    const recs = generateRecommendations(formAnswers);
    setRecommendations(recs);

    // Send to n8n (non-blocking)
    sendToN8N({ ...formAnswers, recommendations: recs });

    navigate(PAGE.RESULTS);
  }, [navigate]);

  const handleStartOver = useCallback(() => {
    setRecommendations(null);
    setAnswers(null);
    navigate(PAGE.HOME);
  }, [navigate]);

  // Navbar items for results-related pages
  const showResultsNav = [PAGE.RESULTS, PAGE.COMPARE, PAGE.MIGRATE, PAGE.ARCHITECTURE].includes(page);

  return (
    <div
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.25s ease-out',
        minHeight: '100vh',
      }}
    >
      {/* ── Navigation ── */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a className="navbar-logo" onClick={() => navigate(PAGE.HOME)}>
            <span>StackFit</span>
            <div className="navbar-logo-icon">
              <Layers size={20} />
            </div>
          </a>

          <div className="navbar-actions">
            {showResultsNav && (
              <>
                <button
                  className={`btn btn-ghost btn-sm ${page === PAGE.RESULTS ? 'active' : ''}`}
                  onClick={() => navigate(PAGE.RESULTS)}
                  style={page === PAGE.RESULTS ? { color: 'var(--accent-2)' } : {}}
                >
                  <Sparkles size={14} />
                  <span>Results</span>
                </button>
                <button
                  className={`btn btn-ghost btn-sm ${page === PAGE.COMPARE ? 'active' : ''}`}
                  onClick={() => navigate(PAGE.COMPARE)}
                  style={page === PAGE.COMPARE ? { color: 'var(--accent-2)' } : {}}
                >
                  <GitCompare size={14} />
                  <span>Compare</span>
                </button>
                <button
                  className={`btn btn-ghost btn-sm ${page === PAGE.MIGRATE ? 'active' : ''}`}
                  onClick={() => navigate(PAGE.MIGRATE)}
                  style={page === PAGE.MIGRATE ? { color: 'var(--accent-2)' } : {}}
                >
                  <Route size={14} />
                  <span>Migrate</span>
                </button>
                <button
                  className={`btn btn-ghost btn-sm ${page === PAGE.ARCHITECTURE ? 'active' : ''}`}
                  onClick={() => navigate(PAGE.ARCHITECTURE)}
                  style={page === PAGE.ARCHITECTURE ? { color: 'var(--accent-2)' } : {}}
                >
                  <LayoutDashboard size={14} />
                  <span>Architecture</span>
                </button>
              </>
            )}

            {page === PAGE.HOME && (
              <button className="btn btn-primary btn-sm" onClick={handleStart}>
                <Sparkles size={14} />
                <span>Get Started</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Pages ── */}
      {page === PAGE.HOME && (
        <HeroSection onStart={handleStart} />
      )}

      {page === PAGE.QUESTIONNAIRE && (
        <Questionnaire
          onComplete={handleComplete}
          onBack={() => navigate(PAGE.HOME)}
        />
      )}

      {page === PAGE.RESULTS && recommendations && (
        <Results
          recommendations={recommendations}
          onCompare={() => navigate(PAGE.COMPARE)}
          onBack={handleStartOver}
        />
      )}

      {page === PAGE.COMPARE && recommendations && (
        <Compare
          recommendations={recommendations}
          onBack={() => navigate(PAGE.RESULTS)}
        />
      )}

      {page === PAGE.MIGRATE && recommendations && (
        <MigratePath
          recommendations={recommendations}
          onBack={() => navigate(PAGE.RESULTS)}
        />
      )}

      {page === PAGE.ARCHITECTURE && recommendations && (
        <ArchitectureDiagram
          recommendations={recommendations}
          onBack={() => navigate(PAGE.RESULTS)}
        />
      )}

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 StackFit — Smart Tech Stack Recommender</span>
          <span>Built with React + Vite</span>
        </div>
      </footer>
    </div>
  );
}
