# Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal

> **Team:** OffGrid  
> **Problem Statement ID:** SIH26063  
> **Organization:** Ministry of Earth Sciences (MoES) — National Centre for Polar and Ocean Research (NCPOR)  
> **Theme:** Smart Education  
> **Category:** Software  

---

## Table of Contents
1. [Product Requirements Document (PRD)](#1-product-requirements-document-prd)
2. [Technical Requirements Document (TRD)](#2-technical-requirements-document-trd)
3. [Application Flow & User Journeys](#3-application-flow--user-journeys)
4. [UI/UX Design Brief](#4-uiux-design-brief)
5. [Database Schema Document](#5-database-schema-document)
6. [Implementation Guide & Roadmap](#6-implementation-guide--roadmap)

---

# 1. Product Requirements Document (PRD)

### 1.1 Overview
NCPOR generates a large volume of polar and ocean science material — expedition reports, datasets, publications, and media — but this material currently sits in disconnected systems and rarely reaches the public in an accessible form. Converting a scientific report into public-facing content (articles, explainers, social posts) is a manual, slow process.

This platform is a unified portal that acts as both a **knowledge repository** (connecting researchers, expeditions, datasets, publications, and media) and a **generative outreach engine** (automatically turning raw scientific material into public-facing content), with human review before anything is published.

### 1.2 Goals
* **Centralize fragmented polar research data** into one searchable, traceable system.
* **Automate the conversion of scientific content** into public outreach material (articles, student explainers, social captions), in English and regional languages.
* **Enable natural-language Q&A**: Let anyone — researcher or public visitor — ask natural-language questions and get cited, verifiable answers.
* **Visual & Geographic Exploration**: Make expeditions and datasets explorable geographically and visually, without needing to download files or write code.
* **Approval Workflow**: Provide an institutional approval workflow so AI-generated content is reviewed before publication, making it viable for real government/institutional use.

### 1.3 Target Users & Needs
| User Type | Needs |
| :--- | :--- |
| **NCPOR Researchers** | Upload and manage reports/datasets, get automated outreach drafts, view their profile and contributions. |
| **Communications Officer / Admin** | Review and approve AI-generated content before it goes public. |
| **Public Visitors** | Read simplified science content, ask questions, explore the map and data. |
| **Students / Educators** | Access classroom-ready, simplified explainers and interactive learning content. |
| **Media / Journalists** | Access press-ready articles, photos, and fact sheets. |

### 1.4 Core Features
1. **AI Auto-Tagging**: Automatically extracts and tags metadata (location, expedition, station, topic, species) from uploaded reports, datasets, and media at ingestion time, removing the need for manual metadata entry.
2. **AI Outreach Engine**: Converts a raw report or dataset into:
   * A public-facing article
   * A simplified, student-level explainer ("Explain It Simply" toggle)
   * 3–4 ready-to-post social media captions
   * A Hindi / regional-language version (via translation)  
   *(All outputs retain a traceable link back to the original source document).*
3. **Knowledge Graph ("Research Story")**: Connects `Researcher → Expedition → Dataset → Publication → Media`. Opening any single item (a dataset, a photo, a paper) reveals everything connected to it — who collected it, which expedition it came from, what was published from it, and what media exists.
4. **AI Research Assistant**: Natural-language Q&A over all ingested reports, datasets, and publications (RAG-based). Every answer includes citations back to the source document so it can be verified.
5. **Interactive Research Map**: Explore Indian polar stations (**Maitri, Bharati, Himadri, Himansh**), expedition routes, and geotagged datasets on a map with a timeline slider. Clicking a location pulls in the related summary, connections graph, and any visualizations tied to it.
6. **Data Explorer (In-Browser Visualization)**: Pick a dataset (ice core temperatures, weather station data, ocean salinity, etc.) and generate a chart directly in the browser — no download, no coding required.
7. **Public Researcher Profiles ("Meet the Scientists")**: Public-facing bios showing a researcher's expertise, publications, expeditions, and datasets — framed for public/media consumption, not internal networking.
8. **Approval Workflow**: AI-drafted outreach content is routed to a Communications Officer / Admin for review and approval before it is published publicly.
9. **Data Submission Flow**: A lightweight submission form lets researchers upload new datasets/reports, which are then run through the auto-tagging pipeline.

### 1.5 Non-Goals (Out of Scope for Hackathon Build)
* Full researcher collaboration/workspace tooling (GitHub-style project management).
* AI-based collaborator/researcher recommendation engine.
* Native mobile apps (web-responsive only).
* Real-time IoT data ingestion from polar stations (station data will be shown from provided/sample datasets).

### 1.6 Success Metrics
* Time to generate outreach content from a raw report (target: under a minute, vs. manual process taking days).
* Number of connected entities visible in the Knowledge Graph per demo dataset.
* Accuracy/relevance of AI Assistant answers (citation correctness).
* Usability of map and data explorer without technical guidance.

### 1.7 Key Differentiators (vs. Existing Polar Data Portals like NPDC)
| Existing Portals | This Platform |
| :--- | :--- |
| Download to analyze | Instant in-browser charts |
| Keyword search only | AI assistant with citations |
| Isolated files/folders | Connected knowledge graph |
| Manual outreach writing | AI-generated articles & social content |
| Static bilingual content (if any) | Automated multilingual generation |

---

# 2. Technical Requirements Document (TRD)

### 2.1 Tech Stack Summary
| Layer | Technology |
| :--- | :--- |
| **Frontend & UI** | Next.js (App Router), React, Tailwind CSS |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL with `pgvector` extension |
| **ORM** | Prisma |
| **AI / LLM** | Mistral Large 3 (256K context window) |
| **Translation** | IndicTrans2 |
| **Maps** | Leaflet.js, OpenStreetMap |
| **Authentication** | JWT (short-lived access + refresh tokens), Google OAuth |
| **Deployment** | Vercel (Frontend), Render (Backend + PostgreSQL) |

### 2.2 Frontend Specifications
* **Framework:** Next.js (App Router) for SSR/SSG, SEO-friendly public pages, and fast client navigation.
* **UI Library:** React with Tailwind CSS for utility-first, consistent styling.
* **Map Rendering:** Leaflet.js with OpenStreetMap tile layers (no API key/cost required).
* **Charting:** Lightweight charting library (e.g., Recharts or Chart.js) rendered client-side from API-provided JSON data for the Data Explorer feature.
* **State / Data Fetching:** React Query (or SWR) for API calls, caching, and loading states.

### 2.3 Backend Specifications
* **Runtime & Framework:** Node.js, Express.js in TypeScript across the entire backend.
* **API Style:** REST (JSON), organized by resource:
  * `/researchers`
  * `/expeditions`
  * `/datasets`
  * `/publications`
  * `/media`
  * `/assistant`
  * `/outreach`
  * `/auth`
* **Core Backend Services:**
  1. **Ingestion Service:** Handles file upload (reports, datasets, media), triggers auto-tagging.
  2. **Auto-Tagging Service:** Calls Mistral Large 3 to extract location, expedition, topic, species metadata from uploaded content.
  3. **Outreach Generation Service:** Calls Mistral Large 3 to generate articles, explainers, and social captions from source content.
  4. **Translation Service:** Calls IndicTrans2 to translate generated content into Hindi/regional languages.
  5. **RAG Assistant Service:** Retrieves relevant document chunks (via embeddings) and calls Mistral Large 3 to answer natural-language questions with citations.
  6. **Knowledge Graph Service:** Queries relational data to build `Researcher → Expedition → Dataset → Publication → Media` connections.
  7. **Approval Service:** Manages the content review/approval state machine (`Draft → Pending Review → Approved/Rejected → Published`).

### 2.4 AI / LLM Layer
* **Primary Model:** Mistral Large 3 — used for outreach content generation and the RAG-based Research Assistant (large 256K context window supports retrieval-augmented prompts with multiple source chunks).
* **Retrieval & Embeddings:** Store embeddings of ingested documents (reports, papers) in PostgreSQL using `pgvector` for semantic search and RAG retrieval.
* **Translation Model:** IndicTrans2 — dedicated open-source model for English ↔ Hindi/regional language translation.

### 2.5 Authentication & RBAC
* **JWT:** Short-lived access token (~15 min) + longer-lived refresh token (~7 days) pattern.
* **Google OAuth:** Primary login method for researchers and administrators.
* **Role-Based Access Control (RBAC):**
  * `public`: No login required (browse articles, map, data explorer, Q&A assistant).
  * `researcher`: Upload reports/datasets, edit researcher profile, view contributions & submissions.
  * `comms_admin`: Content review queue (approve/reject outreach), manage researchers, view analytics.

### 2.6 Maps Architecture
* Leaflet.js with OpenStreetMap tiles.
* Coordinates for Indian polar stations (**Maitri, Bharati, Himadri, Himansh**) and expedition routes stored in PostgreSQL (lat/lng columns or GeoJSON).

### 2.7 Third-Party APIs / Services
| Service | Purpose |
| :--- | :--- |
| **Mistral API** | Auto-tagging, outreach generation, RAG assistant |
| **IndicTrans2 (self-hosted / API)** | Multilingual translation |
| **Google OAuth** | Authentication |
| **OpenStreetMap tile servers** | Map rendering |

### 2.8 Non-Functional Requirements
* **Performance:** AI-generated responses (assistant, outreach) return within a few seconds for live demo; loading states & streaming responses where possible.
* **Security:** File upload scanning (size/type); short-lived JWT tokens; server-side role checks on all protected routes.
* **Scalability:** Stateless Express backend for horizontal scaling on Render; indexing on frequently queried foreign keys (`expeditionId`, `researcherId`, tags).
* **Traceability:** Every AI-generated output stores references to its source document ID(s) for citation and verification.

---

# 3. Application Flow & User Journeys

### 3.1 User Roles
1. **Public Visitor** — No login required
2. **Researcher** — Logs in via Google OAuth
3. **Comms Admin** — Logs in via Google OAuth with elevated approval rights

### 3.2 User Journeys

#### Public Visitor Journey
```
Landing Page
 │
 ├──> Browse Articles / Explainers (AI-generated public content)
 │     └──> Read Full Article ──> "Explain It Simply" toggle ──> View source citation
 │
 ├──> Ask the Research Assistant
 │     └──> Type natural-language question ──> Get cited answer
 │           └──> Click citation ──> View original source document
 │
 ├──> Explore Interactive Map
 │     └──> Select station/expedition on map ──> View expedition summary,
 │           related datasets, publications, and media (Knowledge Graph pop-up)
 │
 ├──> Explore Data (Data Explorer)
 │     └──> Select a dataset ──> Auto-generated chart rendered in-browser
 │
 ├──> Meet the Scientists
 │     └──> Browse public researcher profiles ──> View their expeditions/publications
 │
 └──> Switch Language (Hindi / regional) on any content page
```

#### Researcher Journey
```
Login (Google OAuth) ──> Researcher Dashboard
 │
 ├──> Upload Report / Dataset / Media
 │     └──> Auto-Tagging runs automatically (location, expedition, topic extracted)
 │     └──> AI drafts outreach content (article, explainer, captions) — status: "Pending Review"
 │
 ├──> View My Profile
 │     └──> Edit bio/expertise ──> Preview public profile page
 │
 ├──> View My Contributions
 │     └──> See all datasets/reports/publications linked to profile (Knowledge Graph view)
 │
 └──> View Submission Status
       └──> Track uploaded content: Draft → Pending Review → Approved/Rejected → Published
```

#### Comms Admin Journey
```
Login (Google OAuth) ──> Admin Dashboard
 │
 ├──> Review Queue
 │     └──> View AI-generated content pending approval
 │           ├──> Approve ──> Content publishes to public portal
 │           └──> Reject / Request Edit ──> Sent back with notes
 │
 ├──> Manage Researchers
 │     └──> View / verify researcher profiles
 │
 └──> Platform Analytics (optional/stretch)
       └──> View engagement stats on published content
```

### 3.3 Navigation Map (Site Structure)
```
/ (Home)
├── /articles → List of public outreach articles
│   └── /articles/[id] → Single article + citations + explain-simply toggle
├── /assistant → AI Research Assistant chat interface
├── /map → Interactive expedition/station map
├── /explore → Dataset browser → Data explorer / chart view
│   └── /explore/[dataset-id]
├── /researchers → Public researcher directory
│   └── /researchers/[id] → Public profile page
├── /login → Google OAuth login
├── /dashboard (researcher, protected)
│   ├── /dashboard/upload
│   ├── /dashboard/profile
│   └── /dashboard/submissions
└── /admin (comms admin, protected)
    ├── /admin/review-queue
    └── /admin/researchers
```

### 3.4 Core Upload → Publish Pipeline
```
Researcher uploads file
  │
  ▼
Auto-Tagging Service (Mistral Large 3)
  │
  ▼
Outreach Generation Service (article + explainer + captions)
  │
  ▼
Translation Service (IndicTrans2) — Hindi / regional version generated
  │
  ▼
Status: "Pending Review" → Appears in Comms Admin Review Queue
  │
  ├──> Approved ──> Status: "Published" ──> Appears on public portal + Knowledge Graph
  └──> Rejected ──> Status: "Needs Edit" ──> Returned to researcher with notes
```

---

# 4. UI/UX Design Brief

### 4.1 Design Direction & Philosophy
* **Government Portal Aesthetic:** Built for the Ministry of Earth Sciences (MoES / NCPOR). The visual language should read as an **official, institutional, and trustworthy government portal** (similar to *india.gov.in*, *ncpor.res.in*, *mausam.imd.gov.in*, *PIB*), rather than a trendy consumer startup.
* **Structured, formal, and credible:** Clear borders, high information density, left-aligned structured panels, and classic government styling.
* **AI Features as Smart Tools:** Embedded smoothly within the institutional framework rather than completely replacing traditional navigation.

### 4.2 Color Palette (Government Portal Style)
| Swatch / Token | Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| ⬛ Primary | **Ashoka Navy** | `#0B3D91` | Primary header/navbar background, primary buttons, major links |
| ⬛ Dark Secondary | **Deep Indigo** | `#002147` | Footer background, dark section backgrounds |
| 🟧 Accent 1 | **Saffron Accent** | `#FF9933` | Small accent highlights only (tricolor nod) — badges, active tab underlines |
| 🟩 Accent 2 | **India Green Accent** | `#138808` | Success states, "Approved/Published" status badges |
| ⬜ Background | **Institutional White** | `#FFFFFF` | Main content background |
| ⬜ Neutral Light | **Muted Grey** | `#F2F2F2` | Section backgrounds, card backgrounds |
| ⬛ Text Primary | **Body Text Grey** | `#333333` | Primary body text |
| ⬛ Text Secondary | **Secondary Text Grey** | `#5C5C5C` | Captions, metadata, timestamps |
| 🟦 Link Color | **Official Blue Link** | `#003366` | Hyperlinks (classic government-site blue) |
| ⬛ Border | **Border Grey** | `#CCCCCC` | Table borders, dividers, form field outlines |

> **Palette Guidelines:**
> * Use tricolor (saffron/white/green) sparingly as small accents (e.g. thin top bar, status badge), not large color blocks.
> * Avoid heavy blur/glassmorphism or flashy glowing gradients; stick to flat, clear borders and subtle shadows.
> * Buttons: Solid Ashoka Navy background, white text, square or minimally-rounded corners (2–4px radius).

### 4.3 Typography System
* **Page Titles / Headings (H1):** `Georgia` or `Times New Roman` (serif, bold), 28–32px
* **Section Headings (H2):** `Georgia` (serif, bold), 22–24px
* **Body Text:** `Arial` or `Verdana` (sans-serif), 15–16px, 1.5 line-height
* **Tables / Data:** `Verdana` or `Tahoma` (monospace-adjacent, tabular numbers)
* **Navigation Menu:** `Arial` (sans-serif, uppercase, letter-spaced)
* **Captions / Metadata:** 12–13px, Grey (`#5C5C5C`)
* **Multilingual Font Stack:** `Noto Sans Devanagari` alongside Latin fonts for Hindi/regional content.

### 4.4 Layout Principles & Components
* **Header Bar:** Ministry/department name, national emblem/logo, and navigation in a fixed top navy bar.
* **Layout:** Structured, boxed layout in bordered panels/cards rather than loose free-floating layouts.
* **Information Density:** Left-aligned, high information density with visible grey section borders.
* **Breadcrumbs:** Provided on all inner pages (`Home > Articles > [Article Title]`).
* **Footer:** Standard government footer with ministry name, contact info, legal links (Terms, Privacy, Accessibility, Sitemap), and "Last Updated" timestamp.
* **Cards & Tables:**
  * Cards: White background, thin grey border, small drop shadow.
  * Tables: Bordered with alternating light grey/white row shading for dataset listings and admin queues.
* **Forms:** Form fields stacked vertically with clear required-field asterisks and solid border outlines.
* **Iconography:** Flat, single-color line icons used strictly for navigation, status, and map markers.

---

# 5. Database Schema Document

**Database:** PostgreSQL (with `pgvector` extension)  
**ORM:** Prisma  

### 5.1 Tables & Entity Definitions

#### 1. `User`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, default `uuid()` |
| `email` | `String` | Unique, from Google OAuth |
| `name` | `String` | Full Name |
| `role` | `Enum` | `public`, `researcher`, `comms_admin` (RBAC) |
| `googleId` | `String` | Unique, Nullable (OAuth identifier) |
| `passwordHash` | `String` | Nullable (if local login is supported) |
| `createdAt` | `DateTime` | Default `now()` |
| `updatedAt` | `DateTime` | Auto-updated |

#### 2. `Researcher` (extends User 1:1)
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `userId` | `UUID` | Foreign Key → `User.id`, Unique |
| `bio` | `Text` | Researcher bio |
| `expertise` | `String[]` | e.g. `["Glaciology", "Marine Biology"]` |
| `profilePhotoUrl` | `String` | URL path |
| `isPubliclyVisible`| `Boolean` | Visibility flag |

#### 3. `Station`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `name` | `String` | e.g. "Maitri", "Bharati", "Himadri", "Himansh" |
| `latitude` | `Float` | Station latitude |
| `longitude` | `Float` | Station longitude |
| `description` | `Text` | Station history & overview |

#### 4. `Expedition`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `title` | `String` | Expedition name/title |
| `stationId` | `UUID` | Foreign Key → `Station.id` |
| `startDate` | `Date` | Expedition start date |
| `endDate` | `Date` | Expedition end date |
| `description` | `Text` | Summary and objectives |
| `routeGeoJson` | `JSON` | Expedition route coordinates for map |

#### 5. `ResearcherExpedition` (Many-to-Many Join)
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `researcherId` | `UUID` | Foreign Key → `Researcher.id` |
| `expeditionId` | `UUID` | Foreign Key → `Expedition.id` |
| `role` | `String` | e.g. "Lead Scientist", "Field Assistant" |

#### 6. `Dataset`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `title` | `String` | Dataset name |
| `description` | `Text` | Dataset abstract/contents |
| `fileUrl` | `String` | Storage path / URL |
| `fileType` | `Enum` | `csv`, `json`, `pdf`, `other` |
| `expeditionId` | `UUID` | Foreign Key → `Expedition.id`, Nullable |
| `uploadedByResearcherId` | `UUID` | Foreign Key → `Researcher.id` |
| `embeddingVector` | `vector` | `pgvector` embeddings for semantic search & RAG |
| `createdAt` | `DateTime` | Default `now()` |

#### 7. `Publication`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `title` | `String` | Paper/Publication title |
| `abstract` | `Text` | Scientific abstract |
| `fileUrl` | `String` | PDF link / storage URL |
| `expeditionId` | `UUID` | Foreign Key → `Expedition.id`, Nullable |
| `datasetId` | `UUID` | Foreign Key → `Dataset.id`, Nullable |
| `embeddingVector` | `vector` | `pgvector` embeddings |
| `createdAt` | `DateTime` | Default `now()` |

#### 8. `PublicationAuthor` (Many-to-Many Join)
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `publicationId` | `UUID` | Foreign Key → `Publication.id` |
| `researcherId` | `UUID` | Foreign Key → `Researcher.id` |

#### 9. `Media`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `type` | `Enum` | `photo`, `video` |
| `url` | `String` | File URL |
| `caption` | `String` | Description / caption |
| `expeditionId` | `UUID` | Foreign Key → `Expedition.id`, Nullable |
| `uploadedByResearcherId` | `UUID` | Foreign Key → `Researcher.id` |
| `createdAt` | `DateTime` | Default `now()` |

#### 10. `Tag`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `name` | `String` | Unique, e.g. "Ice Core", "Marine Biodiversity", "Antarctic 2024" |
| `type` | `Enum` | `location`, `topic`, `species`, `expedition` (from auto-tagging) |

#### 11. `EntityTag` (Polymorphic Join)
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `tagId` | `UUID` | Foreign Key → `Tag.id` |
| `entityType` | `Enum` | `dataset`, `publication`, `media` |
| `entityId` | `UUID` | Target entity UUID |

#### 12. `OutreachContent`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `sourceType` | `Enum` | `dataset`, `publication` |
| `sourceId` | `UUID` | Source entity ID |
| `contentType` | `Enum` | `article`, `explainer`, `social_caption`, `press_kit` |
| `language` | `String` | e.g. "en", "hi" |
| `content` | `Text` | AI-generated body |
| `status` | `Enum` | `draft`, `pending_review`, `approved`, `rejected`, `published` |
| `generatedByModel` | `String` | e.g. "mistral-large-3" |
| `createdAt` | `DateTime` | Default `now()` |
| `publishedAt` | `DateTime` | Nullable |

#### 13. `ApprovalLog`
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `outreachContentId` | `UUID` | Foreign Key → `OutreachContent.id` |
| `reviewedByUserId` | `UUID` | Foreign Key → `User.id` (`comms_admin`) |
| `decision` | `Enum` | `approved`, `rejected` |
| `notes` | `Text` | Review feedback notes |
| `createdAt` | `DateTime` | Default `now()` |

#### 14. `AssistantQueryLog` (Optional / Analytics)
| Column | Type | Constraints / Notes |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key |
| `userId` | `UUID` | Foreign Key → `User.id`, Nullable (for anonymous queries) |
| `question` | `Text` | User query |
| `answer` | `Text` | Assistant generated answer |
| `citedSourceIds` | `UUID[]` | Array of source IDs cited |
| `createdAt` | `DateTime` | Default `now()` |

### 5.2 Relationships & Knowledge Graph Traversal
* `User` 1:1 `Researcher`
* `Researcher` M:N `Expedition` (via `ResearcherExpedition`)
* `Expedition` 1:N `Dataset`, `Publication`, `Media`
* `Dataset` 1:N `Publication` (a publication may cite/link to a dataset)
* `Publication` M:N `Researcher` (via `PublicationAuthor`)
* `Dataset` / `Publication` / `Media` M:N `Tag` (via `EntityTag`)
* `Dataset` / `Publication` 1:N `OutreachContent` (source document → generated content)
* `OutreachContent` 1:N `ApprovalLog`
* `Station` 1:N `Expedition`

**Knowledge Graph Reconstruction:**
Querying across `ResearcherExpedition`, `Dataset`, `Publication`, `PublicationAuthor`, and `Media` filtered by a single `expeditionId` (or `researcherId`) reconstructs the full connected **"Research Story"** for that entity.

### 5.3 Vector Search / RAG Data Flow
1. On Dataset/Publication upload, extract text content.
2. Generate embedding vector using Mistral embeddings (or compatible model).
3. Store embedding in the `embeddingVector` column (`pgvector`) alongside the record.
4. On an Assistant query:
   * Generate embedding for the user's question.
   * Run similarity search (`pgvector` cosine distance) against Dataset / Publication embeddings to retrieve top-$K$ chunks.
   * Pass retrieved chunks + user question to **Mistral Large 3** as context.
   * Return generated answer with cited source IDs for UI linking.

---

# 6. Implementation Guide & Roadmap

### Phase 1: Project Setup
* Monorepo setup (`/frontend`, `/backend`).
* **Frontend:** Next.js (App Router), Tailwind CSS configuration, base government portal layout (navbar, footer, theme tokens).
* **Backend:** Node.js + Express + TypeScript, resource-based directory structure (`/routes`, `/controllers`, `/services`, `/prisma`).
* **Database:** PostgreSQL instance, enable `pgvector`, initialize Prisma schema.
* **Environment variables:** `.env.local` / `.env.production` (DB URL, JWT Secret, Google OAuth credentials, Mistral API key).
* GitHub repo setup with branch strategies and CI lint/build checks.

### Phase 2: Authentication & RBAC
* Google OAuth callback route & token exchange.
* JWT issuing logic (short-lived access + refresh token pattern).
* Express auth middleware (verifying JWT, attaching `req.user`).
* Role-based route guards (`public`, `researcher`, `comms_admin`).
* Frontend login UI, protected route wrapper, auth context/hook.

### Phase 3: Database & Schemas
* Complete Prisma schema definition and migration.
* Seed database with sample polar stations (**Maitri, Bharati, Himadri, Himansh**), expeditions, sample datasets, publications, researchers.
* CRUD REST endpoints for all primary entities.

### Phase 4: Core UI & Layout
* Shared component library: Ashoka Navy navbar, footer, bordered cards, status badges, breadcrumbs, buttons, tables.
* Page shells for: Home, Articles list & detail, Map, Data Explorer, Researchers directory & profile, Assistant chat, Researcher dashboard, Admin dashboard.
* Responsive layouts with Tailwind CSS breakpoints.

### Phase 5: Core Feature Implementation
* **5.1 Ingestion & Auto-Tagging:** File upload endpoint + Mistral Large 3 prompt to extract location, expedition, topic, species metadata.
* **5.2 AI Outreach Engine:** Service calling Mistral Large 3 to generate articles, student explainers ("Explain It Simply"), social captions.
* **5.3 Translation Service:** IndicTrans2 integration to translate generated outreach content into Hindi/regional languages.
* **5.4 Approval Workflow:** Admin Review Queue interface with approve/reject actions updating `ApprovalLog` and `OutreachContent.status`.
* **5.5 Knowledge Graph ("Research Story"):** Backend traversal endpoint + frontend graph/connected card visualization.
* **5.6 Interactive Map:** Leaflet.js + OpenStreetMap tile rendering with polar stations, expedition routes, and Knowledge Graph preview on click.
* **5.7 AI Research Assistant (RAG):** Embedding generation on upload + `pgvector` similarity retrieval + Mistral Large 3 chat endpoint with clickable citations.
* **5.8 Data Explorer:** In-browser chart renderer (line/bar charts via Recharts/Chart.js) for CSV/JSON scientific datasets.
* **5.9 Public Researcher Profiles:** Public scientist showcase pages displaying biographies, linked expeditions, and publications.

### Phase 6: Integrations
* Connect and stress test Mistral Large 3 API calls with error handling & rate limiting.
* Connect IndicTrans2 translation service.
* Configure Google OAuth production and development client IDs.
* Verify `pgvector` query performance on realistic document volumes.

### Phase 7: Testing & Deployment
* **Backend Unit Tests:** Auto-tagging parser, approval state transitions, JWT authentication middleware.
* **Integration Tests:** End-to-end Upload → Tag → Generate → Approve → Publish flow.
* **Manual QA:** End-to-end pass across Public Visitor, Researcher, and Comms Admin journeys.
* **Deployments:**
  * Frontend deployed to **Vercel**.
  * Backend + PostgreSQL deployed to **Render**.
  * CORS and production environment secrets verification.

### Suggested Team Split
| Track | Responsibilities |
| :--- | :--- |
| **Frontend Team** | Phases 1, 4, and UI portions of Phase 5 (5.5–5.9 frontend side) |
| **Backend Team** | Phases 1–3, 6, and API portions of Phase 5 |
| **AI / Integration Lead** | Phases 5.1–5.3, 5.7 (Mistral + IndicTrans2 integration), Phase 6 |
| **QA / Deployment** | Phase 7, seed data preparation, and demo flow testing |
