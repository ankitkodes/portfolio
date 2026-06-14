"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";

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
      "Implemented end-to-end Razorpay payment gateway integration including webhook handling, order verification, and payment failure reconciliation, enabling live transactions in production.",
      "Built an OCR-based document verification frontend from scratch with fully responsive design, allowing users to review and correct extracted data in real-time with zero backend dependency on initial load.",
      "Improved web performance by refactoring core React components with lazy loading, memoization, and list virtualization — measurably reducing page load time across multiple high-traffic modules.",
      "Collaborated with 6–7 engineers to define RESTful API contracts, deliver production features on schedule, and maintain quality through Agile sprints and CI/CD pipelines via Vercel.",
    ],
  },
];

const projects = [
  {
    name: "BugTrace",
    description: "Full-stack error tracking platform with real-time monitoring",
    stack: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    github: "https://github.com/ankitkodes/Error-Tracker",
    live: "https://bugtrace-demo.vercel.app",
    accentColor: "#ef4444",
    image: "/images/bugtrace.png",
  },
  {
    name: "Codelave",
    description: "Online code execution platform with multi-language support",
    stack: ["Next.js", "NestJS", "Docker", "PostgreSQL"],
    github: "https://github.com/ankitkodes/codelave",
    live: "https://codelave.vercel.app",
    accentColor: "#a855f7",
    image: "/images/codelave.png",
  },
  {
    name: "Medium Clone",
    description: "Full-featured blogging platform with rich text editing",
    stack: ["React", "Hono", "Prisma", "Cloudflare"],
    github: "https://github.com/ankitkodes/Medium",
    live: "https://medium-clone-demo.vercel.app",
    accentColor: "#22c55e",
    image: "/images/medium.png",
  },
  {
    name: "Pronto",
    description: "Real-time messaging application with end-to-end delivery",
    stack: ["React", "Socket.io", "Express", "MongoDB"],
    github: "https://github.com/ankitkodes/pronto",
    live: "https://pronto-chat.vercel.app",
    accentColor: "#3b82f6",
    image: "/images/pronto.png",
  },
];

const blogPosts = [
  {
    title: "Why your Node.js app leaks memory — and how to fix it",
    date: "Jan 15, 2025",
    excerpt: "Common memory leak patterns in production Node.js applications and practical debugging strategies.",
    readTime: "6 min read",
    link: "/v2/blog/nodejs-memory-leaks",
  },
  {
    title: "Migration Patterns for Event-Driven Architectures",
    date: "Dec 2, 2024",
    excerpt: "A practical guide to migrating monolithic systems to event-driven patterns without downtime.",
    readTime: "8 min read",
    link: "/v2/blog/event-driven-architectures",
  },
  {
    title: "Building type-safe APIs with Hono and Zod",
    date: "Nov 10, 2024",
    excerpt: "End-to-end type safety from your API layer to the client using Hono's RPC mode.",
    readTime: "5 min read",
    link: "/v2/blog/hono-zod-apis",
  },
  {
    title: "Docker multi-stage builds for Node.js — the right way",
    date: "Oct 18, 2024",
    excerpt: "Reduce your production image size by 80% with proper multi-stage Docker configurations.",
    readTime: "4 min read",
    link: "/v2/blog/docker-node-multistage",
  },
];

