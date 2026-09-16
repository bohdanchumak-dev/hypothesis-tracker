# Трекер гіпотез

Next.js (App Router, JavaScript) + shadcn/ui + Supabase.

## Що вміє

1. Додати гіпотезу — текст і канал, статус «Нова».
2. Показати список, найновіші зверху.
3. Перемкнути статус: Нова → У тесті → Підтверджена або Спростована.
4. Дописати результат і висновок до наявної гіпотези.
5. Відфільтрувати список за статусом.

## Налаштування

1. Скопіюйте ключі:

   ```bash
   cp .env.example .env
   ```

   Заповніть `NEXT_PUBLIC_SUPABASE_URL` і `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   зі сторінки Supabase → Project Settings → API.

2. Застосуйте міграції з `supabase/migrations` — через Supabase CLI:

   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

   або вставте вміст обох `.sql` файлів у SQL Editor у дашборді, по черзі.

3. Запустіть:

   ```bash
   npm run dev
   ```

## Структура

- `src/app/page.js` — список, фільтр, форма.
- `src/app/actions.js` — server actions: створення, зміна статусу, результат.
- `src/lib/hypotheses.js` — статуси та дозволені переходи.
- `src/lib/supabase/` — клієнти Supabase (browser і server).
- `supabase/migrations/` — схема таблиці `hypotheses` і політики RLS.

## Важливо про доступ

Застосунок без автентифікації, тому міграція `..._hypotheses_rls.sql` вмикає RLS
і дає anon-ключу повний доступ до таблиці. Для публічного деплою замініть ці
політики на правила на основі `auth.uid()`.
