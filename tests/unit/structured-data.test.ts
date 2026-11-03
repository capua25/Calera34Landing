import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";

describe("buildLocalBusinessJsonLd", () => {
  it("omits telephone when there is no whatsapp number", () => {
    expect(buildLocalBusinessJsonLd({ ...siteConfig, whatsappNumber: "" })).not.toHaveProperty(
      "telephone",
    );
  });

  it("includes telephone when a whatsapp number is set", () => {
    expect(
      buildLocalBusinessJsonLd({ ...siteConfig, whatsappNumber: "59899123456" }).telephone,
    ).toBe("+59899123456");
  });

  it("builds local business json-ld", () => {
    expect(buildLocalBusinessJsonLd({ ...siteConfig, whatsappNumber: "" })).toEqual({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
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
