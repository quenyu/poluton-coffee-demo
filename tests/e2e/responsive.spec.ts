import { expect, test } from "@playwright/test";

test("required responsive widths have no horizontal page overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One viewport matrix is sufficient");

  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    for (const route of ["/", "/menu", "/visit", "/preorder"]) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
      expect(dimensions.scrollWidth, `${route} at ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth);
    }
  }
});

test("reduced motion keeps navigation and the 3D fallback usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One media-mode check is sufficient");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("[data-3d]")).toHaveAttribute("data-3d", "fallback");
  await page.getByRole("link", { name: "Заказать к выдаче" }).first().click();
  await expect(page).toHaveURL(/\/menu$/);
  await page.getByRole("tab", { name: "Выпечка" }).click();
  await expect(page.getByText("Кардамоновый ролл", { exact: true })).toBeVisible();
});
