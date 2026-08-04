"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MapboxMap, { RAYA_CENTER, type Camera, type POI } from "@/components/ui/MapboxMap";

// The Bukit as the rbg broker presentation tells it, taken full-bleed: the map
// owns the whole viewport width and stays pinned while the brochure's location
// chapters scroll over it as floating cards. Clicking a place draws the real
// driving route; places with a real photograph swap it into the film strip.

const POIS: POI[] = [
  { label: "RAYA", longitude: 115.1223944, latitude: -8.8100574, type: "project" },
  { label: "Bambu Fitness", longitude: 115.118, latitude: -8.8058, type: "gym" },
  { label: "Alchemy Yoga", longitude: 115.1155, latitude: -8.8175, type: "gym" },
  { label: "New Kuta Golf", longitude: 115.1286, latitude: -8.8062, type: "beach" },
  { label: "Bingin", longitude: 115.111, latitude: -8.8085, type: "surf" },
  { label: "Dreamland", longitude: 115.1174, latitude: -8.7962, type: "beach" },
  { label: "Padang Padang", longitude: 115.1036, latitude: -8.8107, type: "surf" },
  { label: "Suluban · Single Fin", longitude: 115.0885, latitude: -8.8153, type: "surf" },
  { label: "El Kabron", longitude: 115.1053, latitude: -8.8079, type: "restaurant" },
  { label: "The Cashew Tree", longitude: 115.112, latitude: -8.8043, type: "restaurant" },
  { label: "Drifter Cafe", longitude: 115.101, latitude: -8.8123, type: "restaurant" },
  { label: "Uluwatu Temple", longitude: 115.0849, latitude: -8.8291, type: "temple" },
  { label: "Six Senses Uluwatu", longitude: 115.1122, latitude: -8.8478, type: "resort" },
  { label: "Bvlgari Resort", longitude: 115.1219, latitude: -8.8472, type: "resort" },
  { label: "Alila Villas Uluwatu", longitude: 115.1621, latitude: -8.8492, type: "resort" },
  { label: "Ngurah Rai Airport", longitude: 115.1672, latitude: -8.7482, type: "airport" },
];

// One line per place; real photographs where a good freely-licensed one exists.
const POI_META: Record<string, { desc: string; img?: string; credit?: string; fit?: "contain" }> = {
  "Bambu Fitness": { desc: "Thirteen thousand square feet. CrossFit, ice baths, a panoramic sauna." },
  "Alchemy Yoga": { desc: "Classes daily, on the five elements. Ice bath, sauna and cafe." },
  "New Kuta Golf": { desc: "The links above Dreamland, tee times all week." },
  Bingin: {
    desc: "The wave below the plateau; stairs down the cliff.",
    img: "/pois/bingin.jpg",
    credit: "photo Wokshots · CC BY-SA 4.0",
  },
  Dreamland: {
    desc: "Swimmable sand next door.",
    img: "/pois/dreamland.jpg",
    credit: "photo gbuschner · CC BY-SA 3.0",
  },
  "Padang Padang": {
    desc: "The famous left off the Labuansait road.",
    img: "/pois/padang-padang.jpg",
    credit: "photo Alexey Komarov · CC BY 3.0",
  },
  "Suluban · Single Fin": {
    desc: "Sunset sessions above the cave.",
    img: "/pois/suluban.jpg",
    credit: "photo tigoretagore · CC BY-SA 3.0",
  },
  "El Kabron": {
    desc: "Spanish cliff club: paella, cava, a sunset pool.",
    img: "/pois/el-kabron.jpg",
    credit: "photo TidalPush · CC BY-ND (unmodified)",
    fit: "contain",
  },
  "The Cashew Tree": { desc: "Garden kitchen in the Bingin lanes." },
  "Drifter Cafe": { desc: "Surf shop, gallery and cafe on the Padang road." },
  "Uluwatu Temple": {
    desc: "The clifftop pura at the end of the same road; kecak at dusk.",
    img: "/pois/uluwatu-temple.jpg",
    credit: "photo Jenn Evelyn-Ann · CC0",
  },
  "Six Senses Uluwatu": {
    desc: "Cliff-edge resort on the Uluwatu headland.",
    img: "/pois/six-senses.jpg",
    credit: "photo u07ch · CC BY",
  },
  "Bvlgari Resort": {
    desc: "The Italian house on the southern cliff.",
    img: "/pois/bvlgari.jpg",
    credit: "photo Forgemind ArchiMedia · CC BY",
  },
  "Alila Villas Uluwatu": {
    desc: "Cliff-edge modernism above the Melasti stretch.",
    img: "/pois/melasti.jpg",
    credit: "photo Bayu Stiawan · CC BY-SA 4.0",
  },
  "Ngurah Rai Airport": {
    desc: "Door to door in under an hour.",
    img: "/pois/airport.jpg",
    credit: "photo JuneAugust · CC BY-SA 4.0",
  },
};

