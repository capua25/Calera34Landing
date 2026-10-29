# Feature: calera34-landing

Objective: static, ultra-fast single-page landing for Calera34 Labs that converts visitors to WhatsApp / email-form contacts. Branch: `feat/landing`. Delivery: ask-on-risk (forecast > 400 lines → chain strategy asked before PR). Runner: Vitest (`pnpm test`) + Playwright (`pnpm test:e2e`).
Design: `docs/superpowers/specs/2026-10-28-calera34-landing-design.md` · Plan: `docs/superpowers/plans/2026-10-28-calera34-landing.md` (read both; plan tasks map 1:1 to T1–T6).

## Specs

- **S1 Purpose.** Landing for "la empresa Calera34 Labs, es una consultora y desarrolladora de software, y partner oficial de odoo, en Carmelo, Colonia". Goal: "que nos contacten para pedir una reunión o cotización". Also the site used to appear in the Odoo directory: "Estamos haciendo esta landing justamente para ya poder aparecer en el directorio de odoo".
- **S2 Differentiator.** "cercanía y atención personalizada, somos locales de Carmelo".
- **S3 Contact channels.** "WhatsApp y formulario al email". Email delivery: "no hay dominio todavía, dejamos el tema del email en standby" → form built, reads env vars, falls back to WhatsApp when unconfigured.
- **S4 Performance & stack.** "Tiene que ser ULTRA rápido. Podría ser next en vercel sí". Acceptance: Lighthouse mobile Performance ≥ 98, others 100; all pages static except `/api/contact`.
- **S5 Assets.** "tenemos logo, el resto de cero". Logo JPEG redrawn as SVG; owner approves redraw at handoff.
- **S6 Services.** "queremos ambas cosas por igual, con odoo todavía no hemos empezado, estamos en formación" → two equal service columns; no claims of past Odoo projects.
- **S7 Odoo branding.** "Ya somos partner oficial" → "Partner oficial de Odoo" visible. "No quiero poner el sello, solo el nombre Odoo" → no Odoo logo/badge; word "Odoo" never uppercased/pluralized.
- **S8 Visual direction.** "Creo que vamos por la C" (technical minimal: white + grid, logo line-and-dot motif, coordinates). Structure: "está bien así, seguimos" (Header, Hero, Qué hacemos, Por qué Calera34, Cómo trabajamos, Contacto, Footer, floating WhatsApp).
- **S9 Animations.** "aunque haría animaciones pero quiza con css alcanza" → CSS-only, reduced-motion safe.
- **S10 Scope of done (assumption, designer's call in spec).** Repo ready to deploy; Vercel deploy is a separate owner decision.

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 Scaffold, config, WhatsApp link | S3, S4 | delegated (user: "SIEMRPE con subagentes") | done (review clean) | 1361237 |
| T2 Contact form backend | S3 | delegated | done (1 fix round) | f802207, b089f8b |
| T3 Brand tokens, font, logo | S5, S7, S8 | delegated | done (1 fix round) | 919c3cf, 9a0f984 |
| T4 Sections + CSS animations | S1, S2, S6, S7, S8, S9 | delegated | done (1 fix round) | 49ad575, 5f5eb4d |
| T5 SEO & sharing | S1, S4 | delegated | done (1 fix round) | 6655126, 8a09bcb |
| T6 Verification + README | S4, S10 | delegated | done (1 fix round; Perf 96-97 vs 98 target) | cb38e51, c61217b |

## Log

- **L1 (2026-10-28, original request):** "Tenemos que hacer una landing para la empresa Calera34 Labs, es una consultora y desarrolladora de software, y partner oficial de odoo, en Carmelo, Colonia"
- **L2:** Brainstorming completed; spec approved by owner ("aprobado"). Plan written and committed (20cd212).
- **L3 (2026-10-28, user):** "SIEMRPE con subagentes. Estás usando ODD?" → execution via superpowers:subagent-driven-development; this ODD document created retroactively before any source write.
- L4: T1–T6 implemented via subagent-driven development, each task reviewed; Lighthouse mobile 96–97/100/100/100 (Perf target 98 missed, TBT from Next runtime hydration — ruling: accepted, reported). Final whole-branch review: ready with fixes.
- Next step: final fix wave, then finishing-a-development-branch.
