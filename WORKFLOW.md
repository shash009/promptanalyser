🚀 AI Brand Visibility Analyzer – Full System Workflow
(Fully aligned with the advanced Firestore schema)

Stack: Next.js + Tailwind + Firebase (Auth + Firestore)

⭐ 1. High-Level Architecture

Your system follows a structured multi-stage flow:

User Authentication

Brand Setup & Competitor Mapping

Prompt Generation (per Brand)

Session Creation (per Analysis Run)

Multi-Platform AI Query Execution

Per-Prompt + Per-Platform Result Storage

Platform-Level Aggregation

Final Visibility Score & Report Generation

Dashboard + Analytics Retrieval

All data flows into Firestore across these core collections:

users/
brands/
   └── prompts/
   └── competitors/
sessions/
   └── promptResults/
   └── platformAggregates/
platformResults/
reports/
systemLogs/

🧩 2. Detailed System Workflow
🔐 Step 1 — User Authentication (Firebase Auth)

Purpose: Identify who created brands, sessions, prompts.

Login using Google or Email/Password.

On success, store:

uid

session token

Protect routes using:

onAuthStateChanged

Next.js middleware

No analysis can run without a logged-in user.

🏢 Step 2 — Brand Setup

UI Page: /brand/new

User enters:

Brand Name

Industry

Optional: Competitors

Stored in:

brands/{brandId}
brands/{brandId}/competitors/


Why separate competitors?
To reuse them across multiple sessions & for longitudinal analysis.

🧠 Step 3 — Automated Prompt Generation

Triggered when starting an analysis session.

The backend generates:

Awareness prompts

Comparison prompts

Purchase-intent prompts

Recommendation prompts

Alternative search prompts

Each prompt saved under:

brands/{brandId}/prompts/{promptId}


Fields include:

promptText

intent

intentSubtype

keywords

usageCount

🧪 Step 4 — Start Analysis Session

When user begins the visibility check:

Creates:

sessions/{sessionId}


Fields:

brandId

userId

totalPrompts

platformsAnalyzed

timestamps

This is the central reference for all results.

🤖 Step 5 — Multi-Platform Query Simulation

For every prompt × every platform (ChatGPT, Gemini, Perplexity, Copilot):

Backend requests:

“Simulate how {platform} would answer the query: "{prompt}"
Extract brand & competitor ranking indicators.”

📝 Step 6 — Store Per-Prompt Results

Each query result is saved under:

sessions/{sessionId}/promptResults/{resultId}


Stored fields:

rawResponse

parsedText

brandMentioned

brandRank

sentiment

competitor mentions

list-style indicator

responseTimeMs

This ensures structured downstream aggregation.

📊 Step 7 — Platform-Level Aggregation

After all prompts are processed:

Computed metrics saved under:

sessions/{sessionId}/platformAggregates/{platform}


Includes:

brandMentionCount

averageRank

sentiment distribution

competitor frequency

top keywords

Also optionally pushed to:

platformResults/


For global dashboard analytics.

🧮 Step 8 — Final Visibility Score

Using platformAggregates:

Formula uses:

Prompt coverage

Mention frequency

Avg rank

Sentiment weighting

Recommendation strength

Competitive density

Final score saved to the session:

sessions/{sessionId}.visibilityScore

📑 Step 9 — Generate Final Report

Final summarized insights stored under:

reports/{reportId}


Fields:

sessionId

brandId

reportJson

pdfUrl (optional)

generatedAt

UI pulls directly from this collection for PDF export.

🖥️ 3. Frontend UI Workflow
Analyze Brand Page (/analyze/{brandId})

Sections:

Brand header

“Run Visibility Analysis” button

Shows latest sessions + scores

Session Results Page (/session/{sessionId})

Displays:

Overall Score

Platform insights

Prompt-wise results

Competitor analytics

Sentiment charts

Uses data from:

sessions/
sessions/{sessionId}/promptResults/
sessions/{sessionId}/platformAggregates/
reports/

📊 4. Developer Workflow

1️⃣ Initialize Next.js + Tailwind
2️⃣ Add Firebase Auth + Firestore SDK
3️⃣ Build Brand CRUD → Firestore
4️⃣ Build Prompt Generator (OpenAI)
5️⃣ Build Multi-Platform Simulated Analyzer
6️⃣ Save per-prompt + per-platform results
7️⃣ Compute aggregations
8️⃣ Generate final session report
9️⃣ Build dashboard + reports page

🎯 Final Notes

This version of the workflow:

Fully matches your advanced Firestore schema

Separates raw data, aggregated metrics & reports

Uses scalable collections + subcollections

Ideal for real product or hackathon demo

If you want, I can now generate:

