import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "font-heading text-3xl md:text-4xl font-bold text-text-primary relative inline-block",
        )}
      >
        {title}
        <span
          className={cn(
            "block h-0.5 mt-2 rounded-full bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-transparent",
            align === "center" ? "w-full" : "w-2/3",
          )}
        />
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
