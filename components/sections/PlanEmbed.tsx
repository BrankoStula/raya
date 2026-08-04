"use client";

import { useEffect, useState } from "react";

// Planpoint embed in `embed=grow` mode: the viewer posts its rendered height
// (`rbg-plan-height`) and the frame takes exactly that space — no inner
// scrolling at any breakpoint. 600px is only the pre-load placeholder. A quiet
// loader covers the boot, then the viewer fades in (rbg VillaFloorPlan pattern).
export default function PlanEmbed({ src, title }: { src: string; title: string }) {
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://www.royalbaligroup.com") return;
      if (e.data?.type === "rbg-plan-height" && typeof e.data.height === "number") {
        setHeight(Math.max(420, Math.round(e.data.height)));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      className="relative -mx-[var(--container-inset)] mt-12 overflow-hidden border-y border-espresso/10"
      style={{ height, transition: "height 0.45s var(--ease-cine)" }}
    >
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
