# RAYA — project memory

> Read `AGENT_HANDOFF.md` next — it is the full creative brief. This file is the quick-reference for tokens, stack, and house rules.

## What this is

Marketing showcase microsite for **RAYA** — a clifftop villa + managed pool-apartment collection on the Bingin clifftop above Uluwatu (the Bukit peninsula, Bali). 25-year leasehold. A Royal Bali Group (RBG) project. Sibling to the `../azurea` and `../allurea` single-project showcase sites, but this one is meant to be **the wild one** — heavy 3D, cinematic entrances, scroll-driven story. See the handoff for creative direction.

Domain (intended): `raya.bali`. Tagline: **"Above the surf. Above the crowd."**

## Brand tokens

Source: `docs/RAYA-Brand-Presentation-4K.pdf` (9-slide brand book). Slides also extracted as PNGs in `public/brand/brochure/` for quick reference.

### Palette — "Mineral Earth"
| Token | Hex | Role |
|------|------|------|
| Limestone | `#EAE3D7` | Ground / background |
| Clay | `#B8A28E` | Secondary |
| Mushroom | `#96806C` | Captions / muted text |
| Walnut | `#76614F` | Timber / mid tone |
| Espresso | `#3B2E24` | Ink / primary text / dark bg |
| Olive | `#36422E` | Accent |

Warm stone, sea light. **Nothing tropical** — no teal/jungle clichés. Quiet luxury.

### Type
- **Display:** Marcellus (Google Fonts) — headlines + the RAYA wordmark. Classical Roman serif, used sparingly.
- **Text / UI:** Jost (Google Fonts) — weights Light / Regular / Medium.

### Logo
- Interlocking double-R monogram. Primary color = Espresso `#3B2E24`; reverses to Limestone on dark.
- Current asset: `public/brand/raya-logo.jpeg` — **raster, has a background**. TODO: vectorize to clean SVG (transparent, single-path) for crisp scaling + 3D extrusion. The monogram on slide 4 is the cleanest reference.

## Location
- Bingin clifftop, Uluwatu, Bukit peninsula, Bali.
- Site pin (Google Maps): **lat `-8.8100574`, lng `115.1223944`**.
- Proximity (for any map/location section): Bingin Beach (surf, walk), Bambu Fitness (gym, walk), Padang Padang (surf, 5 min), Uluwatu Temple (12 min), Melasti & Dreamland (10 min), Ngurah Rai Airport (45 min drive). Branded-resort halo nearby: Six Senses, Bvlgari, Alila.

## Recommended stack (confirm with Branko before locking)

House precedent (azurea/allurea): Next.js App Router + Tailwind. For the 3D ambition here, recommended:
- **Next.js (App Router)** — same family as azurea/allurea. ⚠️ The house uses a *breaking-change* Next version (see `AGENTS.md` note in azurea/allurea: "This is NOT the Next.js you know — read `node_modules/next/dist/docs/` before writing patterns"). Match their version; copy their `next.config.ts`/`tsconfig.json` as a baseline.
- **React Three Fiber** (`@react-three/fiber`) + **drei** + **postprocessing** — the 3D layer.
- **GSAP** (ScrollTrigger) + **Lenis** — scroll-driven cinematic sequencing (emmanuelle uses GSAP+Lenis; good reference).
- **Tailwind v4** with CSS custom properties for the tokens above.
- Forms: Google Apps Script endpoint (no backend), same pattern as azurea/allurea `InquiryForm.tsx`.
- Assets/CDN: RBG uses CloudFront (`d1pjqs5r0ua4f1.cloudfront.net`). Real renders/photos get uploaded there and referenced by URL.

Static-export friendly. No Supabase, no auth — pure marketing site.

## House rules (carried from RBG / azurea / allurea)
- TypeScript strict. No `any` without a reasoned eslint-disable.
- Comments: only when the *why* is non-obvious. Don't annotate the *what*.
- No premature abstractions, no backwards-compat shims, no dead-code comments.
- Don't write new `.md` docs unless asked. (This repo's docs are the exception — they were requested.)
- Don't commit secrets / API keys / form endpoints into tracked files.
- Caveman mode is **chat only** — code, commits, PR text are written normally.

## graphify
Once code exists, run `graphify .` to build a knowledge graph (matches azurea/allurea setup). Then read `graphify-out/GRAPH_REPORT.md` before architecture questions.
