import { Metadata } from "next";
import { getOrderById } from "../../../../lib/actions/order.action";
import { notFound } from "next/navigation";
import OrderDetaiTable from "./order-details-table";
import { ShippingAddress } from "../../../../types";

export const metada: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <OrderDetaiTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
    />
  );
};

export default OrderDetailsPage;
