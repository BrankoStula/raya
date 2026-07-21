// Types for the scroll-world scrub engine (vanilla JS reference implementation).
export interface SwSection {
  id: string;
  label?: string;
  still: string;
  stillMobile?: string;
  clip: string;
  clipMobile?: string;
  accent?: string;
  scroll?: number;
  linger?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  tags?: string[];
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}
export interface SwConfig {
  brand?: { name: string; href?: string };
  nav?: boolean;
  atmosphere?: boolean;
  hint?: string;
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  sections: SwSection[];
  connectors?: (string | null)[];
  connectorsMobile?: (string | null)[];
}
export function mountScrollWorld(container: HTMLElement, config: SwConfig): void;
