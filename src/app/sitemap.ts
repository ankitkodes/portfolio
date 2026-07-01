import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ankitkumar.site';

  let posts: any[] = [];
  try {
    if (process.env.DATABASE_URL) {
      posts = await prisma.blogPost.findMany({
        where: { status: 'published' },
        select: { slug: true, updatedAt: true, publishedAt: true },
        orderBy: { publishedAt: 'desc' },
      });
    }
  } catch (error) {
    console.error("Failed to load blog posts for sitemap during build:", error);
  }

  const blogPostUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPostUrls,
  ];
}
