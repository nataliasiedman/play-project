"use client";

import { useEffect, useState } from "react";

type Slide = {
  badge: string;
  image: string;
};

const slides: Slide[] = [
  { badge: "1/3", image: "🎨" },
  { badge: "2/3", image: "🎮" },
  { badge: "3/3", image: "🌈" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    // ✅ SEM PRETO: nada de bg-black / overlay escuro
    <section className="relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <div className="flex justify-center">
          <div className="relative w-full max-w-5xl">
            {/* ✅ Card com fundo fofo (rosa/lilás), não branco chapado */}
            <div className="rounded-[2.75rem] border border-white/40 bg-gradient-to-b from-pink-50/70 via-fuchsia-50/60 to-violet-50/70 p-6 shadow-sm">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-bold text-neutral-700 backdrop-blur">
                  {slide.badge}
                </span>
                <span className="text-xs font-semibold text-neutral-600">
                  ColorWords
                </span>
              </div>

              {/* “Tela” grande */}
              <div className="mt-6 rounded-[2.25rem] border border-white/30 bg-white/35 p-10 shadow-sm backdrop-blur-md md:p-16">
                <div className="grid place-items-center">
                  <div className="select-none text-[110px] leading-none md:text-[180px]">
                    {slide.image}
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm font-extrabold md:gap-4 md:text-base">
                <div className="rounded-2xl bg-pink-100/60 py-3 text-center text-pink-900">
                  Pink
                </div>
                <div className="rounded-2xl bg-fuchsia-100/60 py-3 text-center text-fuchsia-900">
                  Lilac
                </div>
                <div className="rounded-2xl bg-violet-100/60 py-3 text-center text-violet-900">
                  Violet
                </div>
              </div>
            </div>

            {/* ✅ brilho suave (não escuro) */}
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-pink-200/25 via-fuchsia-200/15 to-violet-200/25 blur-3xl" />
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-3 w-3 rounded-full transition ${
                i === index ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
