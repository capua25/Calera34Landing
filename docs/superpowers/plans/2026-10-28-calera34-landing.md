# Calera34 Labs Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-page, fully static, ultra-fast Spanish landing for Calera34 Labs that converts visitors into contacts via WhatsApp or an email form.

**Architecture:** Next.js 16 App Router, React Server Components only (zero `'use client'`). The contact form is a plain HTML `<form method="post" action="/api/contact">` handled by a Route Handler that validates, sends through Resend, and answers `303` to static pages `/gracias` or `/error-envio`. All animation is CSS. All contact data lives in one typed config module.

**Tech Stack:** Next.js 16.x, React 19, TypeScript (strict), plain CSS Modules + one global CSS file, `next/font/google` (Outfit), Resend 6.x SDK, Vitest 4.x (unit), Playwright 1.5x (e2e, JS disabled), Lighthouse CLI (via `npx`). Package manager: pnpm.

**Spec:** `docs/superpowers/specs/2026-10-28-calera34-landing-design.md`

## Global Constraints

- Every page is static: `next build` output must mark `/`, `/gracias`, `/error-envio` as `○ (Static)`. Only `/api/contact` is dynamic.
- No `'use client'` anywhere in `src/`. No animation libraries, no analytics, no third-party scripts.
- The word "Odoo" is always written `Odoo` (capital O, rest lowercase), never "ODOO", never "Odoos", never inside an element styled with `text-transform: uppercase`. No Odoo logo or partner badge files anywhere.
- Copy is Spanish with Uruguayan voseo used consistently ("Pedí", "Contanos", "Escribinos"). No invented clients, numbers, or past Odoo projects.
- `<html lang="es">`.
- Colors: navy `#0F2240`, sky `#1EA0E6`, grid `#E8EDF3`, surface `#F2F4F7`, white `#FFFFFF`. Sky is for accents, lines, and large text only; small text on white uses navy or a darkened sky that passes WCAG AA (≥ 4.5:1).
- Coordinates shown: `34°10′S 58°17′W` (Carmelo, verified approx. −34.00, −58.28 — implementer re-checks and adjusts the display string if needed).
- Motion: animate only `opacity`, `transform`, `stroke-dashoffset`; everything disabled under `prefers-reduced-motion: reduce`; scroll-driven animations inside `@supports (animation-timeline: view())`.
- Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Missing any → no send attempt, redirect to `/error-envio`.
- Layout works from 320px wide with no horizontal scroll.
- Commits: Conventional Commits, no AI attribution lines.

## Review Focus

