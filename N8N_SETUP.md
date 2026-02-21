# StackFit – n8n Automation Setup Guide

## Overview

StackFit integrates with [n8n](https://n8n.io) for workflow automation. When users complete the questionnaire, the app sends a webhook payload to n8n, which can then:

- **Log submissions** to Google Sheets
- **Send email notifications** to admins
- **Post to Slack/Discord** channels
- **Store analytics data** for trends

## Setup Instructions

### 1. Install n8n

```bash
# Using npm
npm install -g n8n

# Or using Docker
docker run -d --name n8n -p 5678:5678 n8nio/n8n
```

### 2. Create the Webhook Workflow

1. Open n8n at `http://localhost:5678`
2. Create a new workflow
3. Add a **Webhook** node:
   - HTTP Method: `POST`
   - Path: `stackfit-submit`
   - Response Mode: `Immediately`
4. Copy the webhook URL (e.g., `http://localhost:5678/webhook/stackfit-submit`)

### 3. Connect to StackFit

Create a `.env` file in the project root:

```env
VITE_N8N_WEBHOOK_URL=http://localhost:5678/webhook/stackfit-submit
```

Restart the dev server.

### 4. Add Automation Nodes

#### Google Sheets Logging
- Add a **Google Sheets** node after the webhook
- Operation: `Append Row`
- Map fields: timestamp, projectType, budget, teamSize, traffic, recommendations

#### Email Notification
- Add an **Email** node
- Subject: `New StackFit Submission`
- Body: Map the payload fields

#### Slack Notification
- Add a **Slack** node
- Channel: `#submissions`
- Message: Format the recommendation summary

### 5. Webhook Payload Format

```json
{
  "timestamp": "2026-02-21T02:00:00.000Z",
  "source": "stackfit-web",
  "questionnaire": {
    "projectType": "saas",
    "budget": "startup",
    "teamSize": "2-5",
    "traffic": "medium",
    "features": ["auth", "payments", "analytics"],
    "priority": "speed"
  },
  "recommendations": {
    "frontend": "Next.js",
    "backend": "Node.js + Express",
    "database": "Supabase (Postgres)",
    "auth": "Supabase Auth",
    "hosting": "Vercel",
    "cicd": "GitHub Actions",
    "totalCostRange": [0, 275],
    "avgScalability": 8.5
  }
}
```

## n8n Workflow JSON (Import Ready)

You can import this into n8n:

```json
{
  "name": "StackFit Submission Handler",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "stackfit-submit",
        "responseMode": "onReceived"
      },
      "name": "StackFit Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    }
  ],
  "connections": {}
}
```

Add your desired action nodes (Google Sheets, Email, Slack) after the webhook trigger.
