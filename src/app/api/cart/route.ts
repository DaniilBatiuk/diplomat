import { NextRequest, NextResponse } from "next/server";

import { findOrCreateCart, updateCartTotalAmount } from "@/utils/lib/actions/cart";

import { prisma } from "../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalPrice: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
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
        totalPrice: true,
        items: {
          select: {
            id: true,
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                count: true,
                imageUrls: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("Error finding cart", error);
    return NextResponse.json({ message: "Error finding cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const { data } = (await req.json()) as { data: { productId: string; quantity: number } };

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productId: data.productId,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: data.quantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: data.productId,
          quantity: data.quantity,
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);
    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ message: "Не вдалося додати товар до кошику" }, { status: 500 });
  }
}
