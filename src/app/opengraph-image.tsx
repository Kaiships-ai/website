import { studioCard, SECTIONS, OG } from "./og/studio-card";

export const alt = "Kaiships Studio: one prompt, Claude ships the reel.";
export const size = OG;
export const contentType = "image/png";

export default function Image() {
  return studioCard(SECTIONS.default);
}
