export const STATUSES = ["new", "testing", "validated", "invalidated"];

export const STATUS_LABELS = {
  new: "Нова",
  testing: "У тесті",
  validated: "Підтверджена",
  invalidated: "Спростована",
};

// Lifecycle: нова → у тесті → підтверджена | спростована.
export const STATUS_TRANSITIONS = {
  new: ["testing"],
  testing: ["validated", "invalidated"],
  validated: [],
  invalidated: [],
};

export const STATUS_BADGE_CLASSES = {
  new: "border-transparent bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  testing:
    "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  validated:
    "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  invalidated:
    "border-transparent bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

export function isStatus(value) {
  return STATUSES.includes(value);
}

export function nextStatuses(status) {
  return STATUS_TRANSITIONS[status] ?? [];
}

export function canTransition(from, to) {
  return nextStatuses(from).includes(to);
}

export function isFinal(status) {
  return nextStatuses(status).length === 0;
}
