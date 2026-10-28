import { expect, test } from "@playwright/test";

test("shows partner label and both services", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#inicio").getByText("Partner oficial de Odoo")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Desarrollo y consultoría", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Implementación de Odoo", exact: true })).toBeVisible();
});

test("whatsapp links use wa.me", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator('a[href*="wa.me"]').count()).toBeGreaterThanOrEqual(3);
});

test("no horizontal scroll at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(320);
});

test("form submits without JavaScript", async ({ page }) => {
  await page.goto("/");
  const form = page.locator('form[action="/api/contact"]');
  await form.locator('input[name="name"]').fill("Ana Pérez");
  await form.locator('input[name="email"]').fill("ana@example.com");
  await form.locator('textarea[name="message"]').fill("Quiero una reunión.");
  await form.getByRole("button", { name: /enviar/i }).click();
  await expect(page).toHaveURL(/\/error-envio$/);
  await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible();
});

test("honeypot is hidden from users", async ({ page }) => {
  await page.goto("/");
  const honeypot = page.locator('input[name="website"]');
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toBeHidden();
});
