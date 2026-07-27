"use client";

import { useEffect, useRef } from "react";
import { mountScrollWorld } from "@/lib/scrub-engine";

// The villa journey: six AI-generated camera legs (OpenRouter/Kling, anchored on
// the real DEV 10 renders as first/last frames) scrubbed by scroll — one
// continuous flight: aerial → house → pool → living → kitchen → bedroom → rooftop.
// Seams are frame-locked by construction (each leg ends on the render the next
// leg starts from); the engine's crossfade hides residual drift.
const SECTIONS = [
  {
    id: "arrival",
    label: "Arrival",
    still: "/journey/leg_1.webp",
    clip: "/journey/leg_1.mp4",
    clipMobile: "/journey/leg_1-lite.mp4",
    accent: "#b8a28e",
    scroll: 1.6,
    linger: 0.4,
    eyebrow: "Bingin · Uluwatu · Bali",
    title: "Above the surf. Above the crowd.",
    body: "A villa & managed pool-apartment collection on the high ground of Uluwatu — ten villas and an apartment house in the palms.",
    tags: ["25-yr leasehold", "Fully managed"],
  },
  {
    id: "pool",
    label: "The Pool",
    still: "/journey/leg_2.webp",
    clip: "/journey/leg_2.mp4",
    clipMobile: "/journey/leg_2-lite.mp4",
    accent: "#96806c",
    scroll: 1.9, // 16s assembled clip (street → villa door → pool) needs the dwell
    linger: 0.35,
    eyebrow: "The pool",
    title: "A private line of water.",
    body: "Through the gate: your own plunge pool between carved stone and planting.",
  },
  {
    id: "living",
    label: "The Living",
    still: "/journey/leg_3.webp",
    clip: "/journey/leg_3.mp4",
    clipMobile: "/journey/leg_3-lite.mp4",
    accent: "#b8a28e",
    linger: 0.35,
    eyebrow: "The living",
    title: "Room for the long stay.",
    body: "A sunken limewash lounge under a sculptural stair — built for a month on the Bukit, not a week.",
  },
  {
    id: "kitchen",
    label: "The Kitchen",
    still: "/journey/leg_4.webp",
    clip: "/journey/leg_4.mp4",
    clipMobile: "/journey/leg_4-lite.mp4",
    accent: "#96806c",
    linger: 0.35,
    eyebrow: "The kitchen",
    title: "Built for slow evenings.",
    body: "Pale stone and timber around the island — dinner that takes its time.",
  },
  {
    id: "bedroom",
    label: "The Bedroom",
    still: "/journey/leg_5.webp",
    clip: "/journey/leg_5.mp4",
    clipMobile: "/journey/leg_5-lite.mp4",
    accent: "#b8a28e",
    linger: 0.35,
    eyebrow: "The bedroom",
    title: "Stillness, by design.",
    body: "Soft evening light through black-framed glazing. The swell is minutes away; the quiet is at the door.",
  },
  {
    id: "bath",
    label: "The Bathroom",
    still: "/journey/leg_6.webp",
    clip: "/journey/leg_6.mp4",
    clipMobile: "/journey/leg_6-lite.mp4",
    accent: "#96806c",
    linger: 0.35,
    eyebrow: "The bathroom",
    title: "Stone, water, light.",
    body: "Through the bedroom door: a walk-in rain shower and a carved stone basin under soft niche light.",
  },
  {
    id: "rooftop",
    label: "The Rooftop",
    still: "/journey/leg_7.webp",
    clip: "/journey/leg_7.mp4",
    clipMobile: "/journey/leg_7-lite.mp4",
    accent: "#eae3d7",
    scroll: 3.0, // 36s finale: bath → stair → door onto the roof → terrace dwell
    linger: 0.55,
    eyebrow: "The rooftop",
    title: "Take the high ground.",
    body: "The journey ends above the palms. Availability, pricing and the full RAYA package on request.",
    cta: {
      primary: { label: "Enquire", href: "#enquire" },
      secondary: { label: "The collection", href: "#collection" },
    },
  },
];

export default function JourneyWorld() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = ""; // dev StrictMode double-mount guard — engine has no unmount API
    mountScrollWorld(el, {
      // no `brand` — the site header owns the logo
      nav: false,
      atmosphere: false,
      hint: "Scroll to enter",
      diveScroll: 1.35,
      crossfade: 0.14,
      sections: SECTIONS,
      connectors: SECTIONS.map(() => null).slice(1),
    });

    // Engine assumes it owns the page; fade its fixed layers past the world end.
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
