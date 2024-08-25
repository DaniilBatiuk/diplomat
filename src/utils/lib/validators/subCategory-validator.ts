import { z } from "zod";

export const SubCategoryScheme = z.object({
  name: z
    .string()
    .min(2, "Назва має містити не менше 2 символів")
    .max(50, "Назва має містити не більше 50 символів"),
});

export type SubCategoryType = z.infer<typeof SubCategoryScheme>;
