"use server";

import { Status } from "@prisma/client";
import { redirect } from "next/navigation";

import { prisma } from "../../../../prisma/prisma-client";

import { createProperty, deleteAllProperties } from "./property";

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

export async function patchProduct(product: PatchProduct) {
  const newProduct = await prisma.product.update({
    where: {
      id: product.id,
    },
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

  await deleteAllProperties(product.id);

  const properties = product.properties.map(prop => {
    return { ...prop, productId: newProduct.id, subcategoryId: product.subcategoryId };
  });

  for (let property of properties) {
    await createProperty(property);
  }

  return { newProduct };
}

export async function patchProductStatus(product: PatchProductStatus) {
  const newProduct = await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      status: product.status,
    },
  });

  return { newProduct };
}

export async function getAllActiveProducts(): Promise<Product[]> {
  try {
    const allProducts = await prisma.product.findMany({
      where: {
        status: Status.ACTIVE,
      },
      select: {
        id: true,
        name: true,
        description: true,
        count: true,
        imageUrls: true,
        orderStatus: true,
        price: true,
        status: true,
        createdAt: true,
        properties: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            categoryId: true,
          },
        },
        savedItem: {
          select: {
            id: true,
            saved: {
              select: {
                id: true,
                token: true,
              },
            },
          },
        },
      },
    });
    return allProducts;
  } catch (error) {
    console.log("Error fetching Products: ", error);
    redirect("/not-found");
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        count: true,
        imageUrls: true,
        orderStatus: true,
        price: true,
        status: true,
        createdAt: true,
        properties: {
          select: {
            id: true,
            name: true,
            value: true,
          },
        },
        subcategory: {
          select: {
            id: true,
            name: true,
            categoryId: true,
          },
        },
        savedItem: {
          select: {
            id: true,
            saved: {
              select: {
                id: true,
                token: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      redirect("/not-found");
    }

    return product;
  } catch (error) {
    console.log("Error fetching Product: ", error);
    redirect("/not-found");
  }
}
