"use server";

import { convertToPlaneObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../const";
import { prisma } from "@/lib/prismaUtile/index";

// get lastest products

export interface Product {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner: string | null;
}

export async function getLatestProducts() {
  const prismaObj = prisma();

  const data = await prismaObj.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlaneObject(data);
}
