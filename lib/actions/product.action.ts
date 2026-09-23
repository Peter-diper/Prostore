"use server";

import { convertToPlaneObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../const";
import { prisma } from "@/db/prisma";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlaneObject(data);
}
