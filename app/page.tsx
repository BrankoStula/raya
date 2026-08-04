// app/page.tsx
import JourneyWorld from "@/components/JourneyWorld";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import InquiryForm from "@/components/sections/InquiryForm";
import LocationSection from "@/components/sections/LocationSection";
import PlanEmbed from "@/components/sections/PlanEmbed";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-caps mb-6 text-mushroom">
      <span className="mr-4 inline-block h-px w-8 bg-clay align-middle" />
      {children}
    </p>
  );
}

// Real mix per the RAYA brochure: eighteen residences — ten two-bed pool-villas
// in five mirrored pairs, eight apartments over three storeys behind a staffed
// lobby. Prices as published; delivered furnished.
const RESIDENCES = [
  {
    id: "villas",
    name: "The Villas",
    img: "/renders/villa-bedroom.jpg",
    imgAlt: "Villa bedroom — timber headboard wall, soft morning light",
    lead: "Ten two-bedroom pool villas in five mirrored pairs. 204 m² over three levels, each with a walled garden, a private pool and a roof terrace.",
    facts: ["2 bedrooms · 3 levels", "Private pools", "US$499,900 · furnished"],
  },
  {
    id: "apartments",
    name: "The Apartments",
    img: "/renders/apt-living.jpg",
    imgAlt: "Apartment kitchen and living opening to the pool courtyard",
    lead: "Eight one-bedroom apartments over three storeys at the road frontage, behind a staffed lobby. Ground-floor plans come with a private pool courtyard.",
    facts: ["8 residences", "Staffed lobby", "From US$169,900 · furnished"],
  },
];

// Two delivered interior schemes — light and dark — across villa and apartment.
const SCHEMES = [
  { img: "/renders/scheme-villa-light.jpg", name: "Villa · Light", note: "pale oak · bone limewash" },
  { img: "/renders/scheme-villa-dark.jpg", name: "Villa · Dark", note: "walnut · espresso" },
  { img: "/renders/scheme-apt-light.jpg", name: "Apartment · Light", note: "pale oak · bone limewash" },
  { img: "/renders/scheme-apt-dark.jpg", name: "Apartment · Dark", note: "walnut · espresso" },
];

// Planpoint viewer themed to the RAYA tokens via its query params.
const PLAN_URL =
  "https://www.royalbaligroup.com/plans/raya-residences-master-plan?bg=EAE3D7&ink=3B2E24&accent=B8A28E&hfont=Marcellus,Georgia,serif";

const MATERIALS = [
  { img: "/materials/limewash-daybreak.jpg", name: "Limewash — Silent Daybreak" },
  { img: "/materials/limewash-sands.jpg", name: "Limewash — Serene Sands" },
  { img: "/materials/deco-wash.jpg", name: "Deco wash — warm mineral" },
];

const VILLA_GALLERY = [
  { img: "/renders/villa-ext.jpg", alt: "Villa row exterior between the palms" },
  { img: "/renders/villa-entrance.jpg", alt: "Villa entrance — timber screen and stone" },
  { img: "/renders/villa-pool.jpg", alt: "Villa plunge pool with stepping pads" },
  { img: "/renders/villa-living.jpg", alt: "Villa living room in limewash and linen" },
  { img: "/renders/villa-bed2.jpg", alt: "Villa bedroom with woven pendant light" },
  { img: "/renders/villa-rooftop.jpg", alt: "Villa rooftop terrace under a timber ceiling" },
];

const APT_GALLERY = [
  { img: "/renders/apt-entrance.jpg", alt: "Apartment entrance — plunge pool at the door" },
  { img: "/renders/apt-pool.jpg", alt: "Ground-floor pool courtyard between limewash walls" },
  { img: "/renders/apt-living2.jpg", alt: "Corner apartment living room with full-height glazing" },
  { img: "/renders/apt-kitchen2.jpg", alt: "Apartment kitchen island under woven pendants" },
  { img: "/renders/apt-bed.jpg", alt: "Apartment bedroom — timber slat headboard, garden view" },
  { img: "/renders/apt-bath.jpg", alt: "Apartment bathroom — stone vanity and rain shower" },
];

