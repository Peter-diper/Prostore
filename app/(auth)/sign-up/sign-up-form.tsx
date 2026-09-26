"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValue } from "../../../lib/const";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signUpUser } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";

const SignUpButton = () => {
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

const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form className="space-y-6" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label className="mb-2" htmlFor="name">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          defaultValue={signUpDefaultValue.name}
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          defaultValue={signUpDefaultValue.email}
        />
      </div>{" "}
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
          defaultValue={signUpDefaultValue.password}
        />
      </div>{" "}
      <div>
        <Label htmlFor="confirmPassword" className="mb-2">
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          autoComplete="confirmPassword"
          defaultValue={signUpDefaultValue.confirmPassword}
        />
      </div>
      <div>
        <div>
          <SignUpButton />

          {data && !data.success && (
            <div className="text-center text-destructive ">{data.message}</div>
          )}
        </div>
        <div className="text-sm text-center mt-3 text-muted-foreground">
          Already have an account?{" "}
          <Link href={"/sign-in"} target="_self" className="link">
            sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;
