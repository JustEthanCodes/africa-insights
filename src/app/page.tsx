"use client";

import { useState } from "react";
import { challenges } from "@/lib/challenges";
import type { Challenge } from "@/lib/types";
import Header from "@/components/game/Header";
import StartScreen from "@/components/game/StartScreen";
import GameScreen from "@/components/game/GameScreen";
import GameOverScreen from "@/components/game/GameOverScreen";
import { Card, CardContent } from "@/components/ui/card";

type GameState = "start" | "playing" | "finished";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const startGame = () => {
    setScore(0);
    setCurrentChallengeIndex(0);
    setGameState("playing");
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      setGameState("finished");
    }
  };

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 10);
    handleNextChallenge();
  };

  const handleIncorrectAnswer = () => {
    handleNextChallenge();
  };
  
  const restartGame = () => {
    setGameState("start");
  }

  const renderGameState = () => {
    switch (gameState) {
      case "start":
        return <StartScreen onStart={startGame} />;
      case "playing":
        return (
          <GameScreen
            challenge={challenges[currentChallengeIndex]}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            currentScore={score}
            challengeNumber={currentChallengeIndex + 1}
            totalChallenges={challenges.length}
          />
        );
      case "finished":
        return <GameOverScreen score={score} onRestart={restartGame} />;
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background font-body">
      <Header />
      <main className="flex w-full flex-grow items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-6 md:p-10">
              {renderGameState()}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full p-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Africa Insights Challenge. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
