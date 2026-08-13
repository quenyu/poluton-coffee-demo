# Motion system

## Microinteraction

- Button hover: 160 ms lift, press scale `0.985`.
- Menu card action: label changes to “Добавлено” for 1200 ms.
- Tabs: 200 ms opacity and 10 px vertical transition.

## Navigation

- Page content: 420 ms opacity + 9 px translate using `cubic-bezier(.22, 1, .36, 1)`.
- Mobile menu: 180 ms opacity/translate; no scroll hijacking.
- Cart: damped spring (`stiffness 360`, `damping 38`).

## Scroll

- Sections reveal once as they enter the viewport.
- Content order and readability never depend on animation.

## 3D

- Procedural cup reacts within ±0.26 rad to pointer and uses a 0.035-unit idle drift.
- WebGL starts during idle time only on viewports ≥769 px and devices above the low-memory threshold.
- Mobile, WebGL failure and `prefers-reduced-motion` use the optimized 44 KB pre-rendered cup.

`prefers-reduced-motion: reduce` removes transitions while preserving navigation, menu filtering and preorder UX.
