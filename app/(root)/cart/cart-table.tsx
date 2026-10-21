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

const CartTable = ({ cart }: { cart?: Cart }) => {
  const loader = useRouter();
  const [isPending, startTransion] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold">shopping cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty <Link href={"/"}>Go Shopping</Link>
        </div>
      ) : (
        <div className="gird md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">table</div>
        </div>
      )}
    </>
  );
};

export default CartTable;
