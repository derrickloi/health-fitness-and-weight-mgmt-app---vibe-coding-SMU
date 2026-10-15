# Shizen ASEAN · Project Prompts & Development Log

This document consolidates all prompts and instructions executed during the development of **Shizen ASEAN** (an integrated health, fitness, weight management, and environmental advisory platform tailored for Southeast Asia).

---

## Project Metadata
- **Application Name**: Shizen ASEAN (formerly NadiFit ASEAN)
- **Repository**: `https://github.com/derrickloi/health-fitness-and-weight-mgmt-app---vibe-coding-SMU.git`
- **Primary Framework**: React 19, TypeScript, Vite, Tailwind CSS v4, Express Serverless backend
- **Development Date**: October 2026

---

## Chronological Prompt History

### Prompt 1 · Initial App Generation from Business Model Canvas
**User Prompt**:
> build the app based on the attached business model canvas for weight management and fitness for asean

**Context & Inputs**:
- Attached PDF containing the 9-Building-Block Business Model Canvas (BMC) covering:
  - **Key Partners**: Gyms (Anytime Fitness, ActiveSG), Healthy F&B (SaladStop!, Grain), equipment brands (Decathlon), government programmes (Health365, ActiveSG), healthcare & dietary professionals (APDs), sporting events (Hyrox), health trackers (Apple Watch, Garmin, Fitbit), weight management devices (InBody), and physical trainers.
  - **Key Activities**: Easily accessible responsive web platform, cross-compatible hardware integration, robust programming (weekly courses, monthly events, dietitian talks).
  - **Key Propositions**: AI calorie tracker with photo upload and ASEAN food calculations, online engagement and booking of accredited trainers and APD dietitians (filtered by price), end-to-end weight management plans with InBody milestones and calendar sync.
  - **Customer Relationships**: On-demand 24/7 usage, Duolingo-style daily streak motivation, reminders, HealthPoints rewards points system, community roadshows, and refer-a-friend program.
  - **Channels**: Health365 & ActiveSG partnerships, clinic & hospital referrals, corporate wellness credits, social media.
  - **Customer Segments**: Health-conscious individuals, sports interest groups (Hyrox, marathons), 18–70 age group, weight loss seekers, pre-diabetes/medical needs.
  - **Cost Structure**: $150,000 upfront setup, $45,000/yr recurring infrastructure, $50,000/yr operational marketing.
  - **Revenue Streams**: 2M freemium users, 1M paying customers, $10/mo Basic Plan, $100/mo Premium 1-on-1 coaching, vendor/gym referral commissions; break even in 1 year, profitable in 3 years.
  - **Key Resources**: Cross-platform web application, commercial & F&B partnerships, certified healthcare professional network.

**Actions Taken**:
- Scaffolded comprehensive TypeScript data models and localized ASEAN hawker food database with calories, macronutrients, sodium warnings, and glycemic index (GI) ratings.
- Implemented core components: `Navbar`, `Hero` (with 4-column KPI strip), `MealScanner`, `WeightPlanBuilder`, `TrainerDirectory`, `DeviceSyncHub`, `RewardsStore`, `PricingTiers`, and interactive `BmcModal`.

---

### Prompt 2 · Execution Continuation
**User Prompt**:
> Continue

**Actions Taken**:
- Completed writing of core interactive components without truncation.
- Verified TypeScript compilation and ESLint validation (`npm run build` and `tsc --noEmit`).

---

### Prompt 3 · GitHub Repository Initialization & Push
**User Prompt**:
> git push https://<GITHUB_TOKEN>@github.com/derrickloi/health-fitness-and-weight-mgmt-app---vibe-coding-SMU.git

**Actions Taken**:
- Initialized local Git repository (`git init`).
- Configured committer credentials and set branch to `main`.
- Staged all 23 initial project files, created initial commit (`feat: NadiFit ASEAN health, fitness and weight management platform`), and pushed to remote branch `main`.

---

### Prompt 4 · Live Serverless Connection (wger + data.gov.sg 2-Hr Forecast)
**User Prompt**:
> add a serverless connection that pulls live data from both 
> (1) wger
> (2) data.gov.sg/real-time (weather and air quality) 
> using the following endpoints:
> 
> - store this in /api folder (project root level) not the src folder
> - include /health.ts and /healthfitness_weightmgmt.ts within that subfolder
> - do not hardcode any key, i will include them later
> 
> (1) https://wger.de/api/v2/exerciseinfo/?language=2&limit=20
> (2) GET https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast

**Actions Taken**:
- Created `/api/health.ts` for service health monitoring and upstream registry.
- Created `/api/healthfitness_weightmgmt.ts` pulling live data from `wger` and `data.gov.sg/v2/real-time/api/two-hr-forecast`.
- Built `server.ts` Express entry point mounting `/api/*` endpoints alongside Vite dev/prod middleware on port 3000.
- Updated `.env.example` with `WGER_API_KEY=""` and `DATA_GOV_SG_API_KEY=""` (zero hardcoded secrets).
- Created `LiveServerlessFeed.tsx` mounted inside the Device Sync hub.
- Committed and pushed to GitHub.

