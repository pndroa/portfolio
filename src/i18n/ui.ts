export type Lang = "de" | "en";

export const navigationItems = [
  "home",
  "about",
  "skills",
  "experience",
  "contact",
] as const;

export type NavItem = (typeof navigationItems)[number];

export const nav: Record<Lang, Record<NavItem, string>> = {
  de: {
    home: "Start",
    about: "Über mich",
    skills: "Skills",
    experience: "Werdegang",
    contact: "Kontakt",
  },
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    experience: "Work Experience",
    contact: "Contact",
  },
};
