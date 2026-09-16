"use client";

import { useActionState } from "react";
import { CheckCircle2, FlaskConical, XCircle } from "lucide-react";
import { changeStatus } from "@/app/actions";
import { STATUS_LABELS, nextStatuses } from "@/lib/hypotheses";
import { Button } from "@/components/ui/button";

const TRANSITION_UI = {
  testing: { label: "У тест", icon: FlaskConical, variant: "default" },
  validated: { label: "Підтвердити", icon: CheckCircle2, variant: "secondary" },
  invalidated: { label: "Спростувати", icon: XCircle, variant: "destructive" },
};

const initialState = { ok: false, error: null };

export function StatusActions({ id, status }) {
  const [state, formAction, pending] = useActionState(
    changeStatus,
    initialState
  );
  const targets = nextStatuses(status);

  if (!targets.length) return null;

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-1.5">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="from" value={status} />

      {targets.map((target) => {
        const ui = TRANSITION_UI[target];
        const Icon = ui.icon;
        return (
          <Button
            key={target}
            type="submit"
            name="to"
            value={target}
            size="sm"
            variant={ui.variant}
            disabled={pending}
            title={`Перевести в статус «${STATUS_LABELS[target]}»`}
          >
            <Icon data-icon="inline-start" />
            {ui.label}
          </Button>
        );
      })}

      {state.error ? (
        <span className="text-xs text-destructive" role="alert">
          {state.error}
        </span>
      ) : null}
    </form>
  );
}
