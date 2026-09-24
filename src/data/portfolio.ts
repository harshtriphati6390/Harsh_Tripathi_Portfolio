/**
 * Single source of truth for all portfolio content.
 * Compiled from Harsh Tripathi's four resumes:
 * Data Analytics · Full Stack · SEO Specialist · Software Developer
 */

export const profile = {
  name: "Harsh Tripathi",
  firstName: "Harsh",
  lastName: "Tripathi",
  initials: "HT",
  roles: [
    "Full-Stack Developer",
    "Data Analyst",
    "SEO Specialist",
    "Software Developer",
  ],
  tagline: "I build across the whole stack — from React frontends and Node.js APIs to Power BI dashboards and search-ready websites.",
  location: "Noida, Uttar Pradesh, India",
  email: "k.tripathiharsh2005@gmail.com",
  phone: "+91-6390503738",
  github: "https://github.com/harshtriphati6390",
  linkedin: "https://www.linkedin.com/in/harsh-tripathi-2ab741330",
  avatar: "/images/harsh-photo.jpg",
  resumeUrl: "/resume/Harsh_Tripathi_Resume.pdf",
  openToWork: "Open to Software Developer, Data Analyst & SEO roles",
} as const;

export const stats = [
  { value: "B.Tech", label: "CSE Graduate 2026" },
  { value: "4+", label: "End-to-End Projects" },
  { value: "3+", label: "National Hackathons" },
  { value: "4", label: "Industry Certifications" },
] as const;

export const tickerItems = [
  "React.js",
  "Node.js",
  "Express.js",
  "FastAPI",
  "Python",
  "SQL",
  "Power BI",
  "DAX",
  "MongoDB",
  "MySQL",
  "JWT Auth",
  "REST APIs",
  "Technical SEO",
  "Google Analytics",
  "Git & GitHub",
  "Data Visualization",
  "EDA",
  "WordPress",
  "Responsive Design",
] as const;

export const aboutParagraphs = [
  "I'm Harsh Tripathi, a B.Tech Computer Science graduate (Class of 2026) from NITRA Technical Campus, Ghaziabad — currently based in Noida, India. I'm a developer who likes understanding how a feature works end-to-end rather than just owning one piece of it.",
  "In TaskFlow, I built a React frontend styled with Bootstrap, a Node.js/Express REST API, JWT-based authentication and a MySQL database underneath. In HeartIQ, I did the same with a different stack — FastAPI, MongoDB and a JavaScript frontend. On the data side, I've shipped BankWise, a Power BI dashboard with DAX-driven KPIs that turns raw loan data into decisions.",
  "I'm also an SEO practitioner: I've run full technical SEO campaigns on my own sites — keyword research, indexing fixes, backlink outreach, content optimization — tracked in Google Search Console and Analytics. My HTML/CSS/JS foundation means I diagnose SEO issues at the root cause, not the surface.",
] as const;

export const highlights = [
  "Full-Stack Web Apps (React · Node · FastAPI)",
  "SQL, DAX & Data Storytelling",
  "Technical SEO & Digital Marketing",
  "Team Leadership under Deadline Pressure",
] as const;

export const whatIDo = [
  {
    icon: "code",
    title: "Full-Stack Development",
    accent: "violet" as const,
    points: [
      "Build responsive React frontends with clean UI",
      "Design REST APIs with Node.js/Express & FastAPI",
      "Implement JWT authentication & full CRUD flows",
      "Model data in MySQL, MongoDB & SQL Server",
    ],
  },
  {
    icon: "chart",
    title: "Data Analytics & BI",
    accent: "amber" as const,
    points: [
      "Perform EDA to surface key risk indicators",
      "Write SQL with joins, CTEs & window functions",
      "Build Power BI dashboards with DAX measures",
      "Turn raw data into business-ready insights",
    ],
  },
  {
    icon: "search",
    title: "SEO & Digital Marketing",
    accent: "emerald" as const,
    points: [
      "Run technical SEO audits & crawlability fixes",
      "Execute keyword research & content strategy",
      "Manage Search Console, GA4 & SEMrush/Ahrefs",
      "Plan backlink outreach by domain authority",
    ],
  },
] as const;

