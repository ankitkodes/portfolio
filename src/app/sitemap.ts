import { MetadataRoute } from 'next';
import prisma from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ankitkumar.site';

  // Fetch all published blog posts for dynamic sitemap entries
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
  });

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
