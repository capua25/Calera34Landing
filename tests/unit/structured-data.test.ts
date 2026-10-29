import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";

describe("buildLocalBusinessJsonLd", () => {
  it("builds local business json-ld", () => {
    expect(buildLocalBusinessJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: `+${siteConfig.whatsappNumber}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Carmelo",
        addressRegion: "Colonia",
        addressCountry: "UY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: siteConfig.coordinates.lat,
        longitude: siteConfig.coordinates.lng,
      },
      areaServed: "Colonia, Uruguay",
    });
  });
});