export const terminalJson = `{
  "name": "Harsh Tripathi",
  "role": "CS Graduate · 2026",
  "location": "Noida, India",
  "degree": "B.Tech CSE",
  "stacks": ["React+Node", "FastAPI+Mongo", "SQL+PowerBI"],
  "also_into": ["Technical SEO", "Analytics"],
  "status": "open_to_opportunities"
}` as const;

export const graduationDate = { year: 2026, month: 5, day: 15, label: "B.Tech Graduation" } as const;

export type SkillGroup = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  skills: { name: string; level: number }[];
  tools: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "layout",
    blurb: "Responsive, accessible interfaces that work cleanly across screen sizes.",
    skills: [
      { name: "HTML5 & CSS3", level: 92 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "React.js", level: 82 },
      { name: "Bootstrap & Responsive Design", level: 90 },
    ],
    tools: ["VS Code", "Browser DevTools", "npm"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    blurb: "REST APIs, auth flows and server-side logic across two ecosystems.",
    skills: [
      { name: "Node.js & Express.js", level: 85 },
      { name: "FastAPI (Python)", level: 80 },
      { name: "REST API Design", level: 88 },
      { name: "Auth & Authorization (JWT)", level: 82 },
    ],
    tools: ["Postman", "JSON", "Async JS", "OOP"],
  },
  {
    id: "database",
    title: "Databases",
    icon: "database",
    blurb: "From CRUD operations to window functions and query design.",
    skills: [
      { name: "SQL (Joins, CTEs, Window Fn)", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQL Server / Azure SQL", level: 78 },
    ],
    tools: ["CRUD", "Aggregations", "Subqueries", "Power Query"],
  },
  {
    id: "analytics",
    title: "Data Analytics & BI",
    icon: "barChart",
    blurb: "Turning raw data into dashboards stakeholders can act on.",
    skills: [
      { name: "Power BI & DAX", level: 86 },
      { name: "Python (Pandas, NumPy)", level: 84 },
      { name: "EDA & Data Cleaning", level: 88 },
      { name: "Matplotlib & Seaborn", level: 80 },
    ],
    tools: ["Excel", "Jupyter", "Google Colab", "Statistics"],
  },
  {
    id: "seo",
    title: "SEO & Digital Marketing",
    icon: "trendingUp",
    blurb: "Root-cause SEO backed by real HTML/CSS/JS understanding.",
    skills: [
      { name: "Technical SEO & Audits", level: 85 },
      { name: "Keyword Research & Content", level: 82 },
      { name: "Link Building & Outreach", level: 78 },
      { name: "GA4 & Search Console", level: 84 },
    ],
    tools: ["SEMrush / Ahrefs", "Yoast SEO", "WordPress", "A/B Testing"],
  },
  {
    id: "core",
    title: "CS Fundamentals & Tools",
    icon: "terminal",
    blurb: "The foundations that make everything above hold together.",
    skills: [
      { name: "Data Structures & Algorithms", level: 80 },
      { name: "Git & GitHub", level: 90 },
      { name: "Debugging & Testing Basics", level: 82 },
      { name: "Agile / SDLC Concepts", level: 75 },
    ],
    tools: ["Python", "JavaScript", "Postman", "Problem-Solving"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: "Full-Stack" | "Data Analytics" | "SEO & Marketing";
  period: string;
  image: string;
  description: string;
  bullets: string[];
  tech: string[];
  accent: "violet" | "amber" | "emerald";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "taskflow",
    title: "TaskFlow — Full-Stack Task Manager",
    category: "Full-Stack",
    period: "2026",
    image: "/images/project-taskflow.png",
    description:
      "A complete task management platform — React frontend, Node.js/Express REST API, JWT auth and MySQL underneath, with full CRUD tying it together.",
    bullets: [
      "Built a React frontend (styled with Bootstrap) talking to a Node.js/Express REST API",
      "Implemented JWT-based authentication and full CRUD operations for tasks",
      "Tested endpoints with Postman; version-controlled everything with Git/GitHub",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "JWT", "Bootstrap"],
    accent: "violet",
    links: [{ label: "GitHub", href: "https://github.com/harshtriphati6390" }],
  },
  {
    id: "heartiq",
    title: "HeartIQ — Cardiac Risk Prediction",
    category: "Full-Stack",
    period: "May 2025 – Oct 2025",
    image: "/images/project-heartiq.png",
    description:
      "An end-to-end health app that predicts heart-disease risk from patient data — FastAPI + MongoDB backend, real-time JavaScript frontend.",
    bullets: [
      "Designed REST endpoints with FastAPI serving risk predictions from patient data",
      "Performed EDA to identify key cardiac risk indicators, with statistical analysis",
      "Built a responsive HTML/CSS/JS frontend that renders results in real time",
    ],
    tech: ["FastAPI", "MongoDB", "JavaScript", "Python", "EDA", "REST API"],
    accent: "violet",
    links: [{ label: "GitHub", href: "https://github.com/harshtriphati6390" }],
  },
  {
    id: "bankwise",
    title: "BankWise Loan Insights",
    category: "Data Analytics",
    period: "Apr 2025 – Aug 2025",
    image: "/images/project-bankwise.png",
    description:
      "An interactive Power BI dashboard that turns raw bank-loan data into decisions — DAX-driven KPIs for approvals, repayment trends and performance.",
    bullets: [
      "Wrote SQL queries (joins, aggregations) to pull and shape bank loan data",
      "Cleaned and transformed data with Power Query for reliable reporting",
      "Built DAX calculated measures tracking approvals, repayments and KPIs",
    ],
    tech: ["SQL", "Power BI", "DAX", "Power Query", "Excel"],
    accent: "amber",
    links: [{ label: "GitHub", href: "https://github.com/harshtriphati6390" }],
  },
  {
    id: "seo-campaigns",
    title: "Technical SEO — Portfolio & WordPress",
    category: "SEO & Marketing",
    period: "2025 – 2026",
    image: "/images/project-seo.png",
    description:
      "Full SEO campaigns on my own portfolio and a WordPress site — from crawlability audits to backlink outreach, measured in Search Console & GA4.",
    bullets: [
      "Audited and fixed site structure, internal linking and indexing issues",
      "Ran keyword research, meta/sitemap optimization and SEO content publishing",
      "Built a backlink acquisition plan prioritized by domain authority",
    ],
    tech: ["Google Search Console", "GA4", "SEMrush/Ahrefs", "WordPress", "Yoast SEO"],
    accent: "emerald",
    links: [{ label: "Live Site", href: "/" }],
  },
];

export const experience = [
  {
    role: "Team Lead — Software Development Track",
    org: "Flipkart GRiD 5.0",
    period: "2024",
    points: [
      "Led a team through a national-level software development competition",
      "Coordinated tasks, timelines and technical decisions under time pressure",
    ],
    icon: "trophy",
  },
  {
    role: "Participant — National Space Hackathon",
    org: "IIT Delhi",
    period: "2025",
    points: [
      "Competed at the National Space Hackathon 2025 hosted at IIT Delhi",
      "Collaborated with cross-functional teams on rapid prototyping",
    ],
    icon: "rocket",
  },
  {
    role: "Participant",
    org: "Hansraj Innoverse 1.0",
    period: "2025",
    points: [
      "Participated in Hansraj College's innovation fest Innoverse 1.0",
      "Explored emerging-tech problem statements with peers across India",
    ],
    icon: "sparkles",
  },
] as const;

export const certifications = [
  { title: "Crash Course on Python Data Analytics", issuer: "IBM", icon: "python" },
  { title: "Microsoft Azure SQL", issuer: "Microsoft & Infosys Springboard", icon: "database" },
  { title: "Web Development (Frontend Developer)", issuer: "Oracle University", icon: "code" },
  { title: "Oracle Analytics Cloud 2025 Certified Professional", issuer: "Oracle", icon: "award" },
] as const;

export const education = [
  {
    school: "NITRA Technical Campus",
    degree: "Bachelor of Technology (B.Tech) — Computer Science & Engineering",
    period: "Aug 2022 – May 2026",
    location: "Ghaziabad, India",
    current: true,
  },
  {
    school: "New Angels Sr. Sec. School",
    degree: "Intermediate (Class XII)",
    period: "2020 – 2021",
    location: "Pratapgarh, India",
    current: false,
  },
] as const;

export const languages = [
  { name: "English", level: "Full Professional Proficiency" },
  { name: "Hindi", level: "Native Proficiency" },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;
