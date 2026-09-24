# Harsh Tripathi — Portfolio Website

> A modern, dark-themed personal portfolio for **Harsh Tripathi** — B.Tech CSE Graduate (2026), Full-Stack Developer · Data Analyst · SEO Specialist.

Live: _(deploy to Vercel and update this link)_

---

## ✨ Features

- 🌙 **Dark / Light Theme** toggle with persistent localStorage
- ⌨️ **Typewriter animation** cycling through roles (Full-Stack Dev, Data Analyst, SEO Specialist)
- 📊 **Animated skill progress bars** across 6 technology tracks
- 🗂️ **Project filter tabs** with Framer Motion layout animations
- 📬 **Working contact form** → API route → Prisma → SQLite (or PostgreSQL on cloud)
- 📄 **Resume download** (PDF)
- 📱 **Fully responsive** — mobile & desktop
- 🖼️ **Real photo** + floating tech badges in hero section

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Animations | Framer Motion |
| Database | Prisma ORM + SQLite (dev) / PostgreSQL (prod) |
| Font | Sora (display) + Geist (body) |

---

## 🚀 Getting Started (Local)

```bash
# 1. Install dependencies
bun install

# 2. Copy env and configure database
cp .env.example .env
# Edit DATABASE_URL in .env

# 3. Push database schema
bun run db:push

# 4. Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import this repo
3. Add environment variable:
   - `DATABASE_URL` → your Neon/Supabase PostgreSQL connection string
4. Click **Deploy** ✅

For Prisma + PostgreSQL on Vercel, change `provider = "sqlite"` to `provider = "postgresql"` in [`prisma/schema.prisma`](./prisma/schema.prisma).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts   # Contact form API endpoint
│   ├── globals.css            # Tailwind + design tokens
│   └── layout.tsx             # Root layout + SEO metadata
├── components/
│   ├── portfolio/             # All portfolio sections
│   │   ├── hero.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── projects.tsx
│   │   ├── journey.tsx
│   │   ├── contact.tsx
│   │   └── ...
│   └── ui/                    # shadcn/ui components
├── data/
│   └── portfolio.ts           # Single source of truth for all content
└── lib/
    └── db.ts                  # Prisma client singleton
```

---

## 📬 Contact

- **Email**: k.tripathiharsh2005@gmail.com
- **LinkedIn**: [harsh-tripathi-2ab741330](https://www.linkedin.com/in/harsh-tripathi-2ab741330)
- **GitHub**: [@harshtriphati6390](https://github.com/harshtriphati6390)