// Editorial mosaic — full-width rows of alternating weight (7/5, 5/7, 6/6) so
// the imagery carries the section instead of floating in whitespace. Outer
// frames enter from their own edge.
const MOSAIC = [
  { span: "md:col-span-7", aspect: "aspect-[7/5]", slide: "left" },
  { span: "md:col-span-5", aspect: "aspect-[5/4] md:aspect-auto", slide: "right" },
  { span: "md:col-span-5", aspect: "aspect-[5/4]", slide: "left" },
  { span: "md:col-span-7", aspect: "aspect-[7/5] md:aspect-auto", slide: "right" },
  { span: "md:col-span-6", aspect: "aspect-[16/10]", slide: "left" },
  { span: "md:col-span-6", aspect: "aspect-[16/10]", slide: "right" },
] as const;

function Gallery({
  label,
  items,
  popIndex = 1,
}: {
  label: string;
  items: { img: string; alt: string }[];
  popIndex?: number;
}) {
  return (
    <div className="mt-20">
      <p data-reveal className="label-caps mb-8 text-mushroom">{label}</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
        {items.map((g, i) => {
          const m = MOSAIC[i % MOSAIC.length];
          return (
            <div
              key={g.img}
              data-slide={m.slide}
              data-pop={i === popIndex ? "true" : undefined}
              className={`relative col-span-1 overflow-hidden ${m.span} ${m.aspect}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-parallax
                data-lightbox
                src={g.img}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* ── The villa journey — one continuous AI camera flight, scrubbed by
             scroll, anchored on the real DEV 10 renders ─────────────────────── */}
      <JourneyWorld />

      {/* ── The Bukit — brochure section 01 as the rbg presentation-mode
             location split; pulled up over the world's fade-out band ───────── */}
      <LocationSection />

      {/* ── The collection — pinned horizontal gallery, clip-path reveals ── */}
      <CollectionShowcase />

      {/* ── The residences ───────────────────────────────────────────────── */}
      <section id="units" className="bg-bone px-[var(--container-inset)] py-28">
        <div className="w-full">
          <div className="max-w-xl">
            <Eyebrow>03 · The residences</Eyebrow>
            <h2
              data-write
              className="font-display text-espresso"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Two ways to hold the high ground.
            </h2>
            <p data-reveal className="mt-6 leading-relaxed text-walnut" style={{ fontSize: "var(--text-lead)" }}>
              One arrival, eighteen residences: ten pool villas and eight
              managed apartments, delivered furnished. Visa, PT PMA and land
              tax are part of the price.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {RESIDENCES.map((r, i) => (
              <figure
                key={r.id}
                data-slide={i === 0 ? "left" : "right"}
                className="border border-espresso/10 bg-white/45"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    data-parallax
                    data-lightbox
                    src={r.img}
                    alt={r.imgAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-6">
                  <span className="font-display text-2xl text-espresso">{r.name}</span>
                  <p className="mt-3 leading-relaxed text-walnut">{r.lead}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {r.facts.map((f) => (
                      <span key={f} className="label-caps text-mushroom">{f}</span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* the villa in photos — full render set from the design team */}
          <Gallery label="Inside the villa" items={VILLA_GALLERY} popIndex={2} />

          {/* the apartments in photos — corner and mid units, full render set */}
          <Gallery label="Inside the apartments" items={APT_GALLERY} popIndex={1} />

          {/* the two interior schemes, same rooms in both temperatures */}
          <div className="mt-20">
            <p data-reveal className="label-caps mb-3 text-mushroom">Two interior schemes</p>
            <p data-reveal className="mb-8 max-w-xl text-walnut">
              Every residence is delivered furnished in one of two schemes,
              light or dark. The same rooms, two temperatures.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {SCHEMES.map((s, i) => (
                <figure key={s.name} data-slide={i < 2 ? "left" : "right"}>
                  <div className="aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      data-parallax
                      data-lightbox
                      src={s.img}
                      alt={`${s.name} interior scheme`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3">
                    <span className="font-display text-lg text-espresso">{s.name}</span>
                    <span className="label-caps ml-3 text-mushroom">{s.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Master plan — the RBG Planpoint interactive plan, embedded and
             themed to the RAYA tokens via its query params ─────────────────── */}
      <section id="masterplan" className="bg-limestone px-[var(--container-inset)] py-28">
        <div className="max-w-xl">
          <Eyebrow>04 · The master plan</Eyebrow>
          <h2
            data-write
            className="font-display text-espresso"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Every home on the lane.
          </h2>
          <p data-reveal className="mt-6 leading-relaxed text-walnut" style={{ fontSize: "var(--text-lead)" }}>
            Walk the plan yourself: ten villas in five mirrored pairs, the
            apartment house at the road frontage. Open a home for its floor
            plans.
          </p>
        </div>
        <PlanEmbed src={PLAN_URL} title="RAYA Residences — Interactive Master Plan" />
        <a
          data-reveal
          href={PLAN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="label-caps mt-5 inline-block text-mushroom transition-colors hover:text-espresso"
        >
          Open the plan full screen ↗
        </a>
      </section>

      {/* ── Materials ────────────────────────────────────────────────────── */}
      <section id="materials" className="relative overflow-hidden bg-bone px-[var(--container-inset)] py-28">
        <div className="relative w-full">
          <div className="max-w-xl">
            <Eyebrow>05 · Material truth</Eyebrow>
            <h2
              data-write
              className="font-display text-espresso"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Limewash, timber, stone.
            </h2>
            <p data-reveal className="mt-6 leading-relaxed text-walnut" style={{ fontSize: "var(--text-lead)" }}>
              The finishes are the ones on the sample board: mineral limewash,
              warm timber, local stone.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-4 md:gap-5">
            {MATERIALS.map((m, i) => (
              <figure key={m.img} data-slide={i === 2 ? "right" : "left"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-lightbox
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="label-caps mt-3 text-mushroom">{m.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquire — one composed card: details left, form right, monogram
             watermark ─────────────────────────────────────────────────────── */}
      <section id="enquire" className="relative overflow-hidden bg-bone px-[var(--container-inset)] py-28">
        <div className="max-w-xl">
          <Eyebrow>06 · Enquire</Eyebrow>
          <h2
            data-write
            className="font-display text-espresso"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Take the high ground.
          </h2>
          <p data-reveal className="mt-6 max-w-md leading-relaxed text-walnut" style={{ fontSize: "var(--text-lead)" }}>
            Ask for availability, pricing and the full RAYA package. We reply
            within one working day.
          </p>
        </div>

        <div
          data-reveal
          className="relative mt-14 overflow-hidden border border-espresso/10 bg-white/45 shadow-sm"
        >
          {/* monogram watermark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/raya-monogram.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -right-10 h-[22rem] w-auto select-none opacity-[0.06]"
          />

          <div className="relative grid gap-0 lg:grid-cols-[2fr_3fr]">
            <div className="flex flex-col border-b border-espresso/10 lg:border-b-0 lg:border-r">
              <div className="relative min-h-[16rem] flex-1 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  data-parallax
                  src="/renders/villa-pool.jpg"
                  alt="Villa plunge pool with stepping pads"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-10">
                <dl className="space-y-5">
                  <div>
                    <dt className="label-caps text-mushroom">The site</dt>
                    <dd className="mt-1.5 text-walnut">
                      Jalan Kapur · Pecatu plateau · Uluwatu, Bali
                    </dd>
                  </div>
                  <div>
                    <dt className="label-caps text-mushroom">Warranty</dt>
                    <dd className="mt-1.5 text-walnut">
                      10 years structural · 5 years MEP · 2 years waterproofing
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <p className="label-caps mb-8 text-mushroom">Request the package</p>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* dark bookend — the brochure closes on an espresso page */}
      <footer className="bg-espresso px-[var(--container-inset)] py-12">
        <div className="flex flex-col items-center justify-between gap-4 text-limestone/50 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/raya-wordmark.svg" alt="RAYA" className="h-5 opacity-60 invert" />
          <span className="label-caps">Bingin · Uluwatu · Bali</span>
          <span className="label-caps">A Royal Bali Group project</span>
        </div>
      </footer>
    </main>
  );
}
