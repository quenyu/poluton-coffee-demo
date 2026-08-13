# ПОЛУТОН — portfolio case copy

**Concept / Demo Project.** ПОЛУТОН — вымышленный specialty coffee brand. Проект не выдаётся за оплаченный клиентский заказ и не содержит вымышленных бизнес-метрик.

## Problem / opportunity

У локальной кофейни две задачи происходят одновременно: за несколько секунд создать эмоциональное впечатление о месте и без трения ответить на практические вопросы — что заказать, сколько это стоит, где находится кофейня и когда забрать заказ. Многие визуально сильные hospitality-сайты теряют menu/location UX; утилитарные сервисы, наоборот, стирают характер бренда.

## Visual idea

Identity построена вокруг полутонов вкуса — пространства между «кисло» и «горько», быстрым takeaway и спокойным завтраком. Вместо ожидаемого beige + serif используются Oyster paper, Ink, Cobalt и Persimmon, Unbounded для смысловых акцентов и Manrope для интерфейса. Вертикальный разрез работает как повторяемый brand device в логотипе, упаковке, поверхностях и переходах.

## UX

Главный сценарий — заказ к выдаче: Home/Menu → категория → состав и цена → корзина → слот выдачи → контакт → честное demo-confirmation. Меню поддерживает быстрое переключение категорий, объём и dietary tags. Visit собирает адрес, часы, текущий статус, формат пространства, ориентир и маршрут без гигантской карты. Все демонстрационные данные прямо обозначены.

## 3D & motion

Hero использует процедурный двухцветный стакан, а не случайную абстрактную форму. На desktop объект мягко отвечает на pointer и раскрывает обе цветовые стороны. Canvas запускается в idle, не блокирует usable HTML и не является критичным для UX. Mobile, low-memory, WebGL failure и reduced motion получают оптимизированный 44 KB render. Motion-system разделяет быстрый feedback, navigation, scroll reveal и controlled 3D response; scroll hijacking отсутствует.

## Implementation

Сайт реализован на Next.js, React и TypeScript с Tailwind CSS, Motion и React Three Fiber. Страницы статически prerendered; изображения оптимизированы, шрифты self-hosted. Реализованы семантическая структура, keyboard navigation, focus states, validation/error/success states, Open Graph, favicon, sitemap, robots и `prefers-reduced-motion`.

## Result

Готов production-build небольшого коммерческого сайта: Home, Menu, Visit, Preorder и Privacy; desktop и mobile UX; интерактивное меню и demo preorder; осмысленный 3D с fallback; responsive QA на 360, 390, 768, 1024 и 1440 px; unit, end-to-end и automated accessibility tests; portfolio-ready desktop/mobile/close-up frames. Реальные продажи, конверсия и клиентские результаты не заявляются.
