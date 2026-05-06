import type { BodyPart, PrimaryEffect } from "./movement";

export type WodFormat = "AMRAP" | "EMOM" | "ForTime";
export type WodLevel = "初心者" | "中級者";

export interface WodMovement {
  movementId: string;
  name: string;
  reps: string;
  rx?: string;
}

export interface WodSet {
  label?: string;
  movements: WodMovement[];
}

export interface WodEstimate {
  beginner: string;
  rx: string;
}

export interface Wod {
  id: string;
  name: string;
  format: WodFormat;
  level: WodLevel;
  goal: string;
  targetBodyPart: BodyPart[];
  targetEffect: PrimaryEffect[];
  duration: string;
  sets: WodSet[];
  rounds?: number;
  repScheme?: string;
  estimate: WodEstimate;
  tip: string;
  notes: string | null;
}
