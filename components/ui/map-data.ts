// Shared map types/constants, split from MapboxMap so consumers can import
// them without pulling the mapbox-gl bundle into their chunk.
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

export type Camera = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

export const RAYA_CENTER = { longitude: 115.1223944, latitude: -8.8100574 };
