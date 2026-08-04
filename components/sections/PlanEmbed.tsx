"use client";

import { useState } from "react";

// Planpoint embed with the rbg VillaFloorPlan loading pattern: a quiet loader
// until the iframe fires `load`, then the viewer fades in. Viewport-height
// frame on every breakpoint (aspect ratios starve the viewer on phones).
export default function PlanEmbed({ src, title }: { src: string; title: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative -mx-[var(--container-inset)] mt-12 h-[80vh] overflow-hidden border-y border-espresso/10 shadow-sm md:mx-0 md:h-[85vh] md:border-x">
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-limestone">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-espresso/20 border-t-espresso" />
            <span className="label-caps text-mushroom">Loading the plan…</span>
          </div>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        onLoad={() => setLoading(false)}
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
