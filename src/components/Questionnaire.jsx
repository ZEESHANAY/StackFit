import { useState, useCallback } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'projectType',
    number: '01',
    title: 'What are you building?',
    desc: 'Select the type of project that best matches your vision.',
    type: 'single',
    options: [
      { value: 'web-app', emoji: '🌐', label: 'Web Application', desc: 'Dashboard, portal, or interactive web tool' },
      { value: 'mobile', emoji: '📱', label: 'Mobile App', desc: 'iOS / Android application' },
      { value: 'api', emoji: '⚡', label: 'API / Backend', desc: 'REST or GraphQL API service' },
      { value: 'ecommerce', emoji: '🛒', label: 'E-Commerce', desc: 'Online store with payments' },
      { value: 'saas', emoji: '☁️', label: 'SaaS Platform', desc: 'Subscription-based software' },
      { value: 'blog', emoji: '📝', label: 'Blog / Content', desc: 'Content-focused website or blog' },
      { value: 'automation', emoji: '⚙️', label: 'Automation', desc: 'Workflows, scripts, and API integrations' },
      { value: 'ml', emoji: '🤖', label: 'Data / AI App', desc: 'Machine Learning models and Data Science tools' },
      { value: 'mvp', emoji: '🚀', label: 'MVP / Prototype', desc: 'Quick proof of concept' },
    ],
  },
  {
    id: 'budget',
    number: '02',
    title: 'What\'s your monthly budget?',
    desc: 'This helps us recommend cost-appropriate tools and hosting.',
    type: 'single',
    options: [
      { value: 'free', emoji: '🆓', label: 'Free / Hobby', desc: '$0/month — open-source only' },
      { value: 'startup', emoji: '🌱', label: 'Startup', desc: '$0 – $500/month' },
      { value: 'growth', emoji: '📈', label: 'Growth', desc: '$500 – $2,000/month' },
      { value: 'enterprise', emoji: '🏢', label: 'Enterprise', desc: '$2,000+/month' },
    ],
  },
  {
    id: 'teamSize',
    number: '03',
    title: 'How big is your team?',
    desc: 'Team size influences framework complexity and tooling choices.',
    type: 'single',
    options: [
      { value: 'solo', emoji: '🧑‍💻', label: 'Solo Developer', desc: 'Just me, myself, and I' },
      { value: '2-5', emoji: '👥', label: 'Small Team', desc: '2–5 developers' },
      { value: '6-15', emoji: '🏗️', label: 'Medium Team', desc: '6–15 developers' },
      { value: '15+', emoji: '🏢', label: 'Large Team', desc: '15+ developers' },
    ],
  },
  {
    id: 'traffic',
    number: '04',
    title: 'Expected daily traffic?',
    desc: 'Helps determine database and hosting scalability requirements.',
    type: 'single',
    options: [
      { value: 'low', emoji: '🌿', label: 'Low', desc: 'Under 1,000 users/day' },
      { value: 'medium', emoji: '🔥', label: 'Medium', desc: '1,000 – 50,000 users/day' },
      { value: 'high', emoji: '⚡', label: 'High', desc: '50,000 – 500,000 users/day' },
      { value: 'massive', emoji: '🌊', label: 'Massive', desc: '500,000+ users/day' },
    ],
  },
  {
    id: 'features',
    number: '05',
    title: 'Key features needed?',
    desc: 'Select all the features your project requires. Choose multiple.',
    type: 'multi',
    options: [
      { value: 'realtime', emoji: '🔴', label: 'Real-time / WebSockets' },
      { value: 'auth', emoji: '🔐', label: 'Authentication / Social Login' },
      { value: 'payments', emoji: '💳', label: 'Payments / Billing' },
      { value: 'file-upload', emoji: '📁', label: 'File Upload / Storage' },
      { value: 'search', emoji: '🔍', label: 'Search / Full-text' },
      { value: 'analytics', emoji: '📊', label: 'Analytics / Reports' },
      { value: 'automation', emoji: '⚙️', label: 'Workflow Automation' },
      { value: 'ml', emoji: '🤖', label: 'AI / Machine Learning' },
    ],
  },
  {
    id: 'priority',
    number: '06',
    title: 'What\'s your #1 priority?',
    desc: 'This will weight our recommendations towards what matters most.',
    type: 'single',
    options: [
      { value: 'speed', emoji: '🚀', label: 'Speed to Market', desc: 'Ship fast, iterate later' },
      { value: 'scalability', emoji: '📈', label: 'Scalability', desc: 'Built to handle growth' },
      { value: 'cost', emoji: '💰', label: 'Low Cost', desc: 'Minimize expenses' },
      { value: 'dx', emoji: '🛠️', label: 'Developer Experience', desc: 'Best tools for productivity' },
    ],
  },
];

