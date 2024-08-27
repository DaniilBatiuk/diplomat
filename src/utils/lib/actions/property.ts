"use server";

import { prisma } from "../../../../prisma/prisma-client";

export async function createProperty(property: CreateProperty) {
  const newProperty = await prisma.property.create({
    data: property,
  });

  return { newProperty };
}

export async function deleteAllProperties(productId: string) {
  try {
    await prisma.property.deleteMany({
      where: {
        productId: productId,
      },
    });
    return { success: true };
  } catch (error) {
    return { error };
  }
}
