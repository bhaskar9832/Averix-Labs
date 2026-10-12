import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/+$/, '')}/sitemap.xml`,
  }
}
