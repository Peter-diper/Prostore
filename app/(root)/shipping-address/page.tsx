import { auth } from "../../../auth";
import { getMyCart } from "../../../lib/actions/cart.action";
import { redirect } from "next/navigation";
import { shippingAddress } from "../../../types";
import { getUserById } from "../../../lib/actions/user.action";
import ShippingAddresForm from "./shipping-address-form";
import CheckOutSteps from "../../../components/shared/checkout-steps";

export const metadata = {
  title: "Shipping Address",
};

const ShippingAddresPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/");

  const session = await auth();

  // cheking User Id
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Please sign in first");
  }

  const user = await getUserById(userId);

  return (
    <>
      <CheckOutSteps current={1} />
      <ShippingAddresForm address={user.address as shippingAddress} />
    </>
  );
};

export default ShippingAddresPage;
