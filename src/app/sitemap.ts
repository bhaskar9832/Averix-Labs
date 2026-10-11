import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { products } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/solutions', '/products', '/technology', '/about', '/contact', '/privacy', '/terms', ...products.map(product => `/products/${product.slug}`)];
  return paths.map(path => ({ url: `${siteConfig.url}${path}` }));
}
