export const site = {
  name: "Ergün Bickici",
  country: { de: "Deutschland", en: "Germany" },
  email: "erguen.bickici@tutamail.com",
  github: "https://github.com/pndroa",
  linkedin: "https://www.linkedin.com/in/erguen-bickici/",
  contact: {
    endpoint: import.meta.env.DEV
      ? "http://localhost:8787"
      : "https://contact-worker.erguen-bickici.workers.dev",
    turnstileSiteKey: import.meta.env.DEV
      ? "1x00000000000000000000AA"
      : "0x4AAAAAAGHdpENM3e4R-9mz",
  },
  chat: {
    endpoint: import.meta.env.DEV
      ? "http://localhost:8787"
      : "https://api.erguen-bickici.de",
    turnstileSiteKey: import.meta.env.DEV
      ? "1x00000000000000000000AA"
      : "0x4AAAAAAGHw8Ljvi6rVv26F",
  },
};
