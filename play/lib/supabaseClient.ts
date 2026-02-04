import { createClient } from "@supabase/supabase-js";

console.log(
  "URL ok?",
  !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

console.log(
  "KEY ok?",
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").startsWith("sb_publishable_")
);

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);