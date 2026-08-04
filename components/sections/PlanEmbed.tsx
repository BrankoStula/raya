"use client";

import { useEffect, useRef, useState } from "react";

// Planpoint embed in `embed=grow` mode. Two-way protocol with the viewer:
// it posts its rendered height (`rbg-plan-height`) and the frame takes exactly
// that space; the host posts its viewport (`rbg-host-viewport`) back so unit
// sheets inside the plan can fill the visitor's real window (rbg PR #278).
// 600px is only the pre-load placeholder; a quiet loader covers the boot.
export default function PlanEmbed({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
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

    const sendViewport = () => {
      const f = frameRef.current;
      if (!f?.contentWindow) return;
      f.contentWindow.postMessage(
        {
          type: "rbg-host-viewport",
          height: window.innerHeight,
          top: f.getBoundingClientRect().top,
        },
        "*", // viewport info only — matches the rbg embed spec; fires before the lazy frame navigates
      );
    };
    window.addEventListener("resize", sendViewport, { passive: true });
    window.addEventListener("scroll", sendViewport, { passive: true });
    const interval = setInterval(sendViewport, 1500);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", sendViewport);
      window.removeEventListener("scroll", sendViewport);
      clearInterval(interval);
    };
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
        ref={frameRef}
        src={src}
        title={title}
        onLoad={() => {
          setLoading(false);
          frameRef.current?.contentWindow?.postMessage(
            {
              type: "rbg-host-viewport",
              height: window.innerHeight,
              top: frameRef.current.getBoundingClientRect().top,
            },
            "https://www.royalbaligroup.com",
          );
        }}
        className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
