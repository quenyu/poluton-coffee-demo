import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink py-10 text-white sm:py-14">
      <div className="container-shell grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">Вкус между крайностями. Кофе, завтраки и короткая пауза в центре Калуги.</p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-bold tracking-[0.1em] text-white/70 uppercase">Навигация</p>
          <div className="grid gap-2.5"><Link href="/menu">Меню</Link><Link href="/visit">В гости</Link><Link href="/preorder">Заказ к выдаче</Link></div>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs font-bold tracking-[0.1em] text-white/70 uppercase">Где и когда</p>
          <p>{site.address}</p><p className="mt-2 text-white/75">{site.hours}</p><p className="text-white/75">{site.kitchenHours}</p>
        </div>
      </div>
      <div className="container-shell mt-12 flex flex-col gap-3 border-t border-white/12 pt-5 text-[11px] text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 ПОЛУТОН · Concept / Demo Project</p>
        <div className="flex gap-5"><Link href="/privacy">Демо-политика</Link><span>Заказы не отправляются</span></div>
      </div>
    </footer>
  );
}
