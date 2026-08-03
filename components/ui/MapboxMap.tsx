// components/ui/MapboxMap.tsx
"use client";

import { useCallback, useState } from "react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl/mapbox";
import { MapPin, Waves, Dumbbell, Landmark, Plane, Palmtree, UtensilsCrossed, Hotel } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export type POIType =
  | "project"
  | "surf"
  | "gym"
  | "temple"
  | "beach"
  | "airport"
  | "restaurant"
  | "resort";

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

// Mineral Earth marker language on the dark map — limestone chips, clay RAYA pin.
const MARKER: Record<POIType, MarkerStyle> = {
  project: { Icon: MapPin,   bg: "#b8a28e", color: "#46382b", iconSize: 16, diameter: "2.75rem" },
  surf:    { Icon: Waves,    bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 12, diameter: "1.75rem" },
  gym:     { Icon: Dumbbell, bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 12, diameter: "1.75rem" },
  temple:  { Icon: Landmark, bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 12, diameter: "1.75rem" },
  beach:   { Icon: Palmtree, bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 12, diameter: "1.75rem" },
  airport: { Icon: Plane,    bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 14, diameter: "2.25rem" },
  restaurant: { Icon: UtensilsCrossed, bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 12, diameter: "1.75rem" },
  resort:  { Icon: Hotel,    bg: "rgba(234,227,215,0.92)", color: "#46382b", iconSize: 12, diameter: "1.75rem" },
};

type Props = {
  pois: POI[];
};

const RAYA_CENTER = { longitude: 115.1223944, latitude: -8.8100574 };

const routeGeoJSON = (coords: [number, number][]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates: coords },
});

export default function MapboxMap({ pois }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [route, setRoute] = useState<[number, number][] | null>(null);
  const [routeTo, setRouteTo] = useState<string | null>(null);

  // Click a POI → driving route from RAYA drawn on the map (click again to clear).
  const showRoute = useCallback(
    async (poi: POI) => {
      if (poi.type === "project" || routeTo === poi.label) {
        setRoute(null);
        setRouteTo(null);
        return;
      }
      setRouteTo(poi.label);
      try {
        const url =
          `https://api.mapbox.com/directions/v5/mapbox/driving/` +
          `${RAYA_CENTER.longitude},${RAYA_CENTER.latitude};${poi.longitude},${poi.latitude}` +
          `?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(url);
        const json = await res.json();
        const coords = json.routes?.[0]?.geometry?.coordinates as
          | [number, number][]
          | undefined;
        setRoute(
          coords ?? [
            [RAYA_CENTER.longitude, RAYA_CENTER.latitude],
            [poi.longitude, poi.latitude],
          ],
        );
      } catch {
        setRoute([
          [RAYA_CENTER.longitude, RAYA_CENTER.latitude],
          [poi.longitude, poi.latitude],
        ]);
      }
    },
    [routeTo],
  );

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
      mapStyle="mapbox://styles/mapbox/dark-v11"
      scrollZoom={false}
      dragPan
      attributionControl={false}
      onLoad={() => setLoaded(true)}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {/* driving route from RAYA to the clicked POI (azurea's line language) */}
      {route && loaded && (
        <Source id="route-source" type="geojson" data={routeGeoJSON(route)}>
          <Layer
            id="route-shadow"
            type="line"
            paint={{ "line-color": "#000000", "line-width": 8, "line-opacity": 0.25, "line-blur": 6 }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
          <Layer
            id="route-line"
            type="line"
            paint={{ "line-color": "#b8a28e", "line-width": 3.5, "line-opacity": 0.95 }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
        </Source>
      )}

      {loaded &&
        pois.map((poi, i) => {
          const s = MARKER[poi.type];
          const Icon = s.Icon;
          const active = routeTo === poi.label;
          return (
            <Marker
              key={`${poi.label}-${i}`}
              longitude={poi.longitude}
              latitude={poi.latitude}
              anchor="center"
            >
              <button
                type="button"
                aria-label={poi.type === "project" ? "RAYA" : `Route to ${poi.label}`}
                onClick={() => showRoute(poi)}
                className="relative flex cursor-pointer items-center justify-center bg-transparent"
                title={poi.label}
              >
                {poi.type === "project" && (
                  <span
                    className="absolute animate-ping rounded-full opacity-40"
                    style={{ backgroundColor: "#b8a28e", width: s.diameter, height: s.diameter }}
                  />
                )}
                <div
                  style={{ backgroundColor: active ? "#b8a28e" : s.bg, width: s.diameter, height: s.diameter }}
                  className={[
                    "relative flex select-none items-center justify-center rounded-full",
                    "transition-transform duration-200 hover:scale-110",
                    poi.type === "project"
                      ? "shadow-lg ring-2 ring-clay shadow-clay/30"
                      : active
                        ? "shadow-md ring-2 ring-clay"
                        : "shadow-sm ring-1 ring-clay/25",
                  ].join(" ")}
                >
                  <Icon size={s.iconSize} color={active ? "#46382b" : s.color} strokeWidth={1.8} />
                </div>
                {(poi.type === "project" || active) && (
                  <span
                    className="pointer-events-none absolute top-full mt-1.5 select-none whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.18em] text-clay"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {poi.type === "project" ? "RAYA" : poi.label}
                  </span>
                )}
              </button>
            </Marker>
          );
        })}
    </Map>
  );
}
