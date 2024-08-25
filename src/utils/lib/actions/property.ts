"use server";

import { prisma } from "../../../../prisma/prisma-client";

export async function createProperty(property: CreateProperty) {
  const newProperty = await prisma.property.create({
    data: property,
  });

  return { newProperty };
}
