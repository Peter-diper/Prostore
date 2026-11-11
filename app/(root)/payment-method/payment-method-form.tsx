"use client";

import { useRouter } from "next/navigation";
import { toast } from "../../../components/ui/toast";
import React, { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { paymentMethodSchema } from "../../../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFUALT_PAYMENT_METHOD, PAYMENT_METHODS } from "../../../lib/const";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { updateUserPaymentMethod } from "../../../lib/actions/user.action";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFUALT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);

      if (!res.success) {
        toast.add({
          title: "something whent wrong",
          description: res.message,
          type: "error",
        });
        return;
      }
      router.push("/place-order");
    });
  };

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="h2-bold mt-4 capitalize">payment method</h1>

      <p className="text-sm text-muted-foreground ">
        Please Select a Payment Method
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-5">
          <FieldSet className="w-full">
            <Controller
              control={form.control}
              name="type"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {PAYMENT_METHODS.map((paymentMethod) => (
                      <React.Fragment key={paymentMethod}>
                        <div className="flex  gap-4 items-center ">
                          <RadioGroupItem
                            id={paymentMethod}
                            value={paymentMethod}
                          ></RadioGroupItem>
                          <FieldLabel htmlFor={paymentMethod}>
                            {paymentMethod}
                          </FieldLabel>
                        </div>
                      </React.Fragment>
                    ))}
                  </RadioGroup>
                  <FieldError />
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
};

export default PaymentMethodForm;
