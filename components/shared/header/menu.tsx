import React from "react";
import ModeToggle from "./mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost">
            <Link className={"flex-center gap-2"} href={"/cart"}>
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <Button>
            <Link className={" gap-2 flex-center"} href={"/sign-in"}>
              <User /> Sign In
            </Link>
          </Button>
        </div>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col p-6 items-start gap-3 ">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button variant={"ghost"}>
              <Link href={"/cart"} className="flex gap-2 items-center">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <Button>
              <Link className={" gap-2 flex-center"} href={"/sign-in"}>
                <User /> Sign In
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
