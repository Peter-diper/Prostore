"use client";
import { useRouter } from "next/navigation";
import { Toast } from "../../../components/ui/toast";
import { useTransition } from "react";

import { shippingAddressSchema } from "../../../lib/validators";
import { shippingAddress } from "../../../types";

const ShippingAddresForm = ({ addres }: { addres: shippingAddress }) => {
  const router = useRouter();
  

  return <>shipping addres form</>;
};

export default ShippingAddresForm;
