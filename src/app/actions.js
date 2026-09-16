"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { canTransition, isStatus } from "@/lib/hypotheses";

function fail(message) {
  return { ok: false, error: message };
}

export async function createHypothesis(_prevState, formData) {
  const text = String(formData.get("text") ?? "").trim();
  const channel = String(formData.get("channel") ?? "").trim();

  if (!text) return fail("Впишіть формулювання гіпотези.");
  if (!channel) return fail("Вкажіть канал.");

  const supabase = await createClient();
  const { error } = await supabase
    .from("hypotheses")
    .insert({ text, channel, status: "new" });

  if (error) return fail(error.message);

  revalidatePath("/");
  return { ok: true, error: null };
}

export async function changeStatus(_prevState, formData) {
  const id = String(formData.get("id") ?? "");
  const from = String(formData.get("from") ?? "");
  const to = String(formData.get("to") ?? "");

  if (!id) return fail("Гіпотезу не знайдено.");
  if (!isStatus(to)) return fail("Невідомий статус.");
  if (!canTransition(from, to)) return fail("Такий перехід статусу неможливий.");

  const supabase = await createClient();
  // `eq("status", from)` keeps the transition safe if someone else moved it meanwhile.
  const { data, error } = await supabase
    .from("hypotheses")
    .update({ status: to })
    .eq("id", id)
    .eq("status", from)
    .select("id");

  if (error) return fail(error.message);
  if (!data?.length) return fail("Статус уже змінили в іншій вкладці. Оновіть сторінку.");

  revalidatePath("/");
  return { ok: true, error: null };
}

export async function saveOutcome(_prevState, formData) {
  const id = String(formData.get("id") ?? "");
  const result = String(formData.get("result") ?? "").trim();
  const conclusion = String(formData.get("conclusion") ?? "").trim();

  if (!id) return fail("Гіпотезу не знайдено.");
  if (!result && !conclusion) return fail("Заповніть результат або висновок.");

  const supabase = await createClient();
  const { error } = await supabase
    .from("hypotheses")
    .update({ result: result || null, conclusion: conclusion || null })
    .eq("id", id);

  if (error) return fail(error.message);

  revalidatePath("/");
  return { ok: true, error: null };
}
