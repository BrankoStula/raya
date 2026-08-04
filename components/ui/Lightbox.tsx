"use client";

import { useEffect, useState } from "react";

// Fullscreen viewer for any gallery image. Event delegation on [data-lightbox]
// imgs keeps page.tsx a server component — no per-image client wrappers.
export default function Lightbox() {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.("img[data-lightbox]");
      if (!(t instanceof HTMLImageElement)) return;
      e.preventDefault();
      setImg({ src: t.currentSrc || t.src, alt: t.alt });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setImg(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = img ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [img]);

  if (!img) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={img.alt || "Image"}
      onClick={() => setImg(null)}
      className="fixed inset-0 z-[90] flex cursor-zoom-out flex-col items-center justify-center bg-espresso/95 p-6 backdrop-blur-sm sm:p-12"
      style={{ animation: "lightbox-in 0.35s var(--ease-cine)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        className="max-h-[84vh] max-w-full object-contain shadow-2xl"
      />
      {img.alt ? (
        <p className="label-caps mt-5 max-w-3xl text-center text-limestone/70">
          {img.alt}
        </p>
      ) : null}
      <button
        type="button"
        aria-label="Close"
        onClick={() => setImg(null)}
        className="label-caps absolute right-6 top-6 border border-limestone/40 px-4 py-2 text-limestone transition-colors hover:border-limestone"
      >
        Close
      </button>
    </div>
  );
}
