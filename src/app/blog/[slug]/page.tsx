"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/component/ThemeProvider";

/* ─────────────────────────────────────────────
   SVG Icons (matching v2 main page)
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

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Simulated blog database
   ───────────────────────────────────────────── */
const BLOG_POSTS: Record<string, {
  title: string;
  date: string;
  readTime: string;
  content: string;
  image?: string;
  tags?: string[];
}> = {
  "nodejs-memory-leaks": {
    title: "Why your Node.js app leaks memory — and how to fix it",
    date: "Jan 15, 2025",
    readTime: "6 min read",
    tags: ["Node.js", "Performance", "Debugging"],
    content: `
      <p>Memory leaks in Node.js can be incredibly frustrating to track down. Unlike CPU spikes that immediately show up in monitoring, memory leaks often manifest as a slow, gradual increase in RSS memory until the orchestrator (like Kubernetes) kills the pod with an OOM error.</p>
      
      <h2>Common Culprits</h2>
      <p>In most production applications, memory leaks fall into one of three categories:</p>
      <ul>
        <li><strong>Global Variables:</strong> Unintentional caching in global arrays or objects.</li>
        <li><strong>Closures:</strong> Capturing variables in closures that live longer than expected (e.g. event listeners).</li>
        <li><strong>Native Modules:</strong> Leaks originating from C++ addons or bindings.</li>
      </ul>
      
      <h3>1. The Event Listener Leak</h3>
      <p>This is arguably the most common memory leak in Node.js. When you attach an event listener to an emitter that has a long lifecycle (like an HTTP server or a database connection pool), but forget to remove it when the requested operation completes, you create a leak.</p>
      
      <pre><code class="language-javascript">const server = http.createServer((req, res) => {
  // 🔴 LEAK: We add a new listener for every request!
  database.on('connect', () => {
    console.log('Database connected!');
  });
  
  res.end('Hello World');
});</code></pre>

      <blockquote>
        <p>"The garbage collector in V8 is exceptionally good, but it cannot clean up references that you explicitly tell it to hold onto."</p>
      </blockquote>
      
      <h2>Tools for Debugging</h2>
      <p>To find memory leaks, you need to look at heap snapshots. You can generate a heap snapshot using the built-in <code>v8</code> module.</p>
      
      <pre><code class="language-javascript">import v8 from 'node:v8';
import fs from 'node:fs';

// Write a snapshot to disk
const snapshotStream = v8.getHeapSnapshot();
const fileStream = fs.createWriteStream('heap.heapsnapshot');
snapshotStream.pipe(fileStream);</code></pre>
      
      <p>Load this file into Chrome DevTools (Memory tab) and you can inspect exactly what is holding onto memory. Compare two snapshots taken a few minutes apart to see what objects are accumulating.</p>

      <h2>Conclusion</h2>
      <p>By understanding how closures and event emitters hold onto references, and learning how to read a heap snapshot, you can confidently resolve memory leaks in any Node.js application.</p>
    `,
    image: "/images/blog/node-leak.png",
  },
  "event-driven-architectures": {
    title: "Migration Patterns for Event-Driven Architectures",
    date: "Dec 02, 2024",
    readTime: "8 min read",
    tags: ["Architecture", "Microservices", "Kafka"],
    content: "<p>A practical guide to migrating monolithic systems to event-driven patterns without downtime...</p><h2>Introduction</h2><p>Event-driven architectures (EDA) decouple services, allowing them to scale independently...</p>",
  },
  "hono-zod-apis": {
    title: "Building type-safe APIs with Hono and Zod",
    date: "Nov 18, 2024",
    readTime: "5 min read",
    tags: ["TypeScript", "Hono", "Zod"],
    content: "<p>End-to-end type safety from your API layer to the client using Hono's RPC mode...</p>",
  },
  "docker-node-multistage": {
    title: "Docker multi-stage builds for Node.js — the right way",
    date: "Oct 25, 2024",
    readTime: "4 min read",
    tags: ["Docker", "DevOps", "Node.js"],
    content: "<p>Reduce your production image size by 80% with proper multi-stage Docker configurations...</p>",
  }
};

/* ─────────────────────────────────────────────
   Reading progress hook
   ───────────────────────────────────────────── */
function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return progress;
}

/* ─────────────────────────────────────────────
   BLOG POST PAGE
   ───────────────────────────────────────────── */
