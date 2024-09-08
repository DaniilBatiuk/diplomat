"use server";

import { prisma } from "../../../../prisma/prisma-client";

export const findOrCreateSaved = async (token: string) => {
  let saved = await prisma.saved.findFirst({
    where: {
      token,
    },
    select: {
      id: true,
      savedItems: {
        select: {
          id: true,
          productId: true,
        },
      },
    },
  });

  if (!saved) {
    saved = await prisma.saved.create({
      data: {
        token,
      },
      select: {
        id: true,
        savedItems: {
          select: {
            id: true,
            productId: true,
          },
        },
      },
    });
  }

  return saved;
};
