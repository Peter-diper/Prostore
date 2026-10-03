"use client";
import { Cart, CartItem } from "../../../types";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "../../ui/toast";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../../lib/actions/cart.action";
import { useTransition } from "react";

const AddToCart = ({ items: item, cart }: { items: CartItem; cart?: Cart }) => {
  const router = useRouter();

  const [isPending, startTransion] = useTransition();

  const handleAddToCart = async () => {
    startTransion(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.add({
          description: res.message,
          type: "error",
          priority: "high",
        });
        return;
      }

      // hanlde success add to cart

      toast.add({
        type: "success",
        description: res.message,
        actionProps: {
          children: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransion(async () => {
      const res = await removeItemFromCart(item.productId);

      toast.add({
        type: res.success ? "success" : "error",
        description: res.message,
      });
    });
    return;
  };

  // check if item is in cart

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem && existItem.qty >= 1 ? (
    <div className=" flex gap-2 items-center">
      <Button
        variant={"outline"}
        type="button"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        <Plus />
      </Button>
      <span className={`${isPending ? "" : ""}`}>
        {isPending ? <Loader className="animate-spin w-4" /> : existItem!.qty}
      </span>
      <Button
        disabled={isPending}
        variant={"outline"}
        type="button"
        onClick={handleRemoveFromCart}
      >
        <Minus />
      </Button>
    </div>
  ) : (
    <Button
      disabled={isPending}
      className={"w-full"}
      type="button"
      onClick={handleAddToCart}
    >
      {isPending ? <Loader className="animate-spin" /> : <Plus />} Add to cart
    </Button>
  );
};

export default AddToCart;
