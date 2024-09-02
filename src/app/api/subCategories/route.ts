import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const categoryId = req.nextUrl.searchParams.get("categoryId");

    if (categoryId === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const allSubcategories = await prisma.subcategory.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return NextResponse.json(allSubcategories);
  } catch (error) {
    console.log("Error finding allSubcategories: ", error);
    return NextResponse.json({ message: `Не вдалось отримати підкатегорії`, status: 500 });
  }
}
