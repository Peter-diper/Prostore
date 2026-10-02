"use client";
import { CartItem } from "../../../types";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast, ToastAction } from "../../ui/toast";
import { addItemToCart } from "../../../lib/actions/cart.action";
import { formatError, success } from "zod";

const AddToCart = ({ items }: { items: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(items);

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
  };

  return (
    <Button className={"w-full"} type="button" onClick={handleAddToCart}>
      <Plus /> Add to cart
    </Button>
  );
};

export default AddToCart;
