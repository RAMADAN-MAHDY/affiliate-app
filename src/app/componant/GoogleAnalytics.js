import Script from 'next/script';

function GoogleAnalytics({ trackingId , nonce }) {
  return (
    <>
      {trackingId && (
        <>
          <Script
           nonce={nonce}
           async
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" nonce={nonce} strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${trackingId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}

export default GoogleAnalytics;
