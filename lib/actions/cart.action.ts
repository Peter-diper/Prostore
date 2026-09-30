"use server";

import { cookies } from "next/headers";
import { CartItem } from "../../types";
import { convertToPlaneObject, formatError } from "../utils";
import { auth } from "../../auth";
import { prisma } from "../../db/prisma";
import { cartItemSchema } from "../validators";

export async function addItemToCart(data: CartItem) {
  try {
    const cart = await getMyCart();

    // parse and validate items
    const item = cartItemSchema.parse(data);

    // find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    console.log({
      "item requested:": item,
      "product found:": product,
    });

    return { success: true, message: "Item added to cart" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getMyCart() {
  // check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) {
    throw new Error("cart session not found");
  }

  // get session and user id
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // get user cart from data base
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) {
    return undefined;
  }

  //canvert decimals
  return convertToPlaneObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
