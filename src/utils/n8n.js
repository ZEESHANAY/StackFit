// StackFit – n8n Webhook Integration
// Sends questionnaire data to n8n for automation

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || null;

export async function sendToN8N(data) {
  if (!N8N_WEBHOOK_URL) {
    console.log('[StackFit] n8n webhook URL not configured. Skipping automation.');
    console.log('[StackFit] Set VITE_N8N_WEBHOOK_URL in .env to enable.');
    return { success: false, reason: 'no_webhook_url' };
  }

  try {
    const payload = {
      timestamp: new Date().toISOString(),
      source: 'stackfit-web',
      questionnaire: {
        projectType: data.projectType,
        budget: data.budget,
        teamSize: data.teamSize,
        traffic: data.traffic,
        features: data.features,
        priority: data.priority,
      },
      recommendations: data.recommendations ? {
        frontend: data.recommendations.topPicks?.frontend?.name,
        backend: data.recommendations.topPicks?.backend?.name,
        database: data.recommendations.topPicks?.database?.name,
        auth: data.recommendations.topPicks?.auth?.name,
        hosting: data.recommendations.topPicks?.hosting?.name,
        cicd: data.recommendations.topPicks?.cicd?.name,
        totalCostRange: data.recommendations.summary?.totalCostRange,
        avgScalability: data.recommendations.summary?.avgScalability,
      } : null,
    };

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('[StackFit] Data sent to n8n successfully.');
      return { success: true };
    } else {
      console.warn('[StackFit] n8n webhook returned:', response.status);
      return { success: false, reason: 'webhook_error', status: response.status };
    }
  } catch (err) {
    console.warn('[StackFit] Failed to send data to n8n:', err.message);
    return { success: false, reason: 'network_error', error: err.message };
  }
}

// n8n Workflow Template (for documentation)
export const N8N_WORKFLOW_TEMPLATE = {
  name: 'StackFit Submission Handler',
  nodes: [
    {
      type: 'n8n-nodes-base.webhook',
      name: 'StackFit Webhook',
      parameters: { httpMethod: 'POST', path: 'stackfit-submit' },
    },
    {
      type: 'n8n-nodes-base.googleSheets',
      name: 'Log to Google Sheets',
      parameters: { operation: 'append' },
    },
    {
      type: 'n8n-nodes-base.emailSend',
      name: 'Send Notification',
      parameters: { subject: 'New StackFit Submission' },
    },
  ],
};
