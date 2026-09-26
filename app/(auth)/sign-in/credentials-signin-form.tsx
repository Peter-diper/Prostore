import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValue } from "../../../lib/const";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const CredentialsSignInForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <Label className="mb-2" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          defaultValue={signInDefaultValue.email}
        />
      </div>
      <div>
        <Label htmlFor="password" className="mb-2">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="password"
          defaultValue={signInDefaultValue.password}
        />
      </div>
      <div>
        <Button variant={"default"} className={"w-full"}>
          Sign In
        </Button>
        <div className="text-sm text-center mt-3 text-muted-foreground">
          Dont&apos;t have an account?{" "}
          <Link href={"/sign-up"} target="_self" className="link">
            sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
