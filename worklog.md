# Project Worklog

---
Task ID: 1
Agent: Z.ai Code (main orchestrator)
Task: Build an attractive portfolio website for Harsh Tripathi (B.Tech CSE graduate) using umangpandey.in as the design blueprint, based on 4 uploaded resumes (Data Analytics, Full Stack, SEO Specialist, Software Developer).

Work Log:
- Loaded web-reader + agent-browser skills; analyzed reference site umangpandey.in (dark navy theme, violet + amber gradient accents, stats bar, terminal card, live status, countdown, cards with icons).
- Generated 5 AI images into public/images/: harsh-avatar.png (violet hoodie portrait), project-taskflow.png, project-heartiq.png, project-bankwise.png, project-seo.png.
- Rewrote src/app/globals.css: dark "midnight" oklch palette, violet/amber brand gradients (.text-gradient, .bg-gradient-brand), bg-grid, glow-hover, marquee/float/pulse animations, custom scrollbar.
- Updated src/app/layout.tsx: Sora display font + Geist, full SEO metadata (title, keywords, OG), forced dark theme.
- Created src/data/portfolio.ts: single source of truth — profile, roles, stats, ticker, about paragraphs, whatIDo, skillGroups (6 tracks), projects (4), experience (3), certifications (4), education, languages, navLinks. Compiled from all 4 resumes.
- Built components in src/components/portfolio/: navbar.tsx (scroll blur, scroll-spy via IntersectionObserver, mobile menu), hero.tsx (typewriter hook, avatar with floating badges, stats bar, marquee ticker), about.tsx (terminal JSON card, live status, graduation countdown with "Graduated 🎓" fallback state, 3 what-I-do cards), skills.tsx (6 groups, animated progress bars, tool chips), projects.tsx (category filter tabs with AnimatePresence layout animation), journey.tsx (experience timeline, certifications, education, languages), contact.tsx (validated form with toasts), footer.tsx, section-heading.tsx.
- Backend: prisma/schema.prisma ContactMessage model; bun run db:push; src/app/api/contact/route.ts (POST with zod validation) using src/lib/db.ts.
- Generated one-page resume PDF via scripts/generate_resume.py (reportlab) into public/resume/Harsh_Tripathi_Resume.pdf; hero "Download Resume" links to it.
- Fixed 2 react-hooks/set-state-in-effect lint errors (typewriter hook restructured to setState inside timeouts; countdown uses requestAnimationFrame). Lint passes clean.
- Agent Browser verification (desktop 1440x900 + mobile 390x844): hero typing animation ✓, scroll-spy nav ✓, anchor navigation ✓, project filter tabs ✓, contact form submit end-to-end ✓ (toast shown; row persisted in SQLite, verified via Prisma query), mobile hamburger menu ✓, footer reaches bottom naturally ✓, resume PDF + avatar assets 200 ✓, no console/page errors ✓.
- Fixed countdown bug found during verification: system date is Sep 2026 (past May 2026 graduation) — widget now shows a "Milestone Unlocked — B.Tech CSE Graduated 🎓 · Class of 2026" state instead of 00 00 00 00.

Stage Summary:
- Deliverable: single-page dark-theme portfolio at / (Next.js 16 App Router, TS, Tailwind 4, shadcn/ui, framer-motion, Prisma/SQLite).
- Sections: Navbar · Hero (typing roles, stats, ticker) · About (terminal, live status, milestone, 3 discipline cards) · Skills (6 tracks) · Projects (4 with filter) · Journey (timeline, certs, education, languages) · Contact (working form → API → DB) · sticky Footer.
- Key decisions: umangpandey.in visual blueprint respected (violet+amber on dark navy); dark-only theme; content centralized in src/data/portfolio.ts for easy edits; contact API + Prisma persistence for form messages; graduation widget gracefully handles both pre/post-graduation dates.
- Assets: /images/*.png (5 AI-generated), /resume/Harsh_Tripathi_Resume.pdf (generated).

---
Task ID: 2
Agent: Z.ai Code (main orchestrator)
Task: Add the real photo of Harsh Tripathi (uploaded IMG-20260329-WA0001.jpg.jpeg) to the portfolio, replacing the AI-generated avatar.

Work Log:
- Upload folder was empty at runtime; retrieved the exact photo via the CDN URL attached to the user's message and saved it to public/images/harsh-photo.jpg (640x640 JPEG, verified visually — professional headshot, navy shirt).
- Updated src/data/portfolio.ts: profile.avatar -> /images/harsh-photo.jpg.
- Updated src/app/layout.tsx: favicon icon + new openGraph images entry now use the real photo (also fixes social-share preview).
- Updated src/components/portfolio/hero.tsx: image dimensions set to 640x640, frame keeps 3:4 portrait ratio via aspect-[3/4] + object-cover object-top (centered crop, face fully visible), alt text changed to "Photo of Harsh Tripathi — B.Tech CSE graduate".
- Fixed overlap found during browser verification: "Technical SEO" floating badge covered the photo caption; moved it from bottom-left edge (-bottom-5) up the left side (bottom-16) so the caption "Harsh Tripathi / B.Tech CSE · NITRA Technical Campus" is fully readable.
- bun run lint: clean. Asset check: /images/harsh-photo.jpg -> 200.
- Agent Browser verification: desktop 1440x900 hero screenshot (photo card with violet glow + badges, caption readable), mobile 390x844 photo card (badges clear of caption), scrolled to page bottom (footer renders correctly). No new runtime errors in dev.log (EADDRINUSE/Fast Refresh entries are historical from earlier session).

Stage Summary:
- Real photo now powers: hero avatar card, favicon, and OG/social share image.
- AI-generated harsh-avatar.png remains in public/images but is no longer referenced by the app.
