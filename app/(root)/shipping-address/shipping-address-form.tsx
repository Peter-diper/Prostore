"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Field, FieldLabel, FieldError, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shippingAddressSchema } from "../../../lib/validators";
import { ArrowRight } from "lucide-react";

type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>;

export default function ShippingAddressForm({
  address,
}: {
  address: ShippingAddressFormValues;
}) {
  const router = useRouter();

  const form = useForm<ShippingAddressFormValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address,
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(value) {
    console.log(value);
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="h2-bold mt-4">Shipping Address</h1>

      <p className="text-sm text-muted-foreground">
        Please enter an address to ship to.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-5">
          <FieldSet className="w-full">
            <Controller
              control={form.control}
              name="fullname"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Fullname</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your Fullname"
                    aria-invalid={fieldState.invalid}
                    className="w-full "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="streetAddress"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your Address"
                    aria-invalid={fieldState.invalid}
                    className="w-full "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your City"
                    aria-invalid={fieldState.invalid}
                    className="w-full "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />{" "}
            <Controller
              control={form.control}
              name="postalCode"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Popostal Code</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your Popostal Code"
                    aria-invalid={fieldState.invalid}
                    className="w-full "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="country"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Country</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your Country"
                    aria-invalid={fieldState.invalid}
                    className="w-full "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldSet>
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className={`${isPending ? "animate-pulse" : ""}`}
            disabled={isPending}
          >
            <ArrowRight className="size-4" /> Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