export default function Questionnaire({ onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    projectType: null,
    budget: null,
    teamSize: null,
    traffic: null,
    features: [],
    priority: null,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQ = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  const selectOption = useCallback((value) => {
    if (currentQ.type === 'multi') {
      setAnswers((prev) => {
        const features = prev.features.includes(value)
          ? prev.features.filter((f) => f !== value)
          : [...prev.features, value];
        return { ...prev, features };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
      // Auto-advance after a short delay for single-select
      setTimeout(() => {
        if (step < QUESTIONS.length - 1) {
          goNext();
        }
      }, 300);
    }
  }, [currentQ, step]);

  const goNext = useCallback(() => {
    if (step < QUESTIONS.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      onComplete(answers);
    }
  }, [step, answers, onComplete]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep((s) => s - 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      onBack();
    }
  }, [step, onBack]);

  const canProceed = currentQ.type === 'multi'
    ? answers.features.length > 0
    : answers[currentQ.id] !== null;

  return (
    <div className="questionnaire-page">
      <div className="questionnaire-container">
        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-steps">
            {QUESTIONS.map((q, i) => (
              <div
                key={q.id}
                className={`progress-step ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}
              >
                <div className="progress-step-dot" />
                <span className="progress-step-label" style={{ display: 'none' }}>{q.number}</span>
              </div>
            ))}
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question Card */}
        <div
          className="question-card"
          key={step}
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
            transition: 'all 0.3s ease-out',
          }}
        >
          <div className="question-number">Question {currentQ.number} / 06</div>
          <h2 className="question-title">{currentQ.title}</h2>
          <p className="question-desc">{currentQ.desc}</p>

          {currentQ.type === 'multi' ? (
            <div className="chips-grid">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.value}
                  className={`chip ${answers.features.includes(opt.value) ? 'selected' : ''}`}
                  onClick={() => selectOption(opt.value)}
                >
                  <span>{opt.emoji}</span>
                  {opt.label}
                  {answers.features.includes(opt.value) && <Check size={14} />}
                </button>
              ))}
            </div>
          ) : (
            <div className="options-grid">
              {currentQ.options.map((opt) => (
                <div
                  key={opt.value}
                  className={`option-card ${answers[currentQ.id] === opt.value ? 'selected' : ''}`}
                  onClick={() => selectOption(opt.value)}
                >
                  <div className="option-card-content">
                    <span className="option-emoji">{opt.emoji}</span>
                    <div className="option-label">{opt.label}</div>
                    {opt.desc && <div className="option-desc">{opt.desc}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="question-nav">
          <button className="btn btn-ghost" onClick={goPrev}>
            <ArrowLeft size={16} />
            {step === 0 ? 'Home' : 'Back'}
          </button>

          {(currentQ.type === 'multi' || step === QUESTIONS.length - 1) && (
            <button
              className="btn btn-primary"
              onClick={goNext}
              disabled={!canProceed}
              style={{
                opacity: canProceed ? 1 : 0.5,
                pointerEvents: canProceed ? 'auto' : 'none',
              }}
            >
              {step === QUESTIONS.length - 1 ? (
                <>
                  Get Recommendations
                  <ArrowRight size={16} />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
