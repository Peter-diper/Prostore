import Link from "next/link";
import { Button } from "../../ui/button";
import { auth } from "../../../auth";
import { signOutUser } from "../../../lib/actions/user.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { UserIcon } from "lucide-react";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button>
        <Link className={" gap-2 flex-center"} href={"/sign-in"}>
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInital = session.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex gap-2 items-center ">
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <div className="flex items-center ">
              <Button
                variant={"ghost"}
                className={
                  "relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200"
                }
              >
                {firstInital}
              </Button>
            </div>
          }
        ></DropdownMenuTrigger>

        <DropdownMenuContent className={"w-54"} align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className={"font-normal"}>
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-bold leading-none text-gray-600 ">
                  {session.user?.name}
                </div>{" "}
                <div className="text-sm text-muted-foreground leading-none">
                  {session.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem className={"p-0 mb-1"}>
              <form action={signOutUser} className="w-full">
                <Button
                  className={"w-full py-4 px-2 h-4 justify-start"}
                  variant={"ghost"}
                  type="submit"
                >
                  Sign Out
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
