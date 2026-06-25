# RAYA — Agent Handoff & Creative Brief

> You are building the RAYA showcase microsite. Read this top to bottom before touching anything. `CLAUDE.md` has the hard tokens (palette, type, stack, rules); this file has the brief, the story, and the creative direction.

---

## 1. The one-line brief

A single-page (or few-page) marketing showcase for **RAYA** — a clifftop villa + managed pool-apartment collection on the Bingin clifftop above Uluwatu, Bali. Same *family* as the `../azurea` and `../allurea` showcase sites, **but this one is the flagship — it should be wild.** Heavy 3D, cinematic entrance, scroll-driven story, something genuinely unique. Branko's words: *"3d animations, 3d entrances, something crazy… we want to be creative, have fun, and make it very unique."*

Quiet-luxury brand, loud-craft execution. The brand is restrained (warm stone, no tropical clichés); the *web craft* is where you go big.

---

## 2. The brand (from the brand book — `docs/RAYA-Brand-Presentation-4K.pdf`)

- **Name:** RAYA. Sanskrit for "great." Worn lightly.
- **Promise:** "The high ground of Uluwatu: stillness, surf, and a managed return."
- **Positioning:** "Above the surf. Above the crowd." / "Quiet grandeur, on the high ground of Uluwatu." For the design-led owner who wants Uluwatu's stature without Canggu's congestion. A clifftop collection that **lives like a private retreat and works like an asset** (25-year leasehold).
- **Brand story:** "The quiet half of Bali." While Canggu filled in, the limestone plateau above Uluwatu kept its distance. Raya begins on that high ground — the only crowd is the surf.
- **Who rents Raya:**
  - *The surf-and-train set* — solo travellers & pairs living by the swell and the gym (dawn at Bingin, an hour at Bambu).
  - *The wellness escape* — design-led couples & remote workers chasing stillness, sun, a serious gym.
  - *The long-stay family* — space, private pool, the cliff at the door; a month on the Bukit, not a week.
- **Why it rents (the asset case):** world-class surf at the door, a wellness scene led by Bambu, the branded-resort halo of Six Senses / Bvlgari / Alila, and scarce clifftop land.

### Palette & type — see `CLAUDE.md`. (Mineral Earth; Marcellus + Jost.)

### Nav as shown in the brand book mockup (slide 8)
`Villas · Apartments · The Bukit · Enquire` — with an `ENQUIRE` button. Use as a starting point, not gospel.

---

## 3. Creative direction — the "wild" part

Branko will also do his own research; treat the below as a launchpad, not a spec. The brief is **be unique**. Some directions that fit a clifftop-stone brand:

- **The descent / the entrance.** The site literally sits "above the surf." A 3D opening that descends the limestone cliff face from sky to surf line — camera flies down the Bukit cliff, the RAYA monogram resolves out of the rock, ocean churns below. Scroll = altitude.
- **The monogram as a 3D object.** Extrude the interlocking double-R into stone/limestone material (travertine, the brand's real material — see slide 6 mood board). Light it like the warm sea light in the photos. Let it be the loading state and the hero centerpiece.
- **Material truth.** The brand is built on real materials (travertine, oak, limestone, linen — slide 6). Use real PBR textures, not plastic shaders. Warm stone, long horizon, golden-hour light. Reference the photography on slides 1, 3, 7.
- **Scroll as a film.** GSAP ScrollTrigger + Lenis smooth scroll driving a single continuous sequence: cliff → villa → interior → the asset case → enquire. Pinned sections, parallax depth, the camera as narrator.
- **Restraint in the UI, drama in the motion.** Typography stays quiet and classical (Marcellus). The *spectacle* is the 3D and the transitions, never gaudy color or effects-for-effects.

Hard "don'ts": no tropical teal/jungle palette, no generic stock-3D-template feel, no motion that fights readability of the copy. The luxury is in the calm.

Performance: this is still a marketing site that must load on mobile. Plan LOD / lazy-load the heavy 3D, provide a graceful 2D fallback, lazy-init WebGL. Don't ship a 60MB hero that bricks a phone.

---

## 4. Assets inventory (in this repo)

| Asset | Path | Notes |
|------|------|------|
| Brand book (9 slides) | `docs/RAYA-Brand-Presentation-4K.pdf` | Source of truth for brand. |
| Brand slides as PNG | `public/brand/brochure/raya-slide-1..9.png` | Quick reference; slides 1/3/7 have the cliff photography, slide 4 the clean monogram, slide 5 palette+type, slide 6 the material mood board. |
| Logo | `public/brand/raya-logo.jpeg` | ⚠️ Raster + background. **Vectorize to transparent SVG** before using (needed for crisp scaling + 3D extrusion). Clean monogram reference = slide 4. |

**Still needed from Branko** (don't block on these — stub with brochure imagery / placeholders):
- Real villa renders / photography (hero, gallery, interiors). Currently only the brand-book cliff photos exist — fine as temporary heroes.
- 3D model or floorplans of the villas/apartments, if an interactive model is wanted.
- Planpoint tour URL (azurea/allurea each have one — RAYA will likely get its own).
- Final WhatsApp / enquiry email + the Google Apps Script form endpoint (RBG reuses this pattern; ask before reusing azurea's).
- Confirmed unit mix, pricing, ROI / yield numbers (the asset case section will want these).

---

## 5. State right now (what this handoff set up)

- Repo created at `/home/branko/Documents/Projects/RBG/raya`, `git init` done, **no commits yet, no remote.**
- Assets copied in (originals still in `~/Downloads`).
- `CLAUDE.md`, `.gitignore`, this file, and `NEXT_AGENT_PROMPT.md` written.
- **No framework scaffolded yet** — deliberately left to you so you own the tooling decisions. Recommended stack is in `CLAUDE.md`. Cleanest path: copy `../azurea`'s `next.config.ts` / `tsconfig.json` / `eslint.config.mjs` as a baseline (same house Next version, which has breaking changes vs. stock — read its `AGENTS.md`), then layer in React Three Fiber + drei + GSAP + Lenis.

---

## 6. First moves for the next agent

1. Confirm stack with Branko (Next.js + R3F vs. Vite + R3F). Recommendation: Next.js to match the house.
2. Vectorize the logo → `public/brand/raya-logo.svg` (transparent, single color, ready to extrude).
3. Scaffold the app, wire Marcellus + Jost (Google Fonts), drop the Mineral Earth palette into Tailwind CSS custom properties.
4. Prototype the hero/entrance 3D first — it's the whole point and the biggest risk. Get a vertical slice (cliff descent + monogram reveal) working before building out content sections.
5. Build the scroll spine (Lenis + ScrollTrigger) and hang sections off it: Hero → Brand story ("The quiet half of Bali") → Villas → Apartments → The Bukit (location/map, coords in `CLAUDE.md`) → The asset case → Enquire.

Keep diffs tight. Don't build all sections before the 3D entrance is proven.

---

## 7. Open questions for Branko (raise early)
- One long scroll page, or multi-page (Villas / Apartments / The Bukit as routes)?
- How heavy on the 3D — full WebGL cinematic, or 3D hero + lighter content sections?
- Do real renders/3D models exist yet, or do we design with brand-book imagery + placeholders for now?
- Reuse azurea's form endpoint + WhatsApp number, or new ones for RAYA?
- Same CloudFront CDN bucket for RAYA assets?
