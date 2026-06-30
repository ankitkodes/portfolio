"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/component/ThemeProvider";

/* ─────────────────────────────────────────────
   SVG Icon Components (no external deps)
   ───────────────────────────────────────────── */
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconResume = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const TABS = ["Home", "Experience", "Projects", "Blog", "Contact"] as const;
type TabName = (typeof TABS)[number];

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Express.js", "NestJS", "PostgreSQL", "MongoDB", "Prisma",
  "Docker", "Tailwind CSS", "Git", "REST APIs", "GraphQL",
  "Redis", "Cloudflare Workers", "Vercel",
];

const experiences = [
  {
    company: "noDevBuild",
    role: "Full Stack Developer",
    date: "Oct 2025 – Mar 2026",
    description: [
      "Engineered a Razorpay payment gateway integration with webhook-based order verification and failure reconciliation, ensuring zero data loss on transactions.",
      "Built the frontend for an OCR-based document verification flow, integrating backend APIs for real-time data review and correction.",
      "Revamped core UI components, reducing First Contentful Paint (FCP) by 1.5 seconds through lazy loading and memoization.",
      "Optimized Quiz Module rendering by 40% using list virtualization, directly improving user retention metrics.",
    ],
  },
];

const projects = [
  {
    name: "Aurum",
    description: "A double-entry payment ledger engine built for accuracy and auditability. Every transaction is immutable, every balance is reconcilable, and every state change is logged — the way financial systems are supposed to work.",
    stack: ["Node.js", "Express.js", "PostgreSQL", "Drizzle ORM"],
    github: "https://github.com/ankitkodes/Aurum",
    live: "",
    accentColor: "#f59e0b",
    image: "",
  },
  {
    name: "BugTrace",
    description: "An advanced, full-stack error tracking and performance monitoring platform designed to capture, organize, and alert developers about production issues in real-time. Features include source-map support, detailed stack traces, and custom dashboards.",
    stack: ["Nextjs", "PostgreSql", "TailwindCSS", "TanStack Query"],
    github: "https://github.com/ankitkodes/Error-Tracker",
    live: "bugtrac.in",
    accentColor: "#ef4444",
    image: "/images/bugtrace.png",
  },
  {
    name: "Codelave",
    description: "A robust online code execution platform enabling developers to write, compile, and execute code in multiple programming languages directly from their browser, featuring an isolated containerized environment for maximum security and performance.",
    stack: ["Next.js", "NestJS", "Docker", "PostgreSQL"],
    github: "https://github.com/ankitkodes/codelave",
    live: "",
    accentColor: "#a855f7",
    image: "/images/codelave.png",
  },
  {
    name: "Medium Clone",
    description: "A fully-featured blogging platform mirroring Medium's core functionality. Includes a rich text editor, robust authentication, interactive commenting, user following, and an algorithmic feed for discovering new content and authors seamlessly.",
    stack: ["React", "Hono", "Prisma", "Cloudflare"],
    github: "https://github.com/ankitkodes/Medium",
    live: "",
    accentColor: "#22c55e",
    image: "/images/medium.png",
  },
  {
    name: "Pronto",
    description: "A lightning-fast real-time messaging application designed for seamless communication. Features include instant text delivery, read receipts, typing indicators, user presence tracking, and end-to-end reliability for uninterrupted chats.",
    stack: ["React", "Express", "MongoDB"],
    github: "https://github.com/ankitkodes/pronto",
    live: "",
    accentColor: "#3b82f6",
    image: "/images/pronto.png",
  },
];

const currently = [
  { icon: "🔨", label: "Building", value: "Aurum — Double-entry payment ledger engine" },
  { icon: "📚", label: "Learning", value: "Distributed Systems & Kafka" },
  { icon: "📖", label: "Reading", value: "Designing Data-Intensive Applications" },
  { icon: "🎧", label: "Listening", value: "The Primeagen — Backend Banter" },
];

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  link: string;
}

