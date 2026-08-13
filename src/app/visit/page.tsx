import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "В гости", description: "Демо-адрес, часы работы и формат кофейни ПОЛУТОН в Калуге." };

export default function VisitPage() {
  const mapUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(site.address)}`;
  return (
    <div className="pb-5">
      <section className="container-shell grid gap-3 py-3 lg:grid-cols-[1.08fr_.92fr] lg:py-5">
        <div className="relative min-h-[520px] overflow-hidden rounded-[30px] lg:min-h-[720px]"><Image src="/assets/poluton-interior.webp" alt="Демонстрационный интерьер ПОЛУТОН с общим столом и кофейным баром" fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 55vw" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white sm:inset-x-8 sm:bottom-8"><div><p className="eyebrow">28 мест</p><p className="mt-3 max-w-md text-sm leading-6 text-white/72">Общий стол, розетки, тихие места у окна и высокий бар для короткой остановки.</p></div><span className="hidden text-xs font-bold sm:block">dog friendly</span></div></div>
        <div className="flex flex-col justify-between rounded-[30px] bg-persimmon p-5 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4"><p className="eyebrow">В гости</p><OpenStatus /></div>
          <div className="py-16"><h1 className="display text-[clamp(2rem,6vw,6.5rem)] break-words">ТЕАТРАЛЬНАЯ,<br />18</h1><p className="mt-6 max-w-md text-base leading-7 text-ink">Центр Калуги, 4 минуты пешком от Театральной площади. Адрес демонстрационный.</p></div>
          <div className="grid gap-3"><a className="button button-primary w-full" href={mapUrl} target="_blank" rel="noreferrer">Построить маршрут <span aria-hidden="true">↗</span></a><Link className="button border border-ink/24" href="/menu">Заказать к выдаче</Link></div>
        </div>
      </section>
      <section className="container-shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <Reveal><p className="eyebrow text-cobalt">Часы</p><h2 className="display mt-6 text-5xl sm:text-7xl">КАЖДЫЙ<br />ДЕНЬ</h2></Reveal>
          <div className="grid border-t border-ink/18 sm:grid-cols-2">
            {[{ title: "Кофейня", value: "08:00—22:00", note: "последний заказ 21:45" }, { title: "Кухня", value: "08:00—20:30", note: "завтраки весь день" }, { title: "Takeaway", value: "8 минут", note: "обычное время выдачи" }, { title: "Связь", value: site.phone, note: "демо-номер" }].map((item) => <Reveal key={item.title} className="border-b border-ink/18 py-7 sm:px-7 sm:odd:border-r sm:odd:pl-0"><p className="text-xs font-bold text-ink/65">{item.title}</p><p className="mt-8 text-2xl font-extrabold">{item.value}</p><p className="mt-2 text-sm text-ink/70">{item.note}</p></Reveal>)}
          </div>
        </div>
      </section>
      <section className="container-shell"><div className="grid overflow-hidden rounded-[30px] bg-mist md:grid-cols-2"><div className="p-6 sm:p-10"><p className="eyebrow text-cobalt">Ориентир</p><h2 className="mt-7 text-3xl font-extrabold tracking-[-.05em] sm:text-5xl">Синий угол,<br />коралловая дверь.</h2><p className="mt-5 max-w-md text-sm leading-6 text-ink/70">Вход со стороны Театральной улицы. Велопарковка справа от витрины; автомобильная парковка городская.</p></div><div className="grid min-h-[330px] grid-cols-2"><div className="bg-cobalt" /><div className="bg-persimmon" /></div></div></section>
    </div>
  );
}
