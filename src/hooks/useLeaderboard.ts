"use client";

import { useState, useEffect, useCallback } from "react";
import type { LeaderboardEntry } from "@/lib/types";

const LEADERBOARD_KEY = "africaInsightsLeaderboard";
const MAX_ENTRIES = 10;

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    try {
      const storedLeaderboard = localStorage.getItem(LEADERBOARD_KEY);
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error("Failed to load leaderboard from localStorage", error);
    }
  }, []);

  const addScore = useCallback((name: string, score: number) => {
    const newEntry: LeaderboardEntry = { name, score };
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);

    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error("Failed to save leaderboard to localStorage", error);
    }
  }, [leaderboard]);

  return { leaderboard, addScore };
}
