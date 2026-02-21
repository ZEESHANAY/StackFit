import { useMemo, useRef, useEffect, useState } from 'react';
import {
  Monitor, Server, Database, Shield, Cloud, GitBranch,
  ArrowLeft, Users
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
  [CATEGORIES.FRONTEND]: '#7c3aed',
  [CATEGORIES.BACKEND]: '#06b6d4',
  [CATEGORIES.DATABASE]: '#3b82f6',
  [CATEGORIES.AUTH]: '#ec4899',
  [CATEGORIES.HOSTING]: '#f59e0b',
  [CATEGORIES.CICD]: '#10b981',
};

// Node positions for the architecture layout
const NODE_POSITIONS = {
  users: { x: '44%', y: '4%' },
  [CATEGORIES.HOSTING]: { x: '44%', y: '16%' },
  [CATEGORIES.FRONTEND]: { x: '15%', y: '32%' },
  [CATEGORIES.AUTH]: { x: '68%', y: '32%' },
  [CATEGORIES.BACKEND]: { x: '44%', y: '50%' },
  [CATEGORIES.DATABASE]: { x: '20%', y: '72%' },
  [CATEGORIES.CICD]: { x: '68%', y: '72%' },
};

// Connections between nodes
const CONNECTIONS = [
  { from: 'users', to: CATEGORIES.HOSTING },
  { from: CATEGORIES.HOSTING, to: CATEGORIES.FRONTEND },
  { from: CATEGORIES.HOSTING, to: CATEGORIES.AUTH },
  { from: CATEGORIES.FRONTEND, to: CATEGORIES.BACKEND },
  { from: CATEGORIES.AUTH, to: CATEGORIES.BACKEND },
  { from: CATEGORIES.BACKEND, to: CATEGORIES.DATABASE },
  { from: CATEGORIES.BACKEND, to: CATEGORIES.CICD },
];

function ArchNode({ id, tech, position, color, delay }) {
  const Icon = CATEGORY_ICON_MAP[id] || Users;
  const label = tech ? tech.name : 'Users';
  const subtitle = tech ? CATEGORY_LABELS[id] : 'End Users';

  return (
    <div
      className="arch-node"
      style={{
        left: position.x,
        top: position.y,
        animationDelay: `${delay}s`,
        transform: 'translate(-50%, 0)',
      }}
    >
      <div
        className="arch-node-icon"
        style={{ background: color || 'var(--gradient-primary)' }}
      >
        <Icon size={18} />
      </div>
      <div className="arch-node-info">
        <h4>{label}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default function ArchitectureDiagram({ recommendations, onBack }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  const topPicks = recommendations?.topPicks || {};

  // Calculate SVG lines after mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLines = () => {
      const nodes = container.querySelectorAll('.arch-node');
      const nodeMap = {};
      nodes.forEach((node) => {
        const id = node.dataset.nodeId;
        if (id) {
          const rect = node.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          nodeMap[id] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        }
      });

      const newLines = CONNECTIONS.map((conn) => {
        const from = nodeMap[conn.from];
        const to = nodeMap[conn.to];
        if (from && to) {
          return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
        }
        return null;
      }).filter(Boolean);

      setLines(newLines);
    };

    // Wait for animations to settle
    const timer = setTimeout(updateLines, 800);
    window.addEventListener('resize', updateLines);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateLines);
    };
  }, [topPicks]);

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-header animate-fade-in-up">
          <div className="section-label">
            <Monitor size={14} /> Architecture
          </div>
          <h1 className="section-title">
            Your <span className="text-gradient">Architecture Diagram</span>
          </h1>
          <p className="section-desc">
            See how your recommended stack components connect and interact in a real-world architecture.
          </p>
        </div>

        <div className="arch-container animate-scale-in" ref={containerRef}>
          <svg className="arch-connections" ref={svgRef}>
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>

          {/* Users node */}
          <div
            className="arch-node"
            data-node-id="users"
            style={{
              left: NODE_POSITIONS.users.x,
              top: NODE_POSITIONS.users.y,
              transform: 'translate(-50%, 0)',
              animationDelay: '0s',
            }}
          >
            <div className="arch-node-icon" style={{ background: 'linear-gradient(135deg, #64748b, #94a3b8)' }}>
              <Users size={18} />
            </div>
            <div className="arch-node-info">
              <h4>Users</h4>
              <p>End Users</p>
            </div>
          </div>

          {/* Tech nodes */}
          {Object.entries(NODE_POSITIONS).filter(([k]) => k !== 'users').map(([category, position], i) => {
            const tech = topPicks[category];
            if (!tech) return null;
            return (
              <div
                key={category}
                className="arch-node"
                data-node-id={category}
                style={{
                  left: position.x,
                  top: position.y,
                  transform: 'translate(-50%, 0)',
                  animationDelay: `${(i + 1) * 0.1}s`,
                }}
              >
                <div
                  className="arch-node-icon"
                  style={{ background: CATEGORY_COLORS[category] }}
                >
                  {(() => {
                    const Icon = CATEGORY_ICON_MAP[category];
                    return <Icon size={18} />;
                  })()}
                </div>
                <div className="arch-node-info">
                  <h4>{tech.name}</h4>
                  <p>{CATEGORY_LABELS[category]}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-2">
          <button className="btn btn-ghost" onClick={onBack}>
            <ArrowLeft size={16} /> Back to Results
          </button>
        </div>
      </div>
    </div>
  );
}
