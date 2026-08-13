import Image from "next/image";
import Link from "next/link";
import { CupVisual } from "@/components/cup-visual";
import { Reveal } from "@/components/reveal";
import { featuredItems, formatPrice } from "@/lib/menu";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="grain overflow-hidden border-b border-ink/12">
        <div className="container-shell grid min-h-[calc(100svh-110px)] items-stretch gap-3 py-3 lg:grid-cols-[1.02fr_.98fr] lg:py-5">
          <div className="flex min-h-[520px] flex-col justify-between rounded-[30px] bg-mist p-5 sm:p-8 lg:min-h-[690px] lg:p-10">
            <div className="flex items-center justify-between gap-4"><span className="eyebrow text-cobalt">specialty coffee · Калуга</span><span className="hidden text-xs font-bold text-ink/65 sm:block">08:00 — 22:00</span></div>
            <div className="py-10 lg:py-16">
              <h1 className="display text-[clamp(3.05rem,7.8vw,8.15rem)]">ВКУС<br /><span className="text-cobalt">НЕ</span> ДЕЛИТСЯ<br />НА <span className="text-persimmon">ДВА.</span></h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-lg text-base leading-7 text-ink/68 sm:text-lg">ПОЛУТОН — кофе и завтраки для тех, кому интересны оттенки. Закажите заранее и заберите без очереди.</p>
              <div className="flex flex-wrap gap-2"><Link className="button button-primary" href="/menu">Заказать к выдаче <span aria-hidden="true">→</span></Link><Link className="button button-outline" href="/visit">Как найти</Link></div>
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden rounded-[30px] bg-[linear-gradient(90deg,var(--cobalt)_0_49%,var(--oyster)_49%_51%,var(--persimmon)_51%)] lg:min-h-[690px]">
            <div aria-hidden="true" className="absolute inset-x-7 top-7 flex justify-between text-[10px] font-extrabold tracking-[0.11em] text-white uppercase"><span>cold / bright</span><span>warm / round</span></div>
            <CupVisual />
            <div className="absolute bottom-5 left-5 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">01 · фирменный объект</div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="container-shell">
          <Reveal className="grid gap-10 lg:grid-cols-[.62fr_1.38fr] lg:items-end">
            <div><p className="eyebrow text-persimmon">Не лаборатория</p><p className="mt-5 max-w-xs text-sm leading-6 text-white/75">Никаких тестов на «правильность». Помогаем выбрать по настроению и вкусу.</p></div>
            <h2 className="text-[clamp(2.35rem,5vw,5.7rem)] leading-[0.98] font-extrabold tracking-[-0.06em]">Между яркой кислотностью и шоколадной плотностью — десятки вариантов.</h2>
          </Reveal>
          <div className="mt-16 grid border-y border-white/16 sm:grid-cols-3">
            {[{ n: "01", title: "Ярко", copy: "цитрус · ягоды · холод" }, { n: "02", title: "Ровно", copy: "карамель · орех · баланс" }, { n: "03", title: "Плотно", copy: "какао · специи · тепло" }].map((item, index) => (
              <Reveal key={item.n} delay={index * 0.08} className="border-b border-white/16 py-7 sm:border-r sm:border-b-0 sm:px-7 first:pl-0 last:border-r-0">
                <p className="text-xs text-white/72">{item.n}</p><h3 className="display mt-10 text-4xl">{item.title}</h3><p className="mt-4 text-sm text-white/75">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow text-cobalt">Короткое меню</p>
            <h2 className="display mt-6 text-[clamp(3rem,5.7vw,6.8rem)]">СЕЙЧАС<br />НА БАРЕ</h2>
            <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[30px]"><Image src="/assets/poluton-table.webp" alt="Кофе, кардамоновый ролл и тост с грушей" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 43vw" /></div>
          </Reveal>
          <div>
            {featuredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * .05} className="group border-t border-ink/18 py-7 last:border-b">
                <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 sm:gap-6"><span className="text-xs font-bold text-ink/65">0{index + 1}</span><div><h3 className="text-xl font-extrabold sm:text-2xl">{item.name}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-ink/70">{item.description}</p><div className="mt-3 flex gap-2">{item.volume && <span className="rounded-full border border-ink/14 px-2.5 py-1 text-[10px] font-bold">{item.volume}</span>}{item.tags?.map((tag) => <span key={tag} className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-bold">{tag}</span>)}</div></div><strong className="text-base">{formatPrice(item.price)}</strong></div>
              </Reveal>
            ))}
            <Link href="/menu" className="button button-cobalt mt-8">Всё меню <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-ink/12 bg-white/32 py-20 sm:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal><p className="eyebrow text-[#B83320]">Про ПОЛУТОН</p><h2 className="mt-6 max-w-xl text-[clamp(2.4rem,5vw,5.4rem)] leading-[.98] font-extrabold tracking-[-.06em]">Точность без кофейного снобизма.</h2></Reveal>
          <Reveal className="grid gap-6 text-base leading-7 text-ink/65 sm:grid-cols-2"><p>Мы говорим не «этот кофе сложный», а что именно вы почувствуете: грушу, какао, чай или ягоды.</p><p>Меняем зерно и сезонные позиции, но сохраняем понятные вкусовые ориентиры и честные цены.</p></Reveal>
        </div>
      </section>

      <section className="py-3 sm:py-5">
        <div className="container-shell relative min-h-[650px] overflow-hidden rounded-[32px] bg-ink text-white">
          <Image src="/assets/poluton-interior.webp" alt="Демонстрационный интерьер кофейни ПОЛУТОН" fill className="object-cover opacity-75" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
          <div className="relative flex min-h-[650px] flex-col justify-between p-5 sm:p-10"><div className="flex justify-between text-xs font-bold"><span className="eyebrow">В гости</span><span>дeмо-адрес</span></div><div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="display text-[clamp(2.8rem,6.5vw,7.3rem)]">{site.address.replace("Калуга, ", "")}</h2><p className="mt-5 max-w-lg text-sm leading-6 text-white/72">28 мест, общий стол с розетками, тихая зона у окна. С собаками можно.</p></div><div className="flex flex-wrap gap-2"><Link className="button button-light" href="/visit">Часы и маршрут</Link><Link className="button border border-white/28 bg-white/8 text-white" href="/menu">Заказать к выдаче</Link></div></div></div>
        </div>
      </section>
    </>
  );
}
