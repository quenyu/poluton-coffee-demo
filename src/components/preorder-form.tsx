"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/menu";
import { validateOrderContact, type OrderContact, type OrderErrors } from "@/lib/order-validation";
import { useOrder } from "./order-provider";

const pickupOptions = ["Через 10 минут", "Через 20 минут", "Через 30 минут", "Через 45 минут"];

export function PreorderForm() {
  const { lines, total, addItem, decrementItem, removeItem } = useOrder();
  const [values, setValues] = useState<OrderContact>({ name: "", phone: "", pickup: "" });
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const reduced = useReducedMotion();
  const orderCode = useMemo(() => `P-${String(1042 + lines.length * 7).padStart(4, "0")}`, [lines.length]);

  function update<K extends keyof OrderContact>(key: K, value: OrderContact[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") setStatus("idle");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateOrderContact(values);
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); setStatus("idle"); return; }
    setStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setStatus(values.phone.replace(/\D/g, "").endsWith("0000") ? "error" : "success");
  }

  if (status === "success") {
    return (
      <motion.section className="mx-auto max-w-3xl rounded-[32px] bg-mist p-6 text-center sm:p-12" initial={reduced ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="mx-auto grid h-24 w-24 grid-cols-2 overflow-hidden rounded-full"><span className="bg-cobalt" /><span className="bg-persimmon" /></div>
        <p className="eyebrow mt-8 text-cobalt">Demo confirmation</p>
        <h2 className="mt-5 text-4xl font-extrabold tracking-[-.06em] sm:text-6xl">Заказ собран,<br />но не отправлен.</h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-ink/70">В реальном продукте здесь появится статус {orderCode}, время «{values.pickup}» и уведомление о готовности. В demo данные никуда не передаются.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2"><Link href="/" className="button button-primary">На главную</Link><button className="button button-outline" onClick={() => setStatus("idle")} type="button">Изменить заказ</button></div>
      </motion.section>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
      <section className="rounded-[30px] bg-ink p-5 text-white sm:p-8" aria-labelledby="order-summary-title">
        <div className="flex items-center justify-between"><div><p className="eyebrow text-persimmon">Шаг 1</p><h2 id="order-summary-title" className="mt-3 text-2xl font-extrabold">Состав заказа</h2></div><strong>{formatPrice(total)}</strong></div>
        {lines.length === 0 ? <div className="mt-12 rounded-[24px] border border-white/18 p-6"><p className="font-extrabold">Заказ пуст</p><p className="mt-2 text-sm leading-6 text-white/75">Сначала выберите напиток или еду.</p><Link className="button button-light mt-6" href="/menu">Перейти в меню</Link></div> : <div className="mt-8 grid gap-3">{lines.map(({ item, quantity }) => <article key={item.id} className="rounded-[22px] bg-white/7 p-4"><div className="flex justify-between gap-4"><div><h3 className="font-extrabold">{item.name}</h3><p className="mt-1 text-xs text-white/75">{formatPrice(item.price)} · {item.volume ?? "1 шт."}</p></div><strong>{formatPrice(item.price * quantity)}</strong></div><div className="mt-4 flex items-center justify-between"><div className="flex items-center rounded-full border border-white/18"><button type="button" className="grid h-9 w-10 place-items-center" onClick={() => decrementItem(item.id)} aria-label={`Уменьшить ${item.name}`}>−</button><span className="min-w-7 text-center text-sm font-bold">{quantity}</span><button type="button" className="grid h-9 w-10 place-items-center" onClick={() => addItem(item.id)} aria-label={`Добавить ${item.name}`}>+</button></div><button type="button" onClick={() => removeItem(item.id)} className="text-xs text-white/75 underline underline-offset-4">Убрать</button></div></article>)}</div>}
        <p className="mt-7 text-[11px] leading-5 text-white/70">Concept / Demo: цены, адрес и подтверждение демонстрационные. Оплаты нет.</p>
      </section>

      <form onSubmit={submit} className="rounded-[30px] border border-ink/14 bg-white/35 p-5 sm:p-8" noValidate>
        <p className="eyebrow text-cobalt">Шаг 2</p><h2 className="mt-3 text-2xl font-extrabold">Когда и кому выдать</h2>
        <fieldset className="mt-8"><legend className="text-sm font-extrabold">Время выдачи</legend><div className="mt-3 grid grid-cols-2 gap-2">{pickupOptions.map((option) => <button key={option} type="button" onClick={() => update("pickup", option)} aria-pressed={values.pickup === option} className={`min-h-12 rounded-2xl border px-3 text-left text-xs font-bold transition-colors ${values.pickup === option ? "border-cobalt bg-cobalt text-white" : "border-ink/14 hover:border-ink"}`}>{option}</button>)}</div>{errors.pickup && <p className="mt-2 text-xs font-bold text-[#B42518]" role="alert">{errors.pickup}</p>}</fieldset>
        <div className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-extrabold">Имя<input value={values.name} onChange={(event) => update("name", event.target.value)} className="min-h-13 rounded-2xl border border-ink/18 bg-oyster px-4 outline-none transition-colors focus:border-cobalt" placeholder="Артём" autoComplete="given-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className="text-xs text-[#B42518]" role="alert">{errors.name}</span>}</label>
          <label className="grid gap-2 text-sm font-extrabold">Телефон<input value={values.phone} onChange={(event) => update("phone", event.target.value)} className="min-h-13 rounded-2xl border border-ink/18 bg-oyster px-4 outline-none transition-colors focus:border-cobalt" placeholder="+7 999 000-00-00" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : "phone-note"} /><span id="phone-note" className="text-[11px] font-medium text-ink/65">В реальном сервисе — только для статуса заказа.</span>{errors.phone && <span id="phone-error" className="text-xs text-[#B42518]" role="alert">{errors.phone}</span>}</label>
        </div>
        <AnimatePresence>{status === "error" && <motion.div role="alert" className="mt-6 rounded-2xl border border-[#B42518]/25 bg-[#FFF0ED] p-4 text-sm" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><strong>Не получилось подтвердить demo-заказ.</strong><p className="mt-1 text-ink/70">Проверьте соединение и повторите. Состав заказа сохранён.</p></motion.div>}</AnimatePresence>
        <button className="button button-cobalt mt-7 w-full" type="submit" disabled={lines.length === 0 || status === "submitting"}>{status === "submitting" ? "Проверяем…" : `Подтвердить · ${formatPrice(total)}`}</button>
        <button className="mx-auto mt-4 block text-[11px] font-bold text-ink/65 underline underline-offset-4" type="button" onClick={() => setStatus("error")}>Показать error state (demo)</button>
      </form>
    </div>
  );
}
