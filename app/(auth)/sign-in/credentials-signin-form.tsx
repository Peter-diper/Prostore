"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValue } from "../../../lib/const";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signInWithCredentials } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={"w-full"}
      variant={"default"}
    >
      {pending ? "Singing in ..." : "Sign In"}
    </Button>
  );
};

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form className="space-y-6" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
        <div>
          <SignInButton />

          {data && !data.success && (
            <div className="text-center text-destructive ">{data.message}</div>
          )}
        </div>
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