export default function V2PageClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const { theme, toggleTheme } = useTheme();
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [dynamicBlogPosts, setDynamicBlogPosts] = useState<BlogPost[]>(initialPosts);

  // Sync state if initialPosts changes server-side
  useEffect(() => {
    setDynamicBlogPosts(initialPosts);
  }, [initialPosts]);

  // Keep client-side polling/fetching to show updates without page reload, but with cache-control no-cache
  useEffect(() => {
    fetch('/api/posts', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const formattedPosts = data.map((post: any) => ({
            title: post.title,
            date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft",
            excerpt: post.excerpt || "",
            readTime: post.readTime,
            link: `/blog/${post.slug}`,
          }));
          setDynamicBlogPosts(formattedPosts);
        }
      })
      .catch(err => console.error("Failed to load posts", err));
  }, []);

  const pinnedPost = dynamicBlogPosts[0];

  // Update indicator position
  const updateIndicator = useCallback(() => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const activeEl = tabsRef.current.querySelector(".v2-tab.active") as HTMLElement | null;
    if (activeEl) {
      const parentRect = tabsRef.current.getBoundingClientRect();
      const tabRect = activeEl.getBoundingClientRect();
      indicatorRef.current.style.left = `${tabRect.left - parentRect.left + tabsRef.current.scrollLeft}px`;
      indicatorRef.current.style.width = `${tabRect.width}px`;
    }
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab, updateIndicator]);

  const switchTab = (tab: TabName) => {
    setActiveTab(tab);
  };

  return (
    <div ref={rootRef} className="v2-wrapper">
      {/* ── NAVBAR ── */}
      <nav className="v2-navbar" id="v2-navbar">
        <div className="v2-navbar-inner">
          <a href="/" className="v2-navbar-name" id="v2-nav-home">
            Ankit Kumar
          </a>
          <div className="v2-navbar-actions">
            <button
              className="v2-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              id="v2-theme-toggle"
            >
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
            <a
              href="https://drive.google.com/file/d/1jXzUmlwaJEy_ANohTCKVeR3bT1m6p68E/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-hire-btn"
              id="v2-resume-btn"
            >
              <IconResume /> Resume
            </a>
          </div>
        </div>
      </nav>

      {/* ── BANNER ── */}
      <header className="v2-banner" id="v2-banner">
        <div className="v2-banner-quote">
          <blockquote>
            &ldquo;The best way to predict the future is to build it.&rdquo;
          </blockquote>
          <cite>— Alan Kay</cite>
        </div>
      </header>

      {/* ── PROFILE ── */}
      <div className="v2-content">
        <section className="v2-profile" id="v2-profile">
          <div className="v2-avatar-wrapper">
            <Image
              src="/images/profile.jpg"
              alt="Ankit Kumar"
              width={120}
              height={120}
              className="v2-avatar"
              priority
            />
          </div>
          <h1 className="v2-profile-name">Ankit Kumar</h1>
          <p className="v2-profile-meta">
            <span>@ankitkumar</span>
            <span>&middot;</span>
            <span>Software Engineer</span>
            <span>&middot;</span>
            <span>New Delhi, India</span>
          </p>
          <p className="v2-profile-bio">
            Full Stack Software Engineer building scalable web apps with React, Node.js, and
            TypeScript. Passionate about clean code, developer tooling, and shipping products
            that solve real problems.
          </p>

          <div className="v2-social-boxes" id="v2-social-boxes">
            <a
              href="mailto:itsankitkumar07@gmail.com"
              className="v2-social-box v2-tooltip"
              data-tooltip="itsankitkumar07@gmail.com"
              id="v2-social-box-email"
            >
              <IconMail />
              <span>Gmail</span>
            </a>
            <a
              href="https://github.com/ankitkodes"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-social-box v2-tooltip"
              data-tooltip="github.com/ankitkodes"
              id="v2-social-box-github"
            >
              <IconGithub />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ankitkumar-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-social-box v2-tooltip"
              data-tooltip="linkedin.com/in/ankitkumar-developer/"
              id="v2-social-box-linkedin"
            >
              <IconLinkedin />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/itsankitkumar07"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-social-box v2-tooltip"
              data-tooltip="@itsankitkumar07"
              id="v2-social-box-twitter"
            >
              <IconTwitter />
              <span>Twitter</span>
            </a>
          </div>
        </section>

        {/* ── PINNED CARDS ── */}
        <div className="v2-pinned-row" id="v2-pinned">
          {pinnedPost ? (
            <Link
              href={pinnedPost.link}
              className="v2-pinned-card"
              id="v2-pinned-blog"
            >
              <div className="v2-pinned-label">📌 Pinned</div>
              <div className="v2-pinned-title">{pinnedPost.title}</div>
              <div className="v2-pinned-desc" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {pinnedPost.excerpt}
              </div>
              <span className="v2-pinned-link">
                Read Post <IconChevronRight />
              </span>
            </Link>
          ) : (
            <div className="v2-pinned-card loading-skeleton" id="v2-pinned-blog" style={{ opacity: 0.7 }}>
              <div className="v2-pinned-label">📌 Pinned</div>
              <div className="v2-pinned-title" style={{ color: "var(--text-muted)" }}>No post published yet</div>
              <div className="v2-pinned-desc" style={{ color: "var(--text-muted)" }}>
                Check back soon for new articles and tutorials.
              </div>
            </div>
          )}
          <a
            href="https://github.com/ankitkodes/Aurum"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-pinned-card"
            id="v2-pinned-project"
          >
            <div className="v2-pinned-label">🚀 Current Project</div>
            <div className="v2-pinned-title">Aurum</div>
            <div className="v2-pinned-desc">
              Double-entry payment ledger engine built for accuracy and auditability.
            </div>
            <span className="v2-pinned-link">
              View Repo <IconChevronRight />
            </span>
          </a>
        </div>
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div className="v2-tabs" id="v2-tabs">
        <div className="v2-tabs-inner" ref={tabsRef}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`v2-tab ${activeTab === tab ? "active" : ""}`}
              id={`v2-tab-${tab.toLowerCase()}`}
            >
              {tab}
            </button>
          ))}
          <div className="v2-tab-indicator" ref={indicatorRef} />
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <main className="v2-content">
        {/* HOME */}
        {activeTab === "Home" && (
          <div className="py-6 sm:py-8 min-h-[400px]" id="v2-panel-home">
            <p className="text-[15px] leading-[1.7] text-neutral-900 dark:text-[#f0f0ee] mb-8 font-sans transition-colors duration-200">
              I&apos;m a passionate software engineer who enjoys building scalable, user-friendly web
              applications from the ground up. I have hands-on experience with modern tools and
              frameworks like React, Node.js, Express, Next.js, TypeScript, and PostgreSQL. I care
              deeply about code quality, performance, and shipping products that make a difference.
            </p>

            <h3 className="text-[14px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 font-sans transition-colors duration-200">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[13px] px-3 py-1.5 rounded-[6px] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-[#f0f0ee] bg-white dark:bg-[#1a1a1a] transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-[14px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 font-sans transition-colors duration-200">
              Currently
            </h3>
            <div className="flex flex-col gap-3">
              {currently.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-[14px] text-neutral-900 dark:text-[#f0f0ee] px-3.5 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] transition-all duration-200"
                >
                  <span className="text-[18px] shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-[14px] text-neutral-900 dark:text-[#f0f0ee] mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === "Experience" && (
          <div className="py-6 sm:py-8 min-h-[400px]" id="v2-panel-experience">
            <div className="relative pl-5">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-neutral-200 dark:bg-neutral-800 transition-colors duration-200" />
              
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 mb-9 last:mb-0 group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] top-[6px] w-[11px] h-[11px] rounded-full bg-[#f9f9f7] dark:bg-[#0e0e0e] border-2 border-[#1da1f2] shadow-[0_0_0_4px_#f9f9f7] dark:shadow-[0_0_0_4px_#0e0e0e] group-hover:bg-[#1da1f2] group-hover:shadow-[0_0_0_6px_rgba(29,161,242,0.15)] transition-all duration-200 z-10" />
                  
                  <div className="flex justify-between items-start mb-3 gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                    <div className="flex flex-col">
                      <div className="text-[16px] font-bold text-neutral-900 dark:text-[#f0f0ee] mb-0.5 transition-colors duration-200">
                        {exp.company}
                      </div>
                      <div className="text-[14px] font-medium text-[#1da1f2] font-mono transition-colors duration-200">
                        {exp.role}
                      </div>
                    </div>
                    <div className="font-mono text-[12px] text-neutral-500 dark:text-neutral-400 bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-200">
                      {exp.date}
                    </div>
                  </div>
                  
                  <ul className="mt-3 pl-0 list-none flex flex-col gap-2">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="text-[14px] leading-[1.6] text-neutral-500 dark:text-neutral-400 relative pl-[18px] transition-colors duration-200">
                        <span className="absolute left-0 text-[#1da1f2] font-bold">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "Projects" && (
          <div className="py-6 sm:py-8 min-h-[400px]" id="v2-panel-projects">
            <div className="flex flex-col gap-5">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="group p-0 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all duration-250 bg-white dark:bg-[#1a1a1a] overflow-hidden flex flex-row items-stretch max-sm:flex-col hover:border-[#1da1f2] hover:bg-[#1da1f2]/[0.03] dark:hover:bg-[#1da1f2]/[0.03] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(29,161,242,0.08)]"
                >
                  {project.image ? (
                    <div className="w-[280px] shrink-0 overflow-hidden border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1a1a1a] relative max-sm:w-full max-sm:aspect-video max-sm:border-r-0 max-sm:border-b max-sm:border-neutral-200 max-sm:dark:border-neutral-800">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={225}
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    // Fallback placeholder container if no image is present
                    <div className="w-[280px] shrink-0 overflow-hidden border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 relative max-sm:w-full max-sm:aspect-video max-sm:border-r-0 max-sm:border-b max-sm:border-neutral-200 max-sm:dark:border-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-600 font-mono text-xs">
                      No Preview
                    </div>
                  )}
                  <div className="p-5 flex flex-col grow justify-center">
                    <div className="text-[15px] font-semibold text-neutral-900 dark:text-[#f0f0ee] mb-1 transition-colors duration-200">
                      {project.name}
                    </div>
                    <div className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-3 leading-[1.5] transition-colors duration-200 line-clamp-2">
                      {project.description}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[#1da1f2] font-medium inline-flex items-center gap-1 hover:text-[#1a8cd8] dark:hover:text-[#0a84ff] transition-colors duration-150"
                        >
                          GitHub <IconExternalLink />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live.startsWith("http") ? project.live : `https://${project.live}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[#1da1f2] font-medium inline-flex items-center gap-1 hover:text-[#1a8cd8] dark:hover:text-[#0a84ff] transition-colors duration-150"
                        >
                          Live <IconExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG */}
        {activeTab === "Blog" && (
          <div className="v2-panel" id="v2-panel-blog">
            {dynamicBlogPosts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                No posts published yet.
              </div>
            ) : (
              <div className="v2-blog-list">
                {dynamicBlogPosts.map((post) => (
                  <Link
                    key={post.link}
                    href={post.link}
                    className="v2-blog-item"
                  >
                    <div className="v2-blog-title">
                      {post.title}
                      <IconChevronRight />
                    </div>
                    <div className="v2-blog-meta">
                      <span>{post.date}</span>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="v2-blog-excerpt">{post.excerpt}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACT */}
        {activeTab === "Contact" && (
          <div className="v2-panel" id="v2-panel-contact">
            <p className="v2-contact-text">
              I&apos;m always open to new opportunities, collaborations, or just chatting about tech.
              Feel free to reach out via email or any of my social profiles.
            </p>
            <a href="mailto:itsankitkumar07@gmail.com" className="v2-contact-btn">
              Get in touch
            </a>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="v2-footer">
        <div className="v2-footer-inner">
          <p>&copy; {new Date().getFullYear()} Ankit Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
