"use client";

import { useEffect } from "react";

const HASHES = ["#pricing", "#kit", "#showcase", "#users", "#faq", "#how"];

// Old links like /?utm_source=...#pricing pointed at the Reel Kit page when it
// was the home page. Send them to /reel-kit, keeping the query and hash.
export function HashRedirect() {
  useEffect(() => {
    if (HASHES.includes(window.location.hash)) {
      window.location.replace("/reel-kit" + window.location.search + window.location.hash);
    }
  }, []);
  return null;
}
