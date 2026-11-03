"use client";

import dynamic from "next/dynamic";

// app/not-found.tsx is part of the root layout's bundle, so whatever it
// imports directly ships with every page. Behind dynamic() the 404 is a chunk
// of its own: server-rendered, and loaded only on a 404.
export const Lost = dynamic(() => import("./lost-page"));
