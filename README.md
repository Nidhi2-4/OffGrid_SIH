# ❄️ HimSagar | Integrated Polar Science Outreach & Knowledge Repository Portal

<div align="center">

![NCPOR Banner](https://img.shields.io/badge/MoES-NCPOR%20Goa-006699?style=for-the-badge&logo=gov.uk&logoColor=white)
![SIH Problem Statement](https://img.shields.io/badge/SIH%202024-SIH26063-FF6B00?style=for-the-badge)
![Team](https://img.shields.io/badge/Team-OffGrid-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-8B5CF6?style=for-the-badge)

**A Unified Generative Knowledge Repository, Interactive Geospatial Radar, In-Browser Polar Data Explorer, and Automated Outreach Engine for India's Polar & Ocean Research**

[Explore Live Map](#-1-interactive-polar-station-radar--map) • [AI Assistant](#-3-ai-research-assistant-with-rag-citations) • [Data Explorer](#-2-in-browser-polar-data-explorer) • [Tech Stack](#-technical-architecture--tech-stack) • [Getting Started](#-getting-started--local-development)

</div>

---

## 📌 Executive Summary & Problem Context

| Parameter | Details |
| :--- | :--- |
| **Problem Statement ID** | **SIH26063** |
| **Organization** | **Ministry of Earth Sciences (MoES)** — **National Centre for Polar and Ocean Research (NCPOR), Goa** |
| **Theme / Category** | **Smart Education / Software** |
| **Team Name** | **OffGrid** |

### The Challenge
The **National Centre for Polar and Ocean Research (NCPOR)** conducts cutting-edge expeditions and scientific monitoring across the Arctic, Antarctic, Himalayas, and Southern Ocean. However, scientific material—expedition reports, raw datasets, published literature, and expedition media—has historically remained locked in disconnected institutional silos. 

Converting high-level polar research into engaging, verified public outreach content (student explainers, vernacular news, press releases, social media campaigns) is traditionally a manual, labor-intensive process taking days or weeks.

### Our Solution: **HimSagar**
**HimSagar** bridges the gap between complex polar science and public engagement through an all-in-one portal featuring:
1. **Interactive Station Radar & Geospatial Exploration**: Live telemetry tracking for India's polar research stations (*Maitri, Bharati, Himadri, Himansh, IndARC*) with expedition route overlays.
2. **Kaggle-Style In-Browser Polar Data Explorer**: Instant chart generation (Area, Bar, Line, Scatter) and statistical distributions without requiring downloads or coding.
3. **Cited AI Research Assistant (RAG Engine)**: Natural-language conversational Q&A over ingested polar reports with traceable page citations and dual-persona switching (*Student/Public vs. Polar Scientist*).
4. **Automated Generative Outreach Engine & Newsroom**: One-click synthesis of raw research into press articles, layman explainers ("*Explain It Simply*"), vernacular translations (Hindi/regional), and ready-to-post social media drafts.
5. **Scientist Directory & Knowledge Graph**: Traceable links connecting `Researcher ↔ Expedition ↔ Dataset ↔ Publication ↔ Media`.
6. **Institutional Comms Review Workflow**: Human-in-the-loop review queue for institutional validation before public publishing.

---

## 🌟 Key Features & Capabilities

```
                                  ┌────────────────────────────────────────┐
                                  │      NCPOR Polar Science Portal        │
                                  └───────────────────┬────────────────────┘
                                                      │
         ┌────────────────────────┬───────────────────┼───────────────────┬────────────────────────┐
         │                        │                   │                   │                        │
         ▼                        ▼                   ▼                   ▼                        ▼
┌──────────────────┐    ┌───────────────────┐ ┌───────────────┐ ┌───────────────────┐ ┌───────────────────┐
│ Geospatial Radar │    │   Data Explorer   │ │ RAG Assistant │ │ Outreach Newsroom │ │ Scientist Profiles│
│ • Station Feeds  │    │ • In-Browser Visual│ │ • Cited QA    │ │ • AI Synthesizer  │ │ • Research Graph  │
│ • Routes & GPS   │    │ • Column Stats    │ │ • Dual Persona│ │ • Vernacular Lang │ │ • Publications    │
│ • Ice/Temp HUD   │    │ • CSV / JSON Export│ │ • Verification│ │ • Social Captions │ │ • Expeditions     │
└──────────────────┘    └───────────────────┘ └───────────────┘ └───────────────────┘ └───────────────────┘
```

### 🛰️ 1. Interactive Polar Station Radar & Map
- High-performance **Leaflet.js + OpenStreetMap** engine rendered with custom polar projections and atmospheric radar scanning HUD.
- Real-time station status, weather telemetry (temperature, wind chill, barometric pressure), and mission status for:
  - **Maitri & Bharati** (Antarctica)
  - **Himadri & IndARC** (Ny-Ålesund, Arctic)
  - **Himansh** (Chandra Basin, Spiti Valley, Western Himalayas)
- Filterable expedition tracks and geotagged field collection points.

### 📊 2. In-Browser Polar Data Explorer
- Kaggle-style data workspace enabling researchers and students to explore complex environmental datasets instantly without installing Python/R.
- **Interactive Visualizations (Recharts)**: Area charts, multi-series line plots, bar charts, and scatter plots.
- **Column Inspector & Metadata**: Instant calculation of null counts, data types, min/max values, distributions, and sensor telemetry ranges.
- **Instant Export**: Export clean datasets or query slices in `.csv` or `.json`.

### 🤖 3. AI Research Assistant with RAG Citations
- Retrieval-Augmented Generation (RAG) powered by **Mistral Large 3** (256K context window).
- Verifiable source citations linking back to original expedition reports, journal DOIs, and cruise logs.
- **Dual Persona Switch**:
  - 🎓 **Student / Layman Mode**: Simplified explanations, relatable analogies, and key takeaways.
  - 🔬 **Polar Scientist Mode**: Rigorous scientific phrasing, statistical significance, and methodology details.
- Pre-built query suggestions covering Antarctic ice shelf calving, Arctic climate oscillations, microplastics in Southern Ocean, and Himalayan glacier mass balances.

### 📰 4. Science Newsroom & Generative Outreach Engine
- Ingests complex papers and auto-generates:
  - **Headline News & Feature Articles** formatted for public discovery.
  - **"Explain It Simply" Interactive Toggle** for quick conceptual understanding.
  - **Multilingual Dissemination** (Hindi and Indian regional languages via IndicTrans2).
  - **Multi-Platform Social Campaigns** (Twitter/X threads, LinkedIn posts, Instagram carousels with hashtags).
- Preserves complete document lineage back to original datasets and authoring researchers.

### 👨‍🔬 5. Public Scientist Directory & Knowledge Graph
- Researcher profiles highlighting expedition field hours, polar station deployments, research domains, datasets published, and peer-reviewed papers.
- Fully interconnected Knowledge Graph connecting researchers to missions, datasets, and outreach stories.

---

## 🛠️ Technical Architecture & Tech Stack

### Frontend Monorepo (`/frontend`)
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom *HimSagar* Deep Arctic & Auroral Color Palette
- **Mapping**: [Leaflet.js](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/)
- **Charts & Data**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query) + Axios

### Backend Service (`/backend`)
- **Runtime & Language**: [Node.js](https://nodejs.org/) + [TypeScript 5](https://www.typescriptlang.org/)
- **API Framework**: [Express.js](https://expressjs.com/)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) with `pgvector` extension + [Prisma ORM 6](https://www.prisma.io/)
- **Authentication**: JWT (Access + Refresh token pattern) & Google OAuth
- **File Uploads**: Multer with size/type verification

### AI / Generative & NLP Layer
- **Large Language Model**: **Mistral Large 3** (256K Context Window) for high-density document synthesis and citation retrieval.
- **Vector Embeddings**: PostgreSQL `pgvector` for semantic document search.
- **Vernacular Translation**: **IndicTrans2** for English ↔ Hindi and Indian regional languages.

---

## 📁 Repository Structure

```tree
OffGrid_SIH/
├── README.md                      # Comprehensive Project Documentation
├── PROJECT_CONTEXT.md             # PRD, TRD, Schema & Hackathon Roadmap
├── package.json                   # Root Monorepo configuration
│
├── frontend/                      # Next.js 16 Web Application
│   ├── public/                    # Static assets, logos, map markers
│   ├── src/
│   │   ├── app/                   # App Router Pages
│   │   │   ├── page.tsx           # Main Landing Page & Portal Showcase
│   │   │   ├── map/               # Interactive Polar Station & Radar Map
│   │   │   ├── explore/           # Kaggle-Style Polar Data Explorer
│   │   │   ├── assistant/         # AI RAG Research Assistant Chat
│   │   │   ├── outreach/          # Science Newsroom & Outreach Portal
│   │   │   ├── scientists/        # Researcher Profiles & Directories
│   │   │   └── layout.tsx         # Global Layout, Navigation & Meta
│   │   ├── components/            # Reusable Modular UI Components
│   │   │   ├── Header.tsx         # Global Navigation Bar with Active Indicators
│   │   │   ├── Footer.tsx         # MoES / NCPOR Footer & Quick Links
│   │   │   ├── Hero.tsx           # Dynamic Hero Section with Particle Effects
│   │   │   ├── PolarStations.tsx  # Station Telemetry Cards & Quick View
│   │   │   ├── QuickStats.tsx     # Live Metric Counters & KPIs
│   │   │   ├── map/               # Leaflet Map Engine & Telemetry Overlays
│   │   │   ├── explore/           # Visualizers, Table, Column Inspector
│   │   │   ├── assistant/         # Chat Stream, Persona Selector, Citations
│   │   │   ├── outreach/          # Hero News, Article Grid, Translation
│   │   │   └── scientists/        # Scientist Directory & Filter Cards
│   │   └── globals.css            # Tailwind v4 Theme Tokens & HimSagar Palette
│   └── package.json
│
└── backend/                       # Node.js + Express TypeScript API
    ├── prisma/
    │   ├── schema.prisma          # PostgreSQL + pgvector Relational Schema
    │   └── seed.ts                # Database Seeding Script (Stations, Scientists, Data)
    ├── src/
    │   └── index.ts               # Express Server & Route Controllers
    ├── tsconfig.json
    └── package.json
```

---

## 🗄️ Database Entity-Relationship Overview

```mermaid
erDiagram
    USER ||--o| RESEARCHER : "has profile"
    USER ||--o{ APPROVAL_LOG : "reviews"
    USER ||--o{ ASSISTANT_QUERY_LOG : "queries"

    RESEARCHER ||--o{ RESEARCHER_EXPEDITION : "participates"
    RESEARCHER ||--o{ DATASET : "uploads"
    RESEARCHER ||--o{ PUBLICATION_AUTHOR : "authors"
    RESEARCHER ||--o{ MEDIA : "contributes"

    STATION ||--o{ EXPEDITION : "hosts"

    EXPEDITION ||--o{ RESEARCHER_EXPEDITION : "includes"
    EXPEDITION ||--o{ DATASET : "collects"
    EXPEDITION ||--o{ PUBLICATION : "yields"
    EXPEDITION ||--o{ MEDIA : "documents"

    DATASET ||--o{ PUBLICATION : "referenced in"
    DATASET ||--o{ OUTREACH_CONTENT : "generates"

    PUBLICATION ||--o{ PUBLICATION_AUTHOR : "written by"
    PUBLICATION ||--o{ OUTREACH_CONTENT : "synthesized into"

    OUTREACH_CONTENT ||--o{ APPROVAL_LOG : "audited by"
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: `v18.x` or higher (Recommended: `v20+`)
- **npm** or **pnpm**
- **PostgreSQL** instance with `pgvector` extension enabled
- **Git**

---

### 1. Clone the Repository
```bash
git clone https://github.com/Nidhi2-4/OffGrid_SIH.git
cd OffGrid_SIH
```

### 2. Install Dependencies (Monorepo)
```bash
# Install root and workspace dependencies in one command
npm run install:all
```

---

### 3. Setup Environment Variables

#### Backend (`/backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
CLIENT_URL=http://localhost:3000
DATABASE_URL="postgresql://username:password@localhost:5432/polar_portal?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
MISTRAL_API_KEY="your-mistral-api-key"
```

#### Frontend (`/frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### 4. Database Setup & Migrations
```bash
# Generate Prisma client and run migrations
npm run prisma:generate --workspace=backend
npm run prisma:migrate --workspace=backend

# (Optional) Seed the database with sample stations, scientists & datasets
npm run prisma:seed --workspace=backend
```

---

### 5. Run the Application

You can launch both the frontend and backend concurrently or independently:

#### Run Frontend Only (Port 3000)
```bash
npm run dev:frontend
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

#### Run Backend API Only (Port 5000)
```bash
npm run dev:backend
```
API Health Check: **[http://localhost:5000/api/health](http://localhost:5000/api/health)**

---

## 🗺️ Covered Indian Polar Research Stations & Observatories

| Station | Location | Coordinates | Focus Area |
| :--- | :--- | :--- | :--- |
| **Maitri** | Schirmacher Oasis, Antarctica | 70°45′58″S, 11°43′56″E | Glaciology, Atmospheric Physics, Meteorology |
| **Bharati** | Larsemann Hills, Antarctica | 69°24′28″S, 76°11′14″E | Oceanography, Continental Breakup, Vector Biology |
| **Himadri** | Ny-Ålesund, Spitsbergen, Arctic | 78°55′00″N, 11°56′00″E | Aerosol Optical Depth, Arctic Microbes, Glacial Retreat |
| **Himansh** | Chandra Basin, Spiti Valley, Himalayas | 32°24′00″N, 77°37′00″E | Himalayan Cryosphere, Benchmark Glacier Mass Balance |
| **IndARC** | Kongsfjorden, Arctic (Underwater Moored) | 78°59′00″N, 11°48′00″E | Moored Oceanographic Acoustic & Salinity Profiling |

---

## 👥 Team OffGrid & Acknowledgments

- **Team**: **OffGrid**
- **Initiative**: **Smart India Hackathon (SIH 2024)**
- **Nodal Agency**: **Ministry of Earth Sciences (MoES)**
- **Institutional Partner**: **National Centre for Polar and Ocean Research (NCPOR), Goa**

*HimSagar is developed to advance polar science literacy, empower climate research accessibility, and showcase India's proud scientific endeavors at the ends of the Earth.* 🇮🇳❄️
