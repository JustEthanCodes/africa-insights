import { Trophy } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-primary/10 py-4 shadow-md">
      <div className="container mx-auto flex max-w-5xl items-center justify-center gap-3 px-4">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
          Africa Insights Challenge
        </h1>
      </div>
    </header>
  );
}
