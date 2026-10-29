# Calera34 Labs landing

Static, single-page landing for Calera34 Labs, a software consultancy and official Odoo partner based in Carmelo, Colonia (Uruguay). The goal is to make visitors contact the team by WhatsApp or by an email form to request a meeting or a quote.

Stack: Next.js 16 (App Router), React 19, CSS Modules, CSS-only animations (reduced-motion safe), no third-party scripts. Every page is prerendered static; only `/api/contact` is dynamic.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | End-to-end tests (Playwright, starts its own server on port 3100) |
| `pnpm lint` | ESLint |

## Replace the placeholders

Everything the owner must set lives in `src/config/site.ts`, marked `TODO(owner)`:

- `whatsappNumber`: real number, digits only, country code first.
- `email`: real contact email.
- `url`: final production domain (used for canonical, sitemap and social metadata).
- `coordinates`: confirm the location shown in the design.

## Enable the contact form email

Without configuration the form redirects to `/error-envio`, which offers WhatsApp as a fallback. To send email:

1. Create a [Resend](https://resend.com) account.
2. Verify a sending domain in Resend.
3. In the Vercel project settings, set these environment variables (see `.env.example`):
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`: inbox that receives the messages.
   - `CONTACT_FROM_EMAIL`: sender address on the verified domain.
4. Redeploy.

## Lighthouse (mobile)

Measured against `pnpm start` with Lighthouse, mobile form factor, default throttling:

| Run | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| 1 | 97 | 100 | 100 | 100 |
| 2 | 96 | 100 | 100 | 100 |
| 3 | 97 | 100 | 100 | 100 |

The 98 performance target is not met yet: LCP is 0.9 s and CLS is 0, but Total Blocking Time is about 200 ms, caused by React hydration of the Next.js runtime chunks (the app has no client components of its own).

## Pending (owner decisions)

- Deploy and production domain: not done yet; the repo is ready to deploy on Vercel.
- Real WhatsApp number, contact email and domain (see above).
- Confirm the coordinates.
- Approve the SVG redraw of the logo (original is a JPEG).
- Copy review: "cerca tuyo" appears twice.
- The logo appears twice on the first screen on phones (header and hero).
