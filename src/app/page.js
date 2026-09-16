import { createClient } from "@/lib/supabase/server";
import { STATUSES, isStatus } from "@/lib/hypotheses";
import { HypothesisCard } from "@/components/hypothesis-card";
import { HypothesisForm } from "@/components/hypothesis-form";
import { StatusFilter } from "@/components/status-filter";

export const dynamic = "force-dynamic";

function countByStatus(rows) {
  const counts = { all: rows.length };
  for (const status of STATUSES) counts[status] = 0;
  for (const row of rows) counts[row.status] += 1;
  return counts;
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const requested = params?.status;
  const activeStatus = isStatus(requested) ? requested : "all";

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hypotheses")
    .select("id, text, channel, status, result, conclusion, created_at")
    .order("created_at", { ascending: false });

  const rows = data ?? [];
  const counts = countByStatus(rows);
  const visible =
    activeStatus === "all"
      ? rows
      : rows.filter((row) => row.status === activeStatus);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Трекер гіпотез
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Нова → У тесті → Підтверджена або Спростована.
        </p>
      </header>

      <div className="grid gap-8">
        <HypothesisForm />

        {error ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
          >
            <p className="font-medium text-destructive">
              Не вдалося завантажити гіпотези.
            </p>
            <p className="mt-1 text-muted-foreground">{error.message}</p>
            <p className="mt-2 text-muted-foreground">
              Перевірте ключі в <code>.env</code> та застосуйте міграції з{" "}
              <code>supabase/migrations</code>.
            </p>
          </div>
        ) : (
          <section className="grid gap-4">
            <StatusFilter active={activeStatus} counts={counts} />

            {visible.length === 0 ? (
              <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                {rows.length === 0
                  ? "Ще жодної гіпотези. Додайте першу вище."
                  : "У цьому статусі поки порожньо."}
              </p>
            ) : (
              <ul className="grid gap-4">
                {visible.map((hypothesis) => (
                  <li key={hypothesis.id}>
                    <HypothesisCard hypothesis={hypothesis} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
