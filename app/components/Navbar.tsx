"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href: string };

type NavbarProps = {
  brand?: { label: string; href: string; badge?: string };
  items?: NavItem[];
  cta?: { label: string; href: string };
};

const defaultItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Play", href: "/game" },
  { label: "Levels", href: "/Levels" },
  { label: "About", href: "/about" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  brand = { label: "ColorWords", href: "/", badge: "✨ fun mode" },
  items = defaultItems,
  cta = { label: "Create account ✨", href: "/signup" },
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const normalizedPath = useMemo(() => {
    if (!pathname) return "/";
    if (pathname !== "/" && pathname.endsWith("/")) return pathname.slice(0, -1);
    return pathname;
  }, [pathname]);

  const isActive = (href: string) => {
    const normalizedHref =
      href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
    return normalizedPath === normalizedHref;
  };

  useEffect(() => setOpen(false), [normalizedPath]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-pink-100/80 via-fuchsia-100/80 to-violet-100/80 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          {/* Brand */}
          <Link
            href={brand.href}
            className="group inline-flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20"
            aria-label={`${brand.label} home`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-neutral-200 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 shadow-sm transition group-hover:rotate-2 group-hover:scale-[1.02]">
              <span className="text-lg">🎨</span>
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight md:text-lg">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {brand.label}
                </span>
              </span>
              {brand.badge ? (
                <span className="w-fit rounded-full border border-neutral-200 bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 shadow-sm">
                  {brand.badge}
                </span>
              ) : null}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-2 md:flex">
            {items.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold outline-none transition",
                    "focus-visible:ring-2 focus-visible:ring-purple-500/20",
                    active
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-200" 
                      : "text-neutral-700 hover:bg-purple-50 hover:text-purple-700 hover:-translate-y-0.5"
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Link
              href={cta.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-extrabold text-white shadow-sm",
                "bg-gradient-to-r from-pink-600/90 via-purple-600/90 to-blue-600/90",
                "transition hover:brightness-110 active:scale-[0.99]",
                "outline-none focus-visible:ring-2 focus-visible:ring-purple-600/20"
              )}
            >
              {cta.label}
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-2xl border border-neutral-200 p-2 md:hidden",
              "bg-white/80 shadow-sm outline-none transition hover:bg-neutral-50",
              "focus-visible:ring-2 focus-visible:ring-purple-600/20"
            )}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg">{open ? "✖️" : "🍔"}</span>
          </button>
        </nav>
      </div>

      {/* Mobile overlay + panel */}
      <div className={cn("md:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 z-40 bg-black/25 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        <div className="fixed left-0 right-0 top-[64px] z-50 mx-auto w-full max-w-6xl px-4">
          <div
            className={cn(
              "rounded-3xl border border-neutral-200 bg-white/90 p-3 shadow-xl backdrop-blur-xl transition",
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="rounded-2xl bg-gradient-to-r from-yellow-50 via-pink-50 to-blue-50 p-3">
                <p className="text-sm font-semibold text-neutral-900">Ready to learn English? 🚀</p>
                <p className="text-xs text-neutral-600">No pressure. Just progress.</p>
              </div>

              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-semibold transition outline-none",
                      active
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm"
                        : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                    )}
                  >
                    {active ? "✨ " : "👉 "}
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href={cta.href}
                className="mt-1 rounded-2xl px-4 py-3 text-center text-sm font-extrabold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
              >
                {cta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}