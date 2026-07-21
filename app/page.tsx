// app/page.tsx
import ScrollWorld from "@/components/ScrollWorld";
import InquiryForm from "@/components/sections/InquiryForm";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-caps mb-6 text-clay">
      <span className="mr-4 inline-block h-px w-8 bg-clay align-middle" />
      {children}
    </p>
  );
}

const UNITS = [
  { id: "1a", name: "Unit 1A", img: "/renders/unit-1a.jpg", note: "Pool-apartment" },
  { id: "1b", name: "Unit 1B", img: "/renders/unit-1b.jpg", note: "Pool-apartment" },
  { id: "4d", name: "Unit 4D", img: "/renders/unit-4d.jpg", note: "Courtyard villa" },
  { id: "5b", name: "Unit 5B", img: "/renders/unit-5b.jpg", note: "Villa" },
  { id: "5d", name: "Unit 5D", img: "/renders/unit-5d.jpg", note: "Villa" },
];

const MATERIALS = [
  { img: "/materials/limewash-daybreak.jpg", name: "Limewash — Silent Daybreak" },
  { img: "/materials/limewash-sands.jpg", name: "Limewash — Serene Sands" },
  { img: "/materials/deco-wash.jpg", name: "Deco wash — warm mineral" },
];

export default function Home() {
  return (
    <main className="relative">
      {/* ── The scroll world — real renders, scroll as the camera ─────────── */}
      <ScrollWorld />

      {/* ── The collection ────────────────────────────────────────────────── */}
      <section id="collection" className="px-[var(--section-px)] py-28">
        <div className="mx-auto max-w-5xl">
          <div data-reveal className="max-w-xl">
            <Eyebrow>The collection</Eyebrow>
            <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
              A private enclave in the palms.
            </h2>
            <p className="mt-6 leading-relaxed text-limestone/70" style={{ fontSize: "var(--text-lead)" }}>
              Villas and managed pool-apartments arranged around a shared green
              spine — each with its own pool, terrace and the Bukit&apos;s quiet at
              the door.
            </p>
          </div>
          <div data-reveal className="mt-12 grid gap-4 md:grid-cols-2">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/renders/masterplan-aerial.jpg"
              alt="RAYA masterplan — aerial view of the collection"
              loading="lazy"
              className="h-full w-full object-cover md:row-span-2"
            />
            <img
              src="/renders/development-aerial.jpg"
              alt="Aerial three-quarter view of the RAYA development"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
            <img
              src="/renders/facade.jpg"
              alt="RAYA facades between the palms"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* ── The residences ───────────────────────────────────────────────── */}
      <section id="units" className="px-[var(--section-px)] py-28">
        <div className="mx-auto max-w-5xl">
          <div data-reveal className="max-w-xl">
            <Eyebrow>The residences</Eyebrow>
            <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
              Five ways to hold the high ground.
            </h2>
            <p className="mt-6 leading-relaxed text-limestone/70" style={{ fontSize: "var(--text-lead)" }}>
              From managed one-bedroom pool-apartments to full villas. Final
              typologies, plans and pricing on request.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {UNITS.map((u) => (
              <figure key={u.id} data-reveal className="group overflow-hidden border border-limestone/10 bg-espresso/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u.img}
                  alt={`${u.name} — interior render`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="flex items-baseline justify-between p-5">
                  <span className="font-display text-xl text-limestone">{u.name}</span>
                  <span className="label-caps text-mushroom">{u.note}</span>
                </figcaption>
              </figure>
            ))}
            <div data-reveal className="flex flex-col justify-center border border-limestone/10 p-8">
              <p className="font-display text-2xl text-limestone">Full unit mix on request.</p>
              <a href="#enquire" className="label-caps mt-6 inline-block text-clay hover:text-limestone">
                Request the package →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials ────────────────────────────────────────────────────── */}
      <section id="materials" className="px-[var(--section-px)] py-28">
        <div className="mx-auto max-w-5xl">
          <div data-reveal className="max-w-xl">
            <Eyebrow>Material truth</Eyebrow>
            <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
              Limewash, timber, stone.
            </h2>
            <p className="mt-6 leading-relaxed text-limestone/70" style={{ fontSize: "var(--text-lead)" }}>
              The palette comes off the cliff itself — mineral washes and warm
              timber, specified from the real sample board.
            </p>
          </div>
          <div data-reveal className="mt-12 grid grid-cols-3 gap-4">
            {MATERIALS.map((m) => (
              <figure key={m.img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt={m.name} loading="lazy" className="aspect-square w-full object-cover" />
                <figcaption className="label-caps mt-3 text-mushroom">{m.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Bukit ────────────────────────────────────────────────────── */}
      <section id="bukit" className="px-[var(--section-px)] py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div data-reveal>
            <Eyebrow>The Bukit</Eyebrow>
            <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
              Everything, within reach.
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 text-limestone/70">
              {[
                ["Bingin Beach", "walk"],
                ["Bambu Fitness", "walk"],
                ["Padang Padang", "5 min"],
                ["Melasti & Dreamland", "10 min"],
                ["Uluwatu Temple", "12 min"],
                ["Ngurah Rai Airport", "45 min"],
              ].map(([place, dist]) => (
                <li key={place} className="flex items-baseline justify-between border-b border-limestone/15 pb-2">
                  <span>{place}</span>
                  <span className="label-caps text-clay">{dist}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bukit/pecatu-map.jpg" alt="Pecatu — the Bukit peninsula, site context" loading="lazy" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── Enquire ──────────────────────────────────────────────────────── */}
      <section id="enquire" className="flex flex-col items-center px-[var(--section-px)] py-28 text-center">
        <div data-reveal className="w-full max-w-xl border border-limestone/10 bg-espresso/85 p-8 sm:p-12">
          <Eyebrow>Enquire</Eyebrow>
          <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
            Take the high ground.
          </h2>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-limestone/70" style={{ fontSize: "var(--text-lead)" }}>
            A limited clifftop collection above Uluwatu. Request availability,
            pricing and the full RAYA package.
          </p>
          <div className="mt-10">
            <InquiryForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-limestone/10 px-[var(--section-px)] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 text-limestone/40 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/raya-wordmark.svg" alt="RAYA" className="h-5 opacity-60 invert" />
          <span className="label-caps">Bingin · Uluwatu · Bali</span>
          <span className="label-caps">A Royal Bali Group project</span>
        </div>
      </footer>
    </main>
  );
}
