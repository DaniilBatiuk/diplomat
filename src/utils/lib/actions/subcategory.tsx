"use server";

import { prisma } from "../../../../prisma/prisma-client";

export async function createSubCategory(subCategory: CreateSubCategory) {
  const categoryExist = await prisma.subcategory.findUnique({
    where: {
      name_categoryId: subCategory,
    },
  });

  if (categoryExist) {
    throw new Error("Підкатегорія з цією назвою вже існує у цій категорії.");
  }

  const newCategory = await prisma.subcategory.create({
    data: subCategory,
  });

  return { newCategory };
}
