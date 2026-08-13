import { describe, expect, it } from "vitest";
import { categories, formatPrice, menuItems } from "../../src/lib/menu";

describe("menu data", () => {
  it("keeps identifiers unique and every category populated", () => {
    expect(new Set(menuItems.map((item) => item.id)).size).toBe(menuItems.length);
    for (const category of categories) {
      expect(menuItems.some((item) => item.category === category.id)).toBe(true);
    }
  });

  it("uses plausible positive demo prices and Russian formatting", () => {
    expect(menuItems.every((item) => item.price >= 100 && item.price <= 1_000)).toBe(true);
    expect(formatPrice(1_250)).toBe("1 250 ₽");
  });
});
