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

---
Task ID: 3
Agent: Z.ai Code (main orchestrator)
Task: Add a dark/light theme toggle on the top-right of the navbar ("add the also option on top right side of add and light option").

Work Log:
- Installed approach: next-themes (already in package.json) with attribute="class", defaultTheme="dark", enableSystem={false} — first visit keeps the designed midnight look, user choice persists in localStorage.
- Created src/components/theme-provider.tsx and wrapped children in src/app/layout.tsx; removed the forced `dark` class from <html> (suppressHydrationWarning already present).
- Created src/components/portfolio/theme-toggle.tsx: round outline button with Sun/Moon icons swapped purely via `dark:` CSS variants (no hydration flash), aria-label "Toggle dark or light theme".
- Placed <ThemeToggle /> in navbar.tsx top-right, left of the "Hire Me" button (visible on mobile next to hamburger too); made navbar scrolled shadow lighter in light mode via dark: variant.
- Restructured src/app/globals.css: `:root` is now a light palette (near-white canvas oklch 0.985, deep violet primary 0.55, amber accent 0.74), `.dark` keeps the midnight palette; added `.dark` overrides for .text-gradient/.text-gradient-violet/.text-gradient-amber (deeper tones on light canvas), .bg-grid line color, and theme-aware scrollbar.
- Fixed light-mode contrast: all `text-primary-foreground` on violet-tinted chips/badges/hovers across hero, navbar, about, skills, projects, journey, contact, footer → `text-primary dark:text-primary-foreground` (kept as-is inside the always-dark terminal card); emerald accents → `text-emerald-600 dark:text-emerald-400`; footer "Back to top" and nav active pills theme-aware.
- bun run lint: clean.
- Agent Browser verification: dark default on load ✓; click toggle → light (html.light, localStorage=light) ✓, persists after reload ✓; light screenshots desktop hero/about/projects/journey/contact/footer + mobile hero all readable ✓; toggle back → dark restored (localStorage=dark), original midnight design intact with moon icon ✓; GET / 200, no new runtime errors in dev.log.

Stage Summary:
- Portfolio now supports dark (default) + light themes with a one-click toggle at the navbar top-right; choice persists across reloads.
- Light theme keeps the violet+amber brand via deeper gradient tones; all tinted chips use theme-aware text colors; terminal card intentionally stays dark in both themes.
- Files touched: globals.css, layout.tsx, navbar.tsx, new theme-provider.tsx + theme-toggle.tsx, hero/about/skills/projects/journey/contact/footer contrast fixes.
