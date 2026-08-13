# QA report

Проверено 13 августа 2026 на production build локально.

## Автоматические проверки

| Проверка | Результат |
|---|---|
| ESLint | passed |
| TypeScript `--noEmit` | passed |
| Vitest | 4 / 4 passed |
| Next.js production build | passed, 10 static routes |
| Playwright core flow | desktop + mobile passed |
| Axe serious/critical | 0 на Home, Menu, Visit, Preorder; desktop + mobile |
| Responsive overflow | 360, 390, 768, 1024, 1440; Home, Menu, Visit, Preorder passed |
| Reduced motion | navigation, menu и 3D fallback passed |

## Проверенные сценарии

- desktop и mobile navigation;
- переключение категорий меню;
- добавление и изменение состава заказа;
- empty, validation, simulated error и honest demo-success states;
- внешний map CTA и внутренние ссылки;
- WebGL desktop enhancement и static mobile/reduced-motion fallback;
- отсутствие horizontal page overflow;
- keyboard-visible focus и корректные button/link/form semantics.

## Performance decisions

- все product routes prerendered статически;
- 3D не использует `.glb` и textures: геометрия создаётся процедурно;
- WebGL загружается динамически после usable HTML и только от 769 px;
- `deviceMemory <= 2`, reduced motion и unsupported WebGL отключают realtime scene;
- основной fallback WebP — 44 KB; два art-directed WebP изображения — 67 KB и 93 KB;
- шрифты self-hosted, внешние runtime media/API dependencies отсутствуют.

Локальные lab timings сохраняются в `artifacts/qa/performance.json`. Они нужны для regression-контроля и не выдаются за field data реальных пользователей.

| Unthrottled local production run | Mobile 390 | Desktop 1440 |
|---|---:|---:|
| FCP | 148 ms | 184 ms |
| LCP | 148 ms | 360 ms |
| CLS | 0.0012 | 0.0007 |
| Transfer | 418 KB | 728 KB |
| JS transfer | 202 KB | 433 KB |
| 3D mode | fallback | realtime WebGL |

Browser capture зафиксировал **0 console/page errors**. Dev-only warnings относятся к deprecation внутри Three/Drei и GPU `readPixels` при создании screenshots; пользовательские сценарии и production build не падают.
