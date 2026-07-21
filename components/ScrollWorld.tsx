"use client";

import { useEffect, useRef } from "react";
import { mountScrollWorld } from "@/lib/scrub-engine";

// The scroll world: real Kling render-clips scrubbed by scroll (scroll-world engine —
// blob-seek, seam crossfades, iOS priming, reduced-motion fallback all built in).
// Our clips are separate cinematic pans, not frame-locked chains, so connectors are
// null and the engine crossfades each seam.
const SECTIONS = [
  {
    id: "arrival",
    label: "Arrival",
    still: "/world/arrival.webp",
    stillMobile: "/world/arrival-m.webp",
    clip: "/world/arrival.mp4",
    clipMobile: "/world/arrival-m.mp4",
    accent: "#b8a28e",
    scroll: 1.7,
    linger: 0.45,
    eyebrow: "Bingin · Uluwatu · Bali",
    title: "Above the surf. Above the crowd.",
    body: "A clifftop villa & managed pool-apartment collection on the high ground of Uluwatu — golden hour, every evening.",
    tags: ["25-yr leasehold", "Fully managed"],
  },
  {
    id: "terrace",
    label: "The Terrace",
    still: "/world/terrace.webp",
    stillMobile: "/world/terrace-m.webp",
    clip: "/world/terrace.mp4",
    clipMobile: "/world/terrace-m.mp4",
    accent: "#96806c",
    scroll: 1.4,
    linger: 0.4,
    eyebrow: "The pool terrace",
    title: "Golden hour, at the door.",
    body: "A private pool and a spa-calm terrace — the day ends here, slowly.",
  },
  {
    id: "living",
    label: "The Living",
    still: "/world/living.webp",
    stillMobile: "/world/living-m.webp",
    clip: "/world/living.mp4",
    clipMobile: "/world/living-m.mp4",
    accent: "#b8a28e",
    linger: 0.35,
    eyebrow: "The living",
    title: "Room for the long stay.",
    body: "Limewash, timber and linen — a living room built for a month on the Bukit, not a week.",
  },
  {
    id: "dining",
    label: "The Table",
    still: "/world/dining.webp",
    stillMobile: "/world/dining-m.webp",
    clip: "/world/dining.mp4",
    clipMobile: "/world/dining-m.mp4",
    accent: "#96806c",
    linger: 0.35,
    eyebrow: "The table",
    title: "Built for slow evenings.",
    body: "Long dinners under warm light — teak, rattan and hand-thrown ceramics.",
  },
  {
    id: "bedroom",
    label: "The Bedroom",
    still: "/world/bedroom.webp",
    stillMobile: "/world/bedroom-m.webp",
    clip: "/world/bedroom.mp4",
    clipMobile: "/world/bedroom-m.mp4",
    accent: "#b8a28e",
    linger: 0.35,
    eyebrow: "The bedroom",
    title: "Stillness, by design.",
    body: "Morning light through woven screens. The swell is a five-minute walk; the quiet is at the door.",
  },
  {
    id: "rooftop",
    label: "The Rooftop",
    still: "/world/rooftop.webp",
    stillMobile: "/world/rooftop-m.webp",
    clip: "/world/rooftop.mp4",
    clipMobile: "/world/rooftop-m.mp4",
    accent: "#eae3d7",
    scroll: 1.6,
    linger: 0.5,
    eyebrow: "The rooftop",
    title: "Take the high ground.",
    body: "A limited clifftop collection above Uluwatu. Availability, pricing and the full RAYA package on request.",
    cta: {
      primary: { label: "Enquire", href: "#enquire" },
      secondary: { label: "The collection", href: "#collection" },
    },
  },
];

export default function ScrollWorld() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = ""; // dev StrictMode double-mount guard — engine has no unmount API
    mountScrollWorld(el, {
      // no `brand` — the site header owns the logo (engine's mark would double up)
      nav: false, // site header handles navigation
      atmosphere: false,
      hint: "Scroll to enter",
      diveScroll: 1.25,
      crossfade: 0.18, // seams aren't frame-locked chains — wider dissolve hides the cut
      sections: SECTIONS,
      connectors: [null, null, null, null, null],
    });

    // The engine assumes it owns the whole page, so its fixed layers (copy, sky,
    // route rail) stay visible forever — including over our sections below the
    // world. Fade them out once scroll passes the world's end.
    const onScroll = () => {
      const end = el.offsetTop + el.offsetHeight - window.innerHeight;
      el.classList.toggle("sw-done", window.scrollY > end - 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      el.innerHTML = "";
    };
  }, []);

  return <div id="top" ref={ref} className="sw-root" />;
}
