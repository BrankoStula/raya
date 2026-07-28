// app/page.tsx
import JourneyWorld from "@/components/JourneyWorld";
import InquiryForm from "@/components/sections/InquiryForm";
import MapboxMap, { type POI } from "@/components/ui/MapboxMap";

// Approximate POI coordinates around the Bingin clifftop (site pin is exact).
const POIS: POI[] = [
  { label: "RAYA", longitude: 115.1223944, latitude: -8.8100574, type: "project" },
  { label: "Bingin Beach", longitude: 115.111, latitude: -8.8085, type: "surf" },
  { label: "Padang Padang", longitude: 115.1036, latitude: -8.8107, type: "surf" },
  { label: "Bambu Fitness", longitude: 115.118, latitude: -8.8058, type: "gym" },
  { label: "Uluwatu Temple", longitude: 115.0849, latitude: -8.8291, type: "temple" },
  { label: "Dreamland Beach", longitude: 115.1174, latitude: -8.7962, type: "beach" },
  { label: "Melasti Beach", longitude: 115.1605, latitude: -8.848, type: "beach" },
  { label: "Ngurah Rai Airport", longitude: 115.1672, latitude: -8.7482, type: "airport" },
];

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

      {/* ── The Bukit — map first after the journey; pulled up over the world's
             fade-out band so there's no dead scroll (Ignite-style handoff) ──── */}
      <section
        id="bukit"
        className="relative z-10 -mt-[38vh] bg-espresso pb-28 pt-24"
      >
        {/* map bleeds to the right viewport edge — luxury full-width language */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(24rem,2fr)_3fr]">
          <div data-reveal className="pl-[var(--container-inset)] pr-[var(--container-inset)] lg:pr-0">
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
          <div data-reveal className="h-[480px] overflow-hidden border-y border-l border-limestone/10 lg:h-[640px]">
            <MapboxMap pois={POIS} />
          </div>
        </div>
      </section>

      {/* ── The collection ────────────────────────────────────────────────── */}
      <section id="collection" className="px-[var(--container-inset)] py-28">
        <div className="w-full">
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
            <div className="overflow-hidden md:row-span-2">
              <img
                data-parallax
                src="/renders/bev.jpg"
                alt="RAYA — bird's-eye view of the collection in the palms"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/2] overflow-hidden">
              <img
                data-parallax
                src="/renders/facade-front.jpg"
                alt="The apartment house at dusk — lit windows behind the planting"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/2] overflow-hidden">
              <img
                data-parallax
                src="/renders/facade-left.jpg"
                alt="The villa row — ivy walls and double-height glazing"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* ── The residences ───────────────────────────────────────────────── */}
      <section id="units" className="px-[var(--container-inset)] py-28">
        <div className="w-full">
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
              <figure key={r.id} data-reveal className="border border-limestone/10 bg-espresso/60">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-parallax
                    src={r.img}
                    alt={r.imgAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
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

          {/* the villa in photos — full render set from the design team */}
          <div data-reveal className="mt-16">
            <p className="label-caps mb-6 text-mushroom">Inside the villa</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { img: "/renders/villa-ext.jpg", alt: "Villa row exterior between the palms" },
                { img: "/renders/villa-entrance.jpg", alt: "Villa entrance — timber screen and stone" },
                { img: "/renders/villa-pool.jpg", alt: "Villa plunge pool with stepping pads" },
                { img: "/renders/villa-living.jpg", alt: "Villa living room in limewash and linen" },
                { img: "/renders/villa-bed2.jpg", alt: "Villa bedroom with woven pendant light" },
                { img: "/renders/villa-rooftop.jpg", alt: "Villa rooftop terrace under a timber ceiling" },
              ].map((g) => (
                <div key={g.img} className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-parallax
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* three interior schemes, straight from the DEV 10 render set */}
          <div data-reveal className="mt-16">
            <p className="label-caps mb-6 text-mushroom">Three interior schemes</p>
            <div className="grid grid-cols-3 gap-4">
              {SCHEMES.map((s) => (
                <figure key={s.name}>
                  <div className="aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      data-parallax
                      src={s.img}
                      alt={`${s.name} interior scheme`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
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
      <section id="materials" className="px-[var(--container-inset)] py-28">
        <div className="w-full">
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

      {/* ── Enquire ──────────────────────────────────────────────────────── */}
      <section id="enquire" className="px-[var(--container-inset)] py-28">
        <div className="grid w-full gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div data-reveal>
            <Eyebrow>Enquire</Eyebrow>
            <h2 className="font-display text-limestone" style={{ fontSize: "var(--text-h1)" }}>
              Take the high ground.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-limestone/70" style={{ fontSize: "var(--text-lead)" }}>
              A limited clifftop collection above Uluwatu. Request availability,
              pricing and the full RAYA package — we reply within one working
              day.
            </p>

            <dl className="mt-12 space-y-6 border-t border-limestone/10 pt-10">
              <div>
                <dt className="label-caps text-mushroom">Email</dt>
                <dd className="mt-1">
                  <a href="mailto:hello@raya.bali" className="font-display text-2xl text-limestone transition-colors hover:text-clay">
                    hello@raya.bali
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-caps text-mushroom">The site</dt>
                <dd className="mt-1 text-limestone/70">
                  Bingin clifftop · Uluwatu · Bali
                </dd>
              </div>
              <div>
                <dt className="label-caps text-mushroom">Developer</dt>
                <dd className="mt-1 text-limestone/70">
                  A Royal Bali Group project · 25-year leasehold · fully managed
                  rental programme
                </dd>
              </div>
            </dl>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/raya-monogram-reversed.svg"
              alt=""
              aria-hidden
              className="mt-12 h-16 w-auto opacity-25"
            />
          </div>

          <div data-reveal className="border border-limestone/10 bg-espresso/85 p-8 sm:p-12">
            <InquiryForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-limestone/10 px-[var(--container-inset)] py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-limestone/40 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/raya-wordmark.svg" alt="RAYA" className="h-5 opacity-60 invert" />
          <span className="label-caps">Bingin · Uluwatu · Bali</span>
          <span className="label-caps">A Royal Bali Group project</span>
        </div>
      </footer>
    </main>
  );
}
