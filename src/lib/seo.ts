import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', url, title: `${title} | ${siteConfig.name}`,
      description, siteName: siteConfig.name, locale: 'en_IN',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Averix Labs — Custom software, web applications and AI development' }],
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${siteConfig.name}`, description, images: ['/opengraph-image'] },
  };
}
