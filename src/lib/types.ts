import type { LucideIcon } from "lucide-react";

export type Challenge = {
  topic: string;
  icon: LucideIcon;
  question: string;
  options: string[];
  correctOptionIndex: number;
};

export type LeaderboardEntry = {
  name: string;
  score: number;
};