1. Form posted while email env vars are unset (the real state today) → visitor lands on `/error-envio` with a working WhatsApp link, never a 500 or blank page. (Task 2 test `redirects to error page when not configured`.)
2. Resend throws or returns an error → same `/error-envio` path, error logged server-side. (Task 2 test `redirects to error page when Resend fails`.)
3. Bot fills the honeypot field → `303` to `/gracias`, Resend never called. (Task 2 test `silently accepts honeypot submissions`.)
4. Name/message with newlines, or oversized fields (> limits), or malformed email posted directly (bypassing browser validation) → `/error-envio`, nothing sent; `replyTo` only ever set to a validated email. (Task 2 tests `rejects invalid email`, `rejects oversized fields`.)
5. Narrow phone (320px) and JS disabled → full page readable, no horizontal scroll, form submits. (Task 4 e2e `no horizontal scroll at 320px`, `form submits without JavaScript`.)

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, vitest.config.ts, playwright.config.ts, README.md, .env.example
assets/source-logo.jpeg              reference copy of the owner's JPEG (not served)
src/config/site.ts                   all company/contact data (placeholders marked)
src/lib/whatsapp.ts                  wa.me URL builder
src/lib/contact.ts                   form parsing + validation (pure)
src/lib/send-contact-email.ts        Resend wrapper, env reading
src/app/api/contact/route.ts         POST handler → 303 redirects
src/app/layout.tsx                   html/body, font, metadata, JSON-LD
src/app/page.tsx                     composes sections
src/app/gracias/page.tsx             static success page
src/app/error-envio/page.tsx         static failure page (WhatsApp CTA)
src/app/globals.css                  tokens, base, grid bg, animation keyframes
src/app/robots.ts, src/app/sitemap.ts, src/app/icon.svg, src/app/opengraph-image.tsx
src/lib/structured-data.ts           LocalBusiness JSON-LD builder
src/components/logo/Logo.tsx         full lockup SVG + compact mark (variant prop)
src/components/sections/*.tsx + *.module.css   Header, Hero, Services, Why, Process, Contact, Footer, WhatsAppFloat
tests/unit/*.test.ts                 Vitest
tests/e2e/*.spec.ts                  Playwright
```

---

### Task 1: Scaffold, config, WhatsApp link

**Files:**
- Create: project scaffold (`pnpm create next-app@16 . --ts --app --src-dir --eslint --no-tailwind --import-alias "@/*" --use-pnpm`, then delete demo content), `vitest.config.ts`, `src/config/site.ts`, `src/lib/whatsapp.ts`, `assets/source-logo.jpeg` (copy of `/mnt/c/Users/capua/OneDrive/Desktop/Calera logo.jpeg`)
- Test: `tests/unit/whatsapp.test.ts`

**Interfaces:**
- Produces:
  - `siteConfig: { name: 'Calera34 Labs'; url: string; locality: 'Carmelo'; region: 'Colonia'; country: 'UY'; coordinates: { lat: number; lng: number; label: string }; whatsappNumber: string; whatsappMessage: string; email: string }` exported from `src/config/site.ts`. Placeholders: `whatsappNumber: '59800000000'`, `email: 'hola@example.com'`, `url: 'https://calera34.vercel.app'`, each with a `// TODO(owner):` comment.
  - `whatsappUrl(number: string, message?: string): string` in `src/lib/whatsapp.ts`.
  - Script `"test": "vitest run"` in package.json.

- [ ] **Step 1: Scaffold the app, add Vitest (`pnpm add -D vitest`), set `"test": "vitest run"`, confirm `pnpm build` passes on the emptied page.**
- [ ] **Step 2: Write failing test** `tests/unit/whatsapp.test.ts`:

```ts
expect(whatsappUrl('59899123456')).toBe('https://wa.me/59899123456')
expect(whatsappUrl('+598 99 123 456', 'Hola, quiero una reunión'))
  .toBe('https://wa.me/59899123456?text=Hola%2C%20quiero%20una%20reuni%C3%B3n')
```

- [ ] **Step 3: Run `pnpm test` — expect FAIL (module not found).**
- [ ] **Step 4: Implement `whatsappUrl` (strip non-digits, `encodeURIComponent` the message) and `siteConfig`.**
- [ ] **Step 5: Run `pnpm test` — expect PASS.**
- [ ] **Step 6: Commit** `chore: scaffold next app with site config and whatsapp link`

### Task 2: Contact form backend

**Files:**
- Create: `src/lib/contact.ts`, `src/lib/send-contact-email.ts`, `src/app/api/contact/route.ts`, `src/app/gracias/page.tsx`, `src/app/error-envio/page.tsx`, `.env.example`
- Test: `tests/unit/contact.test.ts`, `tests/unit/contact-route.test.ts`

**Interfaces:**
- Consumes: `siteConfig`, `whatsappUrl` (Task 1).
- Produces:
  - `type ContactInput = { name: string; company: string; email: string; phone: string; message: string }`
  - `parseContact(form: FormData): { ok: true; data: ContactInput } | { ok: false; reason: 'invalid' | 'spam' }` — field names `name`, `company`, `email`, `phone`, `message`, honeypot `website`. Limits: name ≤ 100, company ≤ 100, email ≤ 254, phone ≤ 30, message ≤ 2000; `name`, `email`, `message` required (trimmed non-empty); email matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; newlines stripped from `name`/`company`/`phone`.
  - `getEmailConfig(env = process.env): { apiKey: string; to: string; from: string } | null`
  - `sendContactEmail(data: ContactInput, config): Promise<void>` — throws on Resend error; `replyTo: data.email`; subject `Nuevo contacto web: ${name}`; plain-text body.
  - `POST(request: Request): Promise<Response>` returning `303` with `Location` `/gracias` or `/error-envio` (absolute URL built from `request.url`). Non-POST → Next default 405.

- [ ] **Step 1: Write failing tests** in `contact.test.ts`: `accepts a valid submission` (trimmed values returned), `rejects missing required fields`, `rejects invalid email` (`'a@b'`), `rejects oversized fields` (message 2001 chars), `flags honeypot as spam` (`website='x'` → `reason: 'spam'`), `strips newlines from name`.
- [ ] **Step 2: Write failing tests** in `contact-route.test.ts` (mock `@/lib/send-contact-email` with `vi.mock`, set env via `vi.stubEnv`): `redirects to gracias on success` (status 303, location ends `/gracias`, send called once), `redirects to error page when not configured` (env empty → `/error-envio`, send not called), `redirects to error page when Resend fails` (send rejects → `/error-envio`), `silently accepts honeypot submissions` (→ `/gracias`, send not called), `redirects invalid input to error page`.
- [ ] **Step 3: Run `pnpm test` — expect FAIL.**
- [ ] **Step 4: Implement `parseContact`, `getEmailConfig`, `sendContactEmail` (`pnpm add resend`), and `POST`. Log failures with `console.error` (no PII beyond the error message).**
- [ ] **Step 5: Implement `/gracias` ("¡Gracias! Te respondemos a la brevedad." + link home) and `/error-envio` ("No pudimos enviar tu mensaje. Escribinos por WhatsApp y te respondemos enseguida." + WhatsApp button + link home). Both static, minimal, using the layout from Task 3 later (plain markup now). Write `.env.example` with the three vars empty.**
- [ ] **Step 6: Run `pnpm test` — expect PASS.**
- [ ] **Step 7: Commit** `feat: add contact form handler with resend and static result pages`

### Task 3: Brand foundation — tokens, font, logo

**Files:**
- Create: `src/app/globals.css`, `src/components/logo/Logo.tsx`, `src/app/icon.svg`
- Modify: `src/app/layout.tsx`
- Test: `tests/unit/brand-rules.test.ts`

**Interfaces:**
- Produces:
  - `Logo({ variant: 'full' | 'mark'; title?: string; className?: string })` — inline SVG, `role="img"`, `<title>` default "Calera34 Labs". Mark = navy C ring (open on the right), sky horizontal line through its middle extending past the opening, sky dot at the opening, short sky dash, small "34°S" text. Full = mark above wordmark "Calera" navy + "34" sky, "Labs" letter-spaced below. Hero line + dot get class names `logo-line` / `logo-dot` for animation. Trace proportions from `assets/source-logo.jpeg`.
  - CSS custom properties on `:root`: `--navy`, `--sky`, `--sky-text` (darkened, AA on white), `--grid`, `--surface`, `--white`, `--radius: 2px`, spacing scale, `--font-sans` (from `next/font`), `--font-mono: ui-monospace, SFMono-Regular, Menlo, monospace`. Utility class `.grid-bg`. Keyframes `draw-line`, `pop-dot`, `reveal`.
  - `layout.tsx`: `<html lang="es">`, Outfit via `next/font/google` (`subsets: ['latin']`, `display: 'swap'`, `variable: '--font-sans'`).

- [ ] **Step 1: Write failing test** `brand-rules.test.ts` that globs `src/**/*.{ts,tsx,css}` and asserts: no match for `/ODOO|Odoos/`; no file contains `'use client'`; no file contains `text-transform: uppercase` (blanket ban keeps the Odoo rule trivially safe); `globals.css` defines `--navy: #0F2240` and `--sky: #1EA0E6`. (Use `node:fs` + `fast-glob` or `fs.globSync`.)
- [ ] **Step 2: Run `pnpm test` — expect FAIL (globals.css tokens missing).**
- [ ] **Step 3: Implement globals.css, layout font, `Logo`, and `icon.svg` (compact mark).**
- [ ] **Step 4: Run `pnpm test` — expect PASS. Render `Logo` side by side with the JPEG at `/` temporarily and screenshot (Playwright MCP or `pnpm dev`) to compare shapes; adjust.**
- [ ] **Step 5: Commit** `feat: add brand tokens, font and svg logo`

