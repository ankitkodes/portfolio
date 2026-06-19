import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // If you know your domain, change it here:
  const baseUrl = 'https://ankitkumar.site'; // Ensure this matches your actual domain later

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add other static routes here
    // Example:
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },

    // You can also dynamically generate URLs here by fetching your blog posts
    // and mapping them to the format: { url: `${baseUrl}/blog/slug-name`, lastModified: ... }
  ];
}
