import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");
    console.log(productId);

    if (productId === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

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
            categoryId: true,
          },
        },
      },
    });
    return NextResponse.json(oneProduct);
  } catch (error) {
    console.log("Error finding product: ", error);
    return NextResponse.json({ message: `Не вдалось отримати товар`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
