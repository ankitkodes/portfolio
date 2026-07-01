import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/db";
import type { BlogPost } from "@prisma/client";
import { ThemeToggle } from "./ThemeToggle";

/* ─── SEO METADATA ─── */
export const metadata: Metadata = {
  title: "Blog | Ankit Kumar — Software Engineering Insights",
  description:
    "Thoughts, tutorials, and deep-dives on software engineering, web development, Node.js, React, system design, and more by Ankit Kumar.",
  keywords: [
    "software engineering blog",
    "web development tutorials",
    "Node.js",
    "React",
    "Next.js",
    "system design",
    "Ankit Kumar blog",
  ],
  openGraph: {
    title: "Blog | Ankit Kumar",
    description:
      "Thoughts, tutorials, and insights on software engineering by Ankit Kumar.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ankit Kumar",
    description:
      "Thoughts, tutorials, and insights on software engineering by Ankit Kumar.",
  },
  alternates: {
    canonical: "/blog",
  },
};

/* ─── SSR: revalidate every 60s for fresh data while keeping pages cacheable ─── */
export const revalidate = 60;

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default async function BlogListPage() {
  let posts: BlogPost[] = [];
  try {
    if (process.env.DATABASE_URL) {
      posts = await prisma.blogPost.findMany({
        where: { status: "published" },
        orderBy: [
          { featured: "desc" },
          { publishedAt: "desc" }
        ],
      });
    }
  } catch (error) {
    console.error("Failed to load blog posts from database during build:", error);
  }

  /* ─── JSON-LD Structured Data for Blog listing ─── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ankit Kumar's Blog",
    description:
      "Thoughts, tutorials, and insights on software engineering.",
    url: "https://ankitkumar.site/blog",
    author: {
      "@type": "Person",
      name: "Ankit Kumar",
      url: "https://ankitkumar.site",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || "",
      url: `https://ankitkumar.site/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString(),
      author: {
        "@type": "Person",
        name: "Ankit Kumar",
      },
    })),
  };

  return (
    <div className="v2-wrapper">
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="v2-navbar">
        <div className="v2-navbar-inner">
          <Link href="/" className="v2-navbar-name">Ankit Kumar</Link>
          <div className="v2-navbar-actions">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="v2-blog-main" style={{ padding: "120px 24px 60px", maxWidth: 760, margin: "0 auto" }}>
        <header style={{ marginBottom: 60 }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 16 }}>Blog</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>
            Thoughts, tutorials, and insights on software engineering.
          </p>
        </header>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            No posts published yet.
          </div>
        ) : (
          <section className="v2-blog-list" aria-label="Blog posts">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="v2-blog-item"
              >
                <div className="v2-blog-title">
                  <h2 style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0 }}>
                    {post.title}
                  </h2>
                  <IconChevronRight />
                </div>
                <div className="v2-blog-meta">
                  <time dateTime={post.publishedAt?.toISOString()}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Draft"}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
                {post.excerpt && (
                  <p className="v2-blog-excerpt">{post.excerpt}</p>
                )}
              </Link>
            ))}
          </section>
        )}
      </main>

      <footer className="v2-footer">
        <div className="v2-footer-inner">
          <p>&copy; {new Date().getFullYear()} Ankit Kumar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
