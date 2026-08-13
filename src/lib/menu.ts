export type MenuCategory = "coffee" | "signature" | "non-coffee" | "bakery" | "breakfast";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  volume?: string;
  tags?: string[];
  featured?: boolean;
};

export const categories: { id: MenuCategory; label: string; shortLabel: string }[] = [
  { id: "coffee", label: "Кофе", shortLabel: "Кофе" },
  { id: "signature", label: "Авторские", shortLabel: "Авторские" },
  { id: "non-coffee", label: "Не кофе", shortLabel: "Не кофе" },
  { id: "bakery", label: "Выпечка", shortLabel: "Выпечка" },
  { id: "breakfast", label: "Завтраки", shortLabel: "Завтраки" },
];

export const menuItems: MenuItem[] = [
  { id: "espresso", category: "coffee", name: "Эспрессо", description: "Бразилия × Эфиопия, шоколад, красное яблоко", price: 190, volume: "40 мл" },
  { id: "filter", category: "coffee", name: "Фильтр дня", description: "Лот меняется каждую неделю — спросите про оттенки", price: 240, volume: "250 мл", tags: ["без молока"] },
  { id: "flat-white", category: "coffee", name: "Флэт уайт", description: "Двойной эспрессо и тонкая молочная текстура", price: 290, volume: "180 мл" },
  { id: "cappuccino", category: "coffee", name: "Капучино", description: "Сбалансированный, сладкий, без сиропа", price: 280, volume: "250 мл" },
  { id: "half-tone", category: "signature", name: "Полутон", description: "Эспрессо, печёная груша, какао-нибс, овсяная пена", price: 420, volume: "300 мл", tags: ["сезон"], featured: true },
  { id: "blue-hour", category: "signature", name: "Синий час", description: "Колд брю, чёрная смородина, эстрагон, тоник", price: 390, volume: "350 мл", tags: ["холодный"] },
  { id: "warm-edge", category: "signature", name: "Тёплый край", description: "Фильтр, облепиха, карамелизированный мёд, перец", price: 410, volume: "300 мл" },
  { id: "matcha", category: "non-coffee", name: "Матча-тоник", description: "Церемониальная матча, сухой тоник, лайм", price: 390, volume: "350 мл", tags: ["vegan"] },
  { id: "cacao", category: "non-coffee", name: "Какао 70%", description: "Тёмное какао, молоко, щепоть морской соли", price: 340, volume: "300 мл" },
  { id: "tea", category: "non-coffee", name: "Улун груша", description: "Светлый улун, груша, тимьян", price: 330, volume: "450 мл", tags: ["vegan"] },
  { id: "cardamom-bun", category: "bakery", name: "Кардамоновый ролл", description: "Слоёное тесто, кардамон, глазурь из хурмы", price: 310, tags: ["хит"], featured: true },
  { id: "canelle", category: "bakery", name: "Канеле мисо", description: "Хрустящая карамельная корочка, белое мисо", price: 270 },
  { id: "cookie", category: "bakery", name: "Куки тёмный шоколад", description: "Шоколад 70%, фундук, морская соль", price: 250 },
  { id: "pear-toast", category: "breakfast", name: "Тост груша × рикотта", description: "Заквасочный хлеб, рикотта, груша, чёрный перец", price: 490, tags: ["vegetarian"], featured: true },
  { id: "eggs", category: "breakfast", name: "Яйца и кукурузный крем", description: "Два яйца, крем из кукурузы, чили-масло, хлеб", price: 540 },
  { id: "granola", category: "breakfast", name: "Гранола полутон", description: "Гречневая гранола, йогурт, сезонные ягоды", price: 450, tags: ["без глютена"] },
  { id: "croissant-salmon", category: "breakfast", name: "Круассан с лососем", description: "Слабосолёный лосось, яйцо, огурец, зелёное масло", price: 590 },
];

export const featuredItems = menuItems.filter((item) => item.featured);

export function getMenuItem(id: string) {
  return menuItems.find((item) => item.id === id);
}

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}
