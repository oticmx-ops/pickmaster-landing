// App URLs — Dev uses localhost:4200, Production uses the real domain.
const APP_BASE = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4200";

export const appUrls = {
  explore:  `${APP_BASE}/explore`,
  register: `${APP_BASE}/auth/register`,
  login:    `${APP_BASE}/auth/login`,
  pools:    `${APP_BASE}/pools`,
} as const;
