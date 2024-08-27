import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const subcategoryId = req.nextUrl.searchParams.get("subcategoryId");

    if (subcategoryId === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const allProperties = await prisma.property.findMany({
      where: {
        subcategoryId: subcategoryId,
      },
      select: {
        name: true,
      },
      distinct: ["name"],
    });

    return NextResponse.json(allProperties);
  } catch (error) {
    console.log("Error finding allProperties: ", error);
    return NextResponse.json({ error: `Error finding allProperties: ${error}`, status: 500 });
  }
}
