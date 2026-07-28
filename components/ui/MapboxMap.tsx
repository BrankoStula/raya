// components/ui/MapboxMap.tsx
"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { MapPin, Waves, Dumbbell, Landmark, Plane, Palmtree } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export type POIType = "project" | "surf" | "gym" | "temple" | "beach" | "airport";

export type POI = {
  label: string;
  longitude: number;
  latitude: number;
  type: POIType;
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

type MarkerStyle = {
  Icon: typeof MapPin;
  bg: string;
  color: string;
  iconSize: number;
  diameter: string;
};

// Mineral Earth marker language — espresso chips, clay accents, RAYA pin in clay.
const MARKER: Record<POIType, MarkerStyle> = {
  project: { Icon: MapPin,   bg: "#b8a28e", color: "#3b2e24", iconSize: 16, diameter: "2.75rem" },
  surf:    { Icon: Waves,    bg: "rgba(59,46,36,0.92)", color: "#b8a28e", iconSize: 12, diameter: "1.75rem" },
  gym:     { Icon: Dumbbell, bg: "rgba(59,46,36,0.92)", color: "#b8a28e", iconSize: 12, diameter: "1.75rem" },
  temple:  { Icon: Landmark, bg: "rgba(59,46,36,0.92)", color: "#b8a28e", iconSize: 12, diameter: "1.75rem" },
  beach:   { Icon: Palmtree, bg: "rgba(59,46,36,0.92)", color: "#b8a28e", iconSize: 12, diameter: "1.75rem" },
  airport: { Icon: Plane,    bg: "rgba(59,46,36,0.92)", color: "#b8a28e", iconSize: 14, diameter: "2.25rem" },
};

type Props = {
  pois: POI[];
};

const RAYA_CENTER = { longitude: 115.1223944, latitude: -8.8100574 };

export default function MapboxMap({ pois }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: RAYA_CENTER.longitude - 0.012,
        latitude: RAYA_CENTER.latitude - 0.004,
        zoom: 12.4,
        pitch: 45,
        bearing: -12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      scrollZoom={false}
      dragPan
      attributionControl={false}
      onLoad={() => setLoaded(true)}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {loaded &&
        pois.map((poi, i) => {
          const s = MARKER[poi.type];
          const Icon = s.Icon;
          return (
            <Marker
              key={`${poi.label}-${i}`}
              longitude={poi.longitude}
              latitude={poi.latitude}
              anchor="center"
            >
              <div className="relative flex items-center justify-center" title={poi.label}>
                {poi.type === "project" && (
                  <span
                    className="absolute animate-ping rounded-full opacity-40"
                    style={{ backgroundColor: "#b8a28e", width: s.diameter, height: s.diameter }}
                  />
                )}
                <div
                  style={{ backgroundColor: s.bg, width: s.diameter, height: s.diameter }}
                  className={[
                    "relative flex cursor-default select-none items-center justify-center rounded-full",
                    "transition-transform duration-200 hover:scale-110",
                    poi.type === "project"
                      ? "shadow-lg ring-2 ring-clay shadow-clay/30"
                      : "shadow-sm ring-1 ring-clay/25",
                  ].join(" ")}
                >
                  <Icon size={s.iconSize} color={s.color} strokeWidth={1.8} />
                </div>
                {poi.type === "project" && (
                  <span
                    className="pointer-events-none absolute top-full mt-1.5 select-none whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.18em] text-espresso"
                    style={{ textShadow: "0 1px 4px rgba(234,227,215,0.9)" }}
                  >
                    RAYA
                  </span>
                )}
              </div>
            </Marker>
          );
        })}
    </Map>
  );
}
