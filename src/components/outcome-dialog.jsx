"use client";

import { useActionState, useState } from "react";
import { NotebookPen } from "lucide-react";
import { saveOutcome } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState = { ok: false, error: null };

export function OutcomeDialog({ hypothesis }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(async (prev, formData) => {
    const next = await saveOutcome(prev, formData);
    if (next.ok) setOpen(false);
    return next;
  }, initialState);

  const hasOutcome = Boolean(hypothesis.result || hypothesis.conclusion);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <NotebookPen data-icon="inline-start" />
          {hasOutcome ? "Редагувати результат" : "Дописати результат"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Результат і висновок</DialogTitle>
          <DialogDescription className="line-clamp-2">
            {hypothesis.text}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="id" value={hypothesis.id} />

          <div className="grid gap-2">
            <Label htmlFor={`result-${hypothesis.id}`}>Результат</Label>
            <Textarea
              id={`result-${hypothesis.id}`}
              name="result"
              rows={3}
              defaultValue={hypothesis.result ?? ""}
              placeholder="Що показали цифри: метрики, вибірка, період."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`conclusion-${hypothesis.id}`}>Висновок</Label>
            <Textarea
              id={`conclusion-${hypothesis.id}`}
              name="conclusion"
              rows={3}
              defaultValue={hypothesis.conclusion ?? ""}
              placeholder="Що з цим робимо далі."
            />
          </div>

          {state.error ? (
            <p className="text-sm text-destructive" role="alert">
              {state.error}
            </p>
          ) : null}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Скасувати
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Зберігаємо…" : "Зберегти"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