### Task 4: Page sections and CSS animations

**Files:**
- Create: `src/components/sections/{Header,Hero,Services,Why,Process,Contact,Footer,WhatsAppFloat}.tsx` + matching `.module.css`, `playwright.config.ts`, `tests/e2e/landing.spec.ts`
- Modify: `src/app/page.tsx`, `src/app/gracias/page.tsx`, `src/app/error-envio/page.tsx` (apply styles/Logo)

**Interfaces:**
- Consumes: `siteConfig`, `whatsappUrl`, `Logo`, CSS tokens.
- Produces: section anchors `#servicios`, `#odoo`, `#como-trabajamos`, `#contacto`. Contact form: `action="/api/contact" method="post"`, inputs named per Task 2 with `required`, `type="email"`, `maxLength` matching Task 2 limits, honeypot `website` in a visually hidden, `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"` wrapper.

Section content (copy written by implementer within Global Constraints):
- Header: compact Logo, anchor links (Servicios, Odoo, Cómo trabajamos, Contacto), "Contacto" CTA.
- Hero (`.grid-bg`): line+dot label "Partner oficial de Odoo" (mono, sentence case), H1, sub mentioning small team from Carmelo, buttons "Pedí tu cotización" → `#contacto`, "WhatsApp" → `whatsappUrl(...)`; coordinates label.
- Services (`#servicios`, includes `id="odoo"` on the Odoo column): two equal columns — "Desarrollo y consultoría" (software a medida, integraciones, automatización de procesos) / "Implementación de Odoo" (análisis, configuración, migración de datos, capacitación, soporte).
- Why: cercanía (en Carmelo, reuniones en persona), atención personalizada, mismo equipo de principio a fin.
- Process (`#como-trabajamos`): Reunión → Propuesta → Implementación → Acompañamiento, connector line fills on scroll.
- Contact (`#contacto`): form + side panel (WhatsApp, email, Carmelo, Colonia).
- Footer: Logo, coordinates, links, `© {year} Calera34 Labs`.
- WhatsAppFloat: fixed bottom-right anchor, `aria-label="Escribinos por WhatsApp"`, inline SVG icon.

