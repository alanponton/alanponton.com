import { cn } from "@/lib/utils";

interface TechPillProps {
  label: string;
  className?: string;
}

export function TechPill({ label, className }: TechPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono",
        "bg-[#F3F4F6] dark:bg-[#141416]",
        "border border-[#E5E7EB] dark:border-[#2A2A2E]",
        "text-[#374151] dark:text-[#8E8E93]",
        "transition-all duration-200 hover:border-[#6366F1]/60 hover:text-text-primary hover:shadow-sm hover:shadow-[#6366F1]/20 cursor-default",
        className,
      )}
    >
      {label}
    </span>
  );
}
