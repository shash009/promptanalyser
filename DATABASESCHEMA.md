📚 AI Brand Visibility Analyzer – Firebase Database Schema (MVP)

Version: 1.1 (Optimized for Hackathon Submission)
Database: Firestore (NoSQL, Document-Based)

🏗️ 1. Collections Overview
users/
brands/
   └── prompts/
   └── competitors/   (optional)
sessions/
   └── promptResults/
   └── platformAggregates/
platformResults/
reports/
systemLogs/

👤 2. users Collection

Path: users/{userId}

Field	Type	Description
name	string	User name
email	string	Email ID
role	string	"admin" / "brand_manager"
createdAt	timestamp	Account creation time
🏢 3. brands Collection

Path: brands/{brandId}

Field	Type	Description
brandName	string	e.g., PolicyBazaar
industry	string	e.g., Insurance
createdBy	reference(users)	Owner
createdAt	timestamp	Created time
updatedAt	timestamp	Last update
avgVisibilityScore	number	Aggregated score
📝 3.1 brands/{brandId}/prompts Subcollection

Path: brands/{brandId}/prompts/{promptId}

Field	Type	Description
promptText	string	Generated prompt
intent	string	awareness / consideration / purchase / comparison
intentSubtype	string	question / recommendation / compare / howto
keywords	array<string>	Extracted keywords
createdAt	timestamp	When generated
createdBy	reference(users)	Who generated
usageCount	number	How many sessions used
lastUsedAt	timestamp	Last usage
⚔️ 3.2 brands/{brandId}/competitors Subcollection (optional)

Path: brands/{brandId}/competitors/{competitorId}

Field	Type	Description
name	string	Competitor brand
priority	number	1–5 (importance)
createdAt	timestamp	Added time
notes	string	Optional notes
🧪 4. sessions Collection

Each analysis run = 1 session.

Path: sessions/{sessionId}

Field	Type	Description
brandId	reference(brands)	Brand analyzed
userId	reference(users)	Initiated by
totalPrompts	number	Number of prompts used
platformsAnalyzed	array<string>	e.g. ["chatgpt","gemini"]
startedAt	timestamp	Start time
completedAt	timestamp	End time
visibilityScore	number	Final score 0–100
📌 4.1 sessions/{sessionId}/promptResults Subcollection

Path: sessions/{sessionId}/promptResults/{resultId}

Field	Type	Description
promptId	string	Reference to brand prompt
promptText	string	Denormalized prompt
platform	string	chatgpt / gemini / perplexity / copilot
rawResponse	string	Full AI response
parsedText	string	Clean content
isListStyle	boolean	Response listed or not
rankingType	string	list / paragraph / comparison
brandMentioned	boolean	Mention flag
brandRank	number/null	Position if listed
sentiment	string	positive / neutral / negative
recommendationStrength	string	high / medium / low
competitorsMentioned	array<string>	Names
keywordsFound	array<string>	Extracted
responseTimeMs	number	API latency
createdAt	timestamp	Stored time
📊 4.2 sessions/{sessionId}/platformAggregates Subcollection

Path: sessions/{sessionId}/platformAggregates/{platform}

Field	Type	Description
platform	string	chatgpt / gemini / perplexity
brandMentionCount	number	Total brand mentions
averageRank	number	Avg rank
positiveSentiment	number	Count
neutralSentiment	number	Count
negativeSentiment	number	Count
avgRecommendationStrength	number	0–1 scale
competitorFrequency	map	{ "HDFC ERGO": 4 }
topKeywords	array<string>	Extracted key phrases
🖥️ 5. platformResults Collection (Global Aggregates)

Path: platformResults/{platformResultId}
Used for dashboards across all sessions.

Field	Type	Description
sessionId	reference(sessions)	Linked session
platform	string	AI platform
brandMentionCount	number	Mentions
averageRank	number	Rank
sentimentCounts	map	{pos:4, neu:2, neg:1}
competitorFrequency	map	Competitor hit count
📑 6. reports Collection

Path: reports/{reportId}

Field	Type	Description
brandId	reference(brands)	Brand
sessionId	reference(sessions)	Session
reportJson	map	Final data
pdfUrl	string	Export file link
generatedAt	timestamp	Generated time
🛠️ 7. systemLogs Collection

Path: systemLogs/{logId}

Field	Type	Description
level	string	info / warn / error
message	string	Log content
context	map	Payload, module
timestamp	timestamp	Logged time
🔄 8. Data Flow Summary

User creates brand → brands/

Prompts generated → brands/{brandId}/prompts

User starts session → sessions/

Each prompt hits each platform → sessions/{sessionId}/promptResults

Aggregated per platform → sessions/{sessionId}/platformAggregates

Stored summary → platformResults + reports

Dashboard pulls from sessions + reports