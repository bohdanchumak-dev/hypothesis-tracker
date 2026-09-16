import { cn } from "@/lib/utils";
import { STATUS_BADGE_CLASSES, STATUS_LABELS } from "@/lib/hypotheses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OutcomeDialog } from "@/components/outcome-dialog";
import { StatusActions } from "@/components/status-actions";

const dateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function HypothesisCard({ hypothesis }) {
  const { id, text, channel, status, result, conclusion, created_at } =
    hypothesis;
  const hasOutcome = Boolean(result || conclusion);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={cn(STATUS_BADGE_CLASSES[status])}>
            {STATUS_LABELS[status]}
          </Badge>
          <Badge variant="outline">{channel}</Badge>
          <time
            dateTime={created_at}
            className="ml-auto text-xs text-muted-foreground"
          >
            {dateFormatter.format(new Date(created_at))}
          </time>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>

        {hasOutcome ? (
          <>
            <Separator />
            <dl className="grid gap-3 text-sm">
              {result ? (
                <div className="grid gap-1">
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Результат
                  </dt>
                  <dd className="whitespace-pre-wrap">{result}</dd>
                </div>
              ) : null}
              {conclusion ? (
                <div className="grid gap-1">
                  <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Висновок
                  </dt>
                  <dd className="whitespace-pre-wrap">{conclusion}</dd>
                </div>
              ) : null}
            </dl>
          </>
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center gap-1.5">
        <StatusActions id={id} status={status} />
        <div className="ml-auto">
          <OutcomeDialog hypothesis={hypothesis} />
        </div>
      </CardFooter>
    </Card>
  );
}
