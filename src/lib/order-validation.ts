export type OrderContact = { name: string; phone: string; pickup: string };
export type OrderErrors = Partial<Record<keyof OrderContact, string>>;

export function validateOrderContact(values: OrderContact): OrderErrors {
  const errors: OrderErrors = {};
  if (values.name.trim().length < 2) errors.name = "Укажите имя — минимум 2 символа";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "Введите номер телефона полностью";
  if (!values.pickup) errors.pickup = "Выберите время выдачи";
  return errors;
}
