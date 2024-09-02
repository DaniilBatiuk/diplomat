"use server";

import { prisma } from "../../../../prisma/prisma-client";

export const findOrCreateCart = async (token: string) => {
  let userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
  });

  if (!userCart) {
    userCart = await prisma.cart.create({
      data: {
        token,
      },
    });
  }

  return userCart;
};

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    select: {
      id: true,
      token: true,
      totalPrice: true,
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              count: true,
              imageUrls: true,
            },
          },
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalPrice = userCart.items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalPrice,
    },
    select: {
      id: true,
      token: true,
      totalPrice: true,
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              count: true,
              imageUrls: true,
            },
          },
        },
      },
    },
  });
};
