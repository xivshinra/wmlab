export type NavLink = {
  label: string;
  href: string;
};

export const SERIES_BASE_PATH = "/series";

export function getSeriesPath(slug: string, suffix = "") {
  return `${SERIES_BASE_PATH}/${slug}${suffix}`;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Séries", href: SERIES_BASE_PATH },
  { label: "Boutique", href: "/shop" },
  { label: "Inventaire", href: "/inventory" },
];
