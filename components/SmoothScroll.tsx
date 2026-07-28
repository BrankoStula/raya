"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lenis + GSAP ticker sync. Lenis smooths the native window scroll, which is also
// what the scroll-world engine reads — so the world scrub and the DOM reveals share
// one motion source. ScrollTrigger rides the same ticker for [data-reveal] batches.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    // Reveal-on-enter for any [data-reveal] element (cheap, batched).
    const batch = ScrollTrigger.batch("[data-reveal]", {
      start: "top 86%",
      onEnter: (els) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: true,
        }),
    });

    if (reduce) {
      return () => {
        batch.forEach((t) => t.kill());
      };
    }

    // Emmanuelle-style parallax: any [data-parallax] image drifts inside its
    // overflow-hidden wrapper while it crosses the viewport. Overscaled so the
    // drift never exposes edges.
    const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]").map((img) =>
      gsap.fromTo(
        img,
        { yPercent: -9, scale: 1.18 },
        {
          yPercent: 9,
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      ),
    );

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      batch.forEach((t) => t.kill());
      parallax.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return <>{children}</>;
}
