"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// "A private enclave in the palms" as a pinned horizontal gallery: the section
// pins, the panels track sideways under the scroll, and each render unmasks
// with a clip-path wipe as it crosses the stage. Desktop only — below lg the
// panels stack vertically with the ordinary reveal language.
const PANELS = [
  {
    img: "/renders/bev.jpg",
    caption: "The enclave from above",
    w: "lg:w-[62vw]",
  },
  {
    img: "/renders/facade-front.jpg",
    caption: "The apartment house · Jalan Kapur",
    w: "lg:w-[44vw]",
  },
  {
    img: "/renders/facade-left.jpg",
    caption: "Apartments and the villa row, from the corner",
    w: "lg:w-[54vw]",
  },
  {
    img: "/renders/villa-ext.jpg",
    caption: "The villa lane in the palms",
    w: "lg:w-[44vw]",
  },
];

export default function CollectionShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // each render wipes open as it crosses the stage
      track.querySelectorAll<HTMLElement>(".cs-img").forEach((img) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(0 68% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left 92%",
              end: "left 34%",
              scrub: true,
            },
          },
        );
      });

      // the display heading drifts slower than the panels — layered depth
      const head = root.querySelector<HTMLElement>(".cs-head");
      if (head) {
        gsap.to(head, {
          x: () => -distance() * 0.18,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={rootRef}
      className="relative overflow-hidden bg-bone py-24 lg:h-screen lg:py-0"
    >
      {/* oversized heading layer, drifting over the panels */}
      <div className="cs-head px-[var(--container-inset)] pt-2 lg:absolute lg:left-0 lg:top-16 lg:z-10 lg:w-[120vw] lg:pt-0">
        <p className="label-caps mb-6 text-mushroom">
          <span className="mr-4 inline-block h-px w-8 bg-clay align-middle" />
          02 · The collection
        </p>
        <h2
          data-write
          className="font-display text-espresso"
          style={{ fontSize: "var(--text-h1)" }}
        >
          A private enclave in the palms.
        </h2>
        <p
          data-reveal
          className="mt-5 max-w-xl leading-relaxed text-walnut"
          style={{ fontSize: "var(--text-lead)" }}
        >
          Ten villas and an apartment house share one gated lane in the palms.
          Each home has its own pool. The lane stays quiet.
        </p>
      </div>

      {/* the horizontal track — vertical stack below lg */}
      <div
        ref={trackRef}
        className="mt-12 flex flex-col gap-10 px-[var(--container-inset)] lg:mt-0 lg:h-full lg:flex-row lg:items-end lg:gap-[6vw] lg:pb-16 lg:pr-[40vw] lg:pt-0"
      >
        {PANELS.map((p, i) => (
          <figure
            key={p.img}
            className={`w-full shrink-0 ${p.w} lg:w-auto ${i % 2 === 1 ? "lg:mb-16" : ""}`}
          >
            <div className="cs-img overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-lightbox
                src={p.img}
                alt={p.caption}
                loading="lazy"
                className="cs-panel w-full lg:w-auto lg:max-w-none"
              />
            </div>
            <figcaption className="label-caps mt-4 text-mushroom">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
