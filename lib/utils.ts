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
  if (error.message!) {
    return error.message;
  }

  console.error("Unknown error:", error.message);
  return "Something went wrong";
}

// Round number to 2 decimal places
export function roundTo2(value: number | string) {
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

// Shorten the uuid
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// format date and times

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
