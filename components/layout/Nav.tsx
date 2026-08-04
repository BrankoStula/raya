"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "The Collection", href: "#collection" },
  { label: "Residences", href: "#units" },
  { label: "The Bukit", href: "#bukit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false); // past the dark journey, over paper
  const [hidden, setHidden] = useState(false); // hide on scroll down, return on scroll up
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const goingDown = y > lastY.current + 4;
      const goingUp = y < lastY.current - 4;
      if (goingDown && y > 140) setHidden(true);
      else if (goingUp) setHidden(false);
      lastY.current = y;
      const sw = document.querySelector<HTMLElement>(".sw-root");
      setLight(
        sw
          ? y > sw.offsetTop + sw.offsetHeight - window.innerHeight - 8
          : y > 24,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock background scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const ink = light && !open;
  const bar = ink
    ? "bg-bone/85 backdrop-blur-md border-b border-espresso/8"
    : scrolled || open
      ? "bg-espresso/70 backdrop-blur-md"
      : "bg-transparent";
  const text = ink ? "text-espresso" : "text-limestone";
  const linkText = ink
    ? "text-walnut hover:text-espresso"
    : "text-limestone/70 hover:text-limestone";
  const button = ink
    ? "border-espresso/40 text-espresso hover:border-espresso hover:bg-espresso hover:text-bone"
    : "border-limestone/40 text-limestone hover:border-limestone hover:bg-limestone hover:text-espresso";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,transform] duration-500 ${bar} ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
      <nav className="flex items-center justify-between px-[var(--container-inset)] py-5">
        <a
          href="#hero"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ink ? "/brand/raya-monogram.svg" : "/brand/raya-monogram-reversed.svg"}
            alt=""
            aria-hidden
            className="h-8 w-auto"
          />
          <span
            className={`font-display text-xl ${text}`}
            style={{ letterSpacing: "0.3em" }}
          >
            RAYA
          </span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`label-caps transition-colors ${linkText}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#enquire" className={`label-caps border px-5 py-2.5 transition-colors ${button}`}>
            Enquire
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-6 w-7 flex-col justify-center gap-[6px] md:hidden"
        >
          <span
            className={`block h-px w-full transition-transform duration-300 ${
              open || !ink ? "bg-limestone" : "bg-espresso"
            } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-full transition-transform duration-300 ${
              open || !ink ? "bg-limestone" : "bg-espresso"
            } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>
      </header>

      {/* mobile overlay menu — sibling of <header> so the header's backdrop-filter
          doesn't trap this fixed element into the nav-bar's containing block */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-espresso/95 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-limestone"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#enquire"
          onClick={() => setOpen(false)}
          className="label-caps border border-limestone/40 px-8 py-4 text-limestone"
        >
          Enquire
        </a>
      </div>
    </>
  );
}