const currently = [
  { icon: "📚", label: "Learning", value: "Distributed Systems & Kafka" },
  { icon: "📖", label: "Reading", value: "Designing Data-Intensive Applications" },
  { icon: "🎧", label: "Listening", value: "The Primeagen — Backend Banter" },
];

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ───────────────────────────────────────────── */
export default function V2Page() {
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Initialize theme from system preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("v2-theme");
    const initial = saved ? (saved as "light" | "dark") : prefersDark ? "dark" : "light";
    setTheme(initial);
    setIsThemeInitialized(true);
  }, []);

  // Apply theme to root
  useEffect(() => {
    if (!isThemeInitialized) return;
    const root = rootRef.current?.closest(".v2-root");
    if (root) {
      (root as HTMLElement).setAttribute("data-theme", theme);
    }
    localStorage.setItem("v2-theme", theme);
  }, [theme, isThemeInitialized]);

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

  const toggleTheme = (e: React.MouseEvent) => {
    const nextTheme = theme === "light" ? "dark" : "light";
    
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      const root = rootRef.current?.closest(".v2-root") as HTMLElement;
      if (root) {
        root.setAttribute("data-theme", nextTheme);
      }
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  };

  const switchTab = (tab: TabName) => {
    setActiveTab(tab);
  };

  return (
    <div ref={rootRef} className="v2-wrapper">
      {/* ── NAVBAR ── */}
      <nav className="v2-navbar" id="v2-navbar">
        <div className="v2-navbar-inner">
          <a href="/v2" className="v2-navbar-name" id="v2-nav-home">
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
              href="mailto:itsankitkumar07@gmail.com"
              className="v2-hire-btn"
              id="v2-hire-btn"
            >
              Hire Me
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
              href="https://www.linkedin.com/in/ankitkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-social-box v2-tooltip"
              data-tooltip="linkedin.com/in/ankitkumar"
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
          <a
            href="#"
            className="v2-pinned-card"
            id="v2-pinned-blog"
          >
            <div className="v2-pinned-label">📌 Pinned</div>
            <div className="v2-pinned-title">Why your Node.js app leaks memory</div>
            <div className="v2-pinned-desc">
              Common memory leak patterns in production Node.js applications.
            </div>
            <span className="v2-pinned-link">
              Read Post <IconChevronRight />
            </span>
          </a>
          <a
            href="https://github.com/ankitkodes/codelave"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-pinned-card"
            id="v2-pinned-project"
          >
            <div className="v2-pinned-label">🚀 Current Project</div>
            <div className="v2-pinned-title">Codelave</div>
            <div className="v2-pinned-desc">
              Online code execution platform with multi-language support.
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
              className={`v2-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => switchTab(tab)}
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
          <div className="v2-panel" id="v2-panel-home">
            <p className="v2-about-text">
              I&apos;m a passionate software engineer who enjoys building scalable, user-friendly web
              applications from the ground up. I have hands-on experience with modern tools and
              frameworks like React, Node.js, Express, Next.js, TypeScript, and PostgreSQL. I care
              deeply about code quality, performance, and shipping products that make a difference.
            </p>

            <h3 className="v2-section-title">Skills</h3>
            <div className="v2-skills-grid">
              {skills.map((skill) => (
                <span key={skill} className="v2-skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="v2-section-title">Currently</h3>
            <div className="v2-currently-list">
              {currently.map((item) => (
                <div key={item.label} className="v2-currently-item">
                  <span>{item.icon}</span>
                  <div>
                    <div className="v2-currently-label">{item.label}</div>
                    <div>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === "Experience" && (
          <div className="v2-panel" id="v2-panel-experience">
            <div className="v2-timeline">
              {experiences.map((exp, i) => (
                <div key={i} className="v2-timeline-entry">
                  <div className="v2-timeline-dot" />
                  <div className="v2-timeline-header">
                    <div className="v2-timeline-title-group">
                      <div className="v2-timeline-company">{exp.company}</div>
                      <div className="v2-timeline-role">{exp.role}</div>
                    </div>
                    <div className="v2-timeline-date">{exp.date}</div>
                  </div>
                  <ul className="v2-timeline-bullets">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="v2-timeline-bullet">
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
          <div className="v2-panel" id="v2-panel-projects">
            <div className="v2-projects-grid">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="v2-project-card"
                >
                  {project.image && (
                    <div className="v2-project-image-container">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={225}
                        className="v2-project-image"
                      />
                    </div>
                  )}
                  <div className="v2-project-content">
                    <div className="v2-project-name">{project.name}</div>
                    <div className="v2-project-desc">{project.description}</div>
                    <div className="v2-project-stack">
                      {project.stack.map((tech) => (
                        <span key={tech} className="v2-project-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="v2-project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="v2-project-link"
                        >
                          GitHub <IconExternalLink />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="v2-project-link"
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
            <div className="v2-blog-list">
              {blogPosts.map((post) => (
                <a
                  key={post.title}
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
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === "Contact" && (
          <div className="v2-panel" id="v2-panel-contact">
            <div className="v2-contact">
              <h2 className="v2-contact-heading">Let&apos;s build something</h2>
              <a
                href="mailto:itsankitkumar07@gmail.com"
                className="v2-contact-email-btn"
                id="v2-contact-email"
              >
                <IconMail /> itsankitkumar07@gmail.com
              </a>
              <p className="v2-contact-note">
                Usually respond within 24 hours
              </p>
              <div className="v2-contact-socials">
                <a
                  href="https://github.com/ankitkodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-social-icon"
                  aria-label="GitHub"
                >
                  <IconGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/ankitkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-social-icon"
                  aria-label="LinkedIn"
                >
                  <IconLinkedin />
                </a>
                <a
                  href="https://x.com/itsankitkumar07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-social-icon"
                  aria-label="Twitter"
                >
                  <IconTwitter />
                </a>
                <a
                  href="mailto:itsankitkumar07@gmail.com"
                  className="v2-social-icon"
                  aria-label="Email"
                >
                  <IconMail />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="v2-footer" id="v2-footer">
        <div className="v2-footer-inner">
          <p>&copy; {new Date().getFullYear()} Ankit Kumar. All rights reserved.</p>
          <p className="v2-footer-tagline">Built with Next.js and custom CSS</p>
        </div>
      </footer>
    </div>
  );
}