- [ ] **Step 1: Add Playwright (`pnpm add -D @playwright/test`, `npx playwright install chromium`), config with `webServer: pnpm build && pnpm start`, `use: { javaScriptEnabled: false }`. Write failing e2e tests:** `shows partner label and both services` (text "Partner oficial de Odoo", "Desarrollo y consultoría", "Implementación de Odoo" visible), `whatsapp links use wa.me` (every `a[href*="wa.me"]` count ≥ 3), `no horizontal scroll at 320px` (viewport 320×640, `document.documentElement.scrollWidth <= 320`), `form submits without JavaScript` (fill name/email/message, submit → URL ends `/error-envio` since env unset, page shows WhatsApp link), `honeypot is hidden from users` (`input[name=website]` not visible).
- [ ] **Step 2: Add `"test:e2e": "playwright test"`; run — expect FAIL.**
- [ ] **Step 3: Implement sections, page composition, result-page styling, and animations (hero `logo-line` draw + `logo-dot` pop on load; `.reveal` sections and process connector via `animation-timeline: view()` under `@supports`; all off under reduced motion).**
- [ ] **Step 4: Run `pnpm test:e2e` and `pnpm test` — expect PASS.**
- [ ] **Step 5: Commit** `feat: build landing sections with css animations`

### Task 5: SEO and sharing

**Files:**
- Create: `src/lib/structured-data.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/opengraph-image.tsx`
- Modify: `src/app/layout.tsx` (metadata + JSON-LD script)
- Test: `tests/unit/structured-data.test.ts`

**Interfaces:**
- Consumes: `siteConfig`.
- Produces: `buildLocalBusinessJsonLd(config = siteConfig): Record<string, unknown>` with `@type: 'ProfessionalService'`, `name`, `url`, `email`, `telephone` (`+` + whatsappNumber), `address: { '@type': 'PostalAddress', addressLocality: 'Carmelo', addressRegion: 'Colonia', addressCountry: 'UY' }`, `geo: { '@type': 'GeoCoordinates', latitude, longitude }`, `areaServed: 'Colonia, Uruguay'`.

- [ ] **Step 1: Write failing test:** `builds local business json-ld` asserting the exact fields above from `siteConfig`.
- [ ] **Step 2: Run `pnpm test` — expect FAIL.**
- [ ] **Step 3: Implement builder; in layout emit `<script type="application/ld+json">` (server-rendered, `JSON.stringify` with `<` escaped). Metadata: `metadataBase: new URL(siteConfig.url)`, title `Calera34 Labs · Software a medida y Odoo en Carmelo, Colonia`, description (≤ 160 chars, mentions desarrollo a medida, implementación de Odoo, Carmelo), Open Graph locale `es_UY`. `robots.ts` allow all + sitemap; `sitemap.ts` lists `/` only; `opengraph-image.tsx` 1200×630 static (navy bg, wordmark, tagline) via `next/og`, statically generated. `/gracias` and `/error-envio` get `robots: { index: false }`.**
- [ ] **Step 4: Run `pnpm test` — expect PASS; `pnpm build` and confirm `/opengraph-image` is static.**
- [ ] **Step 5: Commit** `feat: add metadata, json-ld, sitemap and og image`

### Task 6: Verification and handoff docs

**Files:**
- Create/Modify: `README.md`

- [ ] **Step 1: `pnpm build` — confirm `/`, `/gracias`, `/error-envio`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml` are `○ Static`, `/api/contact` is `ƒ`.**
- [ ] **Step 2: `pnpm start` then `npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless"` — expect Performance ≥ 98, others 100. Fix and re-run until met; record scores in README.**
- [ ] **Step 3: Run `pnpm test && pnpm test:e2e && pnpm lint` — all pass.**
- [ ] **Step 4: Write README (English): what it is, `pnpm dev/test/test:e2e`, where to replace placeholders (`src/config/site.ts`), how to enable email (create Resend account, verify domain, set the three env vars in Vercel), note that deploy and domain are pending owner decisions, Lighthouse scores.**
- [ ] **Step 5: Commit** `docs: add readme with setup and email activation`
