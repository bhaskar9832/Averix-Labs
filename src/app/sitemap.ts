import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { products } from '@/lib/data';
import { services } from '@/data/services';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/+$/, '');
  const paths = ['', '/services', '/solutions', '/products', '/technology', '/about', '/contact', '/privacy', '/terms', ...products.map(item => `/products/${item.slug}`), ...services.map(item => `/services/${item.slug}`)];
  return paths.map(path => ({ url: `${baseUrl}${path}` }));
}
