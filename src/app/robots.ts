import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Disallow indexing of private or API routes
    },
    sitemap: 'https://ankitkumar.site/sitemap.xml',
  };
}
