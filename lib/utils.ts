/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { ZodError } from "zod";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert Prisma object into a regular js object

export function convertToPlaneObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// format errors

export function formatError(error: any): string {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  }

  if (error.code === "P2002") {
    const field =
      (error as any).meta?.driverAdapterError?.cause?.constraint?.fields?.[0] ||
      "field";

    return `${field} already exists`;
  }

  console.error("Unknown error:", error);
  return "Something went wrong";
}
