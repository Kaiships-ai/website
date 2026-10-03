type UmamiData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: UmamiData) => void };
  }
}

/** Fire an Umami custom event. No-op if the tracker isn't loaded. */
export function track(name: string, data?: UmamiData) {
  try {
    if (typeof window !== "undefined") window.umami?.track(name, data);
  } catch {}
}
