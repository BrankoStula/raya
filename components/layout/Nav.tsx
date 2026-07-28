"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "The Collection", href: "#collection" },
  { label: "Residences", href: "#units" },
  { label: "The Bukit", href: "#bukit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-espresso/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
      <nav className="flex items-center justify-between px-[var(--container-inset)] py-5">
        <a
          href="#hero"
          className="font-display text-limestone text-xl"
          style={{ letterSpacing: "0.3em" }}
          onClick={() => setOpen(false)}
        >
          RAYA
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="label-caps text-limestone/70 transition-colors hover:text-limestone"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#enquire"
            className="label-caps border border-limestone/40 px-5 py-2.5 text-limestone transition-colors hover:border-limestone hover:bg-limestone hover:text-espresso"
          >
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
            className={`block h-px w-full bg-limestone transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-full bg-limestone transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
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
