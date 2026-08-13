import { describe, expect, it } from "vitest";
import { validateOrderContact } from "../../src/lib/order-validation";

describe("preorder contact validation", () => {
  it("reports all required fields", () => {
    expect(validateOrderContact({ name: "", phone: "", pickup: "" })).toEqual({
      name: "Укажите имя — минимум 2 символа",
      phone: "Введите номер телефона полностью",
      pickup: "Выберите время выдачи",
    });
  });

  it("accepts a complete contact", () => {
    expect(validateOrderContact({ name: "Мия", phone: "+7 999 123-45-67", pickup: "Через 20 минут" })).toEqual({});
  });
});
