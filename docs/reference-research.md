# ПОЛУТОН — compact visual & product research

Актуальность: 13 августа 2026. Исследование намеренно короткое: оно фиксирует рабочие паттерны перед проектированием, а не превращается в отдельный deliverable.

## 15 ориентиров

| Бренд | Что полезно для проекта | Ограничение / риск |
|---|---|---|
| [Onyx Coffee Lab](https://onyxcoffeelab.com/) | Сильная editorial-подача продукта, traceability и характерный tone of voice. | Большая shop-архитектура отодвигает локальный café flow. |
| [Dayglow](https://dayglow.coffee/) | Смелый цвет, культурная позиция и узнаваемость без «кофейного бежевого». | E-commerce доминирует над быстрым сценарием визита. |
| [Proud Mary](https://proudmarycoffee.com/pages/proud-mary-cafe-austin) | Адрес, часы и меню находятся без поиска; food и coffee показаны как единый опыт. | Меню в PDF — слабый mobile endpoint и тупик для заказа. |
| [Blue Bottle](https://bluebottlecoffee.com/us/eng/cafes) | Спокойная иерархия и дисциплинированный location finder. | Сверхсдержанный минимализм легко становится безликим клише. |
| [Maman](https://mamannyc.com/) | Цельная art direction фотографий, сезонные кампании, прямые Order и Locations. | Много параллельных кампаний и CTA создают шум. |
| [Ditta Artigianale](https://dittaartigianale.com/en) | Ремесло объясняется через продукт и процесс, а не через пустые claims. | Shop-first структура усложняет локальную задачу «зайти сейчас». |
| [Skuratov Coffee](https://skuratovcoffee.ru/) | Выраженный русский brand voice и собственная медийная экосистема. | Сложная экосистема не нужна одному компактному café concept. |
| [La Cabra](https://lacabra.com/) | Безупречная продуктовая фотография, типографическая тишина, tasting notes. | Mega navigation и каталог чрезмерны для одной кофейни. |
| [Verve](https://www.vervecoffee.com/pages/locations) | Реальные категории, цены, availability и location-specific ordering. | Разрыв между brand site и Toast делает опыт несвязным. |
| [% Arabica](https://arabica.com/en/locations/) | Жёсткая identity discipline и понятная глобальная география. | Меню и конкретное действие после выбора точки выражены слабо. |
| [THE BARN](https://thebarn.de/pages/locations) | Café, продукт и образование собраны в узнаваемую систему. | Retail-каталог перевешивает локальный visit UX. |
| [ABC Coffee Roasters](https://abc-roasters.com/) | Российский editorial minimalism, свет, воздух, локации как часть бренда. | Цены и быстрое меню не становятся самостоятельным сценарием. |
| [Drinkit](https://drinkit.io/main) | Самый ясный reference для preorder: настроить → выбрать слот → забрать. | App dependency снижает ценность самостоятельного web flow. |
| [Кооператив Чёрный](https://chernyi.coffee/coffeeshop) | Адрес, часы и меню доступны без рекламной декорации. | Наследованный checkout перегружен для простого café order. |
| [Newmix Coffee](https://www.awwwards.com/sites/newmixcoffee) | Тактильный WebGL может раскрывать упаковку как часть product story. | 3D легко становится тяжёлым аттракционом и блокирует контент. |

## Вывод

### Работает

- один главный action — preorder/pickup;
- адрес, часы, статус и диапазон цен уже на первом экране;
- меню как сканируемый интерфейс: категории, состав, объём, dietary tags, цена;
- одна art-directed система фотографий вместо случайной галереи;
- сезонный продукт как повод для storytelling, а не бесконечная промо-карусель;
- motion, который объясняет структуру и состояние UI.

### Стало клише

- beige + serif как автоматический синоним premium;
- full-screen video без полезного сообщения;
- бессмысленный marquee, кастомный cursor и вечное вращение 3D;
- огромные слова, которые вытесняют меню, адрес и CTA;
- PDF-меню и отправка пользователя в приложение для каждого действия.

### Возможность

Построить identity вокруг полутонов вкуса: не «кисло или горько», а спектр между ними. Визуально — резкий split-tone, который при движении раскрывает промежуточные оттенки. 3D-стакан становится физическим носителем этой идеи, а не отдельным эффектом.

### Не делаем

- сайт не зависит от WebGL;
- нет scroll hijacking и preload screen;
- нет фальшивых отзывов, наград и press logos;
- нет восьми равнозначных CTA;
- нет отдельного backend, оплаты, аккаунтов и CMS.

## Локальная ценовая рамка

Публичные меню Калуги показывают капучино примерно в диапазоне 180–285 ₽, авторские напитки — около 300–490 ₽, завтраки — около 420 ₽ и выше: [Positiff Coffee](https://yandex.ru/maps/org/positiff_coffee/38551991371/), [Mira](https://yandex.ru/maps/org/mira/86212929496/menu/), [Сурикат кофе](https://2gis.ru/kaluga/firm/70000001037561901/tab/prices). Для fictional premium concept принят правдоподобный диапазон 190–590 ₽.
