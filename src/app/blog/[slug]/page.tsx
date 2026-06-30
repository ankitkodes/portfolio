import type { Metadata } from "next";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

/* ─── SSR: revalidate every 60s so pages stay fresh without being uncacheable ─── */
export const revalidate = 60;

/* ─── DYNAMIC SEO METADATA PER POST ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      title: true,
      excerpt: true,
      tags: true,
      coverImage: true,
      publishedAt: true,
      slug: true,
    },
  });

  if (!post || !post.title) {
    return {
      title: "Post Not Found | Ankit Kumar",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const description =
    post.excerpt || `Read "${post.title}" by Ankit Kumar on software engineering.`;

  return {
    title: `${post.title} | Ankit Kumar`,
    description,
    keywords: post.tags || [],
    authors: [{ name: "Ankit Kumar" }],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      authors: ["Ankit Kumar"],
      tags: post.tags || [],
      ...(post.coverImage && {
        images: [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

/* ─── HELPER: Extract plain text from BlockNote JSON for structured data ─── */
function extractPlainText(content: any[]): string {
  return content
    .map((block: any) => {
      const texts = (block.content || [])
        .filter((c: any) => c.type === "text")
        .map((c: any) => c.text);
      return texts.join("");
    })
    .filter(Boolean)
    .join(" ")
    .slice(0, 500);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "published") {
    return notFound();
  }

  // Generate HTML from BlockNote JSON on the server using custom parser to avoid SSR window errors
  let htmlContent = "";
  const toc: { id: string; text: string; level: number }[] = [];

  try {
    if (post.content && Array.isArray(post.content)) {
      htmlContent = post.content
        .map((block: any) => {
          let blockHtml = "";
          const contentHtml = (block.content || [])
            .map((c: any) => {
              if (c.type === "text") {
                let text = c.text;
                if (c.styles?.bold) text = `<strong>${text}</strong>`;
                if (c.styles?.italic) text = `<em>${text}</em>`;
                if (c.styles?.underline) text = `<u>${text}</u>`;
                if (c.styles?.strike) text = `<s>${text}</s>`;
                if (c.styles?.code) text = `<code>${text}</code>`;
                if (c.styles?.textColor)
                  text = `<span style="color: ${c.styles.textColor}">${text}</span>`;
                if (c.styles?.backgroundColor)
                  text = `<span style="background-color: ${c.styles.backgroundColor}">${text}</span>`;
                // Handle links if BlockNote stores them here
                if (c.type === "link" || c.href)
                  text = `<a href="${c.href}">${text}</a>`;
                return text;
              }
              if (c.type === "link") {
                const text = c.content
                  .map((inner: any) => inner.text)
                  .join("");
                return `<a href="${c.href}">${text}</a>`;
              }
              return "";
            })
            .join("");

          if (block.type === "paragraph") {
            blockHtml = `<p>${contentHtml || "<br>"}</p>`;
          } else if (block.type === "heading") {
            const level = block.props?.level || 2;
            const text = (block.content || [])
              .map((c: any) => c.text)
              .join("");
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            toc.push({ id, text, level });
            blockHtml = `<h${level} id="${id}">${contentHtml}</h${level}>`;
          } else if (block.type === "bulletListItem") {
            blockHtml = `<ul><li>${contentHtml}</li></ul>`;
          } else if (block.type === "numberedListItem") {
            blockHtml = `<ol><li>${contentHtml}</li></ol>`;
          } else if (block.type === "image") {
            const url = block.props?.url || "";
            const caption = block.props?.caption || "";
            blockHtml = `<figure><img src="${url}" alt="${caption}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
          } else if (block.type === "codeBlock") {
            const code = (block.content || [])
              .map((c: any) => c.text)
              .join("\n");
            blockHtml = `<pre><code>${code}</code></pre>`;
          } else if (block.type === "quote") {
            blockHtml = `<blockquote>${contentHtml}</blockquote>`;
          } else if (block.type === "divider") {
            blockHtml = `<hr />`;
          } else {
            blockHtml = `<p>${contentHtml}</p>`;
          }

          return blockHtml;
        })
        .join("");

      // Clean up adjacent lists
      htmlContent = htmlContent
        .replace(/<\/ul><ul>/g, "")
        .replace(/<\/ol><ol>/g, "");
    }
  } catch (e) {
    console.error("Failed to parse BlockNote content", e);
  }

  /* ─── JSON-LD Article structured data for Google rich results ─── */
  const articleBody =
    post.content && Array.isArray(post.content)
      ? extractPlainText(post.content)
      : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    articleBody,
    url: `https://ankitkumar.site/blog/${post.slug}`,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: "Ankit Kumar",
      url: "https://ankitkumar.site",
    },
    publisher: {
      "@type": "Person",
      name: "Ankit Kumar",
      url: "https://ankitkumar.site",
    },
    ...(post.coverImage && {
      image: {
        "@type": "ImageObject",
        url: post.coverImage,
      },
    }),
    ...(post.tags &&
      post.tags.length > 0 && {
        keywords: post.tags.join(", "),
      }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ankitkumar.site/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD structured data injected into <head> for crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient
        post={{
          ...post,
          publishedAt: post.publishedAt?.toISOString() || null,
        }}
        htmlContent={htmlContent}
        toc={toc}
      />
    </>
  );
}
