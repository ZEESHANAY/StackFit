import { useState, useMemo } from 'react';
import {
  Monitor, Server, Database, Shield, Cloud, GitBranch,
  DollarSign, TrendingUp, Brain, ChevronDown, ChevronUp,
  Sparkles, ArrowRight
} from 'lucide-react';
import { CATEGORIES, CATEGORY_LABELS } from '../data/stackData';

const CATEGORY_ICON_MAP = {
  [CATEGORIES.FRONTEND]: Monitor,
  [CATEGORIES.BACKEND]: Server,
  [CATEGORIES.DATABASE]: Database,
  [CATEGORIES.AUTH]: Shield,
  [CATEGORIES.HOSTING]: Cloud,
  [CATEGORIES.CICD]: GitBranch,
};

const CATEGORY_COLORS = {
  [CATEGORIES.FRONTEND]: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
  [CATEGORIES.BACKEND]: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  [CATEGORIES.DATABASE]: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
  [CATEGORIES.AUTH]: 'linear-gradient(135deg, #ec4899, #f472b6)',
  [CATEGORIES.HOSTING]: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  [CATEGORIES.CICD]: 'linear-gradient(135deg, #10b981, #34d399)',
};

function ScalabilityGauge({ value }) {
  const color = value >= 9 ? '#34d399' : value >= 7 ? '#06b6d4' : value >= 5 ? '#fbbf24' : '#f87171';
  return (
    <div className="scalability-gauge">
      <div className="scalability-bar">
        <div
          className="scalability-fill"
          style={{ width: `${value * 10}%`, background: color }}
        />
      </div>
      <span className="scalability-value" style={{ color }}>{value}</span>
    </div>
  );
}

function TechCard({ tech, isTop }) {
  const [expanded, setExpanded] = useState(isTop);

  return (
    <div className="rec-tech" style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
      <div className="rec-tech-header">
        <span className={`rec-tech-rank ${isTop ? 'top' : 'other'}`}>
          {tech.rank}
        </span>
        <span className="rec-tech-name">{tech.name}</span>
        <span className="rec-tech-score">{tech.score} pts</span>
        {expanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </div>

      {expanded && (
        <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          <p className="rec-tech-desc">{tech.description}</p>

          <div className="rec-tech-meta">
            <div className="rec-tech-meta-item">
              <DollarSign size={14} className="rec-tech-meta-icon" />
              ${tech.costRange[0]} – ${tech.costRange[1]}/mo
            </div>
            <div className="rec-tech-meta-item">
              <TrendingUp size={14} className="rec-tech-meta-icon" />
              Scalability
            </div>
          </div>

          <ScalabilityGauge value={tech.scalabilityScore} />

          <div className="rec-pros-cons" style={{ marginTop: '1rem' }}>
            <div className="rec-pros">
              <div className="rec-pros-title">Pros</div>
              <ul>
                {tech.pros.map((pro, i) => <li key={i}>{pro}</li>)}
              </ul>
            </div>
            <div className="rec-cons">
              <div className="rec-cons-title">Cons</div>
              <ul>
                {tech.cons.map((con, i) => <li key={i}>{con}</li>)}
              </ul>
            </div>
          </div>

          <div className="rec-reasoning" style={{ marginTop: '0.75rem' }}>
            <div className="rec-reasoning-label">
              <Brain size={12} /> AI Reasoning
            </div>
            {tech.reasoning}
          </div>
        </div>
      )}
    </div>
  );
}

function RecCategory({ category, techs }) {
  const Icon = CATEGORY_ICON_MAP[category];
  const color = CATEGORY_COLORS[category];
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? techs : techs.slice(0, 3);

  return (
    <div className="rec-category animate-fade-in-up">
      <div className="rec-category-header">
        <div className="rec-category-icon" style={{ background: color }}>
          <Icon size={20} />
        </div>
        <div>
          <div className="rec-category-title">{CATEGORY_LABELS[category]}</div>
          <div className="rec-category-subtitle">
            Top pick: <strong>{techs[0]?.name}</strong>
          </div>
        </div>
      </div>

      {displayed.map((tech, i) => (
        <TechCard key={tech.id} tech={tech} isTop={i === 0} />
      ))}

      {techs.length > 3 && (
        <div style={{ padding: '0.75rem 1.5rem', textAlign: 'center' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show ${techs.length - 3} More`}
            {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Results({ recommendations, onCompare, onBack }) {
  const { categories, summary } = recommendations;

  return (
    <div className="results-page">
      <div className="container">
        {/* Header */}
        <div className="results-header animate-fade-in-up">
          <div className="section-label">
            <Sparkles size={14} /> Your Results
          </div>
          <h1>
            Your <span className="text-gradient">Perfect Stack</span>
          </h1>
          <p className="section-desc">
            Based on your answers, here's our AI-powered recommendation ranked by compatibility score.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="results-summary">
          <div className="summary-card animate-fade-in-up stagger-1">
            <div className="summary-card-value gradient">
              ${summary.totalCostRange[0]} – ${summary.totalCostRange[1]}
            </div>
            <div className="summary-card-label">Estimated Monthly Cost</div>
          </div>
          <div className="summary-card animate-fade-in-up stagger-2">
            <div className="summary-card-value gradient">
              {summary.avgScalability}/10
            </div>
            <div className="summary-card-label">Avg. Scalability Score</div>
          </div>
          <div className="summary-card animate-fade-in-up stagger-3">
            <div className="summary-card-value gradient">
              {Object.keys(categories).length}
            </div>
            <div className="summary-card-label">Categories Analyzed</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="text-center mb-3">
          <button className="btn btn-secondary" onClick={onCompare} style={{ marginRight: '1rem' }}>
            Compare Stacks
            <ArrowRight size={16} />
          </button>
          <button className="btn btn-ghost" onClick={onBack}>
            Start Over
          </button>
        </div>

        {/* Category Recommendations */}
        <div className="rec-categories">
          {Object.entries(categories).map(([category, techs], i) => (
            <RecCategory
              key={category}
              category={category}
              techs={techs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
