"use server";

import { convertToPlaneObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../const";
import { prisma } from "@/lib/prismaUtile/index";

export async function getLatestProducts() {
  const prismaObj = prisma();

  const data = await prismaObj.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlaneObject(data);
}
