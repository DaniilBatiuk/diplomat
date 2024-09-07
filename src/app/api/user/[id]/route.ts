import { NextRequest, NextResponse } from "next/server";

import { findOrCreateCart } from "@/utils/lib/actions/cart";

import { prisma } from "../../../../../prisma/prisma-client";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    let token = req.cookies.get("cartToken")?.value;

    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
        fullName: true,
        cartId: true,
        cart: {
          select: {
            id: true,
            token: true,
          },
        },
      },
    });

    if (!findUser) {
      return NextResponse.json({ error: "User not found" });
    }

    if (token && findUser.cart && findUser.cart.token !== token) {
      const cart = await prisma.cart.findFirst({
        where: {
          token: token,
        },
      });

      if (!cart) {
        return NextResponse.json({ error: "Cart not found" });
      }

      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await prisma.cart.deleteMany({
        where: {
          token: token,
        },
      });
    }

    if (token && !findUser.cartId) {
      const cart = await findOrCreateCart(token);
      await prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          cartId: cart.id,
        },
      });
    } else if (!findUser.cartId) {
      token = crypto.randomUUID();

      const newCart = await findOrCreateCart(token);

      await prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          cartId: newCart.id,
        },
      });
    }

    const resultUser = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
        fullName: true,
        cartId: true,
        cart: {
          select: {
            id: true,
            token: true,
          },
        },
      },
    });
    if (!resultUser || !resultUser.cart) {
      return NextResponse.json({ error: "User not found" });
    }

    const response = NextResponse.json(resultUser);
    response.cookies.set("cartToken", resultUser.cart.token, {
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.log("Error [USER:UPDATE]: ", error);
    return NextResponse.json({ message: `Не вдалось отримати кошик`, status: 500 });
  }
}
export async function POST(req: NextRequest) {}
