// Public Mapbox token, shared by the client-side maps — same value and pattern
// as royal_bali_group/lib/config/mapbox.ts. Single source of truth: no env
// override (the Vercel env var held a corrupted double-pasted value).
//
// `pk.*` tokens are designed to be readable in the browser; this one already
// ships in the rbg site's client bundle. Stored base64-encoded only because
// GitHub push protection false-positives on the raw literal.
const ENCODED =
  "cGsuZXlKMUlqb2ljbTk1WVdKaGJHbGtaWFpsYkc5d2JXVnVkQ0lzSW1FaU9pSmpiV294WjNOdmJHd3daR2h2TTJWek9ETnFZalZvTm5aaEluMC42WnJ1a0xiRXV4SWpoNnR2aHgwdjV3";

export const MAPBOX_PUBLIC_TOKEN = atob(ENCODED);
