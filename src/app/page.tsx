import prisma from "@/lib/db";
import V2PageClient from "@/component/V2PageClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  // Fetch published posts directly from database on the server
  let initialPosts: {title: string, date: string, excerpt: string, readTime: string, link: string}[] = [];

  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" }
      ],
    });

    initialPosts = posts.map(post => ({
      title: post.title,
      date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Draft",
      excerpt: post.excerpt || "",
      readTime: post.readTime,
      link: `/blog/${post.slug}`,
    }));
  } catch (error) {
    console.error("Failed to load initial posts on server:", error);
  }

  return <V2PageClient initialPosts={initialPosts} />;
}
