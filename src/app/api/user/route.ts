import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error finding user: ", error);
    return NextResponse.json({ error: `Error finding user: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
