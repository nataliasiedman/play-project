"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage("Please fill in email and password.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setMessage(
        "Account created! If email confirmation is enabled, check your inbox 📧"
      );
    } catch (err: any) {
      setMessage(err?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function continueWithoutAccount() {
    router.push("/play");
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50" />

      <section className="mx-auto flex max-w-6xl justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-sm backdrop-blur">
          <div className="text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 shadow-sm">
              🎨
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-neutral-600">
              Start learning English in a calm and playful way 🌈
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-neutral-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-neutral-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-extrabold text-white"
            >
              {loading ? "Creating..." : "Create account ✨"}
            </button>

            {message && (
              <p className="text-center text-sm text-neutral-600">{message}</p>
            )}
          </form>

          <button
            onClick={continueWithoutAccount}
            className="mt-6 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold"
          >
            Continue without account →
          </button>
        </div>
      </section>
    </main>
  );
}