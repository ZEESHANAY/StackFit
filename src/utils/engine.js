// StackFit – Recommendation Engine
// Scores and ranks technologies based on user questionnaire answers

import { techStack, CATEGORIES } from '../data/stackData';

// Tag mapping from questionnaire answers to technology tags
const projectTypeTags = {
  'web-app': ['web-app', 'spa'],
  'mobile': ['mobile'],
  'api': ['api', 'microservices'],
  'ecommerce': ['ecommerce', 'web-app'],
  'saas': ['saas', 'web-app'],
  'blog': ['content', 'blog', 'seo'],
  'realtime': ['realtime', 'web-app'],
  'mvp': ['mvp', 'rapid', 'startup'],
};

const budgetTags = {
  'free': ['solo', 'startup', 'rapid'],
  'startup': ['startup', 'small-team'],
  'growth': ['small-team', 'enterprise'],
  'enterprise': ['enterprise', 'large-team'],
};

const teamSizeTags = {
  'solo': ['solo', 'rapid'],
  '2-5': ['small-team', 'startup'],
  '6-15': ['large-team'],
  '15+': ['large-team', 'enterprise'],
};

const trafficTags = {
  'low': ['solo', 'startup', 'mvp'],
  'medium': ['startup', 'small-team'],
  'high': ['performance', 'enterprise'],
  'massive': ['performance', 'enterprise', 'microservices'],
};

const featureTags = {
  'realtime': ['realtime'],
  'auth': ['social-login', 'mfa'],
  'payments': ['ecommerce', 'saas'],
  'file-upload': ['web-app'],
  'search': ['analytics', 'data'],
  'analytics': ['analytics', 'data'],
  'ml': ['ml', 'data'],
};

const priorityWeights = {
  'speed': { costWeight: 0.3, scaleWeight: 0.1, tagBonus: ['rapid', 'mvp', 'startup'] },
  'scalability': { costWeight: 0.1, scaleWeight: 0.5, tagBonus: ['performance', 'enterprise', 'microservices'] },
  'cost': { costWeight: 0.5, scaleWeight: 0.1, tagBonus: ['solo', 'startup'] },
  'dx': { costWeight: 0.2, scaleWeight: 0.2, tagBonus: ['rapid', 'startup', 'small-team'] },
};

// Budget constraints (max $/month per category)
const budgetLimits = {
  'free': 0,
  'startup': 100,
  'growth': 500,
  'enterprise': Infinity,
};

function scoreTech(tech, userTags, priority, budget) {
  let score = 0;

  // Tag matching score (0–50 points)
  const matchingTags = tech.tags.filter((tag) => userTags.includes(tag));
  score += matchingTags.length * 8;

  // Priority bonus tags (0–15 points)
  const pw = priorityWeights[priority] || priorityWeights.speed;
  const priorityMatches = tech.tags.filter((tag) => pw.tagBonus.includes(tag));
  score += priorityMatches.length * 5;

  // Scalability score contribution (0–20 points)
  score += tech.scalabilityScore * 2 * (pw.scaleWeight * 2 + 0.5);

  // Cost score (lower is better for cost-sensitive) (0–15 points)
  const maxCost = tech.costRange[1];
  const limit = budgetLimits[budget] || 500;
  if (maxCost <= limit) {
    score += 10;
    if (maxCost === 0) score += 5; // Free tech bonus
  } else {
    score -= 10; // Over budget penalty
  }

  // Cost weight adjustment
  if (pw.costWeight > 0.3 && maxCost > 0) {
    score -= maxCost * 0.02 * pw.costWeight;
  }

  return Math.max(0, Math.round(score * 10) / 10);
}

function collectUserTags(answers) {
  const tags = new Set();

  // Project type tags
  const ptTags = projectTypeTags[answers.projectType] || [];
  ptTags.forEach((t) => tags.add(t));

  // Budget tags
  const bTags = budgetTags[answers.budget] || [];
  bTags.forEach((t) => tags.add(t));

  // Team size tags
  const tsTags = teamSizeTags[answers.teamSize] || [];
  tsTags.forEach((t) => tags.add(t));

  // Traffic tags
  const trTags = trafficTags[answers.traffic] || [];
  trTags.forEach((t) => tags.add(t));

  // Feature tags
  if (answers.features) {
    answers.features.forEach((feature) => {
      const fTags = featureTags[feature] || [];
      fTags.forEach((t) => tags.add(t));
    });
  }

  // Priority bonus tags
  const pw = priorityWeights[answers.priority] || {};
  if (pw.tagBonus) pw.tagBonus.forEach((t) => tags.add(t));

  return Array.from(tags);
}

