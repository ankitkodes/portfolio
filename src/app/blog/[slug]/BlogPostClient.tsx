"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/component/ThemeProvider";

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

export default function BlogPostClient({ 
  post, 
  htmlContent,
  toc 
}: { 
  post: any, 
  htmlContent: string,
  toc: { id: string, text: string, level: number }[]
}) {
  const { theme, toggleTheme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress();

  const articleRefCallback = useCallback((article: HTMLElement | null) => {
    if (!article) return;
    const preBlocks = article.querySelectorAll("pre");
    preBlocks.forEach((pre, index) => {
      if (pre.parentElement?.classList.contains("v2-code-block-wrapper")) return;
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
    });
  }, []);

  return (
    <div ref={rootRef} className="v2-wrapper">
      <div className="v2-blog-progress" style={{ width: `${progress}%` }} />
      <nav className="v2-navbar" id="v2-blog-navbar">
        <div className="v2-navbar-inner">
          <Link href="/blog" className="v2-blog-back-link" id="v2-blog-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="v2-blog-back-text">Back to Blog</span>
          </Link>
          <div className="v2-navbar-actions">
            <button className="v2-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
          </div>
        </div>
      </nav>

      <main className="v2-blog-main" style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
        {/* Main Content Column */}
        <div style={{ width: "100%", minWidth: 0 }}>
          <header className="v2-blog-header">
            {post.tags && post.tags.length > 0 && (
              <div className="v2-blog-tags">
                {post.tags.map((tag: string) => (
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
                <time>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft"}</time>
                <span className="v2-blog-separator">·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="v2-blog-hero-image" style={{ marginBottom: 40, borderRadius: 12, overflow: "hidden", position: "relative", width: "100%", aspectRatio: "16/9" }}>
              <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} />
            </div>
          )}

          {/* Integrated Table of Contents */}
          {toc && toc.length > 0 && (
            <div 
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginTop: "8px",
                marginBottom: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}>
                <span style={{ display: "flex", alignItems: "center", opacity: 0.8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Table of Contents
                </span>
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {toc.map((item) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`} 
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      lineHeight: "1.5",
                      paddingLeft: (item.level - 2) * 16,
                      transition: "color 0.2s, transform 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.transform = "translateX(2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span>{item.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          <article
            ref={articleRefCallback}
            className="v2-blog-article"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="v2-blog-divider" />
          
          <div className="v2-blog-back-section">
            <Link href="/blog" className="v2-blog-all-posts-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </main>

      <footer className="v2-footer">
        <div className="v2-footer-inner">
          <p>&copy; {new Date().getFullYear()} Ankit Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