✅ System Architecture Diagram
✅ ERD Diagram
✅ Final Project README.md
✅ API Contract Documentation (OpenAPI-style)
You said:
i only have to make a workflow.md please create a detailed one
ChatGPT said:

Below is your final, polished, production-ready WORKFLOW.md file.
It is written in clean technical language, perfectly matches your advanced database schema, and is ideal for GitHub, hackathon submission, or documentation.

🚀 AI Brand Visibility Analyzer – System Workflow
Workflow Documentation (WORKFLOW.md)

Tech Stack: Next.js • Tailwind • Firebase (Auth + Firestore) • OpenAI API

📌 1. Overview

The AI Brand Visibility Analyzer evaluates how a brand appears across major AI platforms (ChatGPT, Gemini, Perplexity, Copilot).
The system generates prompts, simulates platform responses, extracts brand mentions, analyzes competitors, and computes an overall visibility score.

This workflow explains the end-to-end execution, data movement, and how each step maps to the Firestore schema.

🧩 2. Core Flow Summary

User logs in

User selects or creates a brand

Prompts are generated for that brand

A new analysis session is created

Each prompt is sent to multiple AI platforms

Responses are stored per-prompt, per-platform

Aggregations are computed per platform

Overall visibility score is calculated

Final report is generated

Dashboard displays all sessions and reports

🔐 3. Authentication Workflow

Authentication is handled using Firebase Auth (Google Login or Email/Password).

Logged-in user’s UID is used to associate:

created brands

analysis sessions

reports

No analysis can run without a valid authenticated user.

🏢 4. Brand Setup Workflow
4.1 Create New Brand

User enters:

Brand Name

Industry (FinTech, SaaS, Insurance, etc.)

Stored in:

brands/{brandId}

4.2 Add Competitors (Optional)

Each competitor is saved under:

brands/{brandId}/competitors/{competitorId}


Competitors are referenced during keyword extraction and visibility scoring.

🧠 5. Prompt Generation Workflow

When user initiates analysis:

Backend generates 20–30 industry-specific prompts, covering:

Awareness searches

Comparison queries

High-intent buying queries

Recommendation prompts

Alternatives queries

Each prompt is saved under:

brands/{brandId}/prompts/{promptId}


Fields include:

promptText

intent

intentSubtype

keywords

createdAt

usageCount

Prompts are reused across multiple sessions.

🧪 6. Session Initialization

Starting an analysis creates a new session:

sessions/{sessionId}


Fields:

brandId

userId

totalPrompts

platformsAnalyzed

timestamps

visibilityScore (computed later)

This session tracks all results from this run.

🤖 7. Multi-Platform Response Simulation

For every prompt, simulate responses for:

ChatGPT

Gemini

Perplexity

Microsoft Copilot

Each simulation includes a system instruction:

“Simulate how {platform} would respond to the following search query…”

The output is then passed to another LLM prompt to extract structure.

📝 8. Per-Prompt Result Storage

Each platform’s response is stored under:

sessions/{sessionId}/promptResults/{resultId}


Saved attributes:

rawResponse

parsedText

brandMentioned

brandRank

sentiment

competitor list

recommendation strength

responseTimeMs

keywords extracted

These documents serve as raw data for platform aggregation.

📊 9. Platform Aggregation Workflow

After all promptResults are generated:

Aggregate metrics per platform:

total brand mentions

average rank

sentiment distribution

competitor frequency

keyword frequency

average recommendation strength

Stored in:

sessions/{sessionId}/platformAggregates/{platform}


Optionally mirrored in:

platformResults/


for global admin dashboards.

🧮 10. Visibility Score Computation

Overall visibility score (0–100) is computed using:

mention density

average ranking position

sentiment weight

frequency of competitor mentions

recommendation strength

prompt type coverage

The final score is written back to the session:

sessions/{sessionId}.visibilityScore

📑 11. Report Generation Workflow

Once aggregation is complete:

A final report is generated, containing:

overall score

platform breakdowns

competitive insights

prompt-level table

AI-generated recommendations

Stored under:

reports/{reportId}


Optional:

PDF export (html2pdf or react-to-print)

🖥️ 12. Frontend Rendering Workflow
Dashboard (/dashboard)

Lists all brands

Lists previous sessions (sorted by createdAt)

Provides quick score view

Brand Page (/brand/{id})

Show brand info

Show competitor info

Show previously generated prompts

Session Results (/session/{sessionId})

Scorecard

Sentiment graphs

Platform-level tables

Prompt-wise details

Insights + Recommendations section

Export Report button

🛠️ 13. Logging & Error Handling

Errors or important events are logged in:

systemLogs/{logId}


Used for debugging and audit trails.

🎯 14. End-to-End Data Flow (One-Line Summary)

Brand → Prompts → Session → PromptResults → PlatformAggregates → Score → Report → Dashboard