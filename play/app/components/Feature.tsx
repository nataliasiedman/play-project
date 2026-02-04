import Link from "next/link";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  { title: "Learn by playing", description: "Practice English with quick rounds that feel like a game.", icon: "🎮" },
  { title: "Colors + words together", description: "Connect color memory with vocabulary to remember faster.", icon: "🎨" },
  { title: "No pressure", description: "Short sessions, gentle progress, and confidence building.", icon: "🌈" },
  { title: "Track your progress", description: "See your streaks and improvements over time (coming soon).", icon: "📈" },
  { title: "Levels that make sense", description: "Start easy and grow step-by-step with curated words.", icon: "🧩" },
  { title: "Mobile friendly", description: "Play anywhere — clean UI that works on any screen.", icon: "📱" },
];

export default function FeaturesPage() {
  return (
    <main className="bg-gradient-to-b from-pink-50 via-fuchsia-50 to-violet-50">

  
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            Features that make learning
            <span className="block bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              feel easy
            </span>
          </h1>

          <p className="mt-4 text-lg text-neutral-600">
            ColorWords is designed to be fun, calm, and effective — so you can learn English with confidence.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/game"
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-neutral-800 active:scale-[0.99]"
            >
              Start playing 🎮
            </Link>

            <Link
              href="/"
              className="rounded-full border border-white/40 bg-white/35 px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur-md transition hover:bg-white/40"
            >
              Back home
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-white/40 bg-white/35 p-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/45 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 via-fuchsia-50 to-violet-50 shadow-sm">
                  <span className="text-xl">{f.icon}</span>
                </div>

                <h3 className="text-base font-extrabold text-neutral-900">
                  {f.title}
                </h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/40 bg-white/35 p-6 shadow-sm backdrop-blur-md">
          <p className="text-sm text-neutral-700">
            ✨ Tip: Keep sessions short. Even 5 minutes a day is real progress.
          </p>
        </div>
      </section>
    </main>
  );
}
