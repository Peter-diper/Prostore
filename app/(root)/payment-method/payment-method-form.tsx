"use client";

import { useRouter } from "next/navigation";
import { toast } from "../../../components/ui/toast";
import { useTransition } from "react";
import CheckOutSteps from "../../../components/shared/checkout-steps";
import { useForm } from "react-hook-form";
import z from "zod";
import { paymentMethodSchema } from "../../../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFUALT_PAYMENT_METHOD } from "../../../lib/const";

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

  return (
    <div>
      <CheckOutSteps current={2} />
    </div>
  );
};

export default PaymentMethodForm;
