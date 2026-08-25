import { ShoppingCart, User, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "../../../lib/const";

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
        <div className="space-x-2">
          <Button variant="ghost">
            <Link className={"flex gap-2"} href={"/cart"}>
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <Button>
            <Link className={"flex gap-2"} href={"/sign-in"}>
              <User /> Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