---

### Prompt 5 · Live PM2.5 Serverless Integration & Outdoor Activity Advisory
**User Prompt**:
> add a serverless connection that pulls live data from data.gov.sg PM2.5 to advise whether it is ideal time for outdoor activities and exercises
> 
> using the following endpoints:
> https://api-open.data.gov.sg/v2/real-time/api
> 
> - store this in /api folder (project root level) not the src folder
> - include /health.ts and /healthfitness_weightmgmt.ts within that subfolder
> - do not hardcode any key, i will include them later

**Actions Taken**:
- Integrated official endpoint `https://api-open.data.gov.sg/v2/real-time/api/pm25` into `/api/healthfitness_weightmgmt.ts`.
- Implemented NEA Singapore 4-Band PM2.5 classification:
  - Band 1 (0–55 µg/m³): Normal / Ideal for outdoor running, Hyrox conditioning, cycling.
  - Band 2 (56–150 µg/m³): Elevated / Moderate; caution for prolonged high-intensity cardio, especially for seniors and pre-diabetics.
  - Band 3 (151–250 µg/m³): High / Unhealthy; recommend moving sessions to indoor air-conditioned ActiveSG facilities.
  - Band 4 (>250 µg/m³): Very High / Hazardous; avoid outdoor physical exertion.
- Added dedicated endpoint `GET /api/pm25`.
- Updated `LiveServerlessFeed.tsx` with a live 5-region (North, South, East, West, Central) PM2.5 visualizer and actionable outdoor activity advisory.
- Committed and pushed to GitHub.

---

### Prompt 6 · In-App Integration of wger & data.gov.sg 2-Hour Forecast
**User Prompt**:
> please include wger: https://wger.de/api/v2/exerciseinfo/?language=2&limit=20 (pulls exercises, categories, muscle targets, and equipment) and 
> data.gov.sg/real-time: GET https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast (pulls real-time Singapore regional forecasts and environmental air advisories) into the app

**Actions Taken**:
- Fixed wger English extraction logic (`translations.find(t => t.language === 2)`) to extract verified exercise names (e.g. *2 Handed Kettlebell Swing*, *Arnold Shoulder Press*, *Bench Press*) with equipment and targeted muscle groups.
- Created dedicated full-featured component `LiveExerciseWeatherHub.tsx`.
- Integrated real-time 2-hour forecasts across all 47 Singapore planning areas with interactive location search.
- Added exercise filters by body region, equipment, and targeted muscles, with full exercise detail modal and "Add to Plan" functionality.
- Added direct links in `Navbar`, `Hero`, `Footer`, and `WeightPlanBuilder`.
- Committed and pushed to GitHub.

---

### Prompt 7 · Navigation Tabs Accessibility Fix
**User Prompt**:
> I cannot seem to access each of the tabs--psl correct it

**Actions Taken**:
- Identified that the large Hero section pinned above the workspace caused content switching below the fold, appearing unresponsive.
- Added a **Sticky Workspace Tab Bar** (`top-16`) with clear active highlighting and icons for all 7 sections.
- Configured automatic smooth scroll (`#workspace-view`) upon switching tabs so the active tool immediately enters the user's viewport.
- Added an "Expand / Collapse Intro Banner" toggle.
- Updated desktop navigation, mobile hamburger drawer, and mobile bottom bar to ensure 100% of tabs are accessible across viewports.
- Committed and pushed to GitHub.

---

### Prompt 8 · Brand Renaming to Shizen ASEAN
**User Prompt**:
> rename the app from NadiFit ASEAN to Shizen ASEAN

**Actions Taken**:
- Replaced all user-facing branding and metadata across the repository from `NadiFit ASEAN` to `Shizen ASEAN`:
  - `index.html`: Title and OpenGraph meta tags.
  - `Navbar.tsx`: Brand wordmark and logo badge (`S`).
  - `App.tsx`: Active tab breadcrumbs and banner headings.
  - `Footer.tsx`: Brand text, logo, and copyright notice (`© 2026 Shizen ASEAN`).
  - `BmcModal.tsx`: Strategy title (`Shizen ASEAN: 9-Building-Block Blueprint`).
  - `RewardsStore.tsx`: Referral code (`SHIZEN-SG2026`) and URL (`https://shizen.app/join`).
  - `WeightPlanBuilder.tsx`: Calendar `.ics` export metadata and filenames (`Shizen_[Goal]_Plan.ics`).
  - `src/data/mockData.ts`: `Team Shizen Pacer Club`.
  - `/api/health.ts`: Service status response (`Shizen ASEAN Serverless Backend`).
  - `/api/healthfitness_weightmgmt.ts`: API User-Agent (`Shizen-ASEAN-App/1.0`).
- Verified zero remaining instances of the old name in source code.
- Committed and pushed to GitHub.

---

### Prompt 9 · Prompt Consolidation
**User Prompt**:
> consolidate all the prompts thus far and save into prompts.md

**Actions Taken**:
- Generated `/prompts.md` documenting the chronological history, requirements, architecture decisions, endpoints, and deliverables.
