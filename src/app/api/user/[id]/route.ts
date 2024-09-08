import { NextRequest, NextResponse } from "next/server";

import { findOrCreateCart } from "@/utils/lib/actions/cart";
import { findOrCreateSaved } from "@/utils/lib/actions/saved";

import { prisma } from "../../../../../prisma/prisma-client";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    let token = req.cookies.get("cartToken")?.value;
    let savedToken = req.cookies.get("savedToken")?.value;

    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        role: true,
        fullName: true,
        cartId: true,
        savedId: true,
        cart: {
          select: {
            id: true,
            token: true,
          },
        },
        saved: {
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

    if (savedToken && findUser.saved && findUser.saved.token !== savedToken) {
      const saved = await prisma.saved.findFirst({
        where: {
          token: savedToken,
        },
      });

      if (!saved) {
        return NextResponse.json({ error: "Cart not found" });
      }

      await prisma.savedItem.deleteMany({
        where: {
          savedId: saved.id,
        },
      });

      await prisma.saved.deleteMany({
        where: {
          token: savedToken,
        },
      });
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

    if (savedToken && !findUser.savedId) {
      const saved = await findOrCreateSaved(savedToken);
      await prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          savedId: saved.id,
        },
      });
    } else if (!findUser.savedId) {
      token = crypto.randomUUID();

      const newSaved = await findOrCreateSaved(token);

      await prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          savedId: newSaved.id,
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
        savedId: true,
        cart: {
          select: {
            id: true,
            token: true,
          },
        },
        saved: {
          select: {
            id: true,
            token: true,
          },
        },
      },
    });
    if (!resultUser || !resultUser.cart || !resultUser.saved) {
      return NextResponse.json({ error: "User not found" });
    }

    const response = NextResponse.json(resultUser);
    response.cookies.set("cartToken", resultUser.cart.token, {
      maxAge: 30 * 24 * 60 * 60,
    });
    response.cookies.set("savedToken", resultUser.saved.token, {
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.log("Error [USER:UPDATE]: ", error);
    return NextResponse.json({ message: `Щось пішло не так.`, status: 500 });
  }
}
export async function POST(req: NextRequest) {}
