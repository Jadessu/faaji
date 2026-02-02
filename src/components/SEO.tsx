import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const defaultSEO = {
  title: 'FAAJI - Every Friday Night at VLive Chicago',
  description:
    'Join us every Friday night at VLive Chicago for FAAJI - an unforgettable night of music, vibes, and celebration. Get your tickets now!',
  image: 'https://faaji.com/faajiFlyer.png',
  url: 'https://faaji.com/',
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'FAAJI',
  description:
    'Every Friday night at VLive Chicago - an unforgettable night of music, vibes, and celebration',
  eventSchedule: {
    '@type': 'Schedule',
    byDay: 'Friday',
    repeatFrequency: 'P1W',
  },
  startDate: '2025-01-24T22:00:00-06:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: 'VLive Chicago',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2501 S Kedzie Ave',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      postalCode: '60623',
      addressCountry: 'US',
    },
  },
  image: 'https://faaji.com/faajiFlyer.png',
  organizer: {
    '@type': 'Organization',
    name: 'FAAJI',
    url: 'https://faaji.com',
  },
};

export function SEO(props: SEOProps) {
  const seo = { ...defaultSEO, ...props };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content="FAAJI, Friday night, VLive Chicago, nightlife, event, party, music" />
      <meta name="theme-color" content="#D4A853" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
    </Helmet>
  );
}
