"use client";

import { useState, useEffect } from "react";
import { generateChallengeScenario } from "@/ai/flows/generate-challenge-scenario";
import { provideChoiceFeedbackWithExplanation } from "@/ai/flows/provide-choice-feedback-explanation";
import type { Challenge } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingSpinner from "./LoadingSpinner";
import { CheckCircle, XCircle } from "lucide-react";

type GameScreenProps = {
  challenge: Challenge;
  onCorrect: () => void;
  onIncorrect: () => void;
  currentScore: number;
  challengeNumber: number;
  totalChallenges: number;
};

type Feedback = {
  isCorrect: boolean;
  feedbackText: string;
  explanation?: string;
};

export default function GameScreen({
  challenge,
  onCorrect,
  onIncorrect,
  currentScore,
  challengeNumber,
  totalChallenges,
}: GameScreenProps) {
  const [scenario, setScenario] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setScenario("");
    setSelectedOption(null);
    setFeedback(null);
    
    async function getScenario() {
      try {
        const result = await generateChallengeScenario({ topic: challenge.topic });
        setScenario(result.scenario);
      } catch (error) {
        console.error("Error generating scenario:", error);
        setScenario("A critical challenge has emerged. You must make a choice.");
      } finally {
        setIsLoading(false);
      }
    }
    getScenario();
  }, [challenge]);

  const handleOptionSelect = async (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    setIsSubmitting(true);

    const isCorrect = index === challenge.correctOptionIndex;

    try {
      const feedbackResult = await provideChoiceFeedbackWithExplanation({
        choiceCorrect: isCorrect,
        explanationNeeded: !isCorrect,
        challenge: scenario,
        choice: challenge.options[index],
        correctAnswer: challenge.options[challenge.correctOptionIndex],
      });
      setFeedback({
        isCorrect,
        feedbackText: feedbackResult.feedback,
        explanation: feedbackResult.explanation,
      });
    } catch(error) {
      console.error("Error getting feedback:", error);
      setFeedback({
        isCorrect,
        feedbackText: isCorrect ? "That's correct!" : "That's incorrect.",
        explanation: isCorrect ? undefined : "The correct answer is " + challenge.options[challenge.correctOptionIndex],
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleContinue = () => {
    if (feedback?.isCorrect) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const getButtonVariant = (index: number) => {
    if (selectedOption === null) {
      return "secondary";
    }
    if (index === challenge.correctOptionIndex) {
      return "default"; // Correct answer is always primary color
    }
    if (index === selectedOption) {
      return "destructive"; // Incorrectly selected answer
    }
    return "secondary";
  };

  return (
    <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
      <div className="flex justify-between w-full mb-4">
        <p className="font-bold text-lg text-primary">Score: {currentScore}</p>
        <p className="font-bold text-lg text-muted-foreground">{challengeNumber} / {totalChallenges}</p>
      </div>

      <challenge.icon className="h-16 w-16 text-accent mb-4" />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-40">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Generating Scenario...</p>
        </div>
      ) : (
        <p className="mb-6 text-lg text-foreground/90">{scenario}</p>
      )}

      <h3 className="text-2xl font-bold mb-6">{challenge.question}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {challenge.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null || isLoading}
            variant={getButtonVariant(index)}
            className="h-auto whitespace-normal py-4 text-base justify-center"
          >
            {option}
          </Button>
        ))}
      </div>

      <AlertDialog open={feedback !== null} onOpenChange={() => feedback && handleContinue()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-2xl">
              {feedback?.isCorrect ? (
                <CheckCircle className="text-green-500 h-8 w-8" />
              ) : (
                <XCircle className="text-destructive h-8 w-8" />
              )}
              {feedback?.feedbackText}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-left pt-4">
              {feedback?.explanation}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
