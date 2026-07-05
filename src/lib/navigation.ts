export type NavLink = {
  label: string;
  href: string;
};

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Séries", href: "/series" },
  { label: "Boutique", href: "/shop" },
  { label: "Inventaire", href: "/inventory" },
];
