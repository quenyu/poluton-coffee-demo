import Link from "next/link";

export default function NotFound() {
  return <div className="container-shell grid min-h-[65svh] place-items-center py-16 text-center"><div><p className="display text-[clamp(5rem,18vw,13rem)] text-cobalt">404</p><h1 className="mt-5 text-2xl font-extrabold">Такого оттенка нет</h1><p className="mt-3 text-sm text-ink/70">Вернитесь к меню или на главную.</p><div className="mt-7 flex justify-center gap-2"><Link href="/" className="button button-primary">На главную</Link><Link href="/menu" className="button button-outline">Меню</Link></div></div></div>;
}
