import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const findProduct = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (!findProduct) {
      return NextResponse.json({ error: "Product not found" });
    }

    const allSimilarProducts = await prisma.product.findMany({
      where: {
        status: Status.ACTIVE,
        subcategoryId: findProduct.subcategoryId,
        NOT: {
          id: findProduct.id,
        },
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
      },
      take: 20,
    });

    return NextResponse.json(allSimilarProducts);
  } catch (error) {
    console.log("Error finding allSimilarProducts: ", error);
    return NextResponse.json({ message: `Не вдалось отритати товар`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
