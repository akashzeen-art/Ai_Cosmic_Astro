/** AI Cosmic Astro — brand identity and contact. */
export const BRAND_DOMAINS = [
  "aicosmicastro.com",
  "www.aicosmicastro.com",
  "content.aicosmicastro.com",
] as const;

export const BRAND_PRIMARY_DOMAIN = "content.aicosmicastro.com";

export function resolveBrandDomain(hostname?: string): string {
  const raw =
    hostname ??
    (typeof window !== "undefined" ? window.location.hostname : "");
  const host = raw.replace(/^www\./i, "");
  return (BRAND_DOMAINS as readonly string[]).includes(host) ? host : BRAND_PRIMARY_DOMAIN;
}

export const BRAND_CONTACT = {
  PHONE: "9217523567",
  PHONE_DISPLAY: "+91 9217523567",
  EMAIL: "bd@numeromobile.com",
  ADDRESS:
    "4th floor, Tower A1, SPAZE ITECH PARK, 417, Sector 49, Gurugram, Haryana 122018",
  ADDRESS_SHORT: "417, Tower A1, Sector-49, Gurgaon, Haryana, 122011",
} as const;

export const BRAND = {
  NAME: "AI Cosmic Astro",
  TAGLINE: "Hello Wanderer — cosmic guidance under the stars",
  PRIMARY_DOMAIN: BRAND_PRIMARY_DOMAIN,
  DOMAINS: BRAND_DOMAINS,
  get DOMAIN() {
    return resolveBrandDomain();
  },
  COMPANY: "NumeroMobile Private Limited",
  LOGO: "/logo.png",
  HEAD: "/head.png",
  VIDEO_PRELOADER: "",
  AUDIO_BG: "/bgaudio.mp3",
  CONTACT: BRAND_CONTACT,
} as const;
