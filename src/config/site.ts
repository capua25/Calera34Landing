export const siteConfig = {
  name: "Calera34 Labs",
  // TODO(owner): replace with the final production domain
  url: "https://calera34.vercel.app",
  locality: "Carmelo",
  region: "Colonia",
  country: "UY",
  coordinates: { lat: -34.0, lng: -58.28, label: "34°00′S 58°17′W" },
  // TODO(owner): set the real WhatsApp number (digits, country code first).
  // While empty, every WhatsApp link and button is hidden.
  whatsappNumber: "" as string,
  whatsappMessage: "Hola, quiero pedir una reunión o cotización.",
  email: "contacto@calera34labs.com",
} as const;
