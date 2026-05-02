// App URLs — Dev uses localhost:4200, Production uses the real domain.
const APP_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4200";
const APP_PROD = "https://ambitious-bay-0a76c9f10.7.azurestaticapps.net";

export const appUrls = {
  explore:  `${APP_BASE}/explore`,
  register: `${APP_BASE}/auth/register`,
  login:    APP_PROD,
  pools:    APP_PROD,
} as const;
