# HimSagar Frontend — Next.js 16 Web Application

This package contains the Next.js 16 (App Router) client application for **HimSagar**, the Integrated Polar Science Outreach & Knowledge Repository Portal (SIH26063 - Team OffGrid).

For comprehensive project documentation, architecture diagrams, and full-stack setup instructions, refer to the [Root README](../README.md).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Key Pages & Routes

- `/` — Main Landing Page & Portal Feature Showcase
- `/map` — Interactive Geospatial Radar & Polar Station Telemetry (Leaflet)
- `/explore` — Kaggle-style Polar Data Explorer & In-Browser Visualizer (Recharts)
- `/assistant` — AI Research Assistant with RAG Citations & Dual Persona
- `/outreach` — Science Newsroom, AI Synthesizer & Multilingual Outreach
- `/scientists` — Researcher Directory & Knowledge Graph
