"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/menu";
import { useOrder } from "./order-provider";

export function OrderDrawer() {
  const { lines, count, total, isCartOpen, closeCart, addItem, decrementItem, removeItem } = useOrder();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            aria-label="Закрыть заказ"
            className="fixed inset-0 z-[70] cursor-default bg-ink/55 backdrop-blur-[2px]"
            onClick={closeCart}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[480px] flex-col bg-oyster shadow-2xl"
            initial={reduced ? { opacity: 0 } : { x: "100%" }} animate={reduced ? { opacity: 1 } : { x: 0 }} exit={reduced ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
          >
            <div className="split-rule" />
            <div className="flex items-center justify-between border-b border-ink/12 px-5 py-5 sm:px-7">
              <div><p className="eyebrow text-cobalt">К выдаче</p><h2 id="cart-title" className="mt-2 text-2xl font-extrabold">Ваш заказ · {count}</h2></div>
              <button className="icon-button" onClick={closeCart} type="button" aria-label="Закрыть"><span aria-hidden="true" className="text-xl">×</span></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div><div className="mx-auto mb-6 grid h-20 w-20 grid-cols-2 overflow-hidden rounded-full"><span className="bg-cobalt" /><span className="bg-persimmon" /></div><h3 className="text-xl font-extrabold">Пока пусто</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-ink/70">Добавьте напиток или завтрак. Настоящая оплата в demo не выполняется.</p><Link href="/menu" onClick={closeCart} className="button button-primary mt-6">Открыть меню</Link></div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {lines.map(({ item, quantity }) => (
                    <article key={item.id} className="surface-card p-4">
                      <div className="flex justify-between gap-4"><div><h3 className="font-extrabold">{item.name}</h3><p className="mt-1 text-xs leading-5 text-ink/70">{item.description}</p></div><strong className="shrink-0 text-sm">{formatPrice(item.price * quantity)}</strong></div>
                      <div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border border-ink/15"><button className="grid h-9 w-10 place-items-center" type="button" aria-label={`Уменьшить ${item.name}`} onClick={() => decrementItem(item.id)}>−</button><span className="min-w-6 text-center text-sm font-bold">{quantity}</span><button className="grid h-9 w-10 place-items-center" type="button" aria-label={`Добавить ${item.name}`} onClick={() => addItem(item.id)}>+</button></div><button type="button" onClick={() => removeItem(item.id)} className="text-xs font-bold underline decoration-ink/30 underline-offset-4">Убрать</button></div>
                    </article>
                  ))}
                </div>
              )}
            </div>
            {lines.length > 0 && (
              <div className="border-t border-ink/12 bg-white/35 p-5 sm:p-7">
                <div className="mb-4 flex items-baseline justify-between"><span className="text-sm text-ink/70">Итого</span><strong className="text-2xl">{formatPrice(total)}</strong></div>
                <Link className="button button-cobalt w-full" href="/preorder" onClick={closeCart}>Выбрать время <span aria-hidden="true">→</span></Link>
                <p className="mt-3 text-center text-[11px] leading-4 text-ink/65">Demo: заказ не уйдёт в кофейню и не потребует оплаты.</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
