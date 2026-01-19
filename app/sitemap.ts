import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const baseUrl = 'https://docs.curshosting.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
