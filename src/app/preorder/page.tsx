import type { Metadata } from "next";
import { PreorderForm } from "@/components/preorder-form";

export const metadata: Metadata = { title: "Заказ к выдаче", description: "Демонстрационный preorder flow ПОЛУТОН: состав, время выдачи, validation и confirmation." };

export default function PreorderPage() {
  return <div className="container-shell py-12 pb-24 sm:py-20"><div className="mb-10 max-w-3xl"><p className="eyebrow text-[#B83320]">Заказ к выдаче</p><h1 className="mt-6 text-[clamp(2.8rem,6vw,6.6rem)] leading-[.95] font-extrabold tracking-[-.07em]">Без очереди.<br />Без настоящей оплаты.</h1><p className="mt-5 max-w-xl text-sm leading-6 text-ink/70">Рабочий demo-flow с корзиной, validation, success и error states. Данные остаются в браузере.</p></div><PreorderForm /></div>;
}
