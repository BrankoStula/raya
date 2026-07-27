"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The scroll film, rebuilt for stills: DEV 10 has renders but no clips, so each
// chapter is a full-viewport render with a scroll-scrubbed Ken Burns drift and a
// crossfade into the next — sticky stage, one scrubbed timeline, no video decode.
type Chapter = {
  id: string;
  img: string;
  position?: string; // object-position art direction (portrait sources on wide screens)
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  cta?: boolean;
};

const CHAPTERS: Chapter[] = [
  {
    id: "arrival",
    img: "/chapters/arrival.jpg",
    position: "center 30%",
    eyebrow: "Bingin · Uluwatu · Bali",
    title: "Above the surf. Above the crowd.",
    body: "A villa & managed pool-apartment collection on the high ground of Uluwatu — ten villas and an apartment house in the palms.",
    tags: ["25-yr leasehold", "Fully managed"],
  },
  {
    id: "pool",
    img: "/chapters/pool.jpg",
    eyebrow: "The pool",
    title: "A private line of water.",
    body: "Every residence keeps its own pool — a quiet green-tiled line between the walls, palms overhead.",
  },
  {
    id: "living",
    img: "/chapters/living.jpg",
    eyebrow: "The living",
    title: "Room for the long stay.",
    body: "Limewash, timber and linen — a sunken lounge built for a month on the Bukit, not a week.",
  },
  {
    id: "kitchen",
    img: "/chapters/kitchen.jpg",
    eyebrow: "The kitchen",
    title: "Built for slow evenings.",
    body: "A long island under warm light, teak joinery, and dinner that takes its time.",
  },
  {
    id: "bedroom",
    img: "/chapters/bedroom.jpg",
    eyebrow: "The bedroom",
    title: "Stillness, by design.",
    body: "Morning light through sheer linen. The swell is minutes away; the quiet is at the door.",
  },
  {
    id: "house",
    img: "/chapters/house.jpg",
    eyebrow: "Golden hour",
    title: "The house lights up.",
    body: "Sunset behind the palms, every window warm — the apartment house at the end of the day.",
  },
  {
    id: "entrance",
    img: "/chapters/entrance.jpg",
    eyebrow: "The address",
    title: "Take the high ground.",
    body: "A limited collection above Uluwatu. Availability, pricing and the full RAYA package on request.",
    cta: true,
  },
];

// Resolved once on the client (stable snapshot for useSyncExternalStore).
let reducedCache: "pending" | "reduce" | "motion" | null = null;
const subscribe = () => () => {};
function getReduced() {
  if (reducedCache && reducedCache !== "pending") return reducedCache;
  reducedCache = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "reduce"
    : "motion";
  return reducedCache;
}

export default function StillWorld() {
  const mode = useSyncExternalStore(subscribe, getReduced, () => "pending" as const);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "motion") return;
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const imgs = gsap.utils.toArray<HTMLElement>("[data-ch-img]", el);
    const copies = gsap.utils.toArray<HTMLElement>("[data-ch-copy]", el);
    const dots = gsap.utils.toArray<HTMLElement>("[data-ch-dot]", el);
    const n = CHAPTERS.length;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate(self) {
          const active = Math.min(n - 1, Math.floor(self.progress * n));
          dots.forEach((d, i) => d.classList.toggle("opacity-100", i === active));
        },
      },
    });

    imgs.forEach((img, i) => {
      const at = i; // one timeline unit per chapter
      if (i > 0) tl.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.22 }, at - 0.11);
      tl.fromTo(
        img.querySelector("img"),
        { scale: 1.06, yPercent: -2 },
        { scale: 1.17, yPercent: 2, duration: i === 0 ? 1.1 : 1.2 },
        Math.max(at - 0.11, 0),
      );
    });

    copies.forEach((copy, i) => {
      tl.fromTo(
        copy,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
        i + (i === 0 ? 0.02 : 0.16),
      );
      if (i < n - 1) tl.to(copy, { opacity: 0, y: -20, duration: 0.1 }, i + 0.8);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [mode]);

  // Reduced motion (or SSR): plain stacked figures, no pin, no scrub.
  if (mode !== "motion") {
    return (
      <div id="top">
        {CHAPTERS.map((c) => (
          <section key={c.id} className="relative flex min-h-screen items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: c.position ?? "center" }}
            />
            <div className="relative z-10 max-w-xl bg-espresso/70 p-8 backdrop-blur-sm m-6">
              <ChapterCopy c={c} />
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div id="top" ref={root} style={{ height: `${CHAPTERS.length * 130}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* image stack — later chapters sit on top and fade in over the previous */}
        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            data-ch-img
            className="absolute inset-0"
            style={{ zIndex: i, opacity: i === 0 ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.img}
              alt=""
              className="h-full w-full object-cover will-change-transform"
              style={{ objectPosition: c.position ?? "center" }}
              loading={i < 2 ? "eager" : "lazy"}
            />
            {/* legibility scrim, stronger at the copy edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-espresso/20" />
          </div>
        ))}

        {/* copy layer */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="w-full px-[var(--section-px)] pb-24">
            <div className="relative max-w-xl">
              {CHAPTERS.map((c, i) => (
                <div
                  key={c.id}
                  data-ch-copy
                  className="absolute bottom-0 left-0 w-full opacity-0"
                >
                  <ChapterCopy c={c} index={i} total={CHAPTERS.length} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* chapter dots */}
        <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
          {CHAPTERS.map((c, i) => (
            <span
              key={c.id}
              data-ch-dot
              className={`h-1.5 w-1.5 rounded-full bg-limestone transition-opacity duration-300 ${
                i === 0 ? "opacity-100" : "opacity-30"
              }`}
            />
          ))}
        </div>

        {/* scroll hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
          <span className="label-caps text-limestone/50">Scroll</span>
        </div>
      </div>
    </div>
  );
}

function ChapterCopy({
  c,
  index,
  total,
}: {
  c: Chapter;
  index?: number;
  total?: number;
}) {
  return (
    <div className="cine-text">
      {index != null && total != null && (
        <p className="label-caps mb-3 text-limestone/50">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      )}
      <p className="label-caps mb-4 text-clay">{c.eyebrow}</p>
      <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
        {c.title}
      </h2>
      <p className="mt-4 max-w-md leading-relaxed text-limestone/80" style={{ fontSize: "var(--text-lead)" }}>
        {c.body}
      </p>
      {c.tags && (
        <div className="mt-5 flex gap-3">
          {c.tags.map((t) => (
            <span key={t} className="label-caps border border-limestone/30 px-4 py-2 text-limestone/80">
              {t}
            </span>
          ))}
        </div>
      )}
      {c.cta && (
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#enquire" className="label-caps bg-limestone px-8 py-4 text-espresso transition-opacity hover:opacity-90">
            Enquire
          </a>
          <a href="#collection" className="label-caps border border-limestone/40 px-8 py-4 text-limestone transition-colors hover:border-limestone">
            The collection
          </a>
        </div>
      )}
    </div>
  );
}
