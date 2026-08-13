import type { Metadata } from "next";

export const metadata: Metadata = { title: "Демо-политика" };

export default function PrivacyPage() {
  return <article className="container-shell max-w-3xl py-16 sm:py-24"><p className="eyebrow text-cobalt">Concept / Demo</p><h1 className="mt-6 text-4xl font-extrabold tracking-[-.06em] sm:text-6xl">Данные не отправляются.</h1><div className="mt-10 grid gap-6 text-sm leading-7 text-ink/65"><p>ПОЛУТОН — вымышленный бренд и демонстрационный проект. Формы работают только в интерфейсе браузера: нет backend, базы данных, оплаты, уведомлений или реального бронирования.</p><p>Имя и телефон используются только для демонстрации validation и confirmation state и исчезают после обновления страницы. Analytics и рекламные трекеры не подключены.</p><p>Адрес, телефон, ассортимент, цены и режим работы придуманы для концепта и не являются публичной офертой.</p></div></article>;
}
