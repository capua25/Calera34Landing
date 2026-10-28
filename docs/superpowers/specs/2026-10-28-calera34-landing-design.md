# Calera34 Labs — Landing Page Design

Date: 2026-10-28
Status: Draft, pending approval

## Intent

Calera34 Labs is a software consultancy and development company based in Carmelo, Colonia (Uruguay), and an official Odoo partner. The landing page has two jobs:

1. Get visitors (mainly businesses in the region) to request a meeting or a quote.
2. Serve as the company website required to appear in the Odoo partner directory.

Why clients choose Calera34 (stated by the owner): closeness and personalized attention — "we are local, from Carmelo". The page must communicate that a small, nearby team understands the client's business, not look like a generic enterprise software factory.

## Goals

- One clear conversion: contact via WhatsApp or via a contact form that delivers to an email inbox.
- Present two service lines with equal weight: (a) custom software development and consultancy, (b) Odoo implementation.
- "Partner oficial de Odoo" visible above the fold.
- Extremely fast ("ULTRA rápido"): target Lighthouse ~100 on mobile for Performance, Accessibility, Best Practices, and SEO, measured, not assumed.
- Local SEO for searches like software / Odoo in Carmelo, Colonia.

## Non-goals

- No blog, CMS, multi-page site, or client portal.
- No team section with faces (there are no photos).
- No English version (Spanish only — builder's call accepted by owner).
- No client testimonials or case studies. Clarification: the Odoo partnership is already official and signed (owner confirmed); what has not started yet is client Odoo work — the team is training. So "Partner oficial de Odoo" is accurate and stays; only claims of past Odoo projects are forbidden.

## Anti-goals

- Claiming Odoo experience or results the company does not yet have (no invented clients, numbers, or case studies).
- Breaking Odoo brand rules in any way that could jeopardize the directory listing.
- Heavy JavaScript, animation libraries, or third-party scripts that hurt load speed.
- Generic corporate look that erases the local identity.

## Constraints

### Odoo brand rules (source: https://www.odoo.com/es/page/brand-assets)

- **Do not use the Odoo partner badge or Odoo logo at all** (owner decision). Only the word "Odoo".
- Always write "Odoo" with capital O (lowercase only inside URLs). Never "ODOO", never pluralized ("Odoos").
- "Odoo" must use the same font size and style as the surrounding text. This rules out CSS `text-transform: uppercase` on any text containing "Odoo" (e.g. eyebrow labels) — use sentence case or monospace lowercase-style labels where "Odoo" appears, keeping the word itself as "Odoo".

### Brand identity

- Source logo: `C:\Users\capua\OneDrive\Desktop\Calera logo.jpeg` (AI-generated JPEG, grey rounded-rectangle background). Copy into the repo as reference only.
- Redraw the logo as SVG: navy geometric "C" ring with a horizontal sky-blue line crossing it ending in a dot and a short dash, a small "34°S" label; wordmark "Calera" navy + "34" sky blue, "Labs" spaced below. Provide a full lockup and a compact mark (C symbol only) for favicon/header.
- Colors sampled from the logo (builder to refine against the JPEG): navy ≈ `#0F2240`, sky blue ≈ `#1EA0E6`. Neutrals: white background, light grid ≈ `#E8EDF3`, surface ≈ `#F2F4F7`. Verify WCAG AA contrast; sky blue on white is likely too light for body text — use it for accents, lines, and large text only, or darken a text variant.
- The redrawn SVG logo must be shown to the owner for approval before publishing.

### Tech

- Next.js (App Router) deployed on Vercel, fully statically generated page.
- Minimal client JavaScript: the page should be React Server Components only; avoid any `'use client'` component unless strictly required.
- One web font via `next/font` (self-hosted, subset, `display: swap`), a geometric sans close to the logo wordmark; a monospace for coordinate/label details may use the system monospace stack to avoid a second font download.
- No animation libraries. Animations are CSS-only (see below).
- No third-party analytics or chat widgets (could be added later deliberately).

## Visual direction: "C · Técnico y minimalista" (chosen by owner)

- White background with a subtle square grid pattern (CSS background, no images) in the hero.
- The logo's line-and-dot motif is the main graphic device: section labels, process timeline connector, dividers.
- Real coordinates as a detail: `34°10′S 58°17′W` (Carmelo; builder to verify exact values) in monospace sky blue.
- Bold, tight headings in navy; generous whitespace; small square-ish radii (≈2px) on buttons.
- Primary button navy filled; secondary outlined.

The approved mockup is in `.superpowers/brainstorm/*/content/estilo-visual.html` (option C) and `estructura.html`.

## Page structure (single page, approved by owner)

1. **Header** — compact logo, anchor links (Servicios, Odoo, Cómo trabajamos, Contacto), contact CTA.
2. **Hero** — line+dot label "Partner oficial de Odoo"; headline; subheadline that mentions the small team from Carmelo; buttons "Pedí tu cotización" (scrolls to form) and "WhatsApp" (opens wa.me link).
3. **Qué hacemos** — two equal columns:
   - Desarrollo y consultoría: custom software, integrations, process automation.
   - Implementación de Odoo: analysis, configuration, data migration, training, support.
   Copy must not imply past Odoo projects.
4. **Por qué Calera34** — closeness (based in Carmelo, in-person meetings), personalized attention, same team from start to finish.
5. **Cómo trabajamos** — 4 steps connected by the logo line: Reunión → Propuesta → Implementación → Acompañamiento.
6. **Contacto** — form (nombre, empresa, email, teléfono, mensaje "¿Qué necesitás?") + side panel with WhatsApp, email, location (Carmelo, Colonia).
7. **Footer** — logo, coordinates, links, copyright.
8. **Floating WhatsApp button** — always visible, bottom-right, plain anchor (no JS).

Copywriting is left to the builder: Spanish with Uruguayan voseo ("Pedí", "Contanos") used consistently, professional register — designer's call, matching the local identity. Short, concrete, no invented claims. Mockup copy is placeholder.

## Contact handling

- **WhatsApp:** `https://wa.me/<number>?text=<prefilled message>` link. Number from config.
- **Form:** native HTML `<form>` that works without JavaScript, posting to a Next.js Server Action or Route Handler which sends the email through Resend.
  - Server-side validation (required fields, email format, length limits) and a honeypot field for spam; no CAPTCHA script.
  - Without JS: post → redirect back to `/?enviado=1#contacto` (or `?error=1`), page shows success/error state. Must remain statically generated otherwise — builder decides the mechanism that keeps the page static (e.g. a separate static success page `/gracias`) and records the choice.
  - **Email delivery is on standby:** there is no domain yet. Read `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` from environment variables. When they are missing, the handler does not fail silently: the user sees a clear message inviting them to contact via WhatsApp (with the link). Document in README how to enable it once a domain exists.

## Configuration

A single typed config module (e.g. `src/config/site.ts`) holding: company name, WhatsApp number, prefilled WhatsApp message, public contact email, address/locality, coordinates, site URL. Initial values are clearly marked placeholders for the owner to replace.

## Animations (CSS only)

- Owner wants animations; CSS-only is acceptable.
- Hero: the logo line draws in and the dot appears (SVG stroke-dashoffset keyframes) on load.
- Sections: subtle fade/slide-in on scroll using CSS scroll-driven animations (`animation-timeline: view()`) wrapped in `@supports`, so unsupported browsers simply show content without animation.
- Process timeline: connector line fills as it scrolls into view (same technique).
- All motion disabled under `prefers-reduced-motion: reduce`.
- No animation may delay Largest Contentful Paint or cause layout shift (animate only `opacity`/`transform`/stroke).

## SEO

- `metadata`: title and description targeting Carmelo / Colonia / Odoo / software a medida; `lang="es"`.
- JSON-LD `LocalBusiness` (or `ProfessionalService`) with name, locality Carmelo, region Colonia, country UY, geo coordinates, contact.
- Open Graph image (static, generated at build or a static PNG).
- `robots.txt`, `sitemap.xml`, favicon/app icons from the compact mark.
- Site URL from config (currently would be a `*.vercel.app` domain).

## Open items (not blocking the build)

- Domain: none yet. Note to owner: confirm whether Odoo accepts a `*.vercel.app` URL for the directory; buying the domain first is probably advisable.
- Real WhatsApp number, email, and Resend setup: owner provides later.
- Logo SVG redraw approval by owner.

## Success criteria

- Lighthouse mobile (production build): Performance ≥ 98, Accessibility, Best Practices, SEO = 100.
- Page works fully with JavaScript disabled, including form submission.
- No `text-transform: uppercase` or other styling applied to the word "Odoo"; no Odoo logo or badge anywhere.
- Responsive from 320px wide; no horizontal scroll.
- `next build` succeeds and the home route is reported as static.

## Scope of "done" (designer's call)

- Done = repository ready to deploy: `next build` passes with the home route static, and Lighthouse is measured locally against the production build (`next build && next start`).
- Deploying to Vercel is **out of scope** for this build: it is a separate, explicit owner decision, to be taken once real contact data (WhatsApp number at minimum) and ideally a domain exist, so visitors never see a placeholder number.
- The logo is built as one swappable SVG component (full lockup + compact mark) from which header, favicon/icons, OG image, and the hero line animation derive. Owner approval of the redraw happens at handoff; rejection means editing that component only.

## Left to the builder

- Exact copy, font choice, spacing scale, component breakdown, test setup.
- Server Action vs Route Handler for the form, keeping the page static.
- Exact OG image approach.
