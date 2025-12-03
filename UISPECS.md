Project: AI Brand Visibility Analyzer
Tech Stack: Next.js 14 (App Router), TailwindCSS, Firebase, Framer Motion
Theme: Neon Cyber-Dark + Soft Light Mode
Goal: Modern, smooth, animated UI for an AI-powered brand analytics dashboard.

🎨 1. Design Philosophy

Minimalistic cyber-inspired layout

Neon accents (cyan, purple, indigo, emerald)

High contrast dark UI

Clean light-mode alternative

Everything feels AI + analytics + premium

Micro-interactions everywhere (hover, load, success)

Smooth page transitions using Framer Motion

🌗 2. Color Palette
Dark Mode (default)

bg-primary: #0A0F1F (deep navy charcoal)

bg-secondary: #111827 (cool dark slate)

text-primary: #E5E7EB (light gray)

Neon Accents:

Cyan: #22D3EE

Purple: #A78BFA

Lime/Emerald: #34D399

Indigo: #6366F1

Light Mode

bg-primary: #F8FAFC

bg-secondary: #FFFFFF

text-primary: #111827

Accents remain same neon colors but reduced brightness via opacity.

✨ 3. UI Components & Specs
3.1 Navbar

Sticky top

Brand logo with neon glow

Navigation:

Home

Analyze

Dashboard

History

Profile

Right side:

Theme toggle (sun/moon morph animation)

User login avatar

Interactions:

Hover glow

Smooth fade on scroll

Mobile menu slides from right

3.2 Home Page

Purpose: Introduce tool + CTA

Sections
1. Hero Section

Full-width gradient background

Neon animated glow effects

Headline:
“AI Visibility Analyzer for Modern Brands”

Subtext: short pitch

CTA buttons: "Start Analysis" + "View Demo"

Futuristic floating shapes (Framer Motion)

2. Features Grid

3–4 neon-glowing cards

Icons: outline, animated on hover

Shadow increases with pulse glow

3. Workflow Section

Horizontal step-flow

Connectors glow on hover

Smooth slide animations

4. Footer

Minimal

Light neon border on top

3.3 Analyze Page (Main MVP Flow)
Brand Input Form

Glassmorphic card

Fields:

Brand Name

Industry Dropdown

Competitors (optional tags input)

CTA: Generate Analysis

CTA button: neon glow pulse

Loading state:

Animated neon progress bar

AI assistant typing animation

3.4 Results Dashboard
Layout

Two columns on desktop, one on mobile:

| Score Summary | Report Details |

Components
1. Analysis Summary Card

Big score in neon progress ring

Badges for:

ChatGPT score

Gemini score

Perplexity score

Subtle glowing boundary

2. Prompt Table

Scrollable table

Columns:
Prompt | Mention | Rank | Sentiment | Competitors

Mention chips glow green or red

3. Competitor Chart

Bar chart (canvas/Chart.js)

Dark theme chart

Neon bars (cyan/purple/green)

4. Insights Section

AI insights card

Chip-style key takeaways

Smooth fade-in

5. Recommendations

Checklist UI

Neon bullet points

Slide-up animation

3.5 History Page

Shows previous analyses

Each entry:

Brand

Industry

Timestamp

Score

“View Report” button

Hover effect: elevate + neon outline

3.6 Profile Page

User details

Toggle for default theme

Logout

Account deletion

🧩 4. Animations

All animations powered by Framer Motion:

Global

Page transitions (fade + slide)

Neon glow hover lift

Button tap ripple

Charts

Bars grow with smooth ease-in

Data cards pop-in

Theme Switch

Icon morph (sun → moon)

Background color fade over 400ms

📱 5. Responsive Rules

Mobile-first

All cards stack vertically

Navbar collapses into drawer

Tables scroll horizontally

Breakpoints:

sm → Stack to column

md → Two-column layout

xl → Full dashboard grid

🛠 6. Accessibility

Neon accents maintain AA contrast

Reduced-motion mode support

Accessible keyboard navigation

Screen-reader labels on charts

🧪 7. Test Cases

Theme toggle works

Form validation

Loading states visible

Smooth transitions everywhere

Dark+light modes look equally premium

🎯 8. Deliverables from UI Spec

Tailwind config (custom colors + dark mode class)

Component map for Next.js

Figma-style layout guidelines

Motion presets for animations