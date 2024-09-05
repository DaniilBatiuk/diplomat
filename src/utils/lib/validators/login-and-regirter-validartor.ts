import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(4, { message: "Пароль має містити мінімум 4 символи" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введіть коректно почту" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: "Введіть коректно ім'я на прізвище" }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine(data => data.password === data.confirmPassword, {
    message: "Поролі не співпадають",
    path: ["confirmPassword"],
  });

export type LoginType = z.infer<typeof formLoginSchema>;
export type RegisterType = z.infer<typeof formRegisterSchema>;
