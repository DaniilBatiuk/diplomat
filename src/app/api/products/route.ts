import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");

    if (productId) {
      const oneProduct = await prisma.product.findUnique({
        where: {
          id: productId,
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
            },
          },
        },
      });
      return NextResponse.json(oneProduct);
    }

    const allProducts = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        count: true,
        imageUrls: true,
        orderStatus: true,
        price: true,
        status: true,
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
          },
        },
      },
    });
    return NextResponse.json(allProducts);
  } catch (error) {
    console.log("Error finding allProducts: ", error);
    return NextResponse.json({ error: `Error finding allProducts: ${error}`, status: 500 });
  }
}
