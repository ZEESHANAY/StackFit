import { useState, useMemo } from 'react';
import { GitCompare, ArrowLeft, TrendingUp, DollarSign, Award } from 'lucide-react';
import { CATEGORIES, CATEGORY_LABELS, getTechsByCategory } from '../data/stackData';

export default function Compare({ recommendations, onBack }) {
  const categories = Object.values(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.FRONTEND);
  const [stackA, setStackA] = useState('');
  const [stackB, setStackB] = useState('');

  const techOptions = useMemo(() => getTechsByCategory(selectedCategory), [selectedCategory]);

  const techA = useMemo(() => techOptions.find((t) => t.id === stackA), [techOptions, stackA]);
  const techB = useMemo(() => techOptions.find((t) => t.id === stackB), [techOptions, stackB]);

  // Reset selections when category changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setStackA('');
    setStackB('');
  };

  const comparisonRows = useMemo(() => {
    if (!techA || !techB) return [];
    return [
      {
        label: 'Scalability',
        a: `${techA.scalabilityScore}/10`,
        b: `${techB.scalabilityScore}/10`,
        winner: techA.scalabilityScore > techB.scalabilityScore ? 'a' : techB.scalabilityScore > techA.scalabilityScore ? 'b' : 'tie',
      },
      {
        label: 'Cost ($/mo)',
        a: `$${techA.costRange[0]} – $${techA.costRange[1]}`,
        b: `$${techB.costRange[0]} – $${techB.costRange[1]}`,
        winner: techA.costRange[1] < techB.costRange[1] ? 'a' : techB.costRange[1] < techA.costRange[1] ? 'b' : 'tie',
      },
      {
        label: 'Pros Count',
        a: `${techA.pros.length} pros`,
        b: `${techB.pros.length} pros`,
        winner: techA.pros.length > techB.pros.length ? 'a' : techB.pros.length > techA.pros.length ? 'b' : 'tie',
      },
      {
        label: 'Cons Count',
        a: `${techA.cons.length} cons`,
        b: `${techB.cons.length} cons`,
        winner: techA.cons.length < techB.cons.length ? 'a' : techB.cons.length < techA.cons.length ? 'b' : 'tie',
      },
    ];
  }, [techA, techB]);

  return (
    <div className="compare-page">
      <div className="container">
        <div className="compare-header animate-fade-in-up">
          <div className="section-label">
            <GitCompare size={14} /> Stack Comparison
          </div>
          <h1 className="section-title">
            Compare <span className="text-gradient">Side by Side</span>
          </h1>
          <p className="section-desc">
            Pick two technologies in any category and compare them head-to-head.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="tabs animate-fade-in-up stagger-1">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Selectors */}
        <div className="compare-selectors animate-fade-in-up stagger-2">
          <div className="compare-selector">
            <select
              className="compare-select"
              value={stackA}
              onChange={(e) => setStackA(e.target.value)}
            >
              <option value="">Select option A...</option>
              {techOptions.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === stackB}>
                  {t.name}
                </option>
              ))}
            </select>
            {techA && (
              <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{techA.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{techA.description}</p>
              </div>
            )}
          </div>

          <div className="compare-vs">VS</div>

          <div className="compare-selector">
            <select
              className="compare-select"
              value={stackB}
              onChange={(e) => setStackB(e.target.value)}
            >
              <option value="">Select option B...</option>
              {techOptions.map((t) => (
                <option key={t.id} value={t.id} disabled={t.id === stackA}>
                  {t.name}
                </option>
              ))}
            </select>
            {techB && (
              <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{techB.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{techB.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {techA && techB && (
          <div className="animate-fade-in-up" style={{ marginTop: '2rem' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>{techA.name}</th>
                  <th>{techB.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td style={{ fontWeight: 600 }}>{row.label}</td>
                    <td className={row.winner === 'a' ? 'highlight' : ''}>
                      {row.winner === 'a' && <Award size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom', color: 'var(--accent-2)' }} />}
                      {row.a}
                    </td>
                    <td className={row.winner === 'b' ? 'highlight' : ''}>
                      {row.winner === 'b' && <Award size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom', color: 'var(--accent-2)' }} />}
                      {row.b}
                    </td>
                  </tr>
                ))}

                {/* Pros row */}
                <tr>
                  <td style={{ fontWeight: 600, color: '#34d399' }}>Pros</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {techA.pros.map((p, i) => <div key={i} style={{ padding: '2px 0' }}>+ {p}</div>)}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {techB.pros.map((p, i) => <div key={i} style={{ padding: '2px 0' }}>+ {p}</div>)}
                  </td>
                </tr>

                {/* Cons row */}
                <tr>
                  <td style={{ fontWeight: 600, color: '#f87171' }}>Cons</td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {techA.cons.map((c, i) => <div key={i} style={{ padding: '2px 0' }}>− {c}</div>)}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {techB.cons.map((c, i) => <div key={i} style={{ padding: '2px 0' }}>− {c}</div>)}
                  </td>
                </tr>
              </tbody>
            </table>
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
