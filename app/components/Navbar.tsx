"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/languageContext";

type NavbarProps = {
  brand?: { label: string; href: string; badge?: string };
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  brand = { label: "ColorWords", href: "/", badge: "✨ fun mode" },
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const { lang, setLang, t } = useLanguage();

  // Mapeamento das bandeiras
  const languageData = {
    en: { label: 'English', flag: '🇺🇸' },
    pt: { label: 'Português', flag: '🇧🇷' },
    es: { label: 'Español', flag: '🇪🇸' },
    fr: { label: 'Français', flag: '🇫🇷' },
    zh: { label: '中文', flag: '🇨🇳' },
  } as const;

  // Geramos os itens do menu dinamicamente usando t.nav
  const navItems = useMemo(() => [
    { label: t.nav.home, href: "/" },
    { label: t.nav.play, href: "/game" },
    { label: t.nav.levels, href: "/Levels" },
    { label: t.nav.about, href: "/about" },
  ], [t]);

  const normalizedPath = useMemo(() => {
    if (!pathname) return "/";
    if (pathname !== "/" && pathname.endsWith("/")) return pathname.slice(0, -1);
    return pathname;
  }, [pathname]);

  const isActive = (href: string) => {
    const normalizedHref = href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
    return normalizedPath === normalizedHref;
  };

  useEffect(() => {
    setOpen(false);
    setLangMenuOpen(false);
  }, [normalizedPath]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-pink-100/80 via-fuchsia-100/80 to-violet-100/80 backdrop-blur-md border-b border-white/20">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          
          {/* Brand */}
          <Link href={brand.href} className="group inline-flex items-center gap-3 outline-none">
            <span className="grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-2xl border border-white bg-white/50 shadow-sm transition group-hover:rotate-2">
              <span className="text-lg">🎨</span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm md:text-base font-extrabold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                {brand.label}
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  isActive(item.href) ? "bg-white text-purple-600 shadow-sm" : "text-neutral-600 hover:text-purple-600"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            
            {/* Selector de Idiomas */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white/40 shadow-sm transition hover:scale-105 active:scale-95"
              >
                <span className="text-xl">{languageData[lang as keyof typeof languageData].flag}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-20 w-40 overflow-hidden rounded-2xl border border-white bg-white/95 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                    {(Object.keys(languageData) as Array<keyof typeof languageData>).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLang(code);
                          setLangMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3 text-sm font-bold transition hover:bg-purple-50",
                          lang === code ? "text-purple-600 bg-purple-50" : "text-neutral-600"
                        )}
                      >
                        <span className="text-lg">{languageData[code].flag}</span>
                        {languageData[code].label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop CTA */}
            <Link 
              href="/signup" 
              className="hidden md:block rounded-full px-5 py-2.5 text-sm font-extrabold text-white shadow-md bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
            >
              {t.nav.cta}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setOpen(!open)} 
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white/50 md:hidden transition active:scale-90"
            >
              <span className="text-lg">{open ? "✖️" : "🪄"}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      {open && (
        <div className="fixed inset-x-0 top-[70px] z-50 mx-4 md:hidden">
          <div className="rounded-3xl border border-white bg-white/95 p-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-4 text-base font-bold transition",
                    isActive(item.href) ? "bg-purple-600 text-white shadow-md" : "bg-white/50 text-neutral-700 active:bg-purple-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="/signup" 
                className="mt-1 rounded-2xl px-4 py-4 text-center text-base font-extrabold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 shadow-lg"
              >
                {t.nav.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}