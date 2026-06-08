'use client';

import { useEffect } from 'react';

export default function GoogleAdsConversion() {
  useEffect(() => {
    // Verify that gtag is available before attempting to fire the event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18172502526/1AFMCPy61LUcEP7DqdlD'
      });
    }
  }, []); // The empty dependency array ensures this only fires once on mount

  return null; // This component doesn't render any visible UI
}
