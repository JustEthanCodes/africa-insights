"use client";

import { useState } from "react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCcw, Award, Crown } from "lucide-react";

type GameOverScreenProps = {
  score: number;
  onRestart: () => void;
};

export default function GameOverScreen({ score, onRestart }: GameOverScreenProps) {
  const [name, setName] = useState("");
  const { leaderboard, addScore } = useLeaderboard();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !submitted) {
      addScore(name.trim(), score);
      setSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
      <Award className="h-16 w-16 text-primary mb-4" />
      <h2 className="text-3xl font-bold text-primary sm:text-4xl">
        Challenge Complete!
      </h2>
      <p className="mt-2 text-5xl font-bold">{score}</p>
      <p className="text-lg text-muted-foreground">Your Final Score</p>

      {!submitted && (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-sm flex-col gap-2">
          <Input
            type="text"
            placeholder="Enter your name for the leaderboard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-center"
            maxLength={20}
          />
          <Button type="submit" disabled={!name.trim()}>
            Save Score
          </Button>
        </form>
      )}
      
      {submitted && (
        <p className="mt-8 font-semibold text-accent">Your score has been saved!</p>
      )}

      <div className="mt-10 w-full">
        <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2"><Crown className="text-yellow-500" /> Leaderboard</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell className="text-right font-semibold">{entry.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Be the first on the leaderboard!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Button onClick={onRestart} className="mt-10" size="lg" variant="outline">
        <RefreshCcw className="mr-2 h-5 w-5" />
        Play Again
      </Button>
    </div>
  );
}
