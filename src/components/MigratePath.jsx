import { useMemo } from 'react';
import { Route, ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { migrationPaths, getTechById } from '../data/stackData';

export default function MigratePath({ recommendations, onBack }) {
  const relevantPaths = useMemo(() => {
    if (!recommendations?.topPicks) return [];

    const paths = [];
    const topIds = Object.values(recommendations.topPicks).map((t) => t.id);

    // Find migration paths TO the recommended techs
    Object.entries(migrationPaths).forEach(([key, path]) => {
      if (topIds.includes(path.to) || topIds.includes(path.from)) {
        const fromTech = getTechById(path.from);
        const toTech = getTechById(path.to);
        if (fromTech && toTech) {
          paths.push({ ...path, fromTech, toTech });
        }
      }
    });

    return paths;
  }, [recommendations]);

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header animate-fade-in-up">
          <div className="section-label">
            <Route size={14} /> Migration Paths
          </div>
          <h1 className="section-title">
            <span className="text-gradient">Upgrade Paths</span> & Migration Guides
          </h1>
          <p className="section-desc">
            Planning to migrate? Here are step-by-step guides with time estimates and risk assessments.
          </p>
        </div>

        {relevantPaths.length === 0 ? (
          <div className="card-glass text-center animate-fade-in-up" style={{ padding: '3rem', maxWidth: 500, margin: '0 auto' }}>
            <Route size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No migration paths found</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              The recommended stack doesn't have any common migration paths in our database yet.
            </p>
          </div>
        ) : (
          <div className="migrate-section">
            {relevantPaths.map((path, index) => (
              <div
                key={`${path.from}-${path.to}`}
                className={`migrate-card animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="migrate-card-header">
                  <div className="migrate-arrow">
                    <span className="migrate-from">{path.fromTech.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                    <span className="migrate-to">{path.toTech.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Clock size={14} />
                      {path.timeEstimate}
                    </div>
                    <span className={`migrate-badge ${path.difficulty.toLowerCase()}`}>
                      {path.difficulty} Difficulty
                    </span>
                  </div>
                </div>

                <div className="migrate-body">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                    Migration Steps
                  </h4>
                  <div className="migrate-timeline">
                    {path.steps.map((step, i) => (
                      <div key={i} className="migrate-step" style={{ animationDelay: `${i * 0.1}s` }}>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>

                  {path.risks && path.risks.length > 0 && (
                    <div className="migrate-risks">
                      <div className="migrate-risks-title">
                        <AlertTriangle size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: 4 }} />
                        Risk Assessment
                      </div>
                      <ul>
                        {path.risks.map((risk, i) => (
                          <li key={i}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-2">
          <button className="btn btn-ghost" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Results
          </button>
        </div>
      </div>
    </div>
  );
}
