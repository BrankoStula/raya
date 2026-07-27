// app/page.tsx
import JourneyWorld from "@/components/JourneyWorld";
import InquiryForm from "@/components/sections/InquiryForm";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-caps mb-6 text-clay">
      <span className="mr-4 inline-block h-px w-8 bg-clay align-middle" />
      {children}
    </p>
  );
}

// Real DEV 10 mix (from the 100 SERIES layout plans): ten villas across four
// layouts, plus an apartment house of five residences. Detail plans on request.
const RESIDENCES = [
  {
    id: "villas",
    name: "The Villas",
    img: "/renders/villa-bedroom.jpg",
    imgAlt: "Villa bedroom — timber headboard wall, soft morning light",
    lead: "Ten private pool-villas across four layouts, each with its own walled garden, plunge pool and roof terrace.",
    facts: ["10 villas", "4 layouts", "Private pools"],
  },
  {
    id: "apartments",
    name: "The Apartments",
    img: "/renders/apt-living.jpg",
    imgAlt: "Apartment living room in warm limewash and timber",
    lead: "An apartment house of five managed residences — corner and mid layouts over three floors, run as a hands-off asset.",
    facts: ["5 residences", "Corner & mid layouts", "Fully managed"],
  },
];

const SCHEMES = [
  { img: "/renders/scheme-light.jpg", name: "Light", note: "pale oak · bone limewash" },
  { img: "/renders/scheme-mid.jpg", name: "Mid", note: "teak · warm mineral" },
  { img: "/renders/scheme-dark.jpg", name: "Dark", note: "walnut · espresso" },
];

const MATERIALS = [
  { img: "/materials/limewash-daybreak.jpg", name: "Limewash — Silent Daybreak" },
  { img: "/materials/limewash-sands.jpg", name: "Limewash — Serene Sands" },
  { img: "/materials/deco-wash.jpg", name: "Deco wash — warm mineral" },
];

export default function Home() {
  return (
    <main className="relative">
      {/* ── The villa journey — one continuous AI camera flight, scrubbed by
             scroll, anchored on the real DEV 10 renders ─────────────────────── */}
      <JourneyWorld />

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
              src="/renders/bev.jpg"
              alt="RAYA — bird's-eye view of the collection in the palms"
              loading="lazy"
              className="h-full w-full object-cover md:row-span-2"
            />
            <img
              src="/renders/facade-front.jpg"
              alt="The apartment house at dusk — lit windows behind the planting"
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
            <img
              src="/renders/facade-left.jpg"
              alt="The villa row — ivy walls and double-height glazing"
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
              Two ways to hold the high ground.
            </h2>
            <p className="mt-6 leading-relaxed text-limestone/70" style={{ fontSize: "var(--text-lead)" }}>
              Ten pool-villas and an apartment house of five managed residences.
              Layout plans and pricing on request.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {RESIDENCES.map((r) => (
              <figure key={r.id} data-reveal className="group overflow-hidden border border-limestone/10 bg-espresso/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.img}
                  alt={r.imgAlt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <figcaption className="p-6">
                  <span className="font-display text-2xl text-limestone">{r.name}</span>
                  <p className="mt-3 leading-relaxed text-limestone/70">{r.lead}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {r.facts.map((f) => (
                      <span key={f} className="label-caps text-clay">{f}</span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* three interior schemes, straight from the DEV 10 render set */}
          <div data-reveal className="mt-16">
            <p className="label-caps mb-6 text-mushroom">Three interior schemes</p>
            <div className="grid grid-cols-3 gap-4">
              {SCHEMES.map((s) => (
                <figure key={s.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={`${s.name} interior scheme`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <figcaption className="mt-3">
                    <span className="font-display text-lg text-limestone">{s.name}</span>
                    <span className="label-caps ml-3 text-mushroom">{s.note}</span>
                  </figcaption>
                </figure>
              ))}
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
