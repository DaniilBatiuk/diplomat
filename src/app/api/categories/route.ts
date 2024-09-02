import { NextResponse } from "next/server";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  try {
    const allCategories = await prisma.category.findMany();
    return NextResponse.json(allCategories);
  } catch (error) {
    console.log("Error finding categories: ", error);
    return NextResponse.json({ message: `Не вдалось отримати категорії`, status: 500 });
  }
}
