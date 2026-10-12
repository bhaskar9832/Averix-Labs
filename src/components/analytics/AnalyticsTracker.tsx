'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

function Tracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const trackPageView = async () => {
      if (pathname.startsWith('/admin')) return

      let visitorId = localStorage.getItem('visitor_id')
      if (!visitorId) {
        visitorId = uuidv4()
        localStorage.setItem('visitor_id', visitorId)
      }

      const utm_source = searchParams.get('utm_source')
      const utm_medium = searchParams.get('utm_medium')
      const utm_campaign = searchParams.get('utm_campaign')

      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitor_id: visitorId,
            browser: navigator.userAgent,
            utm_source,
            utm_medium,
            utm_campaign,
          })
        })
      } catch (err) {
        console.error('Analytics tracking failed', err)
      }
    }

    trackPageView()
  }, [pathname, searchParams])

  return null
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  )
}
