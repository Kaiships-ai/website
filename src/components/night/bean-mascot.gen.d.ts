import type { PerspectiveCamera, Scene } from "three";

/** The part of the lead studio Mascot the site drives; scripts/gen-bean-live.mjs checks each name exists. */
export type MascotPose = "floating" | "greeting" | "thinking" | "explaining" | "working" | "finding" | "cheering";
export type MascotExpr = "normal" | "happy" | "excited" | "curious" | "thinking" | "focused" | "surprised" | "sleeping" | "celebrating";

export class Mascot {
  constructor(opts?: { faceSize?: number; hero?: boolean; faceless?: boolean });
  s: { expr: MascotExpr; pose: MascotPose; color: string };
  gazeTarget: { x: number; y: number };
  happyUntil: number;
  nextBlink: number;
  seed: number;
  setExpr(e: MascotExpr): void;
  setPose(p: MascotPose): void;
  bounce(): void;
  update(t: number, dt: number): void;
}
export function makeScene(m: Mascot): Scene;
export function makeCam(z?: number, ty?: number): PerspectiveCamera;
