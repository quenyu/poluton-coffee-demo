# ПОЛУТОН — Figma handoff

Concept / Demo Project. Production implementation is the visual source of truth.

Figma file: https://www.figma.com/design/0MmlhT2IiB8oBj5UvvjBkJ

## Confirmed connector limitation

The design file was created successfully, then the connected Figma Starter plan rejected every following read/write request with: `You've reached the Figma MCP tool call limit on the Starter plan.` No editable layers were claimed as completed.

## File plan

1. `00 Cover` — 1440 × 900 brand cover and Concept / Demo label.
2. `01 Foundations` — color variables, type specimens, spacing, radii, elevation and motion notes.
3. `02 Components` — Button, Category Tab, Menu Item, Field, Pickup Option, Location Status and Header.
4. `03 Desktop` — Home, Menu, Visit and Preorder.
5. `04 Mobile` — Home and Menu at 390 px, plus menu-open and cart states.

## Variables

Import [tokens.tokens.json](./tokens.tokens.json) as the canonical token source. Use one `Value` mode; the website deliberately has no dark theme. Color scopes:

- brand primitives: no picker scope;
- surface colors: `FRAME_FILL`, `SHAPE_FILL`;
- text colors: `TEXT_FILL`;
- borders: `STROKE_COLOR`;
- spacing: `GAP`;
- radii: `CORNER_RADIUS`.

## Typography styles

| Style | Family | Weight | Desktop | Mobile | Line height |
|---|---|---:|---:|---:|---:|
| Display / Hero | Unbounded | 650 | 112 px | 49 px | 91% |
| Display / Section | Unbounded | 650 | 72 px | 46 px | 91% |
| Heading / XL | Manrope | 800 | 64 px | 44 px | 98% |
| Heading / Card | Manrope | 800 | 30 px | 24 px | 112% |
| Body / Large | Manrope | 500 | 18 px | 16 px | 28 px |
| Body / Small | Manrope | 500 | 14 px | 14 px | 24 px |
| Label / Eyebrow | Manrope | 750 | 12 px | 12 px | 12 px |

## Component variants

| Component set | Variant axes | States / properties |
|---|---|---|
| Button | Style = Ink, Cobalt, Light, Outline | Default, Hover, Pressed, Disabled; text property; optional trailing icon |
| Category Tab | Selected = True, False | Default, Focused; text property |
| Menu Item | Featured = True, False | Category, price, description, volume/tags; Add default/added |
| Field | Type = Text, Tel | Empty, Focus, Filled, Error; label, hint and error text |
| Pickup Option | Selected = True, False | Label property; 48 px minimum touch target |
| Location Status | Status = Open, Kitchen Closed, Closed | Status copy and indicator color |
| Header | Breakpoint = Desktop, Mobile | Menu closed/open; cart count property |

## Screen specifications

- Home desktop: 1440 px; 40 px outer gutter; two-panel hero; realtime cup represented by the captured 3D poster.
- Menu desktop: 1440 px; 2-column item grid; sticky category row; cart drawer state.
- Visit desktop: 1440 px; photo / persimmon split; live opening status; hours grid.
- Preorder desktop: 1440 px; summary + contact form; empty, validation, error and demo-success states.
- Home mobile: 390 px; stacked hero; static optimized 3D render; 12 px outer gutter.
- Menu mobile: 390 px; horizontal category tabs; single-column cards; sticky cart CTA.

Reference renders are in `artifacts/screenshots/`. Every address, price and confirmation remains explicitly demonstrational.
