import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu-explorer";

export const metadata: Metadata = { title: "Меню", description: "Кофе, авторские напитки, выпечка и завтраки ПОЛУТОН — с ценами и заказом к выдаче." };

export default function MenuPage() {
  return (
    <div className="pb-24">
      <section className="border-b border-ink/12 bg-[linear-gradient(105deg,var(--cobalt)_0_16%,var(--mist)_16%_82%,var(--persimmon)_82%)] py-14 sm:py-20">
        <div className="container-shell"><p className="eyebrow">Меню · август 2026</p><h1 className="display mt-7 max-w-5xl text-[clamp(2.75rem,9vw,9rem)] break-words">ВЫБЕРИТЕ СВОЙ ОТТЕНОК</h1><div className="mt-8 grid max-w-4xl gap-5 text-sm leading-6 text-ink/65 sm:grid-cols-2"><p>Цены и ассортимент демонстрационные, но собраны в реалистичной локальной рамке.</p><p>Растительное молоко +80 ₽. Состав и dietary tags показаны до добавления в заказ.</p></div></div>
      </section>
      <section className="container-shell"><MenuExplorer /></section>
    </div>
  );
}
