import { NextRequest, NextResponse } from "next/server";

import { deleteAllProperties } from "@/utils/lib/actions/property";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
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
            categoryId: true,
          },
        },
      },
    });

    return NextResponse.json(allProducts);
  } catch (error) {
    console.log("Error finding allProducts: ", error);
    return NextResponse.json({ message: `Не вдалось отритати товар`, status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await deleteAllProperties(productId);

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ message: "Product successfully deleted" });
  } catch (error) {
    console.log("Error deleting product: ", error);
    return NextResponse.json({ message: `Не вдалось отримати товар` }, { status: 500 });
  }
}
