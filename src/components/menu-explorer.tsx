"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { categories, formatPrice, menuItems, type MenuCategory } from "@/lib/menu";
import { useOrder } from "./order-provider";

export function MenuExplorer() {
  const [category, setCategory] = useState<MenuCategory>("coffee");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { addItem, count, total, openCart } = useOrder();
  const reduced = useReducedMotion();
  const items = useMemo(() => menuItems.filter((item) => item.category === category), [category]);

  function handleAdd(id: string) {
    addItem(id);
    setJustAdded(id);
    window.setTimeout(() => setJustAdded((current) => current === id ? null : current), 1200);
  }

  return (
    <div>
      <div className="sticky top-[var(--header-height)] z-30 -mx-3 border-y border-ink/12 bg-oyster/92 px-3 py-3 backdrop-blur-xl sm:mx-0 sm:px-0">
        <div className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap" role="tablist" aria-label="Категории меню">
          {categories.map((item) => <button key={item.id} role="tab" aria-selected={category === item.id} onClick={() => setCategory(item.id)} className={`button min-h-11 shrink-0 px-4 ${category === item.id ? "button-primary" : "button-outline"}`} type="button">{item.label}</button>)}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={category} className="grid gap-3 py-8 md:grid-cols-2" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
          {items.map((item, index) => (
            <article key={item.id} className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] border border-ink/14 p-5 sm:p-7 ${item.featured ? "bg-mist" : "bg-white/32"}`}>
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--cobalt)_0_49%,var(--oyster)_49%_51%,var(--persimmon)_51%)] opacity-0 transition-opacity group-hover:opacity-100" />
              <div>
                <div className="flex items-start justify-between gap-5"><span className="text-[11px] font-extrabold tracking-[.1em] text-ink/65 uppercase">{String(index + 1).padStart(2, "0")} · {categories.find((cat) => cat.id === category)?.shortLabel}</span><strong>{formatPrice(item.price)}</strong></div>
                <h2 className="mt-8 text-2xl leading-tight font-extrabold tracking-[-.04em] sm:text-3xl">{item.name}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-ink/70">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">{item.volume && <span className="rounded-full border border-ink/14 px-3 py-1 text-[10px] font-bold">{item.volume}</span>}{item.tags?.map((tag) => <span key={tag} className="rounded-full bg-oyster px-3 py-1 text-[10px] font-bold">{tag}</span>)}</div>
              </div>
              <button type="button" onClick={() => handleAdd(item.id)} className="mt-8 flex min-h-12 w-full items-center justify-between rounded-full bg-ink px-5 text-sm font-extrabold text-white transition-colors hover:bg-cobalt" aria-live="polite" aria-label={`${justAdded === item.id ? "Добавлено" : "Добавить"} ${item.name}`}>
                <span>{justAdded === item.id ? "Добавлено" : "Добавить"}</span><span aria-hidden="true" className="text-lg">{justAdded === item.id ? "✓" : "+"}</span>
              </button>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
      {count > 0 && (
        <div className="fixed inset-x-0 bottom-3 z-40 px-3 md:hidden">
          <button className="flex min-h-14 w-full items-center justify-between rounded-full bg-cobalt px-5 font-extrabold text-white shadow-2xl" type="button" onClick={openCart}><span>Заказ · {count}</span><span>{formatPrice(total)} →</span></button>
        </div>
      )}
      <div className="mt-2 flex flex-col items-start justify-between gap-5 rounded-[28px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:p-8"><div><h2 className="text-xl font-extrabold">Не хотите собирать заказ сейчас?</h2><p className="mt-2 text-sm text-white/75">Меню доступно и в кофейне. Среднее время выдачи напитка — 8 минут.</p></div><Link href="/visit" className="button button-light shrink-0">Как нас найти</Link></div>
    </div>
  );
}
