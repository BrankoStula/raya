"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// "Two ways to hold the high ground" as the vertical sibling of the pinned
// collection gallery: the stage pins and the apartments panel wipes up over
// the villas panel with a clip-path curtain while its image settles into
// place. Below lg (or reduced motion) the two cards simply stack.
const ITEMS = [
  {
    id: "villas",
    name: "The Villas",
    img: "/renders/villa-bedroom.jpg",
    imgAlt: "Villa bedroom — timber headboard wall, soft morning light",
    lead: "Ten two-bedroom pool villas in five mirrored pairs. 204 m² over three levels, each with a walled garden, a private pool and a roof terrace.",
    facts: ["2 bedrooms · 3 levels", "Private pools", "US$499,900 · furnished"],
  },
  {
    id: "apartments",
    name: "The Apartments",
    img: "/renders/apt-living.jpg",
    imgAlt: "Apartment kitchen and living opening to the pool courtyard",
    lead: "Eight one-bedroom apartments over three storeys at the road frontage, behind a staffed lobby. Ground-floor plans come with a private pool courtyard.",
    facts: ["8 residences", "Staffed lobby", "From US$169,900 · furnished"],
  },
];

export default function ResidencesShowcase() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = stageRef.current;
      if (!stage) return;
      const panel = stage.querySelector<HTMLElement>(".rs-panel-1");
      const img = stage.querySelector<HTMLElement>(".rs-panel-1 .rs-img");
      const copy = stage.querySelector<HTMLElement>(".rs-panel-1 .rs-copy");
      if (!panel || !img || !copy) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(self.progress > 0.5 ? 1 : 0),
          },
        })
        .fromTo(
          panel,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
        )
        .fromTo(img, { yPercent: -14 }, { yPercent: 0, ease: "none", duration: 1 }, 0)
        .fromTo(copy, { y: 80 }, { y: 0, ease: "none", duration: 1 }, 0);
    });

    return () => mm.revert();
  }, []);

  const panel = (item: (typeof ITEMS)[number], i: number) => (
    <div
      key={item.id}
      className={`lg:absolute lg:inset-0 ${i === 1 ? "rs-panel-1 lg:z-10" : ""}`}
      style={i === 1 ? { clipPath: undefined } : undefined}
    >
      <div className="grid h-full border border-espresso/10 bg-bone lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-lightbox
            src={item.img}
            alt={item.imgAlt}
            loading="lazy"
            className="rs-img h-full w-full object-cover"
          />
        </div>
        <div className="rs-copy flex flex-col justify-center bg-white/45 p-8 lg:p-16">
          <p className="label-caps text-mushroom">
            {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-espresso" style={{ fontSize: "var(--text-h2)" }}>
            {item.name}
          </h3>
          <p className="mt-5 max-w-md leading-relaxed text-walnut">{item.lead}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {item.facts.map((f) => (
              <span key={f} className="label-caps text-mushroom">{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="max-w-xl">
        <p className="label-caps mb-6 text-mushroom">
          <span className="mr-4 inline-block h-px w-8 bg-clay align-middle" />
          03 · The residences
        </p>
        <h2
          data-write
          className="font-display text-espresso"
          style={{ fontSize: "var(--text-h1)" }}
        >
          Two ways to hold the high ground.
        </h2>
        <p data-reveal className="mt-6 leading-relaxed text-walnut" style={{ fontSize: "var(--text-lead)" }}>
          One arrival, eighteen residences: ten pool villas and eight managed
          apartments, delivered furnished. Visa, PT PMA and land tax are part
          of the price.
        </p>
      </div>

      {/* pinned stage on lg; plain stack below */}
      <div
        ref={stageRef}
        className="relative mt-14 flex flex-col gap-6 lg:block lg:h-[76vh] lg:gap-0"
      >
        {ITEMS.map(panel)}

        {/* stage progress dots */}
        <div className="absolute -right-1 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {ITEMS.map((it, i) => (
            <span
              key={it.id}
              className={`block rounded-full transition-all duration-300 ${
                i === active ? "h-7 w-1.5 bg-clay" : "h-2 w-1 bg-espresso/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
