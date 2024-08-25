"use server";

import { prisma } from "../../../../prisma/prisma-client";

import { createProperty } from "./property";

export async function createProduct(product: CreateProduct) {
  const newProduct = await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: +product.price,
      count: +product.count,
      imageUrls: product.imageUrls,
      orderStatus: product.orderStatus,
      subcategoryId: product.subcategoryId,
    },
  });

  const properties = product.properties.map(prop => {
    return { ...prop, productId: newProduct.id, subcategoryId: product.subcategoryId };
  });

  for (let property of properties) {
    await createProperty(property);
  }

  return { newProduct };
}