// Credits for photographs used as chapter defaults.
const PHOTO_CREDITS: Record<string, string> = {
  "/pois/bingin.jpg": "photo Wokshots · CC BY-SA 4.0",
  "/pois/uluwatu-temple.jpg": "photo Jenn Evelyn-Ann · CC0",
};

type Sub = {
  id: string;
  kicker: string;
  title: string;
  copy: string;
  items: [string, string][]; // [POI label, distance note]
  camera: Camera;
  img: string;
  imgAlt: string;
};

// Chapters, copy and figures from brochure section 01.
const SUBS: Sub[] = [
  {
    id: "day",
    kicker: "The day",
    title: "A day that holds together.",
    copy: "People come to the Bukit for the surf. It is not the reason they stay. By eight the salt is off and the work begins: a gym, a yoga studio and the golf links inside minutes of the gate.",
    items: [
      ["Bambu Fitness", "0.93 km · 2 min"],
      ["Alchemy Yoga", "1.13 km · 2–3 min"],
      ["New Kuta Golf", "0.71 km · 3–6 min"],
    ],
    camera: { longitude: 115.12, latitude: -8.8095, zoom: 13.4, pitch: 45, bearing: -12 },
    img: "/renders/villa-rooftop.jpg",
    imgAlt: "Villa rooftop terrace in the morning",
  },
  {
    id: "beaches",
    kicker: "The beaches",
    title: "The break below the plateau.",
    copy: "Bingin under the cliff, Dreamland's swimmable sand next door, Padang Padang up the road. Suluban and Single Fin hold the sunset.",
    items: [
      ["Bingin", "1.14 km"],
      ["Dreamland", "1.28 km"],
      ["Padang Padang", "2.07 km"],
      ["Suluban · Single Fin", "3.79 km"],
    ],
    camera: { longitude: 115.104, latitude: -8.808, zoom: 13, pitch: 50, bearing: 18 },
    img: "/pois/bingin.jpg",
    imgAlt: "Bingin — the break below the plateau",
  },
  {
    id: "table",
    kicker: "The table",
    title: "Dinner is a short drive.",
    copy: "El Kabron on the cliff for sunset, The Cashew Tree in the Bingin lanes, Drifter on the Padang Padang road. All of it inside a few minutes.",
    items: [
      ["El Kabron", "5–8 min"],
      ["The Cashew Tree", "3–5 min"],
      ["Drifter Cafe", "4–6 min"],
    ],
    camera: { longitude: 115.108, latitude: -8.809, zoom: 13.2, pitch: 45, bearing: -8 },
    img: "/renders/apt-kitchen2.jpg",
    imgAlt: "Apartment kitchen island under woven pendants",
  },
  {
    id: "neighbours",
    kicker: "The neighbours",
    title: "The ceiling of the corridor.",
    copy: "Six Senses. Bvlgari. Alila. Three cliff-edge operators inside the same corridor. They set the ceiling on this stretch of the Bukit. The temple sits at the end of the same road; the airport is under an hour.",
    items: [
      ["Six Senses Uluwatu", "cliff edge"],
      ["Bvlgari Resort", "cliff edge"],
      ["Alila Villas Uluwatu", "cliff edge"],
      ["Uluwatu Temple", "12 min"],
      ["Ngurah Rai Airport", "40–50 min"],
    ],
    camera: { longitude: 115.128, latitude: -8.828, zoom: 11.4, pitch: 40, bearing: 0 },
    img: "/pois/uluwatu-temple.jpg",
    imgAlt: "Pura Luhur Uluwatu on the cliff edge",
  },
];

