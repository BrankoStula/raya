"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Split a heading into word spans so it can be written out left → right.
// Runs once per element; the .write-split class arms the hidden initial state
// only after the split exists, so no-JS keeps the text visible.
function splitWords(el: HTMLElement) {
  if (el.classList.contains("write-split")) return;
  const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
  el.textContent = "";
  words.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = "write-word";
    span.textContent = w;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.classList.add("write-split");
}

// Lenis + GSAP ticker sync. Lenis smooths the native window scroll, which is also
// what the scroll-world engine reads — so the world scrub and the DOM reveals share
// one motion source. ScrollTrigger rides the same ticker for [data-reveal] batches.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    // Every scroll animation replays on every entry, from either direction:
    // enter (and enter-back) plays it, leaving in either direction re-arms it.
    const revealIn = (els: Element[]) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        overwrite: true,
      });
    const revealReset = (els: Element[]) => gsap.set(els, { opacity: 0, y: 28 });

    const batch = ScrollTrigger.batch("[data-reveal]", {
      start: "top 86%",
      onEnter: revealIn,
      onEnterBack: revealIn,
      onLeave: revealReset,
      onLeaveBack: revealReset,
    });

    if (reduce) {
      return () => {
        batch.forEach((t) => t.kill());
      };
    }

    // Headings written out word by word, left → right (emmanuelle-style).
    gsap.utils.toArray<HTMLElement>("[data-write]").forEach(splitWords);
    const writeIn = (words: Element[]) =>
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.055,
        overwrite: true,
      });
    const writeReset = (words: Element[]) =>
      gsap.set(words, { opacity: 0, y: "0.4em", filter: "blur(4px)" });
    const writes = ScrollTrigger.batch("[data-write] .write-word", {
      start: "top 88%",
      onEnter: writeIn,
      onEnterBack: writeIn,
      onLeave: writeReset,
      onLeaveBack: writeReset,
    });

    // Gallery frames slide in from their side, then the featured frame pops
    // forward and settles back — a shelf presenting one image.
    const slideIn = (els: Element[]) => {
      gsap.to(els, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: true,
      });
      els.forEach((el) => {
        if (!(el instanceof HTMLElement) || !el.dataset.pop) return;
        gsap
          .timeline({ delay: 0.9 })
          .to(el, {
            scale: 1.045,
            zIndex: 5,
            boxShadow: "0 24px 60px rgba(59,46,36,0.28)",
            duration: 0.45,
            ease: "power2.out",
          })
          .to(el, {
            scale: 1,
            zIndex: 1,
            boxShadow: "0 0 0 rgba(59,46,36,0)",
            duration: 0.6,
            ease: "power3.inOut",
          });
      });
    };
    const slideReset = (els: Element[]) =>
      els.forEach((el) =>
        gsap.set(el, {
          opacity: 0,
          x: (el as HTMLElement).dataset.slide === "right" ? 56 : -56,
          scale: 1,
          boxShadow: "none",
        }),
      );
    const slides = ScrollTrigger.batch("[data-slide]", {
      start: "top 88%",
      onEnter: slideIn,
      onEnterBack: slideIn,
      onLeave: slideReset,
      onLeaveBack: slideReset,
    });

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
    // nav needs the instance for anchor scrolling (plain hash jumps die under
    // the smoothed scroll on the journey's long runway)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // The scroll-world engine sizes its multi-thousand-px runway AFTER mount,
    // shifting every section below it — recompute trigger positions whenever
    // the document actually changes height (guarded so refresh's own pin-spacer
    // adjustments don't loop).
    let lastH = document.body.scrollHeight;
    let refreshT: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 4) return;
      lastH = h;
      clearTimeout(refreshT);
      refreshT = setTimeout(() => ScrollTrigger.refresh(), 250);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      clearTimeout(refreshT);
      gsap.ticker.remove(raf);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
      batch.forEach((t) => t.kill());
      writes.forEach((t) => t.kill());
      slides.forEach((t) => t.kill());
      parallax.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return <>{children}</>;
}
