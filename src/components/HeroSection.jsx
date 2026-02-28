import { useState, useEffect } from 'react';
import {
  Sparkles, AlertTriangle, CheckCircle, Zap, BarChart3,
  ArrowRight, Brain, GitCompare, Route, LayoutDashboard
} from 'lucide-react';

export default function HeroSection({ onStart }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  const features = [
    {
      icon: <Brain size={22} />,
      title: 'AI-Powered Reasoning',
      desc: 'Get intelligent explanations for why each technology was recommended for your project.',
    },
    {
      icon: <BarChart3 size={22} />,
      title: 'Cost & Scale Estimates',
      desc: 'See real cost ranges and scalability scores for every recommendation.',
    },
    {
      icon: <GitCompare size={22} />,
      title: 'Stack Comparison',
      desc: 'Compare two complete stack configurations side-by-side with visual diffs.',
    },
    {
      icon: <Route size={22} />,
      title: 'Migration Paths',
      desc: 'Get step-by-step migration guides when upgrading your existing stack.',
    },
    {
      icon: <LayoutDashboard size={22} />,
      title: 'Architecture Diagrams',
      desc: 'Visualize how your recommended stack components connect and interact.',
    },
    {
      icon: <Zap size={22} />,
      title: 'Instant Results',
      desc: 'Answer 6 quick questions and get a comprehensive tech stack recommendation.',
    },
  ];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Smart Tech Stack Recommender
          </div>

          <h1 className="hero-title">
            Stop Guessing.{' '}
            <span className="hero-title-gradient">Start Building.</span>
          </h1>

          <p className="hero-subtitle">
            StackFit analyzes your project requirements, budget, and team size
            to recommend the perfect tech stack — with AI-powered reasoning,
            cost estimates, and scalability scores.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onStart}>
              <Sparkles size={18} />
              Get Your Stack
              <ArrowRight size={18} />
            </button>
            <a href="#problem" className="btn btn-secondary btn-lg">
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">30+</div>
              <div className="hero-stat-label">Technologies</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">6</div>
              <div className="hero-stat-label">Categories</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">∞</div>
              <div className="hero-stat-label">Combinations</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem / Solution Section ── */}
      <section className="problem-solution section" id="problem">
        <div className="container">
          <div className="section-header">
            <div className="section-label">
              <Sparkles size={14} /> The Challenge
            </div>
            <h2 className="section-title">
              Building software shouldn't start with <em>weeks of research</em>
            </h2>
            <p className="section-desc">
              Developers and startups face the same dilemma every time they start a new project.
            </p>
          </div>

          <div className="ps-grid">
            {/* Problem Card */}
            <div className="ps-card ps-card-problem animate-fade-in-up">
              <div className="ps-card-icon">
                <AlertTriangle size={26} />
              </div>
              <h3>🎯 The Problem</h3>
              <ul className="ps-list">
                <li>
                  <AlertTriangle size={16} className="ps-list-icon" style={{ color: '#ef4444' }} />
                  <span>New developers and startups struggle with <strong>choosing the right stack</strong></span>
                </li>
                <li>
                  <AlertTriangle size={16} className="ps-list-icon" style={{ color: '#ef4444' }} />
                  <span>They waste time <strong>avoiding overengineering</strong> or underengineering</span>
                </li>
                <li>
                  <AlertTriangle size={16} className="ps-list-icon" style={{ color: '#ef4444' }} />
                  <span><strong>Scaling decisions</strong> are made too late or too early</span>
                </li>
                <li>
                  <AlertTriangle size={16} className="ps-list-icon" style={{ color: '#ef4444' }} />
                  <span>Picking the right <strong>database, auth, hosting, and state management</strong> feels overwhelming</span>
                </li>
                <li>
                  <AlertTriangle size={16} className="ps-list-icon" style={{ color: '#ef4444' }} />
                  <span>They <strong>waste weeks researching</strong> instead of building</span>
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="ps-card ps-card-solution animate-fade-in-up stagger-2">
              <div className="ps-card-icon">
                <CheckCircle size={26} />
              </div>
              <h3>💡 The Solution</h3>
              <ul className="ps-list">
                <li>
                  <CheckCircle size={16} className="ps-list-icon" style={{ color: '#06b6d4' }} />
                  <span>A smart web app that asks <strong>structured questions</strong> (budget, team size, traffic, features)</span>
                </li>
                <li>
                  <CheckCircle size={16} className="ps-list-icon" style={{ color: '#06b6d4' }} />
                  <span>Recommends <strong>Frontend stack, Backend stack, Database, Auth strategy, Hosting, CI/CD</strong></span>
                </li>
                <li>
                  <CheckCircle size={16} className="ps-list-icon" style={{ color: '#06b6d4' }} />
                  <span>Shows <strong>pros and cons</strong> for every recommendation</span>
                </li>
                <li>
                  <CheckCircle size={16} className="ps-list-icon" style={{ color: '#06b6d4' }} />
                  <span>Provides <strong>cost estimation</strong> and <strong>scalability scores</strong></span>
                </li>
                <li>
                  <CheckCircle size={16} className="ps-list-icon" style={{ color: '#06b6d4' }} />
                  <span>Powered by <strong>AI-based reasoning</strong> for every decision</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-label">
              <Zap size={14} /> Unique Angle
            </div>
            <h2 className="section-title">
              Everything you need to <span className="text-gradient">decide with confidence</span>
            </h2>
            <p className="section-desc">
              StackFit goes beyond simple recommendations with AI reasoning,
              comparisons, and migration guides.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`feature-card animate-fade-in-up stagger-${i + 1}`}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-primary btn-lg" onClick={onStart}>
              <Sparkles size={18} />
              Try StackFit Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
