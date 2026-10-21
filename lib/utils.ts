/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { number, ZodError } from "zod";
import { twMerge } from "tailwind-merge";
import { ta } from "zod/v4/locales";
import { mergeValues } from "zod/v4/core";

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

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error(
      "type error (should be string or number ): value=> " + typeof value,
    );
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-Us", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

// curreny formater useing the formatter above

export const formatCurrency = (amount: number | string | null) => {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
};