export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress();

  // Resolve params
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  // Callback ref to inject copy buttons when the article mounts
  const articleRefCallback = useCallback((article: HTMLElement | null) => {
    console.log("articleRefCallback fired. Article element:", article);
    if (!article) return;
    const preBlocks = article.querySelectorAll("pre");
    console.log("articleRefCallback found pre blocks count:", preBlocks.length);
    preBlocks.forEach((pre, index) => {
      console.log(`Processing pre block ${index}:`, pre);
      if (pre.parentElement?.classList.contains("v2-code-block-wrapper")) {
        console.log(`Pre block ${index} already wrapped. Skipping.`);
        return;
      }
      const wrapper = document.createElement("div");
      wrapper.className = "v2-code-block-wrapper";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement("button");
      btn.className = "v2-code-copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;
      btn.addEventListener("click", () => {
        const code = pre.querySelector("code");
        const text = code?.textContent || pre.textContent || "";
        navigator.clipboard.writeText(text).then(() => {
          const span = btn.querySelector("span");
          if (span) span.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(() => {
            if (span) span.textContent = "Copy";
            btn.classList.remove("copied");
          }, 2000);
        });
      });
      wrapper.appendChild(btn);
      console.log(`Pre block ${index} wrapped and copy button injected.`);
    });
  }, []);

  if (!slug) return null;

  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div ref={rootRef} className="v2-wrapper">
        <nav className="v2-navbar">
          <div className="v2-navbar-inner">
            <Link href="/" className="v2-navbar-name">Ankit Kumar</Link>
            <div className="v2-navbar-actions">
              <button className="v2-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "light" ? <IconMoon /> : <IconSun />}
              </button>
            </div>
          </div>
        </nav>
        <div className="v2-blog-404">
          <div className="v2-blog-404-code">404</div>
          <h1 className="v2-blog-404-title">Post not found</h1>
          <p className="v2-blog-404-text">The blog post you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="v2-blog-404-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="v2-wrapper">
      {/* Reading Progress Bar */}
      <div className="v2-blog-progress" style={{ width: `${progress}%` }} />

      {/* Navbar — matches main portfolio */}
      <nav className="v2-navbar" id="v2-blog-navbar">
        <div className="v2-navbar-inner">
          <Link href="/" className="v2-blog-back-link" id="v2-blog-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="v2-blog-back-text">Back</span>
          </Link>
          <div className="v2-navbar-actions">
            <button
              className="v2-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              id="v2-blog-theme-toggle"
            >
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <main className="v2-blog-main">
        {/* Article Header */}
        <header className="v2-blog-header">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="v2-blog-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="v2-blog-tag">{tag}</span>
              ))}
            </div>
          )}

          <h1 className="v2-blog-post-title">{post.title}</h1>

          <div className="v2-blog-post-meta">
            <div className="v2-blog-author-info">
              <div className="v2-blog-author-avatar">
                <Image src="/images/profile.jpg" alt="Ankit Kumar" width={36} height={36} />
              </div>
              <div>
                <div className="v2-blog-author-name">Ankit Kumar</div>
                <div className="v2-blog-author-role">Software Engineer</div>
              </div>
            </div>
            <div className="v2-blog-post-date-info">
              <time>{post.date}</time>
              <span className="v2-blog-separator">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero image */}
        {post.image && (
          <div className="v2-blog-hero-image">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="v2-blog-hero-img"
            />
          </div>
        )}

        {/* Article Body */}
        <article
          ref={articleRefCallback}
          className="v2-blog-article"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Divider */}
        <div className="v2-blog-divider" />

        {/* Author Card */}
        <div className="v2-blog-author-card">
          <div className="v2-blog-author-card-avatar">
            <Image src="/images/profile.jpg" alt="Ankit Kumar" width={64} height={64} />
          </div>
          <div className="v2-blog-author-card-info">
            <div className="v2-blog-author-card-label">Written by</div>
            <div className="v2-blog-author-card-name">Ankit Kumar</div>
            <p className="v2-blog-author-card-bio">
              Full Stack Software Engineer building scalable web apps with React, Node.js, and TypeScript.
            </p>
            <div className="v2-blog-author-card-socials">
              <a href="https://github.com/ankitkodes" target="_blank" rel="noopener noreferrer" className="v2-blog-social-link" aria-label="GitHub">
                <IconGithub />
              </a>
              <a href="https://x.com/itsankitkumar07" target="_blank" rel="noopener noreferrer" className="v2-blog-social-link" aria-label="Twitter">
                <IconTwitter />
              </a>
              <a href="https://www.linkedin.com/in/ankitkumar" target="_blank" rel="noopener noreferrer" className="v2-blog-social-link" aria-label="LinkedIn">
                <IconLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Back to all posts */}
        <div className="v2-blog-back-section">
          <Link href="/" className="v2-blog-all-posts-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </main>

      {/* Footer — matches main portfolio */}
      <footer className="v2-footer" id="v2-blog-footer">
        <div className="v2-footer-inner">
          <p>&copy; {new Date().getFullYear()} Ankit Kumar. All rights reserved.</p>
          <p className="v2-footer-tagline">Built with Next.js and custom CSS</p>
        </div>
      </footer>
    </div>
  );
}

