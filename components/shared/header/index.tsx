import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/const/index";
import ModeToggle from "./mode-toggle";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        {/* logo section */}
        <div className="flex-start">
          <Link href={"/"} className="flex-start">
            <Image
              src={"/images/logo.svg"}
              alt={`${APP_NAME}`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>

        {/* right side section */}
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
      </div>
    </header>
  );
};

export default Header;
