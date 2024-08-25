import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const allActiveProducts = await prisma.product.findMany({
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
    return NextResponse.json(allActiveProducts);
  } catch (error) {
    console.log("Error finding allActiveProducts: ", error);
    return NextResponse.json({ error: `Error finding allActiveProducts: ${error}`, status: 500 });
  }
}
