"use client";

import { useActionState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { createHypothesis } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CHANNEL_SUGGESTIONS = [
  "Email",
  "Paid Ads",
  "SEO",
  "Контент",
  "Соцмережі",
  "Реферали",
  "Outbound",
  "Партнерства",
  "Продукт",
];

const initialState = { ok: false, error: null };

export function HypothesisForm() {
  const [state, formAction, pending] = useActionState(
    createHypothesis,
    initialState
  );
  const formRef = useRef(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Нова гіпотеза</CardTitle>
        <CardDescription>
          Опишіть, що перевіряєте, і на якому каналі. Статус буде «Нова».
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="text">Гіпотеза</Label>
            <Textarea
              id="text"
              name="text"
              rows={3}
              required
              placeholder="Якщо ми…, то…, тому що…"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="channel">Канал</Label>
            <Input
              id="channel"
              name="channel"
              required
              list="channel-suggestions"
              placeholder="Наприклад, Paid Ads"
            />
            <datalist id="channel-suggestions">
              {CHANNEL_SUGGESTIONS.map((channel) => (
                <option key={channel} value={channel} />
              ))}
            </datalist>
          </div>

          {state.error ? (
            <p className="text-sm text-destructive" role="alert">
              {state.error}
            </p>
          ) : null}

          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              <Plus data-icon="inline-start" />
              {pending ? "Додаємо…" : "Додати гіпотезу"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
