import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-primary sm:text-4xl">
        Welcome!
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">
        Test your knowledge about the diverse challenges and incredible
        opportunities across the African continent. Ready to begin?
      </p>
      <Button
        onClick={onStart}
        className="mt-8 transition-transform duration-200 hover:scale-105"
        size="lg"
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        Start Challenge
      </Button>
    </div>
  );
}
