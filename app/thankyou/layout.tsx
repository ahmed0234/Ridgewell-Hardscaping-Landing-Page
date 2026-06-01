// import Script from "next/script";

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18172502526"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-thankyou"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18172502526');
          `,
        }}
      /> */}
      {/* <Script
        id="gtag-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {'send_to': 'AW-18172502526/1AFMCPy61LUcEP7DqdlD'});
          `,
        }}
      /> */}
      {children}
    </>
  );
}
