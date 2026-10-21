"use client";

import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../../lib/actions/cart.action";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "../../../components/ui/toast";
import {
  Table,
  TableHead,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { formatCurrency } from "../../../lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isProceedPending, startProceedTransition] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty <Link href={"/"}>Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className=" md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-right">Item</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={item.image}
                          alt="image"
                          width={50}
                          height={50}
                        />{" "}
                        {item.name}
                      </Link>
                    </TableCell>

                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={isPending}
                        variant={"outline"}
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId,
                            );

                            if (!res.success) {
                              toast.add({
                                description: res.message,
                                type: "error",
                                priority: "high",
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-pulse" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        disabled={isPending}
                        variant={"outline"}
                        type="button"
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);

                            if (!res.success) {
                              toast.add({
                                description: res.message,
                                type: "error",
                                priority: "high",
                              });
                            }
                          })
                        }
                      >
                        {isPending ? (
                          <Loader className="w-4 h-4 animate-pulse" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">{item.price}$</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-l">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):{" "}
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className={"w-full rounded-sm"}
                disabled={isPending}
                onClick={() =>
                  startProceedTransition(async () =>
                    router.push("/shipping-address"),
                  )
                }
              >
                {isProceedPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
