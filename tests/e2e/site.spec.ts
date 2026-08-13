import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("core navigation, menu and demo preorder work", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("НЕ ДЕЛИТСЯ");

  await page.getByRole("link", { name: "Заказать к выдаче" }).first().click();
  await expect(page).toHaveURL(/\/menu$/);
  await page.getByRole("tab", { name: "Авторские" }).click();
  await expect(page.getByText("Полутон", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Добавить Полутон/ }).click();
  await page.locator('button[aria-label="Открыть заказ, позиций: 1"]:visible').click();
  await page.getByRole("link", { name: /Выбрать время/ }).click();
  await expect(page).toHaveURL(/\/preorder$/);

  await page.getByRole("button", { name: "Через 20 минут" }).click();
  await page.getByLabel("Имя").fill("Мия");
  await page.getByLabel("Телефон").fill("+7 999 123-45-67");
  await page.getByRole("button", { name: /Подтвердить/ }).click();
  await expect(page.getByRole("heading", { name: /Заказ собран, но не отправлен/ })).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});

for (const route of ["/", "/menu", "/visit", "/preorder"]) {
  test(`${route} has no serious axe violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  });
}
