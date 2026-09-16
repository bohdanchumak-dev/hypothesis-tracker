import Link from "next/link";
import { cn } from "@/lib/utils";
import { STATUSES, STATUS_LABELS } from "@/lib/hypotheses";
import { buttonVariants } from "@/components/ui/button";

export function StatusFilter({ active, counts }) {
  const options = [
    { value: "all", label: "Усі" },
    ...STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] })),
  ];

  return (
    <nav className="flex flex-wrap gap-1.5" aria-label="Фільтр за статусом">
      {options.map(({ value, label }) => {
        const isActive = value === active;
        return (
          <Link
            key={value}
            href={value === "all" ? "/" : `/?status=${value}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: isActive ? "default" : "outline",
                size: "sm",
              })
            )}
          >
            {label}
            <span
              className={cn(
                "ml-1 tabular-nums",
                isActive ? "opacity-80" : "text-muted-foreground"
              )}
            >
              {counts[value] ?? 0}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
