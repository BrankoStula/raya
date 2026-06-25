# Kickoff prompt — paste this to the next agent

---

You are the lead developer building the **RAYA** showcase microsite, a Royal Bali Group project. The repo is at `/home/branko/Documents/Projects/RBG/raya` (already `git init`'d, no commits yet).

**Read these first, in order, before writing any code:**
1. `CLAUDE.md` — brand tokens (Mineral Earth palette, Marcellus + Jost type), recommended stack, house rules, location coords.
2. `AGENT_HANDOFF.md` — the full creative brief, brand story, copy, asset inventory, and the "wild 3D" creative direction.
3. `docs/RAYA-Brand-Presentation-4K.pdf` (slides also as PNGs in `public/brand/brochure/`) — the brand book.
4. For house conventions and the exact Next.js version + config, look at the sibling sites `../azurea` and `../allurea` (and `../emmanuelle` for a GSAP + Lenis reference). Note azurea/allurea's `AGENTS.md`: the house Next.js has breaking changes vs. what you know — read `node_modules/next/dist/docs/` before writing framework patterns.

**What we're building:** a single, unforgettable marketing showcase for a clifftop villa collection above Uluwatu, Bali. Tagline "Above the surf. Above the crowd." This is RBG's flagship showcase and it should be **wild** — 3D animations, a cinematic 3D entrance (think: scroll-driven descent down the limestone cliff, the RAYA monogram resolving out of stone), scroll-as-film sequencing. Quiet-luxury brand, loud-craft execution. Be creative, have fun, make it genuinely unique. Recommended stack: Next.js (App Router, house version) + React Three Fiber + drei + postprocessing + GSAP ScrollTrigger + Lenis + Tailwind v4. Confirm the stack choice with Branko before scaffolding.

**Order of work** (don't build everything before the hard part is proven):
1. Confirm stack + a couple open questions in `AGENT_HANDOFF.md §7` with Branko.
2. Vectorize the logo (`public/brand/raya-logo.jpeg` → transparent SVG).
3. Scaffold the app; wire fonts + the Mineral Earth palette into Tailwind custom properties.
4. **Build the hero / 3D entrance vertical slice first** — it's the whole point and the biggest technical risk. Prove it before building content sections.
5. Then hang the scroll story sections off a Lenis + ScrollTrigger spine: Hero → "The quiet half of Bali" → Villas → Apartments → The Bukit (location/map) → the asset case → Enquire.

**Constraints:** TypeScript strict; warm-stone palette only (no tropical teal/jungle); motion must never fight copy readability; the heavy 3D must lazy-load and degrade gracefully on mobile (no phone-bricking hero). House code style: minimal comments (only the non-obvious *why*), no premature abstractions, no secrets in tracked files. Caveman chat mode is chat-only — write code/commits normally.

Start by reading the four references above, then come back to Branko with: your proposed stack, your concept for the 3D entrance, and any answers you need to the open questions before scaffolding.
