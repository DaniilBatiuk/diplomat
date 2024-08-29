"use server";

import { redirect } from "next/navigation";

import { prisma } from "../../../../prisma/prisma-client";

export async function createCategory({ name }: { name: string }) {
  const categoryExist = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (categoryExist) {
    throw new Error("Категорія з цією назвою вже існує.");
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });

  return { newCategory };
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    redirect("/not-found");
  }
}

export async function getOneCategory(name: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    redirect("/not-found");
  }
}
