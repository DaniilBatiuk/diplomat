import { z } from "zod";

export const ProductScheme = z.object({
  name: z
    .string()
    .min(2, "Назва має містити не менше 2 символів")
    .max(100, "Назва має містити не більше 100 символів"),
  description: z
    .string()
    .min(10, "Опис має містити не менше 10 символів")
    .max(500, "Опис має містити не більше 500 символів"),
  price: z.union([z.string(), z.number()]),
  count: z.union([z.string(), z.number()]),
  orderStatus: z.string(),
  subcategoryId: z.string().min(2, "Підкатегорія не вибрана"),
  properties: z.array(
    z.object({
      name: z
        .string()
        .min(2, "Назва має містити не менше 2 символів")
        .max(100, "Назва має містити не більше 100 символів"),
      value: z.string(),
    }),
  ),
});
