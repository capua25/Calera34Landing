import { describe, expect, it } from "vitest";
import { whatsappUrl } from "@/lib/whatsapp";

describe("whatsappUrl", () => {
  it("builds a link without message", () => {
    expect(whatsappUrl("59899123456")).toBe("https://wa.me/59899123456");
  });

  it("strips non-digits and encodes the message", () => {
    expect(whatsappUrl("+598 99 123 456", "Hola, quiero una reunión")).toBe(
      "https://wa.me/59899123456?text=Hola%2C%20quiero%20una%20reuni%C3%B3n",
    );
  });
});
