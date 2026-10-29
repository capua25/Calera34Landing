import { siteConfig } from "@/config/site";

type SiteConfig = typeof siteConfig;

export function buildLocalBusinessJsonLd(
  config: SiteConfig = siteConfig,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: config.name,
    url: config.url,
    email: config.email,
    telephone: `+${config.whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.locality,
      addressRegion: config.region,
      addressCountry: config.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.coordinates.lat,
      longitude: config.coordinates.lng,
    },
    areaServed: `${config.region}, Uruguay`,
  };
}
