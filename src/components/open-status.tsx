"use client";

import { useSyncExternalStore } from "react";

function getStatus() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Moscow", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  const time = hour * 60 + minute;
  if (time < 480 || time >= 1320) return "closed";
  return time < 1230 ? "open-kitchen" : "open-no-kitchen";
}

function subscribe() { return () => undefined; }

export function OpenStatus() {
  const status = useSyncExternalStore(subscribe, getStatus, () => "checking");
  if (status === "checking") return <span className="rounded-full bg-white/65 px-3 py-1.5 text-xs font-bold">Проверяем статус…</span>;
  const open = status !== "closed";
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${open ? "bg-[#D5F7C8]" : "bg-white/65"}`}><span className={`h-2 w-2 rounded-full ${open ? "bg-[#167A20]" : "bg-ink/45"}`} />{open ? `Открыто · кухня ${status === "open-kitchen" ? "работает" : "закрыта"}` : "Сейчас закрыто · с 08:00"}</span>;
}
