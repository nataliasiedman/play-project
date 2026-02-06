import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifica se as variáveis existem para não quebrar o site
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Link do Supabase não encontrado nas variáveis de ambiente! ❌");
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);