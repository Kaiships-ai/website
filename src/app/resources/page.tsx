import { permanentRedirect } from "next/navigation";

/** The guides index lives at /guides; article URLs stay at /resources/<slug>. */
export default function ResourcesIndex() {
  permanentRedirect("/guides");
}
