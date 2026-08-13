"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandMark } from "./brand-mark";
import { useOrder } from "./order-provider";

const nav = [
  { href: "/menu", label: "Меню" },
  { href: "/visit", label: "В гости" },
  { href: "/#about", label: "О бренде" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { count, openCart } = useOrder();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-oyster/88 backdrop-blur-xl">
      <div className="container-shell flex h-[var(--header-height)] items-center justify-between gap-6">
        <BrandMark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} className="relative py-2 text-[13px] font-bold" href={item.href}>
              {item.label}
              {pathname === item.href && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-ink" />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <button className="button button-primary min-h-11 px-5" onClick={openCart} type="button" aria-label={`Открыть заказ, позиций: ${count}`}>
              Заказ
              <span className="grid min-w-5 place-items-center rounded-full bg-white px-1.5 py-0.5 text-[10px] text-ink">{count}</span>
            </button>
          </div>
          <div className="md:hidden">
            <button className="icon-button" onClick={openCart} type="button" aria-label={`Открыть заказ, позиций: ${count}`}>
              <span className="text-xs font-extrabold">{count}</span>
            </button>
          </div>
          <div className="md:hidden">
            <button className="icon-button" onClick={() => setOpen((value) => !value)} type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Закрыть меню" : "Открыть меню"}>
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span className={`h-[2px] w-5 bg-current transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
                <span className={`h-[2px] w-5 bg-current transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="absolute inset-x-0 top-full border-b border-ink/10 bg-oyster px-3 pb-3 md:hidden"
            aria-label="Мобильная навигация"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="rounded-[24px] bg-ink p-3 text-white">
              {nav.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center justify-between border-b border-white/15 px-3 text-lg font-bold last:border-0">
                  {item.label}<span className="text-xs opacity-50">0{index + 1}</span>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