export default function LocationSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);

  // Scroll drives the chapter. The observer only signals "something moved";
  // the winner is the block nearest the viewport centre — edge-flapping at the
  // margin band must not re-fire (it was resetting the selected POI).
  useEffect(() => {
    const pick = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== activeRef.current) {
        activeRef.current = best;
        setActiveIdx(best);
        setSelected(null);
      }
    };
    const io = new IntersectionObserver(pick, { rootMargin: "-35% 0px -35% 0px" });
    blockRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const active = SUBS[activeIdx];

  // Film strip slides: the chapter image plus every place in the chapter with
  // a real photograph. A manual swipe wins for the current chapter; otherwise
  // selecting a place with a photo pulls its slide forward. All derived — no
  // state resets needed on chapter change.
  const slides = useMemo(() => {
    const list: { img: string; caption: string; credit: string | null; fit?: "contain" }[] = [
      {
        img: active.img,
        caption: active.imgAlt,
        credit: PHOTO_CREDITS[active.img] ?? null,
      },
    ];
    active.items.forEach(([label]) => {
      const m = POI_META[label];
      if (m?.img && m.img !== active.img)
        list.push({ img: m.img, caption: `${label} — ${m.desc}`, credit: m.credit ?? null, fit: m.fit });
    });
    return list;
  }, [active]);
  const [manual, setManual] = useState<{ chapter: number; idx: number } | null>(null);
  const touchX = useRef(0);
  const selSlide = selected
    ? slides.findIndex((s) => s.img === POI_META[selected]?.img)
    : -1;
  const slideIdx =
    manual?.chapter === activeIdx
      ? Math.min(manual.idx, slides.length - 1)
      : selSlide >= 0
        ? selSlide
        : 0;
  const step = (d: number) =>
    setManual({ chapter: activeIdx, idx: (slideIdx + d + slides.length) % slides.length });
  const select = (label: string | null) => {
    setSelected(label);
    setManual(null);
  };

  // Selecting a place frames the midpoint between it and RAYA (rbg camera rule).
  const camera = useMemo<Camera>(() => {
    if (selected) {
      const poi = POIS.find((p) => p.label === selected);
      if (poi) {
        return {
          longitude: (poi.longitude + RAYA_CENTER.longitude) / 2,
          latitude: (poi.latitude + RAYA_CENTER.latitude) / 2,
          zoom: poi.type === "airport" ? 10.8 : poi.type === "resort" ? 12 : 13,
          pitch: 35,
          bearing: 0,
        };
      }
    }
    return active.camera;
  }, [selected, active]);

  const chip = (label: string, dist: string) => {
    const on = selected === label;
    return (
      <li key={label}>
        <button
          type="button"
          onClick={() => select(on ? null : label)}
          className={`w-full border-b py-2.5 text-left transition-colors ${
            on
              ? "border-espresso/40"
              : "border-espresso/10 hover:border-espresso/25"
          }`}
        >
          <span className="flex items-baseline justify-between">
            <span className={on ? "text-espresso" : "text-walnut"}>{label}</span>
            <span className="label-caps text-mushroom">{on ? "route ↦" : dist}</span>
          </span>
          <span className="mt-0.5 block text-sm text-mushroom">
            {POI_META[label]?.desc}
          </span>
        </button>
      </li>
    );
  };

  const chrome = (
    <>
      <div className="pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2 border border-espresso/10 bg-bone/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-espresso">
          {String(activeIdx + 1).padStart(2, "0")} / {String(SUBS.length).padStart(2, "0")}
        </span>
      </div>
      {selected && (
        <div className="pointer-events-none absolute right-5 top-24 z-10 bg-clay px-3 py-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-espresso">
            {selected}
          </span>
        </div>
      )}
    </>
  );

  return (
    <section id="bukit" className="relative z-10 -mt-[38vh] bg-bone pt-24">
      {/* section header */}
      <div className="px-[var(--container-inset)]">
        <p className="label-caps mb-6 text-mushroom">
          <span className="mr-4 inline-block h-px w-8 bg-clay align-middle" />
          01 · The Bukit
        </p>
        <h2
          data-write
          className="max-w-3xl font-display text-espresso"
          style={{ fontSize: "var(--text-h1)" }}
        >
          Where it sits is the asset.
        </h2>
      </div>

      {/* ── desktop: full-bleed pinned map, chapter cards scroll over it ───── */}
      <div className="relative mt-10 hidden lg:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden border-y border-espresso/10">
          <MapboxMap pois={POIS} camera={camera} selected={selected} onSelect={select} />
          {chrome}

          {/* film strip — swipeable carousel of the chapter's places */}
          <div className="absolute bottom-6 right-6 z-10 w-[30rem] border border-espresso/10 bg-bone shadow-xl">
            <div
              className="relative h-60 overflow-hidden"
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
              }}
            >
              <div
                className="flex h-full transition-transform duration-700"
                style={{
                  transform: `translateX(-${slideIdx * 100}%)`,
                  transitionTimingFunction: "var(--ease-cine)",
                }}
              >
                {slides.map((s2) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s2.img}
                    src={s2.img}
                    alt={s2.caption}
                    loading="lazy"
                    className={`h-full w-full shrink-0 ${s2.fit === "contain" ? "bg-espresso/90 object-contain" : "object-cover"}`}
                  />
                ))}
              </div>
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => step(-1)}
                    className="group absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-espresso/15 bg-bone/90 text-espresso shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-espresso hover:text-bone"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-px transition-transform duration-300 group-hover:-translate-x-0.5">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => step(1)}
                    className="group absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-espresso/15 bg-bone/90 text-espresso shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-espresso hover:text-bone"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="translate-x-px transition-transform duration-300 group-hover:translate-x-0.5">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="flex items-baseline justify-between gap-4 px-4 py-3">
              <div className="min-w-0">
                <p className="label-caps truncate text-espresso">{slides[slideIdx]?.caption}</p>
                {slides[slideIdx]?.credit && (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mushroom">
                    {slides[slideIdx].credit}
                  </p>
                )}
              </div>
              {slides.length > 1 && (
                <span className="label-caps shrink-0 text-mushroom">
                  {slideIdx + 1} / {slides.length}
                </span>
              )}
            </div>
          </div>

          {/* chapter dot rail */}
          <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
            {SUBS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Chapter ${i + 1} — ${s.kicker}`}
                onClick={() =>
                  blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className="group flex h-5 w-5 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "h-7 w-1.5 bg-clay"
                      : "h-2 w-1 bg-espresso/25 group-hover:h-3 group-hover:bg-espresso/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* chapter cards ride over the pinned map */}
        <div className="pointer-events-none relative z-10 -mt-[100vh]">
          {SUBS.map((sub, i) => (
            <div
              key={sub.id}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="flex min-h-screen items-center pl-[var(--container-inset)]"
            >
              <div className="pointer-events-auto w-[26rem] border border-espresso/10 bg-bone/90 p-8 shadow-xl backdrop-blur-md">
                <p className="label-caps text-mushroom">{sub.kicker}</p>
                <h3
                  className="mt-3 font-display text-espresso"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {sub.title}
                </h3>
                <p className="mt-4 leading-relaxed text-walnut">{sub.copy}</p>
                <ul className="mt-5">{sub.items.map(([l, d]) => chip(l, d))}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── mobile: pills, map, chapter content ────────────────────────────── */}
      <div className="mt-8 lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-[var(--container-inset)] pb-4">
          {SUBS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                activeRef.current = i;
                setActiveIdx(i);
                setSelected(null);
              }}
              className={`label-caps shrink-0 border px-4 py-2 transition-colors ${
                i === activeIdx
                  ? "border-espresso bg-espresso text-bone"
                  : "border-espresso/20 text-walnut"
              }`}
            >
              {s.kicker}
            </button>
          ))}
        </div>
        <div className="relative h-[45vh] min-h-[350px] border-y border-espresso/10">
          <MapboxMap pois={POIS} camera={camera} selected={selected} onSelect={select} />
        </div>
        <div className="px-[var(--container-inset)] pb-4 pt-8">
          <h3 className="font-display text-espresso" style={{ fontSize: "var(--text-h2)" }}>
            {active.title}
          </h3>
          <p className="mt-4 leading-relaxed text-walnut">{active.copy}</p>
          <ul className="mt-6">{active.items.map(([l, d]) => chip(l, d))}</ul>
        </div>
      </div>
    </section>
  );
}
