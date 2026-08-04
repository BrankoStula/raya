// components/ui/MapboxMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  Source,
  Layer,
  type MapRef,
} from "react-map-gl/mapbox";
import {
  MapPin,
  Waves,
  Dumbbell,
  Landmark,
  Plane,
  Palmtree,
  UtensilsCrossed,
  Hotel,
} from "lucide-react";
import { MAPBOX_PUBLIC_TOKEN } from "@/lib/config/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

import { RAYA_CENTER, type Camera, type POI, type POIType } from "./map-data";

export { RAYA_CENTER, type Camera, type POI, type POIType };

const MAPBOX_TOKEN = MAPBOX_PUBLIC_TOKEN;

const ICON: Record<POIType, typeof MapPin> = {
  project: MapPin,
  surf: Waves,
  gym: Dumbbell,
  temple: Landmark,
  beach: Palmtree,
  airport: Plane,
  restaurant: UtensilsCrossed,
  resort: Hotel,
};

type Props = {
  pois: POI[];
  camera: Camera;
  selected: string | null;
  onSelect: (label: string | null) => void;
};


const routeGeoJSON = (coords: [number, number][]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates: coords },
});

// Mineral Earth map: light paper style, espresso ink markers, clay project pin.
// Camera is owned by the parent (presentation-mode pattern from rbg): every
// camera change flies; selecting a POI draws the driving route + ETA chip.
export default function MapboxMap({ pois, camera, selected, onSelect }: Props) {
  const mapRef = useRef<MapRef | null>(null);
  const skipFirstFly = useRef(true);
  const [loaded, setLoaded] = useState(false);
  // Route keyed by the POI it was fetched for — deselecting simply stops it
  // matching, so nothing needs clearing inside the effect.
  const [fetched, setFetched] = useState<{
    key: string;
    coords: [number, number][];
    info: { km: number; min: number; mode: "bike" | "drive" } | null;
  } | null>(null);
  const route = selected && fetched?.key === selected ? fetched.coords : null;
  const routeInfo = selected && fetched?.key === selected ? fetched.info : null;

  useEffect(() => {
    if (skipFirstFly.current) {
      skipFirstFly.current = false;
      return;
    }
    mapRef.current?.flyTo({
      center: [camera.longitude, camera.latitude],
      zoom: camera.zoom,
      pitch: camera.pitch,
      bearing: camera.bearing,
      duration: 1800,
      essential: true,
    });
  }, [camera]);

  // Selected POI → real route from RAYA + distance/time chip. Cycling profile
  // (the Bukit is scooter/bike country — rbg's presentation does the same);
  // the airport keeps driving, nobody bikes to DPS.
  useEffect(() => {
    if (!selected) return;
    const poi = pois.find((p) => p.label === selected);
    if (!poi || poi.type === "project") return;
    const profile = poi.type === "airport" ? "driving" : "cycling";
    const straight: [number, number][] = [
      [RAYA_CENTER.longitude, RAYA_CENTER.latitude],
      [poi.longitude, poi.latitude],
    ];
    let dead = false;
    (async () => {
      try {
        const url =
          `https://api.mapbox.com/directions/v5/mapbox/${profile}/` +
          `${RAYA_CENTER.longitude},${RAYA_CENTER.latitude};${poi.longitude},${poi.latitude}` +
          `?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(url);
        const json = await res.json();
        const r = json.routes?.[0];
        if (dead) return;
        setFetched({
          key: selected,
          coords: (r?.geometry?.coordinates as [number, number][] | undefined) ?? straight,
          info: r
            ? {
                km: r.distance / 1000,
                min: Math.max(1, Math.round(r.duration / 60)),
                mode: profile === "cycling" ? "bike" : "drive",
              }
            : null,
        });
      } catch {
        if (!dead) setFetched({ key: selected, coords: straight, info: null });
      }
    })();
    return () => {
      dead = true;
    };
  }, [selected, pois]);

  return (
    <div className="relative h-full w-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={camera}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        scrollZoom={false}
        dragPan
        attributionControl={false}
        onLoad={() => setLoaded(true)}
      >
        <NavigationControl position="bottom-right" showCompass={false} />

        {route && loaded && (
          <Source id="route-source" type="geojson" data={routeGeoJSON(route)}>
            <Layer
              id="route-shadow"
              type="line"
              paint={{ "line-color": "#3b2e24", "line-width": 7, "line-opacity": 0.12, "line-blur": 5 }}
              layout={{ "line-join": "round", "line-cap": "round" }}
            />
            <Layer
              id="route-line"
              type="line"
              paint={{ "line-color": "#75614e", "line-width": 2.5, "line-opacity": 0.95 }}
              layout={{ "line-join": "round", "line-cap": "round" }}
            />
          </Source>
        )}

        {loaded &&
          pois.map((poi) => {
            const Icon = ICON[poi.type];
            const isProject = poi.type === "project";
            const active = selected === poi.label;
            const diameter = isProject ? "2.5rem" : poi.type === "airport" ? "2.1rem" : "1.75rem";
            return (
              <Marker
                key={poi.label}
                longitude={poi.longitude}
                latitude={poi.latitude}
                anchor="center"
              >
                <button
                  type="button"
                  aria-label={isProject ? "RAYA" : `Route to ${poi.label}`}
                  onClick={() => onSelect(isProject || active ? null : poi.label)}
                  className="relative flex cursor-pointer items-center justify-center bg-transparent"
                  title={poi.label}
                >
                  {isProject && (
                    <span
                      className="absolute animate-ping rounded-full bg-clay opacity-40"
                      style={{ width: diameter, height: diameter }}
                    />
                  )}
                  <span
                    style={{ width: diameter, height: diameter }}
                    className={[
                      "relative flex select-none items-center justify-center rounded-full",
                      "transition-transform duration-200 hover:scale-110",
                      isProject
                        ? "bg-clay shadow-lg ring-2 ring-espresso/30"
                        : active
                          ? "bg-espresso shadow-md ring-2 ring-clay"
                          : "bg-white/95 shadow-sm ring-1 ring-espresso/15",
                    ].join(" ")}
                  >
                    <Icon
                      size={isProject ? 15 : 12}
                      color={isProject ? "#3b2e24" : active ? "#f4f1ec" : "#3b2e24"}
                      strokeWidth={1.8}
                    />
                  </span>
                  {(isProject || active) && (
                    <span
                      className={`pointer-events-none absolute top-full mt-1.5 select-none whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.18em] ${
                        isProject ? "text-espresso" : "text-walnut"
                      }`}
                      style={{ textShadow: "0 1px 4px rgba(244,241,236,0.9)" }}
                    >
                      {isProject ? "RAYA" : poi.label}
                    </span>
                  )}
                </button>
              </Marker>
            );
          })}
      </Map>

      {/* live route distance/time — rbg presentation-mode overlay */}
      {routeInfo && selected && (
        <div className="pointer-events-none absolute bottom-5 left-5 z-10 border border-espresso/10 bg-bone/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-espresso">
            {routeInfo.km.toFixed(routeInfo.km < 10 ? 2 : 0)} km · {routeInfo.min} min by {routeInfo.mode}
          </span>
        </div>
      )}
    </div>
  );
}
