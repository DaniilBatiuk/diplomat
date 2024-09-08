import { NextRequest, NextResponse } from "next/server";

import { findOrCreateSaved } from "@/utils/lib/actions/saved";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("savedToken")?.value;

    if (!token) {
      return NextResponse.json({ savedItems: [] });
    }

    const savedList = await prisma.saved.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      select: {
        id: true,
        token: true,
        savedItems: {
          select: {
            id: true,
            product: {
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
              },
            },
          },
        },
      },
    });

    return NextResponse.json(savedList);
  } catch (error) {
    console.log("Error finding cart", error);
    return NextResponse.json({ message: "Error finding cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("savedToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const newSaved = await findOrCreateSaved(token);

    const { data } = (await req.json()) as { data: { productId: string } };

    const findProduct = await prisma.product.findFirst({
      where: {
        id: data.productId,
      },
    });

    if (!findProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const savedItemExist = newSaved.savedItems.find(el => el.productId === findProduct.id);
    if (savedItemExist) {
      await prisma.savedItem.delete({
        where: {
          id: savedItemExist.id,
        },
      });
    } else {
      await prisma.savedItem.create({
        data: {
          productId: findProduct.id,
          savedId: newSaved.id,
        },
      });
    }
    const resp = NextResponse.json({ success: true });
    resp.cookies.set("savedToken", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return resp;
  } catch (error) {
    console.log("[SAVED_POST] Server error", error);
    return NextResponse.json({ message: "Не вдалося зберегти товар" }, { status: 500 });
  }
}
