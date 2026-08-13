import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function addPolutonAndOpenPreorder(page: Page) {
  await page.getByRole("tab", { name: "Авторские" }).click();
  await expect(page.getByText("Полутон", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Добавить Полутон/ }).click();
  await page.locator('button[aria-label="Открыть заказ, позиций: 1"]:visible').click();
  await page.getByRole("link", { name: /Выбрать время/ }).click();
  await expect(page).toHaveURL(/\/preorder$/);
}

test("core navigation, menu and demo preorder work", async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") runtimeErrors.push(message.text()); });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("НЕ ДЕЛИТСЯ");

  await page.getByRole("link", { name: "Заказать к выдаче" }).first().click();
  await expect(page).toHaveURL(/\/menu$/);
  await addPolutonAndOpenPreorder(page);

  await page.getByRole("button", { name: "Через 20 минут" }).click();
  await page.getByLabel("Имя").fill("Мия");
  await page.getByLabel("Телефон").fill("+7 999 123-45-67");
  await page.getByRole("button", { name: /Подтвердить/ }).click();
  await expect(page.getByRole("heading", { name: /Заказ собран, но не отправлен/ })).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});

test("preorder validation and demo error preserve a retryable order", async ({ page }) => {
  await page.goto("/menu");
  await addPolutonAndOpenPreorder(page);

  await page.getByRole("button", { name: /Подтвердить/ }).click();
  await expect(page.getByRole("button", { name: "Через 10 минут" })).toBeFocused();
  await expect(page.getByText("Выберите время выдачи")).toBeVisible();
  await expect(page.getByText("Укажите имя — минимум 2 символа")).toBeVisible();
  await expect(page.getByText("Введите номер телефона полностью")).toBeVisible();
  await expect(page.getByLabel("Имя")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Телефон")).toHaveAttribute("aria-invalid", "true");

  await page.getByRole("button", { name: "Через 20 минут" }).click();
  await page.getByLabel("Имя").fill("Мия");
  await page.getByLabel("Телефон").fill("+7 999 000-00-00");
  await page.getByRole("button", { name: /Подтвердить/ }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Не получилось подтвердить demo-заказ" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Полутон" })).toBeVisible();

  await page.getByLabel("Телефон").fill("+7 999 123-45-67");
  await expect(page.getByText("Не получилось подтвердить demo-заказ")).toBeHidden();
  await page.getByRole("button", { name: /Подтвердить/ }).click();
  await expect(page.getByRole("heading", { name: /Заказ собран, но не отправлен/ })).toBeVisible();
});

for (const route of ["/", "/menu", "/visit", "/preorder"]) {
  test(`${route} has no serious axe violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  });
}
