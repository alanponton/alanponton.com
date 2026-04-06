import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "wide" | "narrow";
}

export function Container({ children, className, variant = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6 sm:px-8 lg:px-12",
        variant === "default" && "max-w-7xl",
        variant === "wide" && "max-w-screen-2xl",
        variant === "narrow" && "max-w-4xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
