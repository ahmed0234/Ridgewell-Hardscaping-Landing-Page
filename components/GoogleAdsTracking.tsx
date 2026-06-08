'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Extend the window object to include the gtag function
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAdsTracking() {
  const pathname = usePathname();
  const GTAG_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18172502526';
  const PHONE_LABEL = process.env.NEXT_PUBLIC_GA_PHONE_CONVERSION_LABEL || 'o6i5CImrmrYcEP7DqdlD';
  const PHONE_NUMBER = process.env.NEXT_PUBLIC_GA_PHONE_NUMBER || '720-882-5772';

  useEffect(() => {
    // This effect runs when the pathname changes, ensuring pageviews are 
    // tracked accurately during client-side navigation in Next.js
    if (pathname && window.gtag) {
      window.gtag('config', GTAG_ID, {
        page_path: pathname,
        page_location: window.location.href,
      });

      // Re-trigger the phone conversion tracking on route changes
      // to ensure numbers rendered after client-side navigation are correctly swapped
      window.gtag('config', `${GTAG_ID}/${PHONE_LABEL}`, {
        'phone_conversion_number': PHONE_NUMBER
      });
    }
  }, [pathname, GTAG_ID, PHONE_LABEL, PHONE_NUMBER]);

  return (
    <>
      {/* 
        strategy="afterInteractive" ensures the script loads after the page becomes interactive,
        preventing it from blocking the main thread and slowing down the initial page load.
      */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Base Google Ads config
            gtag('config', '${GTAG_ID}', {
              page_path: window.location.pathname,
            });

            // Phone Call Conversion Tracking config
            gtag('config', '${GTAG_ID}/${PHONE_LABEL}', {
              'phone_conversion_number': '${PHONE_NUMBER}'
            });
          `,
        }}
      />
    </>
  );
}
