"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { auth } from "../../auth";
import { getMyCart } from "./cart.action";
import { getUserById } from "./user.action";
import { insertOrderSchema } from "../validators";
import { prisma } from "../../db/prisma";
import { CartItem } from "../../types";

// Create order and create the Oder Items

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not Authenticated");

    const cart = await getMyCart();
    const userId = session.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0)
      return {
        success: false,
        message: "Your cart is emty",
        redirectTo: "/cart",
      };

    if (!user.address)
      return {
        success: false,
        message: "No shippin address",
        redirectTo: "/shippin-address",
      };

    if (!user.paymentMethod)
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };

    // Create order object

    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
      taxPrice: cart.taxPrice,
    });

    // create a transaction to create order and order items in database
    const insertedOrderId = await prisma.$transaction(async (tx) => {
      // create order

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const insertedOrder = await tx.order.create({ data: order });
      // create order from the cart items

      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }
      // clear cart
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          itemsPrice: 0,
          shippingPrice: 0,
        },
      });
      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created ",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, message: formatError(error) };
  }
}
