# CodeLifeWithHarsh - Personal Website Project

## Project Overview
Building a modern, personal portfolio website for codelifewithHarsh — a frontend engineer creating AI products and content. Target audience: recruiters (especially in Australia), potential clients, and Instagram followers learning AI/automation.

## Design System
**Location**: See the uploaded design-system.md file for complete design tokens, colors, typography, spacing, and component patterns.

**Key Design Principles**:
- Modern & techy (clean, geometric, AI-forward)
- Dark mode friendly
- High signal-to-noise ratio (minimal, no fluff)
- Mobile-first responsive
- Fast loading, SEO optimized

## Website Structure
**Reference**: See the uploaded structure screenshot (structure.jpg) for visual layout reference.

**6 Main Sections** (in order):
1. Hero - Name, tagline, badges, CTAs, social links
2. codelifewithharsh - content creation showcase
3. About - Short story (60 words), inline achievement badges
4. Projects - 4 project cards in grid layout
5. Skills - 4 grouped skill buckets (no progress bars)
6. Connect - "Work with me" with 3-field form

**Navigation**: Sticky navbar with logo + links to: codelifewithharsh, About, Projects, Skills, Connect

## Content Details

### 1. HERO SECTION
- **Name**: "Harsh" (48px, bold)
- **Tagline**: "Frontend Engineer + AI Builder"
- **Badges**: "BITS Pilani · SDE at Zeta"
- **CTAs**: 
  - Primary: "See my work" (scroll to #projects)
  - Secondary: "Let's connect" (scroll to #connect)
- **Social Icons**:
  - Instagram: https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h
  - LinkedIn: https://www.linkedin.com/in/code-life-with-harsh/
  - GitHub: https://github.com/codelifewithharsh

### 2. CODELIFEWITHHARSH
**Heading**: "codelifewithharsh"
**Subheading**: "I teach what I build"
**Description**: "Every project I work on becomes a reel — tutorials, demos, and honest breakdowns of what I'm learning in AI and tech. Follow along and build with me."

**Display**: 3 placeholder reel cards (9:16 aspect ratio rectangles)
- Reel 1: "Tutorial" label
- Reel 2: "Project demo" label
- Reel 3: "AI explainer" label

**Social buttons** (centered row below reels):
- "Follow on Instagram" → https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h (primary button)
- "Connect on LinkedIn" → https://www.linkedin.com/in/code-life-with-harsh/ (secondary button)
- "GitHub" → https://github.com/codelifewithharsh (secondary button)

**Note below buttons**: "More videos on @codelifewithharsh — posting every week"

### 3. ABOUT SECTION
**Story** (copy exactly):
"2 years as SDE at Zeta building scalable frontend solutions. BITS Pilani graduate focused on AI automation, LLM integration, and voice AI. Gave a technical talk on modern automation workflows at Zeta. Currently building AI products while exploring opportunities in Australia's tech ecosystem."

**Achievement badges** (shown inline below story):
- "Tech Talk at Zeta"
- "Multiple Awards"

### 4. PROJECTS SECTION
**Heading**: "What I build"
**Subheading**: "Latest projects"

**Project 1: Job Fit Evaluator + Application Generator**
- Description: "Drop a Telegram job link. Get tailored resume, cover letter, and fit score — automatically."
- Tech tags: n8n, OpenAI, Pinecone, Apify, Google Sheets, RAG
- Links: GitHub button → https://github.com/codelifewithharsh, Live Demo button
- Label: "Project 01 · AI Agent"

**Project 2: AI Voice Assistant for Flat Booking**
- Description: "Call an AI. Ask about the flat. Book a visit. Fully automated."
- Tech tags: Vapi, Voice AI, Conversational AI, Automation
- Links: GitHub button → https://github.com/codelifewithharsh, Live Demo button
- Label: "Project 02 · Voice AI"

**Project 3: App Review Analyzer + Report Generator**
- Description: "Feed it app reviews. Get sentiment analysis and structured insights report in seconds."
- Tech tags: Sentiment Analysis, NLP, OpenAI, Report Generation
- Links: GitHub button → https://github.com/codelifewithharsh, Demo button
- Label: "Project 03 · Analysis Tool"

**Project 4: 100 n8n Workflow Templates**
- Description: "Hand-picked collection of production-ready n8n templates for AI agents and business automation."
- Tech tags: n8n, Automation, AI Workflows, Resource
- Links: GitHub button → https://github.com/codelifewithharsh
- Label: "Project 04 · Curated Resource"

### 5. SKILLS SECTION
**Heading**: "Skills"
**Subheading**: "What I know"

**Display as 4 clean tag groups** (no progress bars, no ratings):

**Frontend**
- React
- Next.js
- TypeScript
- Tailwind CSS

**AI & Automation**
- LLM APIs (Claude, GPT)
- RAG (Retrieval Augmented Generation)
- Embeddings
- Voice AI (Vapi)
- n8n workflows
- Prompt Engineering

**Tools & Infrastructure**
- Git
- Vercel
- Node.js
- REST APIs

**Currently Learning**
- Fine-tuning models
- Multimodal AI

### 6. CONNECT SECTION
**Heading**: "Work with me"
**Subheading**: "Want to build something together?"
**Description**: "I'm open to freelance AI projects, consulting, and full-time roles — especially opportunities in Australia."

**Contact Form** (3 fields only):
- Name (text input)
- Email (email input)
- What do you need? (textarea)
- Submit button: "Send message"

**Email display** (below form): codelifewithharsh@gmail.com

**Trust line**: "I reply within 24 hours"

**Social links row** (below form):
- Instagram: https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h
- LinkedIn: https://www.linkedin.com/in/code-life-with-harsh/
- GitHub: https://github.com/codelifewithharsh

## Tech Stack Requirements

### Framework & Libraries
- **Next.js (latest)** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

### Features to implement
- ✅ Fully responsive (mobile-first)
- ✅ Dark mode support
- ✅ Smooth scroll navigation
- ✅ Sticky navigation bar
- ✅ SEO optimized (meta tags, semantic HTML)
- ✅ Fast loading (optimized images, lazy loading)
- ✅ Accessible (ARIA labels, keyboard navigation)

### File Structure
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── CodeLifeWithHarsh.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Connect.tsx
│   └── Navbar.tsx
├── public/
│   └── (images, icons)
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── claude.md (this file)

## Development Instructions

### Step 1: Project Setup
- Initialize Next.js (latest) project with TypeScript and Tailwind
- Set up proper folder structure
- Install necessary dependencies

### Step 2: Design System Implementation
- Reference the design-system.md file for all design tokens
- Set up Tailwind config with custom colors, fonts, spacing from design system
- Create reusable component patterns

### Step 3: Component Development
Build components in this order:
1. Navbar (sticky, with smooth scroll links)
2. Hero section
3. codelifewithharsh section (content creation showcase)
4. About section
5. Projects section (grid of cards)
6. Skills section (grouped tags)
7. Connect section (form + email + social links)

### Step 4: Styling & Responsiveness
- Follow design system for all spacing, colors, typography
- Mobile breakpoints: sm (640px), md (768px), lg (1024px)
- Test on mobile, tablet, desktop viewports

### Step 5: Deployment Preparation
- Optimize images
- Add meta tags for SEO
- Test performance (Lighthouse score)
- Prepare for Vercel deployment

## codelifewithharsh
- **Handle**: CodeLifeWithHarsh
- **Instagram**: https://www.instagram.com/codelifewithharsh?igsh=OWtpcHRhMWJlaW1h
- **LinkedIn**: https://www.linkedin.com/in/code-life-with-harsh/
- **GitHub**: https://github.com/codelifewithharsh
- **Email**: codelifewithharsh@gmail.com
- **Tagline**: "Frontend Engineer + AI Builder"
- **Color preference**: Modern tech palette (refer to design-system.md)
- **Tone**: Technical but approachable, no fluff, educational, confident

## Important Notes
- All placeholder images/reels will be replaced with real content later
- GitHub and demo links per project are placeholders pointing to the main GitHub profile for now
- The codelifewithharsh section (section 2) is the content creation showcase — treat it as a priority feature, not an afterthought
- Follow the uploaded structure screenshot for exact visual layout
- Use design-system.md for all design decisions (colors, spacing, typography, components)

## Goals
1. **Primary**: Get website live in 2 weeks as MVP
2. **Secondary**: Build credibility for Australian tech job market
3. **Tertiary**: Drive Instagram followers to website and vice versa

## Success Metrics
- Clean, professional appearance
- Fast loading (<2s)
- Mobile responsive
- Easy to update content later
- Ready to deploy on Vercel
