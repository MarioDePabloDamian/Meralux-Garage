"use client";

import { cn } from "@/lib/utils";

type AnimatedGradientTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent",
        "bg-gradient-to-r from-purple-300 via-fuchsia-300 to-violet-400",
        className,
      )}
    >
      {children}
    </span>
  );
}