function generateAIReasoning(tech, answers, score, rank) {
  const reasons = [];

  if (rank === 1) {
    reasons.push(`${tech.name} is the top recommendation for your ${answers.projectType} project.`);
  }

  // Project-type reasoning
  if (answers.projectType === 'saas' && tech.tags.includes('saas')) {
    reasons.push(`It's battle-tested for SaaS products and supports the subscription-based models you'll need.`);
  }
  if (answers.projectType === 'ecommerce' && tech.tags.includes('ecommerce')) {
    reasons.push(`It has strong e-commerce ecosystem support with payment processing integrations.`);
  }
  if (answers.projectType === 'realtime' && tech.tags.includes('realtime')) {
    reasons.push(`Built-in real-time capabilities make it ideal for your use-case.`);
  }

  // Team reasoning
  if (answers.teamSize === 'solo' && tech.tags.includes('solo')) {
    reasons.push(`As a solo developer, ${tech.name} minimizes boilerplate and lets you ship faster.`);
  }
  if (answers.teamSize === '15+' && tech.tags.includes('enterprise')) {
    reasons.push(`For your large team, it enforces consistent patterns and supports enterprise workflows.`);
  }

  // Budget reasoning
  if (answers.budget === 'free' && tech.costRange[1] === 0) {
    reasons.push(`Completely free to use, perfect for your zero-budget constraint.`);
  }
  if (answers.budget === 'enterprise') {
    reasons.push(`Enterprise budgets unlock ${tech.name}'s premium features for maximum capability.`);
  }

  // Scalability
  if (tech.scalabilityScore >= 9) {
    reasons.push(`With a scalability score of ${tech.scalabilityScore}/10, it can handle your growth trajectory.`);
  }

  // Traffic
  if (answers.traffic === 'massive' && tech.scalabilityScore >= 9) {
    reasons.push(`Proven to handle massive traffic loads (500k+ daily users) with proper architecture.`);
  }
  if (answers.traffic === 'low' && tech.costRange[1] <= 30) {
    reasons.push(`Cost-effective for your expected traffic level without over-provisioning.`);
  }

  // Priority
  if (answers.priority === 'speed' && tech.tags.includes('rapid')) {
    reasons.push(`Optimized for speed-to-market — get your product shipped fast.`);
  }
  if (answers.priority === 'scalability' && tech.scalabilityScore >= 8) {
    reasons.push(`Aligns with your scalability priority: designed to grow with your product.`);
  }

  if (reasons.length < 2) {
    reasons.push(`Scored ${score} points based on your project requirements, team size, and budget.`);
    reasons.push(`${tech.pros[0]} — a key advantage for your setup.`);
  }

  return reasons.join(' ');
}

export function generateRecommendations(answers) {
  const userTags = collectUserTags(answers);
  const results = {};

  Object.values(CATEGORIES).forEach((category) => {
    const techs = techStack[category];
    const scored = techs.map((tech) => ({
      ...tech,
      score: scoreTech(tech, userTags, answers.priority, answers.budget),
    }));

    scored.sort((a, b) => b.score - a.score);

    // Add rank and AI reasoning
    scored.forEach((tech, index) => {
      tech.rank = index + 1;
      tech.reasoning = generateAIReasoning(tech, answers, tech.score, index + 1);
    });

    results[category] = scored;
  });

  // Calculate overall stats
  const topPicks = {};
  let totalMinCost = 0;
  let totalMaxCost = 0;
  let avgScalability = 0;

  Object.entries(results).forEach(([category, techs]) => {
    topPicks[category] = techs[0];
    totalMinCost += techs[0].costRange[0];
    totalMaxCost += techs[0].costRange[1];
    avgScalability += techs[0].scalabilityScore;
  });

  avgScalability = Math.round((avgScalability / Object.keys(results).length) * 10) / 10;

  return {
    categories: results,
    topPicks,
    summary: {
      totalCostRange: [totalMinCost, totalMaxCost],
      avgScalability,
      userTags,
    },
  };
}
