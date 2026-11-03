import type { Metadata } from "next";
import { Lost } from "@/components/night/lost";

export const metadata: Metadata = {
  title: "Page not found",
};

// Every unknown URL, and notFound() anywhere. It renders in the root layout
// only, so it brings the browser colors the (night) layout would have set.
export default function NotFound() {
  return (
    <>
      <meta name="color-scheme" content="light dark" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f5f6fa" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0c17" />
      <Lost />
    </>
  );
}
